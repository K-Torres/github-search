import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profilesData: any;
  selectedProfile: any;

  constructor(private _http: HttpService, private router: Router) {}

  ngOnInit(): void {
    this.profilesData = history.state;

    this.profilesData.data.forEach((element: any) => {
      if (element.id == this.profilesData.id) {
        this._http.getProfileData(element.url).subscribe((data: any) => {
          this.selectedProfile = data;
          console.log(this.selectedProfile);
        });
      }
    });
  }
}
