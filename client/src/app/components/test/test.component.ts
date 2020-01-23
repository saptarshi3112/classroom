import { Component, OnInit } from '@angular/core';
import {ClassroomService} from "../../services/classroom.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  file1: any;
  file2: any;

  responseMessage: string;

  constructor(private classroom: ClassroomService) { }

  ngOnInit() {
  }

  goBack() {
    window.history.back();
  }

  file1Change(element) {
    this.file1 = element.target.files[0];
  }

  file2Change(element) {
    this.file2 = element.target.files[0];
  }

  testButtonClick() {

    if (this.file1 && this.file2) {
      let fileReader = new FileReader();
      fileReader.readAsText(this.file1);
      fileReader.onload = (e) => {
        var file1 = (fileReader.result);
        let fileReader1 = new FileReader();
        fileReader1.readAsText(this.file2);
        fileReader1.onload = (e) => {
          var file2 = (fileReader1.result);
          this.classroom.testQuizzes(file1, file2)
            .subscribe((res: any) => {
              if (Number.isInteger(res))
              this.responseMessage = res;
            });
        }
      }
    } else {
      this.responseMessage = "Upload both the files to get result";
    }
  }

}
