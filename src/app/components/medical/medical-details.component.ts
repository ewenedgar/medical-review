import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MedicationsService } from 'src/app/services/medications.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import { Medication, Review } from 'src/app/types';
import { ConfirmModalComponent } from  '../share/confirm-modal.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-medical-details',
  template: `<div class="flex flex-col items-center justify-center w-full h-full">
    <h5 class="my-10 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {{medication_details$.name}}
</h5>
    
<a  class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" [src]="medication_image" alt="none">
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{medication_details$.name}}</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Generic Name: {{medication_details$.generic_name}}</p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Availability: {{medication_details$.availability}}</p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Medication class: {{medication_details$.medication_class}}</p>
    
      </div>
    



</a>
<div class="inline-flex rounded-md shadow-sm" role="group">
  <div *ngIf="authService.state_signal()._id === medication_details$.added_by.user_id">
  <button (click)="gotoEditMedication()" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
    Edit
  </button>
  <button (click)="deleteMedication()" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
    Delete
  </button>
  </div>
  <button (click)="goBack()" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
    GO BACK
  </button>
</div>
 
    <br>
    <h2>
      <b>Reviews from users</b>
    </h2>
    <app-reviews [medication_id]='medication_id'  [reviews]='medical_reviews'></app-reviews>
    <hr>
    <div *ngIf="authService.state_signal().jwt">
      <app-add-review></app-add-review>
    </div>
    <hr>
    <hr>    
  `,
  styles: [
  ]
})
export class MedicalDetailsComponent {
  @Input() medication_id: string = '';

  #medicationService = inject(MedicationsService);
  authService = inject(AuthenticationService);
  #reviewService = inject(ReviewsService);
  #toastService = inject(ToastrService);
  #router = inject(Router);
  medication_image: string = 'https://media.istockphoto.com/id/1300036753/photo/falling-antibiotics-healthcare-background.jpg?s=612x612&w=0&k=20&c=oquxJiLqE33ePw2qML9UtKJgyYUqjkLFwxT84Pr-WPk=';

  // modalService = inject(MdbModalService);

  medical_reviews: any[] = [];
  medication_details$!: Medication;
gotoEditMedication() {
    this.#router.navigate(['/edit-medicals', this.medication_id]);
   }

  deleteMedication() {
   if(confirm("Are you sure you want to delete this medication?")){
      this.#medicationService.deleteMedication(this.medication_id).subscribe(data => {
      console.log(data);
      if(data.success){
        this.#toastService.success("Deleted successfully");

      this.#router.navigate(['/']);
      }else{
        this.#toastService.error("Something went wrong");
      }
    });
    }
  }
goBack(){
        this.#toastService.success("See you again..soon");

    this.#router.navigate(['/']);
  }
  ngOnInit(): void {
   this.#medicationService.getMedicationDetails(this.medication_id).subscribe(data => {
      console.log(data.data);
      if(data.success){
      this.medication_details$ = data.data;
      this.#medicationService.getImage(data.data.image._id).subscribe(data => {
        if(data.success){
        this.medication_image = data.data;}
        else{
          this.#toastService.error("Something went wrong with image load");
        }
      
      }
        );
    }
      else{
        this.#toastService.error("Something went wrong");
      }
    });


    this.#reviewService.getReviews(this.medication_id).subscribe(data => {
      console.log(data);
      this.medical_reviews = data.data;
      console.log(this.medical_reviews);
    });
  }

  //  openModal() {
  //   const modalRef = this.modalService.open(ConfirmModalComponent);
  //   modalRef.onClose.subscribe((result) => {
  //     if (result) {
  //       // Do something here if the user confirmed the action.
  //     } else {
  //       // Do something here if the user canceled the action.
  //     }
  //   });
  // }
}
