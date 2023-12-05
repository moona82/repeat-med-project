import {Component, OnInit} from '@angular/core';
import {IPatients, IPatientsList} from "../interfaces";
import {MatDialog} from "@angular/material/dialog";
import {AddPatientComponent} from "./add-patient/add-patient.component";
import {ProcessingServices} from "../processing-services";
import {DataService} from "../data.service";


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patients:IPatients[]=[];

  patientsReport:IPatientsList[]=[];
  patientsCountReport:number=0;
  constructor(
    private _dialog:MatDialog,
    private _services :ProcessingServices,
    private _dataService: DataService,

  ) { }

  ngOnInit(): void {
  this.loadButton();
  }

  openPatientPopup() {
    const dialog =  this._dialog.open(AddPatientComponent);
    dialog.afterClosed().subscribe(data=>{
      if (data){
       this.patients.push(data);
        // this.changedPatients.emit(this.patients);
        this._dataService.updatePatients(this.patients);
        this.saveButton();
      }

    });
  }


  updatePatient(i: number) {
  const dialog = this._dialog.open(AddPatientComponent,{
      data: this.patients[1]
  }
   );

    dialog.afterClosed().subscribe(data=>{
      if (data){
       this.patients[i]=data;
       // this.changedPatients.emit(this.patients);
        this._dataService.updatePatients(this.patients);
       this.saveButton();
      }
    })
  }

  deletePatient(i: number) {
  this.patients.splice(i,1);
  // this.changedPatients.emit(this.patients);
    this._dataService.updatePatients(this.patients);
  this.saveButton();
  }

  saveButton(){
    let patientsInput = this.patients;
    let jsonPatients = JSON.stringify(patientsInput);
     localStorage.setItem('patients', jsonPatients );
  }

  loadButton(){
    let patientsLocal = localStorage.getItem('patients');
    let patientsRetrived = JSON.parse(patientsLocal +'');

      this.patients = patientsRetrived;
      // this.changedPatients.emit(this.patients);
    this._dataService.updatePatients(this.patients);

  }

  createPatientsReport() {
    this.patientsReport = this._services.createPatientsListReport(this.patients);
  }


  createPatienttCount() {
    this.patientsCountReport = this._services.createPatientsCount(this.patientsReport)
  }
}


