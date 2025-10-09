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

function mapAlimentacionToDieta(raw: Record<string, unknown>): Dieta {

	const id = (raw?.id ?? raw?.ID ?? "") as string | number;
	const descripcion = (raw?.descripcion ?? raw?.name ?? raw?.nombre ?? "") as string;


	const nombre = (raw?.nombre ?? raw?.name ?? (typeof descripcion === "string" ? descripcion.slice(0, 40) : String(id))) as string;

	let corrales: Array<{ id: string | number; nombre: string } | string> = [];
	const c = (raw as Record<string, unknown>)['corral'] ?? (raw as Record<string, unknown>)['corales'] ?? (raw as Record<string, unknown>)['corrales'];

	if (typeof process !== 'undefined' && (process.env as any)?.NODE_ENV !== 'production') {
		try {

			console.debug('[dietaService] raw.corral =', JSON.stringify(c));
		} catch (e) {

		}
	}
	if (c) {

		if (Array.isArray(c)) {
			corrales = c.map((cc) => {
				if (typeof cc === 'string') return { id: cc, nombre: cc };
				if (typeof cc === 'number') return { id: cc, nombre: String(cc) };
				if (typeof cc === 'object' && cc !== null) {
					const obj = cc as Record<string, unknown>;
					// Support multiple possible id field names returned by backend
					const cid = (obj['id'] ?? obj['ID'] ?? obj['numero'] ?? obj['corralId'] ?? obj['corral_id'] ?? obj['id_corral'] ?? obj['idCorral'] ?? '') as string | number;
					const cn = (obj['nombre'] ?? obj['name'] ?? obj['numero'] ?? String(cid ?? '')) as string;
					return { id: cid, nombre: cn };
				}
				return { id: String(cc ?? ''), nombre: String(cc ?? '') };
			});
		} else if (typeof c === 'string' || typeof c === 'number') {

			corrales = [{ id: c as string | number, nombre: String(c) }];
		} else if (typeof c === 'object' && c !== null) {
			const obj = c as Record<string, unknown>;
			const cid = (obj['id'] ?? obj['ID'] ?? obj['numero'] ?? obj['corralId'] ?? obj['corral_id'] ?? obj['id_corral'] ?? obj['idCorral'] ?? '') as string | number;
			const cn = (obj['nombre'] ?? obj['name'] ?? obj['numero'] ?? String(cid ?? '')) as string;
			corrales = [{ id: cid, nombre: cn }];
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

/** Actualiza una alimentacion (dieta) parcialmente. Retorna la dieta actualizada mapeada. */
export async function actualizarDieta(id: string | number, payload: Partial<Dieta>): Promise<Dieta> {
	try {
		const res = await fetch(`${API_BASE}/alimentaciones/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});
		const data = await handleJsonResponse(res);
		return mapAlimentacionToDieta(data);
	} catch (err) {
		console.error('[dietaService] actualizarDieta failed', err);
		throw err;
	}
}

export default { listarDietas, obtenerDieta, actualizarDieta, mapAlimentacionToDieta };
