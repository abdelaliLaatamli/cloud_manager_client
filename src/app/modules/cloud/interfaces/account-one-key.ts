import { Account } from './account';

export interface AccountOneKey extends Account {
  token: string;
  sshKey?: any;
}
