import { INavbarData } from "./helper";

export const navbarData:INavbarData[] = [
    {
        routelink: 'detailBarrage',
        icon : 'fal fa-home',
        label: 'Site'
    },
    {
        routelink: '',
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
<<<<<<< HEAD
        routelink: 'detailAgence',
        icon : 'fal fa-box',
=======
        routelink: 'crudAgence',
        icon : 'fal fa-building',
>>>>>>> b52df6286e5bb8d0f6f261603da90d51cc0fa068
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