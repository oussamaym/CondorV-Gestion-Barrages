import { Grandeur } from "./grandeur";

export class Mesure {
    id: number;
    date: Date;
    valeur?: number | null;
    grandeurId: number;
    grandeur?: Grandeur | null;
  
    constructor(id: number, date: Date,valeur: number|null, grandeurId: number) {
      this.id = id;
      this.date = date;
      this.valeur=valeur;
      this.grandeurId = grandeurId;
    }
  }
  