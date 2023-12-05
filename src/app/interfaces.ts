
export interface IPatients{
  id?:number;
  name:string;
  gender:string;
  national_id:number;
  birth_date:Date;
}

export interface IOrders{
  id?:number;
  patient_id:number;
  name:string;
  type:string;
  doctor_id:number;
  room_id:number;
  visit_id:number;

}

export interface IDoctors{
  id?:number;
  name:string;
  room_id:number;
}

export interface IVisits{
  id?:number;
  visit_date:string;
  patient_id:number;
  doctor_id:number;
  room_id:number;
  order_id:number;
}

export interface IRooms{
  id?:number;
  r_number:string;
  r_date:Date;
  r_from:string;
  r_to:string;
  doctor_id:number;

}


export interface IMedications{
  patient_id:number;
  doctor_id:number;
  med_name:string;
  patient_name?:string;
  doctor_name?:string;
}


export interface IMedsByNameList{
  med_name:string;
  count:number;
}

export interface IPatientsList{
  patient_name: string;
}

export interface IOrdersList{
  order_name:string;
  order_type:string;
}
