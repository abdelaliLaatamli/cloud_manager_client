export interface Account {

  id: number;
  name: string;
  accountType: number;
  proxy?: string;
  active: boolean ;
  users?:any[]
  // systemId: number

}
