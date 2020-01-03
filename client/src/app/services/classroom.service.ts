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

  createNewAssignment(name, description, classRoom, assignmentName, data, user) {
    return this._http.post(`${this.url}/assignment/createNewAssignment`, {
      name: name,
      description: description,
      classRoom: classRoom,
      assignmentName: assignmentName,
      data: data,
      user: user,
    })
    .pipe(map(res => res));
  }

  getAllAssignmentsByRoom(id) {
    return this._http.get(`${this.url}/assignment/getAssigmentByRoom/${id}`)
      .pipe(map(res => res));
  }

  createNewQuiz(name, description, classroom) {
    return this._http.post(`${this.url}/quiz/addNewQuiz`, {
      name: name,
      description: description,
      classroom: classroom
    })
      .pipe(map(res => res));
  }

  getQuizByRoom(id) {
    return this._http.get(`${this.url}/quiz/getQuizzesByClassRoom/${id}`)
      .pipe(map(res => res));
  }

  submitQuizSolution(id, data, classroom, user) {
    return this._http.post(`${this.url}/quiz/submitQuizSolution`, {
      quiz: id,
      data: data,
      classroom: classroom,
      user: user
    })
      .pipe(map(res => res));
  }

}
