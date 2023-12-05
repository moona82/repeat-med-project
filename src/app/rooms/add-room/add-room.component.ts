import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IDoctors, IRooms} from "../../interfaces";

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {
  editMode= false;
  addRoomsForm: FormGroup = this._formBuilder.group({
    id:['',Validators.required],
    r_number:['',Validators.required],
    r_date:['',Validators.required],
    r_from:['',Validators.required],
    r_to:['',Validators.required],
    doctor_id:['',Validators.required],
  })
  rooms:IRooms[]=[];
  doctors:IDoctors[]=[];

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef : MatDialogRef<AddRoomComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any
  ) {
    if (data.rooms){
      this.addRoomsForm.patchValue(data.rooms);
      this.editMode=true;
    }
    this.doctors = data.doctors;
  }

  ngOnInit(): void {
  }

  addRoom() {
    if (this.addRoomsForm.valid){
      let data= this.addRoomsForm.getRawValue();
      this._dialogRef.close(data)
    }
  }

  closePopup() {
    this._dialogRef.close();
  }
}
