// src/app/models/well.model.ts

export class Well {
  id!: number;
  name!: string;
  location?: string;    
  daily_production!: number;
  status!: "activo" | "inactivo";

  constructor(init?: Partial<Well>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
