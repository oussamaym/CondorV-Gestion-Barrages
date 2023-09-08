import { TypeGrandeur } from "./typegrandeur";

export class Grandeur {
    
    id: number;
    nomGrandeur?: string | null;
    nomAbrege?: string | null;
    nomComplet?: string | null;
    typeGrandeurId: number;
    typeGrandeur?: TypeGrandeur | null;
    unite?: string | null;
    localisationBarr?: string | null;
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
    processorName?: string | null;
    numberDecimalDigits?: number | null;
    codeAppareil?: number | null;
    heureMBI?: number | null;
    dateMBI?: number | null;
    valeurMBI?: number | null;
    piezomPlusProche?: string | null;
    lectureDeBase?: number | null;
    longueur?: number | null;
    ancre?: number | null;
    calibre?: number | null;
    klCalibrage?: number | null;
    lineaireZero?: number | null;
    siteId?: number | null;
    site?: any; 
    
    constructor(
        id: number = 0,
        nomGrandeur: string | null = null,
        nomAbrege: string | null = null,
        nomComplet: string | null = null,
        typeGrandeurId: number = 0,
        localisationBarr: string | null = null,
        modeAcquisition: string | null = null,
        frequenceMesure: string | null = null,
        precisionMesure: number | null = null,
        coordonneeX: number | null = null,
        coordonneeY: number | null = null,
        coordonneeZ: number | null = null,
        minimum: number | null = null,
        maximum: number | null = null,
        valeurDexclusion: number | null = null,
        processorId: number | null = null,
        processorUnitId: number | null = null,
        processorName: string | null = null,
        numberDecimalDigits: number | null = null,
        codeAppareil: number | null = null,
        heureMBI: number | null = null,
        dateMBI: number | null = null,
        valeurMBI: number | null = null,
        piezomPlusProche: string | null = null,
        lectureDeBase: number | null = null,
        longueur: number | null = null,
        ancre: number | null = null,
        calibre: number | null = null,
        klCalibrage: number | null = null,
        lineaireZero: number | null = null,
        siteId: number | null = null
      ) {
        this.id = id;
        this.nomGrandeur = nomGrandeur;
        this.nomAbrege = nomAbrege;
        this.nomComplet = nomComplet;
        this.typeGrandeurId = typeGrandeurId;
        this.localisationBarr = localisationBarr;
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
        this.processorName = processorName;
        this.numberDecimalDigits = numberDecimalDigits;
        this.codeAppareil = codeAppareil;
        this.heureMBI = heureMBI;
        this.dateMBI = dateMBI;
        this.valeurMBI = valeurMBI;
        this.piezomPlusProche = piezomPlusProche;
        this.lectureDeBase = lectureDeBase;
        this.longueur = longueur;
        this.ancre = ancre;
        this.calibre = calibre;
        this.klCalibrage = klCalibrage;
        this.lineaireZero = lineaireZero;
        this.siteId = siteId;
      }
  }
  