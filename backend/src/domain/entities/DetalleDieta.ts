export class DetalleDieta {
    constructor(
        private dietaId: number,
        private alimentoId: number,
        private proporcionKg: number,
    ){}

    // Getters
    public getDietaId(): number {
        return this.dietaId;
    }
    public getAlimentoId(): number {
        return this.alimentoId;
    }
    public getProporcionKg(): number {
        return this.proporcionKg;
    }
    // Setters
    public setProporcionKg(proporcionKg: number): void {
        this.proporcionKg = proporcionKg;
    }
}