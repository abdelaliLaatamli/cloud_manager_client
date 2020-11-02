import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponseGeneratorService {

  constructor() { }


  generateInstalationResponse() : any {

    let responses = [
      { code : 200 , message : "installation has been lanched" } ,
      { code : 300 , message : " ssh error " }
    ];

    return responses[0]

  }

}
