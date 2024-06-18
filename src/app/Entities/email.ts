export class Email {
  private id: any;
  private result: any;
  private sender: any;
  private receiver: any;
  private fes: any;
  private date: any;
  private couloir: any;
  private couloirID: any;
  private ipadress: any;

  constructor(id: any, result: any, sender: any, receiver: any, fes: any, date: any, couloir: any, couloirID: any, ipadress: any) {
      this.id = id;
      this.result = result;
      this.sender = sender;
      this.receiver = receiver;
      this.fes = fes;
      this.date = date;
      this.couloir = couloir;
      this.couloirID = couloirID;
      this.ipadress = ipadress;



  }
  getResult(): any {
    return this.result;
}
}
