import {ReplaySubject} from "rxjs";
import {IPatients} from "./interfaces";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DataService{

  //Subject
  //ReplaySubject
  //Behavioural Subjectd

  //1. define the subject to set ?? the shape of the data that we want to change it
  private patientsSubject: ReplaySubject<IPatients[]> = new ReplaySubject<IPatients[]>();

  //2. define a function to change/update the data ( we use it the component that has/own the data)
  public updatePatients(patients:IPatients[]){
    this.patientsSubject.next(patients);//this will push the update to the patients subject
  }

  //3.this to notify every one interseted about the data (use it in other components that need this data)
  public get patients$(){
    return this.patientsSubject.asObservable();//this to pull the update from the subject
  }


}
