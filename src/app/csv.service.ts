import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor(private http: HttpClient) { }
  getActualTotals() {
    //return this.http.get(`https://raw.githubusercontent.com/RyanMontville/actual-olympic-medals-ranking/main/actual_totals.csv`, { responseType: 'text' });
    return this.http.get(`https://raw.githubusercontent.com/RyanMontville/actual-olympic-medals-ranking/main/data/actual_totals.csv`, { responseType: 'text' });
  }
  getAllMedals() {
    //return this.http.get('https://raw.githubusercontent.com/RyanMontville/actual-olympic-medals-ranking/main/allmedals.csv', { responseType: 'text' });
    return this.http.get('https://raw.githubusercontent.com/RyanMontville/actual-olympic-medals-ranking/main/data/team_and_individual_medals.csv', { responseType: 'text' });
  }
  getAthleteList() {
    return this.http.get('', { responseType: 'text' });
  }
  getMedalsForEveryAthlete() {
    return this.http.get('https://raw.githubusercontent.com/RyanMontville/actual-olympic-medals-ranking/main/data/medals_for_every_athlete.csv', { responseType: 'text' });
  }
}
