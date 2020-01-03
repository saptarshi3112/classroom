import { Component, OnInit, OnChanges } from '@angular/core';
import {
  ActivatedRoute                  
} from '@angular/router';

import { 
	ClassroomService 
} from 'src/app/services/classroom.service';
import {
	AuthService
} from 'src/app/services/auth.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnChanges {

  classRoomModel: any;
  userModel: any;

  assignmentName: string;
  uploadedFiles: any;
  assignmentErrorMessage: string;
  description: string;

  quizName: string;
  quizDescription: string;
  quizMessage: string;
  quizSolutionFile: any;

  assignments = [];
  quizzes = [];

  constructor(private auth: AuthService, 
    private activatedRouter: ActivatedRoute, 
    private classRoom: ClassroomService) { }

  ngOnInit() {
    this.auth.getUserDetailsFromTokenServer()
      .subscribe((res: any) => {
        this.userModel = res.user;
      });

    this.activatedRouter.params.subscribe(params => {
      this.classRoom.getClassRoomDetailsFormId(params['id'])
        .subscribe((res: any) => {
          this.classRoomModel = res.classroom;

          this.classRoom.getAllAssignmentsByRoom(this.classRoomModel._id)
          .subscribe((res: any) => {
            this.assignments = res;
          });

          this.classRoom.getQuizByRoom(this.classRoomModel._id)
            .subscribe((res: any) => {
              this.quizzes = res;
            });
        });
    });

  }

  ngOnChanges() {
    this.classRoom.getAllAssignmentsByRoom(this.classRoomModel._id)
    .subscribe((res: any) => {
      this.assignments = res;
    });
  }

  fileChange(element) {
    this.uploadedFiles = element.target.files[0];
  }

  quizFileChange(element) {
    this.quizSolutionFile = element.target.files[0];
  }

  createNewAssignment() {
    if (this.uploadedFiles) {
      let fileReader = new FileReader();
      fileReader.readAsText(this.uploadedFiles);
      fileReader.onload = (e) => {
        if (this.assignmentName && this.description) {
          
          this.classRoom.createNewAssignment(
            this.assignmentName,
            this.description,
            this.classRoomModel._id, 
            this.assignmentName, 
            fileReader.result, 
            this.userModel._id)
            .subscribe(res => {
              if (res === 'DONE') {
                this.assignmentErrorMessage = "Assignment Created";

                this.classRoom.getAllAssignmentsByRoom(this.classRoomModel._id)
                  .subscribe((res: any) => {
                    this.assignments = res;
                }); 

              } else {
                this.assignmentErrorMessage = "Assignment already exists";
              }
            });

        } else {
          this.assignmentErrorMessage = "Missing Credentials";
        }
      }
    } else {
      this.assignmentErrorMessage = "Missing Credentials";
    }
  }

  createNewQuiz() {
    if (this.quizDescription && this.quizName) {
      this.classRoom.createNewQuiz(this.quizName, this.quizDescription, this.classRoomModel._id)  
        .subscribe(res => {

          if (res === "QuizCreated") {
            this.quizMessage = "Quiz Created";
            this.classRoom.getQuizByRoom(this.classRoomModel._id)
            .subscribe((res: any) => {
              this.quizzes = res;
            });
          } else if (res === "Already Exists" || res === "QUIZEXISTS") {
            this.quizMessage = "Quiz Already Exists";
          }

        });
    } else {
      this.quizMessage = "Missing Credentials";
    }
  }

  submitQuizSolution(quizID) {
    console.log(quizID);
    if (this.quizSolutionFile) {
      let fileReader = new FileReader();
      fileReader.readAsText(this.quizSolutionFile);
      fileReader.onload = (e) => {
        this.classRoom.submitQuizSolution(quizID, fileReader.result, this.classRoomModel._id, this.userModel._id)
          .subscribe(res => {
            console.log(res);
            location.reload();
          });
      }
    }
  }
}
