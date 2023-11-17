import { FormBuilder } from '@angular/forms';
import { Review } from './../../types';
import { Component, Input, inject, signal } from '@angular/core';
import { ReviewsService } from 'src/app/services/reviews.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-review',
  template: `
  
  <div class="max-w-screen-xl items-center justify-between mx-auto" style="max-width:640px; align-content:left;">

  <form [formGroup]="formEditReview" (ngSubmit)="saveReview()">

        <div class="mb-6">
          <label
            for="review"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Review</label
          >
          <textarea
            type="string"
            id="review" rows="16"
            formControlName="edit_review"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value="{{selected_review().review}}"
            required
          ></textarea>
        </div>
        <div class="mb-6">
        <label
            for="rating"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Rating</label>
            
        <span id="rating">  
          <star-rating [starType]="'svg'" [rating]="selected_review().rating"          
          (starClickChange)="onStarClick($event)" 
          ></star-rating>
          </span>
        </div>
 
        <div class="flex items-center p-4 md:p-5 rounded-b dark:border-gray-600">
            <button  
              type="button" 
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              (click)="saveReview()"
              >
              Save
            </button>
            <button  
              type="button" 
              class="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              (click)="cancel()"
              >
              Cancel
            </button>
          </div> 

        </form>
  </div>   
  

  `,
  styles: [
  ]
})
export class EditReviewComponent {
 
  @Input() review_id!: string;
  @Input() medication_id!: string;

  formEditReview = inject(FormBuilder).nonNullable.group({
    edit_review: '',
    rating: 0
  }); 

  #reviewService = inject(ReviewsService);
  selected_review = signal({
    review:'',
    rating:0
  });
  #toasterService = inject(ToastrService);
  #router = inject(Router);
 

  ngOnInit(): void {
    this.#reviewService.getReviewDetails(this.medication_id, this.review_id).subscribe(data => {
      this.selected_review.set(data.data); 
      this.formEditReview.patchValue({
        edit_review: this.selected_review().review,
        rating: this.selected_review().rating
      });
    });
  }

  onStarClick(event: any) { 
    this.selected_review().rating = event.rating; 
  }

  saveReview(){  
    const updatedReview = {
      'review': this.formEditReview.value.edit_review,
      'rating': this.selected_review().rating
    };
    //updatedReview
    this.#reviewService.updateMedicalReview(this.medication_id, this.review_id, updatedReview).subscribe(data => {
      this.#toasterService.success('Review updated successfully');
      this.#router.navigate(['/medicals', this.medication_id]);      
    }); 

  }

  cancel(){
    this.#router.navigate(['/medicals', this.medication_id]);
  }
}
                                                                                                            