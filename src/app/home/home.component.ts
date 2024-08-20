import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CsvService } from '../csv.service';
import { CountryTotals } from '../countryTotal.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private csvService: CsvService) {}
  countryTotals: CountryTotals[] = [];

  ngOnInit(): void {
    this.csvService.getActualTotals().subscribe(data => {
      const list = data.split('\n');
      list.forEach(line => {
        let cols = line.split(',');
        let total = new CountryTotals(cols[0], cols[1], +cols[2], +cols[3], +cols[4], +cols[5], +cols[6], +cols[7]);
        if (total.countryCode.length > 0) {
          this.countryTotals.push(total);
        }
      });
    });
  }

}
