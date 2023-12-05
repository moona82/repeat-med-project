import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IDoctors, IOrders, IPatients, IRooms, IVisits} from "../../interfaces";

@Component({
  selector: 'app-add-visit',
  templateUrl: './add-visit.component.html',
  styleUrls: ['./add-visit.component.css']
})
export class AddVisitComponent implements OnInit {
  editMode = false;
  addVisitsForm: FormGroup = this._formBuilder.group({
    id:['',Validators.required],
    visit_date:['',Validators.required],
    patient_id:['',Validators.required],
    doctor_id:['',Validators.required],
    room_id:['',Validators.required],
    order_id:['',Validators.required],
  })

  visits:IVisits[]=[];
  doctors:IDoctors[]=[];
  patients:IPatients[]=[];
  rooms:IRooms[]=[];
  orders:IOrders[]=[];

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef : MatDialogRef<AddVisitComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any
  ) {
    if (data.visits){
      this.addVisitsForm.patchValue(data.visits);
      this.editMode=true;
    }
    this.rooms=data.rooms;
    this.orders=data.orders;
    this.patients=data.patients;
    this.doctors=data.doctors

  }

  ngOnInit(): void {
  }

  addVisit() {
      if (this.addVisitsForm.valid){
       let data= this.addVisitsForm.getRawValue();
        this._dialogRef.close(data);
      }
  }

  closePopup() {

    this._dialogRef.close();
  }
}
