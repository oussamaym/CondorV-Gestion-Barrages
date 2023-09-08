import { Agence } from './agence'; // Make sure to provide the correct import path
import { TypeGrandeur } from './typegrandeur';

export class Site {
     id: number;
     nom: string;
     localisationBarr: string;
     capacite: number | null;
     type: string;
     villePlusProche: string;
     hauteurBarr: number | null;
     distVillePlusProche: number | null;
     codeRetNormal: string;
     dateMiseEnServ: Date | null; 
     laRetenue: string; 
     agenceId: number | null;
     agence?: Agence ;
    constructor(
         id: number,
         nom: string,
         localisationBarr: string,
         capacite: number | null,
         type: string, 
         villePlusProche: string,
         hauteurBarr: number | null,
         distVillePlusProche: number | null,
         codeRetNormal: string,
         dateMiseEnServ: Date | null, 
         laRetenue: string, 
         agenceId: number | null 
    ) {
        this.id = id;
        this.nom = nom;
        this.localisationBarr = localisationBarr;
        this.capacite = capacite;
        this.type = type;
        this.villePlusProche = villePlusProche;
        this.hauteurBarr = hauteurBarr;
        this.distVillePlusProche = distVillePlusProche;
        this.codeRetNormal=codeRetNormal;
        this.dateMiseEnServ=dateMiseEnServ;
        this.laRetenue=laRetenue;
        this.agenceId=agenceId;
    }
}
