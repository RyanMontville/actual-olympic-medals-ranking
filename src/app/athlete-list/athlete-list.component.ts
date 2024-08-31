import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CsvService } from '../csv.service';
import { FooterComponent } from "../footer/footer.component";
import { AthleteInfo } from '../athlete-detail/athlete.model';
import { AthleteDetailComponent } from '../athlete-detail/athlete-detail.component';

@Component({
  selector: 'app-athlete-list',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, AthleteDetailComponent],
  templateUrl: './athlete-list.component.html',
  styleUrl: './athlete-list.component.css'
})
export class AthleteListComponent implements OnInit {
  loading: boolean = true;
  athletes: AthleteInfo[] = [];
  shouldOpenAthletePopup: boolean = false;
  nameForPopup: string = "";

  ngOnInit(): void {
    this.csvService.getAthleteList().subscribe(data => {
      const list = data.split('\n');
      list.forEach(line => {
        let cols = line.split(',');
        let athlete = new AthleteInfo(cols[0], cols[1], cols[2], +cols[3], +cols[4], +cols[5]);
        this.athletes.push(athlete);
      });
      this.loading = false;
    });
  }
  

  constructor(
    private csvService: CsvService
  ) {}

  shouldClosePopUp(outputBoolean: boolean) {
    if (outputBoolean === true) {
      this.shouldOpenAthletePopup = false;
    }
  }

  showAthletePopUp(athleteName: string) {
    this.nameForPopup = athleteName;
    this.shouldOpenAthletePopup = true;
    console.log(athleteName)
  }
}
