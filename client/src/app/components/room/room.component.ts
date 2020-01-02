import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute                  
} from '@angular/router';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  classRoomModel: Object;

  constructor(private activatedRouter: ActivatedRoute, private classRoom: ClassroomService) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      this.classRoom.getClassRoomDetailsFormId(params['id'])
        .subscribe((res: any) => {
          console.log(res.classroom);
          this.classRoomModel = res.classroom;
        });
    });
  }

}
