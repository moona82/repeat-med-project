import {Component, Inject, OnInit} from '@angular/core';
import {IPatients} from "../../interfaces";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  patients:IPatients[]=[];

  addPatientsForm: FormGroup = this._formBuilder.group({
    id:['',Validators.required],
    name:['',Validators.required],
    gender:['',Validators.required],
    national_id:['',Validators.required],
    birth_date:['',Validators.required],
  });
  editMode =false;

  constructor(
    private _formBuilder:FormBuilder,
    private _dialogRef:MatDialogRef<AddPatientComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any
  ) {
    if (data){
      this.addPatientsForm.patchValue(data);
      this.editMode=true;
    }
  }

  ngOnInit(): void {
  }

  addPatientButton() {

    if (this.addPatientsForm.valid){
      let data = this.addPatientsForm.getRawValue();
      this._dialogRef.close(data);
    }

  }

  closePopup() {

    this._dialogRef.close();
  }
}
