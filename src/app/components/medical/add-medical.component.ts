import { Component, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MedicationsService } from 'src/app/services/medications.service';
import { Medication, Owner } from 'src/app/types';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-medical',
  template: `
  <div class="page-container">
    <h2 class='page-header'><b>
      Add new medication
    </b></h2> 

    <div class="max-w-screen-xl items-center justify-between mx-auto">
      <form [formGroup]="formAddMedical" (ngSubmit)="addMedical()">
        <div class="mb-6">
          <label
            for="medicalName"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Medical name</label
          >
          <input
            type="string"
            id="medicalName"
            formControlName="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Medical name"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="generic_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Generic Name</label
          >
          <input
            type="string"
            id="generic_name"
            formControlName="generic_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Generic Name"
            required
          />
        </div>

        <div class="mb-6">
          <label
            for="medication_class"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Medication Class</label
          >
          <input
            type="string"
            id="medication_class"
            formControlName="medication_class"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Medication Class"
            required
          />
        </div>

        <div class="mb-6">
        <label
            for="availability"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Medication availability</label
          >

          <button
            id="dropdown"
            style="min-width: 320px;"
            data-dropdown-toggle="dropdownItems"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-300 
            font-medium rounded-lg 
            text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button">
            {{ medication_availability }}           
          </button>

          <!-- Dropdown menu -->
          <div
            id="dropdownItems"
            style="min-width: 320px;"
            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
            style="min-width: 320px;"
              (click)="onMedicationAvailabilitySelect($event)"
              class="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownHoverButton"
            >
              <li>
                <span
            style="min-width: 320px;"
                  value="Prescription"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Prescription</span
                >
              </li>
              <li>
                <span
            style="min-width: 320px;"
                  value="OTC"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >OTC</span
                >
              </li>
            </ul>
          </div>
        </div>

        <!-- <div class="mb-6">
          <label
            for="availability"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Medication availability</label
          >
          <input
            type="string"
            id="availability"
            formControlName="availability"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Medication availability"
            required
          />
        </div> -->

        <div class="mb-6">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="medication_image"
            >Upload medication image</label
          >
          <input
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="medication_image_help"
            id="medication_image"
            (change)="onFileSelect($event)"
            type="file"
          />
        </div>
        <div style="align-items: center;">
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
  `,
  styles: [
    `
    .page-container
    {
      max-width: 640px;
      margin: 0 auto;
    }
    .page-header
    {
      text-align: center;
      font-size: 2rem;
    }
    `
  ],
})
export class AddMedicalComponent {
  file!: File;

  #authService = inject(AuthenticationService);
  #medicationService = inject(MedicationsService);
  #toastService = inject(ToastrService);
  medication_availability = 'Prescription';
  #router= inject(Router);

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files!.length > 0) this.file = input.files![0];
    console.log(input.files);
  }

  onMedicationAvailabilitySelect(event: Event) {
    var target = event.target as HTMLSpanElement;
    this.medication_availability = target.innerText;
    console.log(this.medication_availability);
  }

  getMedicalOwner() {
    const state = this.#authService.state_signal();
    return {
      user_id: state._id,
      fullname: state.fullname,
      email: state.email,
    } as Owner;
  }

  formAddMedical = inject(FormBuilder).nonNullable.group({
    name: '',
    generic_name: '',
    medication_class: '',
    availability: this.medication_availability,
    added_by: this.getMedicalOwner(),
  });

  addMedical() {
    const formData = new FormData();
    formData.append('medication_image', this.file);
    formData.append('name', this.formAddMedical.value.name as string);
    formData.append(
      'generic_name',
      this.formAddMedical.value.generic_name as string
    );
    formData.append(
      'medication_class',
      this.formAddMedical.value.medication_class as string
    );
    formData.append(
      'availability',
      this.medication_availability as string
    );
    formData.append('added_by', this.getMedicalOwner() as any);
    // call service to add medical 
    this.#medicationService.addMedication(formData).subscribe((res) => {
      console.log(res);
      if(res.success){
      this.#toastService.success('Medical added successfully' );
      console.log('Medical added successfully');
      this.#router.navigate(['/']);
      }else{
        this.#toastService.error('Something went wrong');
      }
    });    
  } 
}
