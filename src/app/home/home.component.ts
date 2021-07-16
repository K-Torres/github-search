import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  errorMessage: String = '';
  //search bar input
  inputText: any;
  //Used to get and manipulate fetched data
  profiles: any[] = [];
  loadedProfiles: any[] = [];
  //Chart info declare empty so then i can pass it the fetched data
  chartInfo: any;
  barChartData: ChartDataSets[] = [{ data: [], label: 'Followers chart' }];
  barChartLabels: Label[] = [];
  barChartOptions = {
    responsive: true,
  };
  barChartLegend = true;
  barChartPlugins = [];
  barChartType: ChartType = 'bar';

  constructor(private _http: HttpService, private router: Router) {}

  searchProfiles() {
    if (this.inputText.length > 3 && this.inputText != 'doublevpartners') {
      //if the search is correct, then there isn't error message'
      this.errorMessage = '';
      this._http.getApiData(this.inputText).subscribe((data: any) => {
        this.profiles = data['items'];
        this.loadedProfiles = [];
        // we´re going to get the followers from for each profile loaded from the search
        this.profiles.forEach((profile: any, index: number) => {
          this._http.getProfileData(profile.url).subscribe((data: any) => {
            this.loadedProfiles.push({
              name: data.login,
              follow: data.followers,
            });
            // if the array "loadedProfiles" contains the same lenght as profiles we´re going to set that data to the chart
            if (this.loadedProfiles.length == this.profiles.length) {
              let followers = this.loadedProfiles.map(
                (profileData, index) => this.loadedProfiles[index].follow
              );
              let names = this.loadedProfiles.map(
                (profileData, index) => this.loadedProfiles[index].name
              );
              this.barChartData = [
                { data: followers, label: 'Followers chart' },
              ];
              this.barChartLabels = names;
            }
          });
        });
      });
    } else if (this.inputText.length < 4) {
      this.errorMessage =
        'El texto de la búsqueda debe contener un mínimo de 4 caracteres.';
    } else {
      this.errorMessage = 'La búsqueda “doublevpartners” no está permitida.';
    }
  }

  navigate(profileId: number) {
    this.router.navigate(['Profile'], {
      state: { data: this.profiles, id: profileId },
    });
  }
}
