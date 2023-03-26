export interface CustomerRequestBody {
  
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
 
}

export interface BusinessRequestBody {
    email: string;
    password: string;
    confirm_password: string;
    business_name: string;
    
}

export interface Response {
  status: number
  message: string
}

export enum UserType {
  customer = "customer",
  merchant = "merchant"
}

