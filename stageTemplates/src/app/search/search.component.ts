import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  searchTerm: string = '';

  search(): void {
    console.log('Emitting search term:', this.searchTerm);
    this.onSearch.emit(this.searchTerm);
  }
}
