import { Component, Input, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Review } from 'src/app/types';

@Component({
  selector: 'app-reviews',
  template: `
     
    <div class="review-details" *ngFor="let review of reviews">
      <h2>{{review.by.fullname }}</h2> 
      <div style="max-width:100px;">
        <star-rating class="start-rating" [starType]="'svg'" [rating]="review.rating" [readOnly]="true" />
      </div>
      <span class="review-author">Reviewed on {{review.date | date: 'medium'}}</span> 
      <span class="edit-review-link" *ngIf="review.by?.user_id == authService.state_signal()._id">
        <button (click)="editReview(medication_id, review._id)">Edit</button>
      </span> 
      <h2>{{review.review || "Review..."}}</h2>
    </div>
    
  `,

  styles: [
    `
    .edit-review-link {
      margin-left: 10px;
      text-decoration: underline;
      cursor: pointer;
      color: blue;
    }
    .review-author{
      border-bottom: 1px solid #ccc;
      font-weight: bold;
    } 
    .review-details
    {
      border-bottom: 1px solid #ccc;
      max-width: 640px; 
      margin-bottom: 10px;
    }
    `
  ]

})
export class ReviewsComponent {

  @Input() reviews: any[] = [];
  @Input() medication_id!: string;

  authService = inject(AuthenticationService);
 
  #router = inject(Router);
  editReview(medication_id:string, review_id:string) { 
    this.#router.navigate([`/medicals/${medication_id}/edit-review/${review_id}`]);
  }
 
}

/**/ 