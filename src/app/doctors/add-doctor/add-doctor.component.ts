import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IDoctors, IRooms} from "../../interfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
 doctors:IDoctors[]=[];
 rooms:IRooms[]=[];
  addDoctorForm: FormGroup = this._formBuilder.group({
    id:[''],
    name:['', Validators.required],
    room_id:['', Validators.required],
  })

  editMode = false;
  constructor(
    private _formBuilder : FormBuilder,
    private _dialogRef: MatDialogRef<AddDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any
  ) {
    if (data.doctors){
      this.addDoctorForm.patchValue(data.doctors);
       this.editMode=true;
    }

    this.rooms = data.rooms
  }

  ngOnInit(): void {
  }

  addDoctorButton() {
  if (this.addDoctorForm.valid){
    let data = this.addDoctorForm.getRawValue();
    this._dialogRef.close(data);
  }

  }

  closePopup() {

    this._dialogRef.close();
  }
}
