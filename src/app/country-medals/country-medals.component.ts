import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CsvService } from '../csv.service';
import { Medal } from './medal.model';
import { Router } from '@angular/router';
import { AthleteDetailComponent } from "../athlete-detail/athlete-detail.component";
import { EventDetailComponent } from "../event-detail/event-detail.component";

@Component({
  selector: 'app-country-medals',
  standalone: true,
  imports: [AthleteDetailComponent, EventDetailComponent],
  templateUrl: './country-medals.component.html',
  styleUrl: './country-medals.component.css'
})
export class CountryMedalsComponent implements OnInit, OnDestroy{
  @Input() country: string = "";
  medalsForCountry: Medal[] = [];
  shouldOpenAthletePopup: boolean = false;
  shouldOpenEventPopup: boolean = false;
  nameForPopup: string = "";
  eventForPopup: number = 0;
  constructor(
    private csvService: CsvService,
    private router: Router) {}
  
  ngOnInit(): void {
    this.csvService.getAllMedals().subscribe(data =>{
      const list = data.split('\n');
      list.forEach(line =>{
        let cols = line.split(",");
        let medalEmoji = cols[5].replace("1", "🥇").replace("2", "🥈").replace("3", "🥉")
        //medal = date, country, name, sport-event,eventID,medalEmoji,multiplyer
        let medal = new Medal(cols[0], cols[1], cols[2], cols[3], +cols[4], medalEmoji, cols[6]);
        if (medal.country === this.country) {
          this.medalsForCountry.push(medal);
        }
      });
    });
  }
  ngOnDestroy(): void {
    this.medalsForCountry = [];
  }

  isAthlete(medalistName: string) {
    let parts =  medalistName.split(" ");
    if (parts[parts.length - 1] !== 'Team') {
      return true;
    }
    return false;
  }

  shouldClosePopUp(outputBoolean: boolean) {
    if (outputBoolean === true) {
      this.shouldOpenAthletePopup = false;
      this.shouldOpenEventPopup = false;
    }
  }

  showAthletePopUp(athleteName: string) {
    this.nameForPopup = athleteName;
    this.shouldOpenAthletePopup = true;
  }

  showEventPopUp(eventID: number) {
    this.eventForPopup = eventID;
    this.shouldOpenEventPopup = true;
  }

}
