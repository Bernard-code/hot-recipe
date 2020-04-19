import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appExpand]'
})
export class ExpandDirective {

  @HostBinding('class.expanded') expanded: boolean = false;
     
  @HostListener('click') 
  click( e: Event ){
    this.expanded = !this.expanded;
  }

  constructor() { }

}
