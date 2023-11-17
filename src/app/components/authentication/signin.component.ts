import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User, jwtUser } from 'src/app/types';

@Component({
  selector: 'app-signin',
  template: `
    <div class="max-w-screen-xl items-center justify-between mx-auto">
      <!-- max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 -->
      <form [formGroup]="formSignin" (ngSubmit)="signinUser()">
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your email</label
          >
          <input
            type="email"
            id="email"            
            formControlName="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your password</label
          >
          <input
            type="password"
            id="password"
            formControlName="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <!-- <div class="flex items-start mb-6">
          <div class="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            for="remember"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Remember me</label>
        </div> -->
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  `,
  styles: [],
})
export class SigninComponent {
  #authService = inject(AuthenticationService);
  #router = inject(Router);

  formSignin = inject(FormBuilder).group({
    email: 'avanvu@miu.edu',
    password: '123',
  });

  signinUser() {
    this.#authService.signin(this.formSignin.value as User).subscribe(
      (data: any) => { 
        const jwtToken = jwtDecode(data.data) as jwtUser;
        
        const state = {
          ...jwtToken, jwt: data.data           
        };
        this.#authService.state_signal.set(state);
        localStorage.setItem('StateMedicalReview', JSON.stringify(state))
        //
        this.#router.navigate(['', 'medicals']);
      },
      (error) => {
        alert(error.error.data);
      }
    );
  }
}
