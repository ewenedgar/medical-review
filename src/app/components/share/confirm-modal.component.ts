 
import { Component, OnInit, inject } from '@angular/core';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-confirm-modal',
  template: `
    <fb-modal title="Confirmation" [isOpen]="isOpen">
      <p>Are you sure you want to delete this item?</p>
      <div class="flex justify-between items-center mt-4">
        <button type="button" class="btn btn-primary" (click)="onConfirm()">Confirm</button>
        <button type="button" class="btn btn-secondary" (click)="onCancel()">Cancel</button>
      </div>
    </fb-modal>
  `,
  styles: [
  ]
})
export class ConfirmModalComponent {
  #modalService = inject(MdbModalService);
  isOpen = false;
 
  ngOnInit() {}

  onConfirm() {
    
    this.isOpen = false;
    return true;
  }

  onCancel() { 
    this.isOpen = false;
    return false;
  }
}
