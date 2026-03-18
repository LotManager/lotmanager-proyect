// types/bovino.ts

import { EstadoSalud } from "./sanidad"

export type EstadoAcostumbramiento =
    | "ENTRANTE"
    | "ESTABILIZADO"
    | "VACUNADO"
    | "ACOSTUMBRADO"

    // ✅ Situación actual del bovino en el feedlot
    export type SituacionBovino = "ENCORRAL" | "VENDIDO" | "MUERTO"

    export type SexoBovino = "MACHO" | "HEMBRA"

    export type TipoBovino = "TERNERO" | "NOVILLO" | "VAQUILLONA" | "DESCARTE"

    // Tipo de lectura (lo que devuelve el backend en GET /bovinos)
    export interface Bovino {
    id: number
    caravana: number
    // ✅ FIX: razaId y corralId son necesarios para edición sin cast (as any)
    // El backend DEBE incluirlos en el DTO de respuesta
    razaId: number
    corralId: number
    pesoIngreso: number
    pesoActual: number
    ingreso: string          // ISO
    sexo: SexoBovino
    tipoBovino: TipoBovino
    estadoSalud: EstadoSalud
    estadoAcostumbramiento: EstadoAcostumbramiento
    situacionBovino: SituacionBovino
    eficienciaConversion: number
    gmd: number              // ganancia media diaria (kg/día)
    // Campos "denormalizados" para mostrar en tabla (devueltos por el backend)
    nombreCorral: string
    nombreRaza: string
    }

    // Tipo para crear un bovino nuevo (POST /bovinos)
    export interface CreateBovinoInput {
    caravana: number
    razaId: number
    corralId: number
    pesoIngreso: number
    ingreso: string          // ISO
    sexo: SexoBovino
    tipoBovino: TipoBovino
    estadoSalud: EstadoSalud
    situacionBovino: SituacionBovino
}

// Tipo para actualizar (PATCH /bovinos/:id)
export type UpdateBovinoInput = Partial<CreateBovinoInput>