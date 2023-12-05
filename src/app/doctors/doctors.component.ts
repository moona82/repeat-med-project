import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddDoctorComponent} from "./add-doctor/add-doctor.component";
import {IDoctors, IRooms} from "../interfaces";

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  doctors:IDoctors[]=[];
  @Output() changedDoctor : EventEmitter<IDoctors[]> = new EventEmitter<IDoctors[]>();
  @Input() rooms:IRooms[]=[];

  constructor(
    private _dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.loadButton();
  }

  openAddPopup() {
    let dialog = this._dialog.open(AddDoctorComponent, {
      data: {
        rooms:this.rooms,
      }
    });
    dialog.afterClosed().subscribe(data=>{
      if (data){
        this.doctors.push(data);
        this.changedDoctor.emit(this.doctors);
        this.saveButton();
      }
    })
  }

  updateDoctor(i: number) {

    let dialog = this._dialog.open(AddDoctorComponent,{
      data:{
        doctors:this.doctors[i],
        rooms:this.rooms
      }
    });
    dialog.afterClosed().subscribe(data=>{
      this.doctors[i]=data;
      this.changedDoctor.emit(this.doctors);
      this.saveButton();
    })
  }

  deleteDoctor(i: any) {
    this.doctors.splice(i,1);
    this.changedDoctor.emit(this.doctors);
    this.saveButton();
  }

  saveButton(){
    let doctorsInput = this.doctors;
    let doctorsJson = JSON.stringify(doctorsInput);
    localStorage.setItem('doctors', doctorsJson);
  }

  loadButton(){
    let localDoctors = localStorage.getItem('doctors');
    let convertedDoctors = JSON.parse(localDoctors +'');
    if (convertedDoctors){
      this.doctors = convertedDoctors;
      this.changedDoctor.emit(this.doctors);
    }
  }

  roomIdMapper(room_id: number){
    return this.rooms.find((row)=> row.id == room_id)?.r_number;
  }
}
