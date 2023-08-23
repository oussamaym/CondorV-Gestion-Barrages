export interface INavbarData{
    routelink:string;
    icon?:string;
    label:string;
    expanded?:boolean;
    items?: INavbarData[];
}