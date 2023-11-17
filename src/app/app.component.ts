import { Component, inject } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
  styles: []
})
export class AppComponent {
  
  authService = inject(AuthenticationService); 

  #router = inject(Router);
  
  signup(){ 
    this.#router.navigate(['', 'signup']);
  }
  signin(){    
    this.#router.navigate(['', 'signin']);
  }
  redirectAddMedical(){
    this.#router.navigate(['', 'add-medical']);
  }
  signout(){
    this.authService.state_signal.set({
      _id: '',
      fullname: '',
      email: '',
      jwt: '',
    });
    localStorage.removeItem('StateMedicalReview');
    this.#router.navigate(['', 'signin']);
  }

  medicals(){    
    this.#router.navigate(['', 'medicals']);
  }
  
  

}
