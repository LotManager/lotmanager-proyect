// types/empleado.ts
export interface Empleado {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  rol: 'Administrador' | 'Tambero';
  fechaIngreso: string; // ISO
  estado: 'Activo' | 'Inactivo';
}

export interface EmpleadoStats {
  total: number;
  activos: number;
  inactivos: number;
  nuevosEsteMes: number;
}

