import { NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/authentication/signin.component';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './components/authentication/signup.component';
import { SignoutComponent } from './components/authentication/signout.component';
import { MedicalsComponent } from './components/medical/medicals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { addTokenInterceptor } from './interceptors/add-token.interceptor';
import { AddMedicalComponent } from './components/medical/add-medical.component';
import { AuthenticationService } from './services/authentication.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MedicalDetailsComponent } from './components/medical/medical-details.component';
import { AddReviewComponent } from './components/review/add-review.component';
import { ReviewsComponent } from './components/review/reviews.component';
import { StarRatingModule } from 'angular-star-rating';
import { EditReviewComponent } from './components/review/edit-review.component';
import { EditMedicalComponent } from './components/medical/edit-medical.component';
import { ConfirmModalComponent } from './components/share/confirm-modal.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';


// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    SignoutComponent,
    MedicalsComponent,
    AddMedicalComponent,
    MedicalDetailsComponent,
    AddReviewComponent,
    ReviewsComponent,
    EditReviewComponent,
    EditMedicalComponent,
    ConfirmModalComponent
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,    
    // CKEditorModule,
    StarRatingModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),

    RouterModule.forRoot([
      { path: '', redirectTo:  'medicals', pathMatch: 'full'},
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },      
      { path: '', component: MedicalsComponent }, 
      { path: 'medicals', component: MedicalsComponent }, 
      { path: 'edit-medicals/:medication_id', component: EditMedicalComponent }, 
      { path: 'medicals/:medication_id', component: MedicalDetailsComponent},
      { path: 'medicals/:medication_id/edit-review/:review_id', component: EditReviewComponent},
      { 
        path: 'add-medical', component: AddMedicalComponent, canActivate: [()=>inject(AuthenticationService).isLoggedIn()]
      } 
    ], { bindToComponentInputs: true })
  ],
  providers: [MdbModalService, provideHttpClient(withInterceptors([
    addTokenInterceptor
  ]))],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
