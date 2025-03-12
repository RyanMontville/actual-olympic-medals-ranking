import { Component, Input, OnInit, output } from '@angular/core';
import { Medal } from '../country-medals/medal.model';
import { CsvService } from '../csv.service';

@Component({
  selector: 'app-team-members',
  standalone: true,
  imports: [],
  templateUrl: './team-members.component.html',
  styleUrl: './team-members.component.css'
})
export class TeamMembersComponent implements OnInit {
  @Input() details: Medal = new Medal("","","","","","",0,"","",0);
  closePopup = output<boolean>();
  loading: boolean = true;
  teamMembers: string[] = [];
  medal: string = "";

  constructor(private csvService: CsvService) {}

  ngOnInit(): void {
    this.csvService.getAllTeamMembers().subscribe(data => {
      const list = data.split('\n');
      list.forEach(line => {
        let cols = line.split(",");
        if (+cols[0]===this.details.teamId) {
          this.teamMembers.push(cols[1]);
        }
      });
      this.loading = false;
    });
    this.medal = this.details.medalCode.replace("1", "🥇").replace("2", "🥈").replace("3", "🥉");
  }

  OnClose() {
    this.details = new Medal("","","","","","",0,"","",0);
    this.closePopup.emit(true);
    this.teamMembers = [];
  }

  getTeamName() {
    let teamNameParts: string[] = this.details.medalistName.split(" ");
    return this.details.country + teamNameParts[0] + this.details.sport + "team";
  }
}
