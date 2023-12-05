import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrdersComponent } from './orders/orders.component';
import { VisitsComponent } from './visits/visits.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patients/patients.component';
import { RoomsComponent } from './rooms/rooms.component';
import { AddDoctorComponent } from './doctors/add-doctor/add-doctor.component';
import { AddOrderComponent } from './orders/add-order/add-order.component';
import { AddPatientComponent } from './patients/add-patient/add-patient.component';
import { AddRoomComponent } from './rooms/add-room/add-room.component';
import { AddVisitComponent } from './visits/add-visit/add-visit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    VisitsComponent,
    DoctorsComponent,
    PatientsComponent,
    RoomsComponent,
    AddDoctorComponent,
    AddOrderComponent,
    AddPatientComponent,
    AddRoomComponent,
    AddVisitComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
