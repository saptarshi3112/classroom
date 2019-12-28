import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  Teacher = "Teacher";
  Student = "Student";
  role = null;

  constructor() { }

  ngOnInit() {
  }

  registerButtonClick (): void {
    console.log(this.role);
  }

}
