import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { DepartmentService } from '@shared/departments/department.service';
import { Department } from '@shared/departments/department';

@Component({
  templateUrl: 'create-department-dialog.component.html'
})
export class CreateDepartmentDialogComponent extends AppComponentBase implements OnInit {
  isLoading = false;
  department: Department = {};
  
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private deparmentSerice: DepartmentService
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

  save(): void {
    this.isLoading = true;

    this.deparmentSerice.createDepartment(this.department).subscribe(
      () => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}
