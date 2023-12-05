import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDoctors, IOrders, IPatients, IRooms, IVisits} from "../interfaces";
import {MatDialog} from "@angular/material/dialog";
import {AddVisitComponent} from "./add-visit/add-visit.component";

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {
  editMode = false;
  visits:IVisits[]=[];
  @Output() changedVisits : EventEmitter<IVisits[]> = new EventEmitter<IVisits[]>();
  @Input() doctors:IDoctors[]=[];
  @Input() rooms:IRooms[]=[];
  @Input() patients:IPatients[]=[];
  @Input() orders:IOrders[]=[];

  constructor(
    private  _dialog :MatDialog
  ) { }

  ngOnInit(): void {
    this.loadButton();
  }

  openAddVisitPopup() {
    let dialog = this._dialog.open(AddVisitComponent, {
      data:{
        patients:this.patients,
        orders:this.orders,
        rooms:this.rooms,
        doctors:this.doctors

      }
    });
    dialog.afterClosed().subscribe(data=>{
      if (data){
        this.visits.push(data);
        this.changedVisits.emit(this.visits);
        this.saveButton();
      }
    })
  }

  updateVisit(i: number) {
    let dialog = this._dialog.open(AddVisitComponent, {
      data: {
        visits:this.visits[i],
        patients:this.patients,
        orders:this.orders,
        rooms:this.rooms,
        doctors:this.doctors
      }
    })
    dialog.afterClosed().subscribe(data=>{
      if (data){
        this.visits[i]=data;
        this.changedVisits.emit(this.visits);
        this.saveButton();
      }
    })
  }

  deleteVisit(i: number) {
    this.visits.splice(i,1);
    this.changedVisits.emit(this.visits);
    this.saveButton();
  }

  saveButton(){
    let visitsInput = this.visits;
    let visitsJson = JSON.stringify(visitsInput);
    localStorage.setItem('visits', visitsJson);
  }


  loadButton(){
    let visitsLocal = localStorage.getItem('visits');
    let visitsConverted = JSON.parse(visitsLocal + '');
    if (visitsConverted){
      this.visits = visitsConverted;
      this.changedVisits.emit(this.visits);
    }
  }

  patientIdMapper(patient_id: number) {
    return this.patients.find((row)=>row.id == patient_id)?.name;
  }

  doctorIdMapper(doctor_id: number) {
    return this.doctors.find((row)=>row.id == doctor_id)?.name;
  }

  roomIdMapper(room_id: number) {
    return this.rooms.find((row)=>row.id == room_id)?.r_number;
  }

  orderIdMapper(order_id: number) {
    return this.orders.find((row)=>row.id == order_id)?.name;
  }
}
