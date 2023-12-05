import { Component } from '@angular/core';
import {IDoctors, IOrders, IPatients, IRooms, IVisits} from "./interfaces";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'repeat-med-project';
  patients:IPatients[]=[];
  orders:IOrders[]=[];
  doctors:IDoctors[]=[];
  rooms:IRooms[]=[];
  visits:IVisits[]=[];


  onChangedPatients($event: IPatients[]) {
    this.patients= $event;
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
