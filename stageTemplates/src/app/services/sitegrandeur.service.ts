import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SiteGrandeur } from '../models/sitegrandeur';

@Injectable({
  providedIn: 'root'
})
export class SiteGrandeurService {
  private baseUrl = 'https://localhost:7109/api/APISitesGrandeurs'; // Adjust the URL as needed

  constructor(private http: HttpClient) { }

  getAllSiteGrandeurs(): Observable<SiteGrandeur[]> {
    return this.http.get<SiteGrandeur[]>(`${this.baseUrl}`);
  }

  getSiteGrandeurBySiteId(id: number): Observable<SiteGrandeur[]> {
    return this.http.get<SiteGrandeur[]>(`${this.baseUrl}/BySiteId/${id}`);
  }

  getSiteGrandeurByTypeGrandeurId(id: number): Observable<SiteGrandeur[]> {
    return this.http.get<SiteGrandeur[]>(`${this.baseUrl}/ByTypeGrandeurId/${id}`);
    }
  getSiteGrandeurBySiteIdAndTypeGrandeurId(siteId: number,typeGrandeurId: number): Observable<SiteGrandeur> {
    return this.http.get<SiteGrandeur>(`${this.baseUrl}/${siteId}/${typeGrandeurId}`);
    }
  createSiteGrandeur(siteGrandeur: SiteGrandeur): Observable<SiteGrandeur> {
    return this.http.post<SiteGrandeur>(`${this.baseUrl}`, siteGrandeur);
  }

  updateSiteGrandeur(siteGrandeur: SiteGrandeur): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${siteGrandeur.siteId}`, siteGrandeur);
  }

  deleteSiteGrandeur(siteId: number, typeGrandeurId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${siteId}/${typeGrandeurId}`);
  }
}
