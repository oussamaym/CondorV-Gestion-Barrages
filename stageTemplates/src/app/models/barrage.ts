enum LocalisationBarr {
    Amont = "Amont",
    Aval = "Aval",
    Fondation = "Fondation",
    ND = "ND",
    Noayau = "Noayau",
    RechercheAmont = "RechercheAmont",
    RechercheAval = "RechercheAval",
    RD = "RD",
    RG = "RG"
  }
  class Barrage {
    constructor(
      public id: number,
      public nom: string,
      public localisation: LocalisationBarr,
      public capacite: number,
      public villePlusProche: string,
      public hauteurBarr: number,
      public distVillePlusProche: number,
      public codeRetNormal: string,
      public dateMiseEnServ: string, // Change this to a string representation of date
      public laRetenue: string,
      public agenceId: number | null,
     
    ) {}
  }
  
  export { Barrage, LocalisationBarr};
  