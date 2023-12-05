import {Component, OnInit} from '@angular/core';
import {IDoctors, IOrders, IPatients, IRooms, IVisits} from "./interfaces";
import {DataService} from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'repeat-med-project';
  patients:IPatients[]=[];
  orders:IOrders[]=[];
  doctors:IDoctors[]=[];
  rooms:IRooms[]=[];
  visits:IVisits[]=[];


  constructor(private _dataService: DataService) {
  }

  ngOnInit(): void {
    this._dataService.patients$.subscribe((data) => this.patients = data);
  }


  onChangedOrders($event: IOrders[]) {
    this.orders = $event;
  }

  onChangedDoctors($event: IDoctors[]) {
    this.doctors= $event;
  }

  onChangedRooms($event: IRooms[]) {
    this.rooms = $event;
  }


  onChangedVisits($event: IVisits[]) {
    this.visits = $event;
  }


}
