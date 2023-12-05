import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IDoctors, IOrders, IPatients, IRooms, IVisits} from "../../interfaces";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  addOrdersForm: FormGroup = this._formBuilder.group({
    id:['',Validators.required],
    name:['',Validators.required],
    type:['',Validators.required],
    patient_id:['',Validators.required],
    doctor_id:['',Validators.required],
    room_id:['',Validators.required],
    visit_id:['',Validators.required],
  });

  orders:IOrders[]=[];
  patients:IPatients[]=[];
  doctors:IDoctors[]=[];
  rooms:IRooms[]=[];
  visits:IVisits[]=[];

  editMode = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef:MatDialogRef<AddOrderComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any
  ) {
    if (data.orders){
      this.addOrdersForm.patchValue(data.orders);
      this.editMode = true;
    }
    this.patients=data.patients;
      this.rooms =data.rooms;
      this.visits = data.visits;
      this.doctors=data.doctors;

  }

  ngOnInit(): void {
  }

  addOrderButton() {

    if (this.addOrdersForm.valid){

      let data = this.addOrdersForm.getRawValue();
      this._dialogRef.close(data);
    }
  }

  closePopup() {
  this._dialogRef.close();
  }
}
