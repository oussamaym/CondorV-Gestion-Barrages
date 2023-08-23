import { INavbarData } from "./helper";

export const navbarData:INavbarData[] = [
    {
        routelink: 'site',
        icon : 'fal fa-home',
        label: 'Site'
    },
    {
        routelink: 'grandeur',
        icon : 'fal fa-box',
        label: 'Grandeur',
        items:[
        {
            routelink:'grandeur/list',
            label:'GRD1'
        },
        {
            routelink:'grandeur/list',
            label:'GRD2'
        }
      ]
    },
    {
        routelink: 'crudUser',
        icon : 'fal fa-user',
        label: 'Utilisateur'
    },
    {
        routelink: 'settings',
        icon : 'fal fa-cog',
        label: 'parametres'
    },

];