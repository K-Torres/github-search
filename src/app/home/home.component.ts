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
  profiles: any[] = [];
  loadedProfiles: any[] = [];
  chartInfo: any;
  inputText: any;

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
    if (this.inputText.length > 4 && this.inputText != 'doublevpartners') {
      this._http.getApiData(this.inputText).subscribe((data: any) => {
        this.profiles = data['items'];
        this.loadedProfiles = [];
        this.profiles.forEach((profile: any, index: number) => {
          this._http.getProfileData(profile.url).subscribe((data: any) => {
            this.loadedProfiles.push({
              name: data.login,
              follow: data.followers,
            });
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
    }
  }

  navigate(profileId: number) {
    this.router.navigate(['Profile'], {
      state: { data: this.profiles, id: profileId },
    });
  }
}
