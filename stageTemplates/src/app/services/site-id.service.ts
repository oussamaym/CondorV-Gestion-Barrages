import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SiteIdService {

  constructor() { }
  private selectedSiteId: number | null = null;

  setSelectedSiteId(id: number): void {
    this.selectedSiteId = id;
  }

  getSelectedSiteId(): number | null {
    return this.selectedSiteId;
  }
}
