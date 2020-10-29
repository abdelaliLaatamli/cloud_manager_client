import { Account } from './account';

export interface AccountForKeys extends Account {
  accessKey: string ;
  secriteKey: string
  subscription: string
  tenant: string
}
