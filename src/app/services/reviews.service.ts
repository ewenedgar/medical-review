import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  getReviewDetails(medication_id: string, review_id: string) {
    ///medications/:medication_id/reviews/:review_id
    return this.#http.get<{success:boolean, data: any}>(`http://localhost:3000/medications/${medication_id}/reviews/${review_id}`) 
  }
  
  
  getReviews(medication_id: string) {
    return this.#http.get<{success:boolean, data: any}>(`http://localhost:3000/medications/${medication_id}/reviews`) 
  ///medications/:medication_id/reviews
  }

  getReviewsWithPaging(medication_id: string, page: number, limit: number) {
    return this.#http.get<{success:boolean, data: any}>(`http://localhost:3000/medications/${medication_id}/reviews`) 
  ///medications/:medication_id/reviews
  }
  
  
  #http =inject(HttpClient);

  getReviewsByMedical(medId:string){
    return this.#http.get<{success:boolean, data: any}>('http://localhost:3000/reviews/medical/' + medId) 
  }

  addMedicalReview(medical_id: string, review: any) {
    return this.#http.post<{success:boolean, data: any}>(`http://localhost:3000/medications/${medical_id}/reviews`, review) 
  }

  updateMedicalReview(medical_id: string, review_id: string, review: any) {
    return this.#http.put<{success:boolean, data: any}>(`http://localhost:3000/medications/${medical_id}/reviews/${review_id}`, review) 
  }

}
