import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Medication } from '../types';

@Injectable({
  providedIn: 'root'
})
export class MedicationsService {
  
  #http =inject(HttpClient);
  /*
  // POST /medications
  request_body = { "name": string, "generic_name": string, "medication_class": string, "availability": string }
  request_multipart = "medication_image"

  response_body = { "success": boolean, "data": Medication }
*/
// GET /medications?first_letter=A
  getMedications(first_letter: string = 'A'){
    return this.#http.get<{success: boolean, data: Medication[]}>('http://localhost:3000/medications?first_letter='+first_letter);
  }
  addMedication(formData: FormData){
    return this.#http.post<{success:boolean, data: any}>('http://localhost:3000/medications', formData) 
  }

  getMedicationDetails(medication_id: string){
    return this.#http.get<{success:boolean, data: any}>(`http://localhost:3000/medications/${medication_id}`); 
  }
    
  updateMedication(medication_id: string, updatedMedication: any) {
    return this.#http.put<{success:boolean, data: any}>(`http://localhost:3000/medications/${medication_id}`, updatedMedication);
  }
  
  deleteMedication(medication_id: string) {
    return this.#http.delete<{success:boolean, data: any}>(`http://localhost:3000/medications/${medication_id}`);
  }
  
// GET /medications/images/:image_id
  getImage(image_id: string){
    return this.#http.get<{success: boolean, data: string}>('http://localhost:3000/medications/images/'+image_id);
  }
}
