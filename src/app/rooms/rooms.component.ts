import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {IDoctors, IRooms} from "../interfaces";
import {AddRoomComponent} from "./add-room/add-room.component";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms:IRooms[]=[];
  @Output() changedRooms : EventEmitter<IRooms[]> = new EventEmitter<IRooms[]>();
  @Input() doctors:IDoctors[]=[];

  constructor(
    private _dialog : MatDialog
  ) { }

  ngOnInit(): void {
    this.loadButton();
  }

  openAddRoomPopup() {
    let dialog = this._dialog.open(AddRoomComponent,{
      data:{
        doctors:this.doctors
      }
    });
    dialog.afterClosed().subscribe(data=>{
      if (data){
        this.rooms.push(data);
        this.changedRooms.emit(this.rooms);
        this.saveButton();
      }
    })
  }

  updateRoom(i: number) {
    let dialog = this._dialog.open(AddRoomComponent, {
      data : {
        rooms:this.rooms[i],
        doctors:this.doctors
      },

    });
    dialog.afterClosed().subscribe(data=>{
      if (data){
        this.rooms[i]=data;
        this.changedRooms.emit(this.rooms);
        this.saveButton();
      }
    })
  }

  deleteRoom(i: number) {
    this.rooms.splice(i,1);
    this.changedRooms.emit(this.rooms);
    this.saveButton();
  }

  saveButton(){
    let roomsInput = this.rooms;
    let roomsJson = JSON.stringify(roomsInput);
    localStorage.setItem('rooms',roomsJson);
  }

  loadButton(){
    let roomsLocal = localStorage.getItem('rooms');
    let roomsConverted = JSON.parse(roomsLocal +'');
    if (roomsConverted){
      this.rooms = roomsConverted;
      this.changedRooms.emit(this.rooms);
    }
  }

  doctorIdMapper(doctor_id: number): string| undefined {
    return this.doctors.find((row)=> row.id == doctor_id)?.name;
  }
}
