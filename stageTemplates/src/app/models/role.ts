export class Role {
    id: number;
    designation: string;
    controleTotal: boolean;
    creer: boolean;
    modifier: boolean;
    supprimer: boolean;
    lecture: boolean;
  
    constructor(
      id: number,
      designation: string,
      controleTotal: boolean,
      creer: boolean,
      modifier: boolean,
      supprimer: boolean,
      lecture: boolean
    ) {
      this.id = id;
      this.designation = designation;
      this.controleTotal = controleTotal;
      this.creer = creer;
      this.modifier = modifier;
      this.supprimer = supprimer;
      this.lecture = lecture;
    }
  }
  