import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { HttpService } from './services/http.service';
import { Person } from './models/Person';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'starwar-project';
  public data: any[] = [];
  public randomPersonToShow = [];
  public personDetail;
  public homeWorld;
  public isNullOrUndefined = isNullOrUndefined;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.getAllPersons().subscribe((data) => {
      this.data = data.results as Person[];
      this.getRandomPerson();
    });
  }

  public getRandomPerson() {
    if (this.data.length > 0) {
      do {
        const randomCharacter = this.data[
          Math.floor(Math.random() * this.data.length)
        ];
        if (!this.randomPersonToShow.includes(randomCharacter)) {
          this.randomPersonToShow.push(randomCharacter);
        }
      } while (this.randomPersonToShow.length < 3);
      return this.randomPersonToShow;
    }
  }

  public goToDetail(url: string) {
    this.httpService.getPerson(url).subscribe((data) => {
      this.personDetail = data;
      this.httpService
        .getHomeworld(this.personDetail.homeworld)
        .subscribe((data) => {
          this.homeWorld = data;
        });
    });
  }
}
