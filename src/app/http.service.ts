import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getApiData(consult: string) {
    return this.http.get(
      `https://api.github.com/search/users?q=${consult}&per_page=10`
    );
  }

  getProfileData(consult: string) {
    return this.http.get(consult);
  }
}
