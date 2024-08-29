import { Component, Input, OnInit, output } from '@angular/core';
import { CsvService } from '../csv.service';
import { AthleteInfo, Medal } from './athlete.model';

@Component({
  selector: 'app-athlete-detail',
  standalone: true,
  imports: [],
  templateUrl: './athlete-detail.component.html',
  styleUrl: './athlete-detail.component.css'
})
export class AthleteDetailComponent implements OnInit {
  @Input() athleteName = "";
  medalsForAthlete: Medal[] = [];
  athleteInfo: AthleteInfo = new AthleteInfo("", 0, 0, 0);
  closePopup = output<boolean>();

  constructor(private csvService: CsvService) {}

  ngOnInit(): void {
    this.csvService.getAthleteList().subscribe(data => {
      const list = data.split('\n');
      list.forEach(line => {
        let cols = line.split(',');
        if (cols[0] === this.athleteName) {
          this.athleteInfo = new AthleteInfo(cols[0], +cols[1], +cols[2], +cols[3]);
        }
      });
    })
    this.csvService.getMedalsForEveryAthlete().subscribe(data =>{
      const list = data.split('\n');
      list.forEach(line =>{
        let cols = line.split(",");
        //date,name,event,event_id,medal
        if (cols[1] === this.athleteName) {
          let emojiMedal = cols[4].replace("1", "🥇").replace("2", "🥈").replace("3", "🥉")
          let athlete = new Medal(cols[0], cols[1], cols[2], +cols[3], emojiMedal);
          this.medalsForAthlete.push(athlete);
        }
      });
    });
  }

  OnClose() {
    this.athleteName = "";
    this.closePopup.emit(true);
    this.medalsForAthlete = [];
  }
  



}
