import {Injectable} from "@angular/core";
import {IDoctors, IMedications, IMedsByNameList, IOrders, IOrdersList, IPatients, IPatientsList} from "./interfaces";

@Injectable(
  {providedIn : "root" }
)

export class ProcessingServices {

  constructor() {
  }

  createPatientsListReport(patients:IPatients[]): IPatientsList[]{
    let patientsReport = []
    for (let patient of patients){
       patientsReport.push({patient_name:patient.name});
    }
  return patientsReport;
  }

  createPatientsCount(patientsCount:IPatientsList[]):number{
    let patientsCountReport = 0;
      for(let i=0; i < patientsCount.length; i ++){
        patientsCountReport ++;
      }
      return patientsCountReport;
  }


  createOrdersList(orders:IOrders[]): IOrdersList[]{
    let ordersReport = [];

    for (let order of orders){
      ordersReport.push({order_name:order.name,order_type:order.type});
    }
    return ordersReport;
  }


  createAllMedsList(orders:IOrders[], patients: IPatients[], doctors: IDoctors[]):IMedications[]{
    let medsReport = [];

    for (let order of orders) {

      medsReport.push({
        patient_id: order.patient_id,
        doctor_id: order.doctor_id,

        med_name: order.name,

        patient_name: patients.find(row => row.id == order.patient_id)?.name,
        doctor_name: doctors.find(row => row.id == order.doctor_id)?.name,
      });
    }

    return medsReport;
  }
//
//  tried to call patients[] to switch patient_id in meds report with patient name
//   let medsReport = [];
//   for(let patient of patients){
//   medsReport.push({patient_id:patient.name})
// }
// for (let order of orders){
//   let i = medsReport.findIndex((row)=>row.patient_id === order.patient_id)
//   medsReport.push({i,doctor_id:order.doctor_id,med_name:order.name});
// }
// return medsReport;


  // createMedsListByName(meds:IMedications[]):IMedsByNameList[]{
  //
  //   let medsByNameReport =[
  //     {
  //       med_name:'med',count:0
  //     }
  //
  //   ];
  //   for (let med of meds){
  //     if (med.med_name === 'med'){
  //       medsByNameReport[0].count++;
  //     }
  //
  //   }
  //   return medsByNameReport;
  // }

  createMedsListByName(meds:IMedications[]):number{

    let count = 0;

    for (let med of meds){
      if (med.med_name === 'med'){
        count++;
      }

    }
    return count;
  }
}
