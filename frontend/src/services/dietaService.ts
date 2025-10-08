
// Servicio frontend para consumir los endpoints de 'Alimentacion' del backend
// Mapea la respuesta de Alimentacion a la forma que espera la card (Dieta)

export type Dieta = {
	id: string | number;
	nombre: string;
	descripcion?: string;
	proteina?: string | number;
	energia?: string | number;
	fibra?: string | number;
	corrales?: Array<{ id: string | number; nombre: string } | string>;
};

// Base URL configurable desde variables de entorno públicas de Next.js
const API_BASE =
	(typeof process !== "undefined" && (process.env as any).NEXT_PUBLIC_API_URL) ||
	(typeof process !== "undefined" && (process.env as any).NEXT_PUBLIC_BACKEND_URL) ||
	"http://localhost:3000";

async function handleJsonResponse(res: Response) {
	if (!res.ok) {
		const text = await res.text().catch(() => "");
		throw new Error(`HTTP ${res.status} ${res.statusText} ${text ? "- " + text : ""}`);
	}
	return res.json();
}

/** Mapea el objeto 'Alimentacion' desde el backend al tipo `Dieta` que usa la UI */
function mapAlimentacionToDieta(raw: any): Dieta {
	// Backend (AlimentacionMapper.toResponse) devuelve: { id, descripcion, corral?, suministros? }
	const id = raw?.id ?? raw?.ID ?? "";
	const descripcion = raw?.descripcion ?? raw?.name ?? raw?.nombre ?? "";

	// nombre requerido por la card: usamos una versión corta de descripcion si no hay nombre explícito
	const nombre = raw?.nombre ?? raw?.name ?? (typeof descripcion === "string" ? descripcion.slice(0, 40) : String(id));

	// No hay proteina/energia/fibra en Alimentacion por ahora; dejamos undefined
	const proteina = undefined;
	const energia = undefined;
	const fibra = undefined;

	// Mapear corrales: backend devuelve 'corral' como objeto (o undefined)
	let corrales: Array<{ id: string | number; nombre: string } | string> = [];
	const c = raw?.corral ?? raw?.corales ?? raw?.corrales;
	if (c) {
		if (Array.isArray(c)) {
			corrales = c.map((cc: any) => ({ id: cc.id, nombre: cc.nombre ?? cc.numero ?? String(cc.id) }));
		} else if (typeof c === "object") {
			corrales = [{ id: c.id, nombre: c.nombre ?? c.numero ?? String(c.id) }];
		}
	}

	return {
		id,
		nombre,
		descripcion,
		proteina,
		energia,
		fibra,
		corrales,
	};
}

/** Lista alimentaciones (usadas como 'dietas' en la UI) */
export async function listarDietas(): Promise<Dieta[]> {
	// Endpoint existente en el backend: /alimentaciones
	const res = await fetch(`${API_BASE}/alimentaciones`, {
		headers: { "Content-Type": "application/json" },
	});
	const data = await handleJsonResponse(res);
	if (!Array.isArray(data)) return [];
	return data.map(mapAlimentacionToDieta);
}

/** Obtiene una alimentacion por id y la mapea a Dieta */
export async function obtenerDieta(id: string | number): Promise<Dieta> {
	const res = await fetch(`${API_BASE}/alimentaciones/${id}`, {
		headers: { "Content-Type": "application/json" },
	});
	const data = await handleJsonResponse(res);
	return mapAlimentacionToDieta(data);
}

export default { listarDietas, obtenerDieta, mapAlimentacionToDieta };
