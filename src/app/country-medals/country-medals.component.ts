import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CsvService } from '../csv.service';
import { Medal } from './medal.model';

@Component({
  selector: 'app-country-medals',
  standalone: true,
  imports: [],
  templateUrl: './country-medals.component.html',
  styleUrl: './country-medals.component.css'
})
export class CountryMedalsComponent implements OnInit, OnDestroy{
  @Input() country: string = "";
  medalsForCountry: Medal[] = [];
  constructor(private csvService: CsvService) {}
  
  ngOnInit(): void {
    this.csvService.getAllMedals().subscribe(data =>{
      const list = data.split('\n');
      list.forEach(line =>{
        let cols = line.split(",");
        let medalEmoji = cols[5].replace("1", "🥇").replace("2", "🥈").replace("3", "🥉")
        let medal = new Medal(cols[0], cols[1], cols[2], cols[3], cols[4], medalEmoji, cols[6]);
        if (medal.country === this.country) {
          this.medalsForCountry.push(medal);
        }
      });
    });
  }
  ngOnDestroy(): void {
    this.medalsForCountry = [];
  }

}
