import { ReviewsService } from 'src/app/services/reviews.service';
import { FormBuilder } from '@angular/forms';
import { Owner, Review } from './../../types';
import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-review',
  template: `    
    <button data-modal-target="default-modal" data-modal-toggle="default-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
      Add Review
    </button>
    <!-- Main modal -->
    <div id="default-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-2xl max-h-full">
            <form [formGroup]="formReview" (ngSubmit)="saveNewReview()">
            <!-- Modal content -->
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <!-- Modal header -->
                  <div class="flex items-center justify-between p-4 md:p-5 dark:border-gray-600">
                      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                          Add review
                      </h3>
                      <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span class="sr-only">Close modal</span>
                      </button>
                  </div>
                  <!-- Modal body -->
                  <div class="p-4 md:p-5 space-y-4">
                  
                  <textarea formControlName="review" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

                  <span> 
                    <br>
                  <star-rating [starType]="'svg'" [rating]="2.63"></star-rating>
                   </span>

                  </div>
                  <!-- Modal footer -->
                  <div class="flex items-center p-4 md:p-5 rounded-b dark:border-gray-600">
                    <button 
                      data-modal-hide="default-modal" 
                      type="button" 
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      (click)="saveNewReview()"
                      >
                      Save
                    </button>
                    <button 
                      data-modal-hide="default-modal" 
                      type="button" 
                      class="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
              </div>
            </form>
        </div>
    </div>     

  `,
  styles: [
  ]
})
export class AddReviewComponent {

  medication_id: string = '';
  #activatedRoute = inject(ActivatedRoute);
  #authService = inject(AuthenticationService);
  #reviewService = inject(ReviewsService);
  #toasterService = inject(ToastrService);

  getReviewOwner() {
    const state = this.#authService.state_signal();
    return {
      user_id: state._id,
      fullname: state.fullname
    } as Owner;
  }

  constructor() {
    this.#activatedRoute.paramMap
      .pipe(takeUntilDestroyed())
      .subscribe((params) => {
        this.medication_id = params.get('medication_id') as string;
      });
  }

  formReview = inject(FormBuilder).nonNullable.group({
    review: '',
    rating: 0,
    by: {
      user_id: '',
      fullname: ''
    },
    date: new Date()
  });

  saveNewReview() {
    let review = {
      'review': this.formReview.value.review,
      'rating': this.formReview.value.rating,
    };
    // formData.append( 'medication_id', this.medication_id );
    this.#reviewService.addMedicalReview(this.medication_id, review).subscribe(data => {
      this.#toasterService.success('Review added successfully');

    })
  }
}

