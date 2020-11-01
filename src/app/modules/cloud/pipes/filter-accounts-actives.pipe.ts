import { Pipe, PipeTransform } from '@angular/core';
import { Account } from '../interfaces/account';

@Pipe({
  name: 'filterAccountsActives'
})
export class FilterAccountsActivesPipe implements PipeTransform {

  transform( accounts: Account[] ){ return accounts.filter(account => account.active); /*return account.active === true ;*/ }


}
