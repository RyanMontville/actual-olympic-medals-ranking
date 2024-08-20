import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor(private http: HttpClient) { }
  getActualTotals() {
    return this.http.get(`https://raw.githubusercontent.com/RyanMontville/actual-olympic-medals-ranking/main/actual_totals.csv`, { responseType: 'text' });
  }
  getAllMedals() {
    return this.http.get('https://raw.githubusercontent.com/RyanMontville/actual-olympic-medals-ranking/main/allmedals.csv', { responseType: 'text' });
  }
}
