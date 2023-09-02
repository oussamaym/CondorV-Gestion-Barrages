import { INavbarData } from "./helper2";


export const navbarDataII:INavbarData[]  = [
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
        routelink: 'crudAgence',
        icon : 'fal fa-building',
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
        icon : 'fal fa-arrow-left',
        label: 'Retour Au Site'
    },

];