import { Agence } from './agence';
import { LocalisationBarr } from './localisationbarr'; // Make sure to provide the correct import path

export class Site {
    constructor(
        public id: number,
        public nom: string,
        public localisationBarr: LocalisationBarr, // Use the correct property name
        public capacite: number,
        public type: string, 
        public villePlusProche: string,
        public hauteurBarr: number,
        public distVillePlusProche: number,
        public codeRetNormal: string,
        public dateMiseEnServ: string, // Change this to a string representation of date
        public laRetenue: string, // Make sure to provide the correct type
        public agenceId: number,
        public agence: Agence // Make sure to provide the correct type
    ) {}
}
