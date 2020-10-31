import { Account } from './account';

export interface Provider {
  id: number;
  name: string;
  providerKeysType: string;
  accounts: [Account];
  entities: [any];
}
