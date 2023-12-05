import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDoctors, IMedications, IMedsByNameList, IOrders, IOrdersList, IPatients, IRooms, IVisits} from "../interfaces";
import {MatDialog} from "@angular/material/dialog";
import {AddOrderComponent} from "./add-order/add-order.component";
import {ProcessingServices} from "../processing-services";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders:IOrders[]=[];
  ordersReport:IOrdersList[]=[];
  medsReport:IMedications[]=[];
  medsByNameReport:number=0;
  @Output() changedOrders: EventEmitter<IOrders[]> = new EventEmitter<IOrders[]>();
  @Input() patients:IPatients[]=[];
  @Input() doctors:IDoctors[]=[];
  @Input() rooms:IRooms[]=[];
  @Input() visits:IVisits[]=[];


  constructor(
    private _dialog:MatDialog,
    private _services : ProcessingServices
  ) { }


  ngOnInit(): void {
    this.loadButton();
  }

  openAddOrderPopup() {
    const dialog = this._dialog.open(AddOrderComponent,{
      data:{
        patients:this.patients,
        rooms:this.rooms,
        visits:this.visits,
        doctors:this.doctors
      }
    });

    dialog.afterClosed().subscribe(data=>{
      if (data){
        this.orders.push(data);
        this.changedOrders.emit(this.orders);
        this.saveButton();
      }

    });
  }

  updateOrder(i: number) {
    const dialog = this._dialog.open(AddOrderComponent,{
      data:{
        orders:this.orders[i],
        patients:this.patients,
        rooms:this.rooms,
        visits:this.visits,
        doctors:this.doctors
      }
    })
    dialog.afterClosed().subscribe(data=>{
      if (data){
        this.orders[i]=data;
        this.changedOrders.emit(this.orders);
        this.saveButton();
      }
    })

  }

  deleteOrder(i: number) {
    this.orders.splice(i,1);
    this.changedOrders.emit(this.orders);
    this.saveButton();
  }

  saveButton(){
    let ordersInput = this.orders;
    let ordersJson = JSON.stringify(ordersInput);
    localStorage.setItem('orders',ordersJson);

  }

  loadButton(){
    let ordersLocal = localStorage.getItem('orders');
    let convertedOrders = JSON.parse(ordersLocal + '');
    if (convertedOrders){
      this.orders=convertedOrders;
      this.changedOrders.emit(this.orders);
    }


  }

  patientIdMapper(patient_id: number) : string|undefined{
    return this.patients.find((row)=>row.id == patient_id)?.name;
  }

  doctorIdMApper(doctor_id: number) {
    return this.doctors.find((row)=>row.id == doctor_id)?.name;
  }

  roomIdMapper(room_id: number) {
    return this.rooms.find((row)=> row.id == room_id)?.r_number;
  }

  visitIdMapper(visit_id: number) {
    return this.visits.find((row)=>row.id == visit_id)?.visit_date;
  }


  createOrdersReport() {
    this.ordersReport = this._services.createOrdersList(this.orders);
  }

  createMedsReport() {
    // this is my output = this is my service and this is the service function (this is my input data i take it to make the new report )
    this.medsReport = this._services.createAllMedsList(this.orders, this.patients, this.doctors);
  }

  createMedsByNameReport() {
    this.medsByNameReport = this._services.createMedsListByName(this.medsReport);
  }
}
