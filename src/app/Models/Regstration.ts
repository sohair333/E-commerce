export class Regstration{
    first_name :string;
    last_name: string;
    phone :string;
    password: string;
  
    constructor(
      phone:string,password:string,first_name :string,last_name :string
      )
      {
        this.first_name=first_name;
        this.last_name=last_name;
        this.phone=phone;
        this.password=password;
      }
  }