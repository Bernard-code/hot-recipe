import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ordered-list',
  templateUrl: './ordered-list.component.html',
  styleUrls: ['./ordered-list.component.scss']
})
export class OrderedListComponent implements OnInit {
  @Input() label: string;
  @Input() items: string[] = [];
  @Input() placeholder: string;
  @Output() emitValue = new EventEmitter<any>();
  controlField: string;

  constructor() { }

  ngOnInit() { 
    this.items = this.items ? this.items : [];
  }

  onAddItem() {
    const item = this.controlField
    if (item && item.length) {
      this.items.push(item);
    }
    this.controlField = '';
    this.emitValue.emit(this.items);
  }

  onRemoveItem(index) {
    this.items = this.items.filter( x => !(x === this.items[index]) );
    this.emitValue.emit(this.items);
  }

}
