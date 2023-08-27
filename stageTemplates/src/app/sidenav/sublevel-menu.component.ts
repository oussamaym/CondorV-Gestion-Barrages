import { Component, Input, OnInit } from '@angular/core';
import { INavbarData } from './helper';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sublevel-menu',
  template: `
  <ul *ngIf="collapsed && data.items && data.items.length >0"
  [@submenu]="expanded
  ? {value:'visible',
      params:{transitionParams:'400ms cubic-bezier(0.86, 0, 0.07, 1)',height:'*'}}
  : {value:'hidden',
      params:{transitionParams:'400ms cubic-bezier(0.86, 0, 0.07, 1)',height:'0'}}"
    class="sublevel-nav"
  >
    <li class="sublevel-nav-item"  *ngFor="let item of data.items">
        <a  class="sublevel-nav-link"
        (click)="handleClick(item)"
          *ngIf="item.items && item.items.length > 0"
        >
        <i class="subleel-link-icon fa fa-circle"></i>
        <span class="sublevel-link-text" *ngIf="collapsed">{{item.label}}</span>
        <i *ngIf="item.items && collapsed" class="menu-collapse-icon "
          [ngClass]="!item.expanded ? 'fal fa-angle-right' : 'fal fa-angle-down' "
        ></i>
        </a>
        <a class="sublevel-nav-link"
          *ngIf="!item.items || (item.items && item.items.length === 0)"
          [routerLink]="[item.routelink]"
          routerLinkActive="active-sublevel"
          [routerLinkActiveOptions]="{exact:true}"
      >
        <i class="subleel-link-icon fa fa-circle"></i>
        <span class="sublevel-link-text" *ngIf="collapsed">{{item.label}}</span>
      </a>
      <div *ngIf="item.items && item.items.length >0">
        <app-sublevel-menu
        [collapsed]="collapsed"
        [multiple]="multiple"
        [expanded]="item.expanded"
        ></app-sublevel-menu>

      </div>
    </li>
  </ul>
  `,
 styleUrls: ['./sidenav.component.css'],
 animations:[
  trigger('submenu',[
    state('hidden',style({
      height:'0',
      overflow:'hidden'
    })),
    state('visible',style({
      height:'*'
    })),
    transition('visible <=> hidden',[style({overflow:'hidden'}),
     animate('{{transitionParams}}')]),
    transition('void => *' , animate(0))
  ])
 ]
})
export class SublevelMenuComponent implements OnInit {

  @Input() data:INavbarData = {
    routelink:'',
    icon : '',
    label : '',
    items : []
  }
  @Input() collapsed = false;
  @Input() animating:boolean | undefined;
  @Input() expanded:boolean | undefined;
  @Input() multiple = false;
  constructor() { }

  ngOnInit(): void {
    
  }

  handleClick(item: any): void{
    if(!this.multiple){
      if(this.data.items && this.data.items.length > 0){
        for(let modelItem of this.data.items){
          if(item !==modelItem && modelItem.expanded){
              modelItem.expanded=false;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }
}
