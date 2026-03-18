// types/empleado.ts


export type RolEmpleado = "Veterinario" | "Empleado" | "Administrador" | "Superior"

export interface Empleado {
  id: number
  nombre: string
  apellido: string    
  dni: number         
  email: string
  telefono: string
  rol: RolEmpleado
  sueldo: number      
  fechaIngreso: string // ISO
  estado: "Activo" | "Inactivo"
}

// Para veterinarios, que tienen matrícula
export interface Veterinario extends Empleado {
  rol: "Veterinario"
  numeroMatricula: number  
}

export interface EmpleadoStats {
  total: number
  activos: number
  inactivos: number
  nuevosEsteMes: number
  porRol: Record<RolEmpleado, number>
}

export type CreateEmpleadoInput = Omit<Empleado, "id">
export type UpdateEmpleadoInput = Partial<CreateEmpleadoInput>