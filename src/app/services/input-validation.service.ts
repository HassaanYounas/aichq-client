import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputValidationService {

    constructor() { }

    isAlphabetsAndNumbersOnly(str: String): Boolean {
        const regex = /^[a-zA-Z0-9]*$/;
        return str.match(regex) ? true : false;
    }

    isAlphabetsOnly(str: String): Boolean {
        const regex = /^[A-Za-z\s]+$/;
        return str.match(regex) ? true : false;
    }

    isNumbersOnly(str: String): Boolean {
        const regex = /^[0-9]*$/;
        return str.match(regex) ? true : false;
    }
    
    isEmail(email: String): Boolean {
        const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        return email.match(regex) ? true : false;
    }

    isPhoneNumber(str: String): Boolean {
        const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
        return str.match(regex) ? true : false;
    }

  // isProgram(str: String): Boolean {
  //   if (str.length === 4) {
  //     if (str[0] === 'B' && str[1] === 'S')
  //       if (this.isAlphabetsOnly(str[2]) && this.isAlphabetsOnly(str[3])) return true;
  //   } return false;
  // }
}