// types/sanidad.ts

export type TipoEnfermedad =
    | "RESPIRATORIA"
    | "DIGESTIVA"
    | "OJOS"
    | "SISTEMA_NERVIOSO"
    | "LOCOMOTOR"
    | "PARASITARIA"
    | "INTOXICACION"

    export type TipoVacuna =
    | "BRUCELOSIS"
    | "QUERATOCONJUNTIVITIS"
    | "AFTOSA"
    | "IBRIBVD"

    export type EstadoSalud = "SANO" | "ENFERMO" | "MUERTO" | "VENDIDO"

    export interface EnfermedadBovino {
    id: number
    idBovino: number
    fechaInicio: string       
    fechaAlta?: string         
    tipoEnfermedad: TipoEnfermedad  
    nombreEnfermedad: string
    corralId: number           // corral de enfermería donde está
    }

    export interface Tratamiento {
    id: number
    idBovino: number
    enfermedadId: number       
    diagnostico: string
    medicamento: string
    dosis: string
    diasTotales: number
    diasTranscurridos: number
    estado: "EN_CURSO" | "URGENTE" | "COMPLETADO" | "RECUPERADO"
    fechaInicio: string        // ISO
    proximaDosis?: string      // ISO
    }

    export interface VacunacionBovino {
    id: number
    idBovino: number
    fecha: string              // ISO
    tipoVacuna: TipoVacuna     
    }

    export interface SanidadStats {
    enTratamiento: number
    urgentes: number
    enRecuperacion: number
    completadosEsteMes: number
}