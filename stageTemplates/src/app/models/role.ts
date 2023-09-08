export class Role {
    id: number;
    designation: string;
    creer: boolean;
    modifier: boolean;
    supprimer: boolean;
    lecture: boolean;
    controlTotal: boolean=false;
  
    constructor(
      id: number,
      designation: string,
      creer: boolean,
      modifier: boolean,
      supprimer: boolean,
      lecture: boolean
    ) {
      this.id = id;
      this.designation = designation;
      this.creer = creer;
      this.modifier = modifier;
      this.supprimer = supprimer;
      this.lecture = lecture;
    }
  }
  