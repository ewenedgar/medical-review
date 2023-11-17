import { Component, inject } from '@angular/core';
import { MedicationsService } from 'src/app/services/medications.service';
import { Medication } from 'src/app/types';

@Component({
  selector: 'app-medicals',
  template: ` <div class="my-10, page-container">
    <p class="my-10 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Medication starting with '{{medicineLetter}}'!
    </p>
    
    <div >
      <!-- <a [routerLink]="['','/details', medicine._d]" routerLinkActive="active">{{medicine}}</a> -->
      <button type="button" 
      class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
      *ngFor="let letter of alphabet" (click)="fetch($event)">{{letter}}
        
</button>
<ul *ngIf="medicineList.length > 0" class="container">
  <li *ngFor="let medicine of medicineList" class="list">
      <a  class="item"
      [routerLink]="['','medicals', medicine._id]"
      routerLinkActive="yellow" [routerLinkActiveOptions]="{exact:true}">{{medicine.name}}</a>
</li>
</ul>
</div>
</div>
  `,
  styles: [`button {margin: 5px; font-weight: bold; } .yellow{background-color: yellow}
       .page-container
    {
      max-width: 640px;
      margin: 0 auto;
    }
  .container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.list {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.item {
  width: 120px;
  height: 30px;
  margin: 1.5px;
  background-color: #4CAF50;
  color: white;
  text-align: center;
}
  `]
})

export class MedicalsComponent {
medicineLetter: string = 'A';
medicineList: Medication[] = [];
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  #dataService = inject(MedicationsService);
 constructor() {
   this.#dataService.getMedications().subscribe((data)=>{
      if(data.success){
        const sortedData = data.data.sort((a,b)=> a.name.localeCompare(b.name));
        this.medicineList = sortedData ;
      }
    });
  }
  fetch(event: Event){
    const firstLetter = event.target as HTMLButtonElement;
    this.#dataService.getMedications(firstLetter.innerText).subscribe((data)=>{
      if(data.success){
        const sortedData = data.data.sort((a,b)=> a.name.localeCompare(b.name));
        this.medicineList = sortedData ;
        this.medicineLetter = firstLetter.innerText;
      }
    });
  }
}
