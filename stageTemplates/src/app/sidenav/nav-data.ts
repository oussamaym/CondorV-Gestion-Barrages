import { INavbarData } from "./helper";

export const navbarData:INavbarData[] = [
    {
        routelink: 'detailBarrage',
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
        routelink: 'detailAgence',
        icon : 'fal fa-box',
        label: 'Agence',
    },
    {
        routelink: '',
        icon : 'fal fa-user',
        label: 'Utilisateur',
        items:[
            {
                routelink:'/crudUser/BAR',
                label:'Barrage'
            },
            {
                routelink:'/crudUser/AG',
                label:'Agence'
            }
          ]
    },
    {
        routelink: 'settings',
        icon : 'fal fa-cog',
        label: 'Parametres'
    },

];