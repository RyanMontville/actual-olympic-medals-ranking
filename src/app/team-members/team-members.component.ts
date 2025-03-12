import { Component, Input, output } from '@angular/core';
import { Medal } from '../country-medals/medal.model';
import { CsvService } from '../csv.service';

@Component({
  selector: 'app-team-members',
  standalone: true,
  imports: [],
  templateUrl: './team-members.component.html',
  styleUrl: './team-members.component.css'
})
export class TeamMembersComponent {
  @Input() details: Medal = new Medal("","","","","","",0,"","",0);
  closePopup = output<boolean>();
  loading: boolean = true;
  teamMembers: string[] = [];

  constructor(private csvService: CsvService) {}
}
