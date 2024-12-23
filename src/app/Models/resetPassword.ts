export class resetPassword{
    phone :string;
    otp_code: string;
    password:string
  
    constructor(
      phone:string,otp_code:string,password:string
      )
      {
        this.phone=phone;
        this.otp_code=otp_code;
        this.password=password;
      }
}