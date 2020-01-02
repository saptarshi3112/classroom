import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  map
} from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  private url: string = "http://localhost:5000";

  constructor(private _http: HttpClient, private auth: AuthService) { }

  createNewClassRoom (name: string, subject: string, logo: string) {
    const userId = this.auth.getUserIdFromToken();
    return this._http.post(`${this.url}/classroom/createNewClassRoom`, {
      name: name,
      subject: subject,
      creatorID: userId,
      logo: logo
    })
      .pipe(map(res => res));
  }

  joinNewClassRoom (classCode: string) {
    const userId = this.auth.getUserIdFromToken();
    return this._http.post(`${this.url}/classroom/joinNewClassroom`, {
      classCode: classCode,
      userId: userId
    })
      .pipe(map(res => res));
  }

  getClassRoomDetailsFormId (classId: string) {
    return this._http.get(`${this.url}/classroom/getClassRoomDetails/${classId}`)
      .pipe(map(res => res));
  }

}
