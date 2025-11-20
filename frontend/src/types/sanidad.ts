// types/sanidad.ts

export interface Tratamiento {
    id: number;
    idBovino: number;
    diagnostico: string;
    medicamento: string;
    dosis: string;
    diasTotales: number;
    diasTranscurridos: number;
    estado: 'EnCurso' | 'Urgente' | 'Completado' | 'Recuperado';
    fechaInicio: string; // ISO
    proximaDosis?: string; // ISO
    corral: number;

}

export interface SanidadStats {
    enTratamiento: number;
    urgentes: number;
    enRecuperacion: number;
    completadosEsteMes: number;
}