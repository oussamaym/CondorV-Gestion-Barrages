import { Role } from './role'; // Import other related models if needed
import { Site } from './site';
import { Agence } from './agence';

export class Utilisateur {
  id: string;
  nom: string;
  prenom: string;
  userName: string;
  email: string | null;
  password: string | null;
  dateCreation?: Date;
  estActive: boolean;
  roleId: number;
  role?: Role;
  siteId?: number;
  site?: Site;
  agenceId?: number;
  agence?: Agence;
  constructor(
    id: string,
    nom: string,
    prenom: string,
    userName: string,
    email: string | null,
    password: string,
    estActive: boolean,
    roleId: number,
    siteId: number,
    agenceId: number
  ) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.estActive = estActive;
    this.roleId = roleId;
    this.siteId=siteId;
    this.agenceId=agenceId;
  }
}
