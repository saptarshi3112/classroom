import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userModel: Object;

  createdRooms = [];
  joinedRooms = [];

  constructor(private _auth: AuthService) {
    this._auth.userUpdate.subscribe((value) => {
      this.userModel = value.user;
      this.createdRooms = value.user.createdRooms;
      this.joinedRooms = value.user.joinedRooms;
    });
  }

  ngOnInit() {
    this.userModel = this._auth.getUserDetailsFromToken();
    this._auth.getUserDetailsFromTokenServer()
      .subscribe((res: any) => {
        console.log(res);
        this.userModel = res.user;
        this.createdRooms = res.user.createdRooms;
        this.joinedRooms = res.user.joinedRooms;
      });
  }

}
