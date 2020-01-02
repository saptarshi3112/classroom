import { Component, OnInit, OnChanges } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { ClassroomService } from 'src/app/services/classroom.service';

import {NgxImageCompressService} from 'ngx-image-compress';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {

  constructor(private imageCompress: NgxImageCompressService, private _auth: AuthService, private room: ClassroomService) { }

  isAuthenticated: boolean;
  userModel: Object;

  className: string;
  subject: string;

  roomId: string;

  modalCreateMessage: string;

  imgResultAfterCompress:string;

  ngOnInit() {
    if (this._auth.isAuthenticated()) {
      this.isAuthenticated = true;
      this.userModel = this._auth.getUserDetailsFromToken();
    } else {
      this.isAuthenticated = false;
    }
  }

  ngOnChanges(): void {
    if (this._auth.isAuthenticated()) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  compressFile() {
    this.imageCompress.uploadFile().then(({image, orientation}) => {
      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          this.imgResultAfterCompress = result;
        }
      );
    });
  }

  createClassClick() {
    if (this.className) {
      this.room.createNewClassRoom(this.className, this.subject, this.imgResultAfterCompress)
        .subscribe((result: any) => {
          console.log(result);
          if (result === 'SAVED') {
            this.modalCreateMessage = "Classroom created successfully";
            this._auth.change();
          } else if (result.message === 'ROOMALREADYEXISTS') {
            this.modalCreateMessage = "Room already exists";
          }
        });
    }
  }

  joinRoom() {
    if (this.roomId) {
      this.room.joinNewClassRoom(this.roomId)
        .subscribe(result => {
          console.log(result);
        });
    }
  }

}
