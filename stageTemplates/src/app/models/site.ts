import { Agence } from './agence';
import { LocalisationBarr } from './localisationbarr'; // Make sure to provide the correct import path
import { TypeGrandeur } from './typegrandeur';

export class Site {
     id: number;
     nom: string;
     localisationBarrId: number;
     localisationBarr?: LocalisationBarr; // Use the correct property name
     capacite: number;
     type: string;
     villePlusProche: string;
     hauteurBarr: number;
     distVillePlusProche: number;
     codeRetNormal: string;
     dateMiseEnServ: string; 
     laRetenue: string; 
     agenceId: number;
     agence?: Agence ;
    constructor(
         id: number,
         nom: string,
         localisationBarrId: number,
         capacite: number,
         type: string, 
         villePlusProche: string,
         hauteurBarr: number,
         distVillePlusProche: number,
         codeRetNormal: string,
         dateMiseEnServ: string, 
         laRetenue: string, 
         agenceId: number 
    ) {
        this.id = id;
        this.nom = nom;
        this.localisationBarrId = localisationBarrId;
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
