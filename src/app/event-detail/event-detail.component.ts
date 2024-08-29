import { Component, Input, OnInit, output } from '@angular/core';
import { Medal } from '../country-medals/medal.model';
import { CsvService } from '../csv.service';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit {
  @Input() eventID: number = 0;
  closePopup = output<boolean>();
  eventName: string = "";
  goldCountries: Medal[] = [];
  silverCountries: Medal[] = [];
  bronzeCountries: Medal[] = [];
  loading: boolean = true;

  constructor(
    private csvService: CsvService
  ) { }

  ngOnInit(): void {
    this.csvService.getAllMedals().subscribe(data => {
      const list = data.split('\n');
      list.forEach(line => {
        let cols = line.split(",");
        if (+cols[4] === this.eventID) {
          let medalEmoji = cols[5].replace("1", "🥇").replace("2", "🥈").replace("3", "🥉")
          //medal = date, country, name, sport-event,eventID,medalEmoji,multiplyer
          let medal = new Medal(cols[0], cols[1], cols[2], cols[3], +cols[4], medalEmoji, cols[6]);
          if (this.eventName === "") {
            this.eventName = medal.event;
          }
          if (medal.medalCode == "🥇") {
            this.goldCountries.push(medal)
          } else if (medal.medalCode == "🥈") {
            this.silverCountries.push(medal)
          } else if (medal.medalCode === "🥉") {
            this.bronzeCountries.push(medal)
          }

        }
      });
      this.loading = false;
    });
  }

  OnClose() {
    this.eventName = "";
    this.closePopup.emit(true);
    this.goldCountries = [];
    this.silverCountries = [];
    this.bronzeCountries = [];
  }
}
