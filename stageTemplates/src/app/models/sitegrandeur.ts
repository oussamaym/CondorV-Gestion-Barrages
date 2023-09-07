import { Site } from "./site";
import { TypeGrandeur } from "./typegrandeur";

export class SiteGrandeur {
    typeGrandeurId: number=0;
    siteId: number=0;
    site?: Site;
    typeGrandeur?:TypeGrandeur;
    constructor(typesgrandeursid: number, siteid: number) {
      this.siteId = siteid;
      this.typeGrandeurId = typesgrandeursid;
    }
  }
  