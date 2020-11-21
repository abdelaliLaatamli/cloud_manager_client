import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {


  transform( value: any[] , accountUsers : any[] ): any[] {

    const accountsIds = accountUsers.map( e => e.id )
    const newUsers = ( value ) ? value.filter( e => !accountsIds.includes(e.id) ) : [];
    return newUsers;

  }

}
