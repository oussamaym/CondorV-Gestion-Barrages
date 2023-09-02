import { TypeGrandeur } from "./typegrandeur";

export class Grandeur {
    
    id: number;
    nomGrandeur?: string | null;
    nomAbrege?: string | null;
    nomComplet?: string | null;
    typeGrandeurId: number;
    typeGrandeur?: TypeGrandeur | null;
    unite?: string | null;
    localisationBarrId?: number | null;
    localisationBarr?: any; 
    modeAcquisition?: string | null;
    frequenceMesure?: string | null;
    precisionMesure?: number | null;
    coordonneeX?: number | null;
    coordonneeY?: number | null;
    coordonneeZ?: number | null;
    minimum?: number | null;
    maximum?: number | null;
    valeurDexclusion?: number | null;
    processorId?: number | null;
    processorUnitId?: number | null;
    numberDecimalDigits?: number | null;
    codeAppareil?: number | null;
    heureMBI?: number | null;
    dateMBI?: number | null;
    valeurMBI?: number | null;
    piezomPlusProche?: string | null;
    lectureDeBase?: number | null;
    longueur?: number | null;
    calibre?: number | null;
    klCalibrage?: number | null;
    lineaireZero?: number | null;
    siteId?: number | null;
    site?: any; 
    constructor(id: number, nomGrandeur: string, nomAbrege: string, nomComplet: string, typeGrandeurId: number,  localisationBarrId: number, modeAcquisition: string, frequenceMesure: string, precisionMesure: number, coordonneeX: number, coordonneeY: number, coordonneeZ: number, minimum: number, maximum: number, valeurDexclusion: number, processorId: number, processorUnitId: number, numberDecimalDigits: number, codeAppareil: number, heureMBI: number, dateMBI: number, valeurMBI: number, piezomPlusProche: string, lectureDeBase: number, longueur: number, calibre: number, klCalibrage: number, lineaireZero: number, siteId: number) {
        this.id = id;
        this.nomGrandeur = nomGrandeur;
        this.nomAbrege = nomAbrege;
        this.nomComplet = nomComplet;
        this.typeGrandeurId = typeGrandeurId;
        this.localisationBarrId = localisationBarrId;
        this.modeAcquisition = modeAcquisition;
        this.frequenceMesure = frequenceMesure;
        this.precisionMesure = precisionMesure;
        this.coordonneeX = coordonneeX;
        this.coordonneeY = coordonneeY;
        this.coordonneeZ = coordonneeZ;
        this.minimum = minimum;
        this.maximum = maximum;
        this.valeurDexclusion = valeurDexclusion;
        this.processorId = processorId;
        this.processorUnitId = processorUnitId;
        this.numberDecimalDigits = numberDecimalDigits;
        this.codeAppareil = codeAppareil;
        this.heureMBI = heureMBI;
        this.dateMBI = dateMBI;
        this.valeurMBI = valeurMBI;
        this.piezomPlusProche = piezomPlusProche;
        this.lectureDeBase = lectureDeBase;
        this.longueur = longueur;
        this.calibre = calibre;
        this.klCalibrage = klCalibrage;
        this.lineaireZero = lineaireZero;
        this.siteId = siteId;
    }

  }
  