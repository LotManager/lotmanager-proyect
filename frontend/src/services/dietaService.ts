export type Dieta = {
	id: string | number;
	nombre: string;
	descripcion?: string;
	corrales?: Array<{ id: string | number; nombre: string } | string>;
};

const _env = (typeof process !== 'undefined' ? (process.env as unknown as Record<string, string | undefined>) : {});
const API_BASE = _env.NEXT_PUBLIC_API_URL ?? _env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3001';

console.debug('[dietaService] API_BASE =', API_BASE);

async function handleJsonResponse(res: Response) {
	if (!res.ok) {
		const text = await res.text().catch(() => "");
		throw new Error(`HTTP ${res.status} ${res.statusText} ${text ? "- " + text : ""}`);
	}
	return res.json();
}

/** Mapea el objeto 'Alimentacion' desde el backend al tipo `Dieta` que usa la UI */
function mapAlimentacionToDieta(raw: Record<string, unknown>): Dieta {
	// Backend (AlimentacionMapper.toResponse) devuelve: { id, descripcion, corral?, suministros? }
	const id = (raw?.id ?? raw?.ID ?? "") as string | number;
	const descripcion = (raw?.descripcion ?? raw?.name ?? raw?.nombre ?? "") as string;

	// nombre requerido por la card: usamos una versión corta de descripcion si no hay nombre explícito
	const nombre = (raw?.nombre ?? raw?.name ?? (typeof descripcion === "string" ? descripcion.slice(0, 40) : String(id))) as string;

	let corrales: Array<{ id: string | number; nombre: string } | string> = [];
	const c = (raw as Record<string, unknown>)['corral'] ?? (raw as Record<string, unknown>)['corales'] ?? (raw as Record<string, unknown>)['corrales'];
	if (c) {
		if (Array.isArray(c)) {
			corrales = c.map((cc) => {
				if (typeof cc === 'string') return { id: cc, nombre: cc };
				if (typeof cc === 'object' && cc !== null) {
					const obj = cc as Record<string, unknown>;
					const cid = (obj['id'] ?? obj['ID'] ?? obj['numero'] ?? '') as string | number;
					const cn = (obj['nombre'] ?? obj['numero'] ?? String(obj['id'] ?? '')) as string;
					return { id: cid, nombre: cn };
				}
				return { id: '', nombre: '' };
			});
		} else if (typeof c === 'object' && c !== null) {
			const obj = c as Record<string, unknown>;
			corrales = [{ id: (obj['id'] ?? obj['ID'] ?? '') as string | number, nombre: (obj['nombre'] ?? obj['numero'] ?? String(obj['id'] ?? '')) as string }];
		}
	}

	return {
		id,
		nombre,
		descripcion,
		corrales,
	};
}

/** Lista alimentaciones (usadas como 'dietas' en la UI) */
export async function listarDietas(): Promise<Dieta[]> {
	// Endpoint existente en el backend: /alimentaciones
	try {
		const res = await fetch(`${API_BASE}/alimentaciones`, {
			headers: { "Content-Type": "application/json" },
			// credentials: 'include', // descomenta si usas auth por cookies
		});
		const data = await handleJsonResponse(res);
		if (!Array.isArray(data)) return [];
		return data.map(mapAlimentacionToDieta);
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error('[dietaService] listarDietas failed', err);
		throw err;
	}
}

/** Obtiene una alimentacion por id y la mapea a Dieta */
export async function obtenerDieta(id: string | number): Promise<Dieta> {
	try {
		const res = await fetch(`${API_BASE}/alimentaciones/${id}`, {
			headers: { "Content-Type": "application/json" },
			// credentials: 'include',
		});
		const data = await handleJsonResponse(res);
		return mapAlimentacionToDieta(data);
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error('[dietaService] obtenerDieta failed', err);
		throw err;
	}
}

export default { listarDietas, obtenerDieta, mapAlimentacionToDieta };
