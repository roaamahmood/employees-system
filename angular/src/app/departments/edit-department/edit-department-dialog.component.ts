import {
  Component,
  Injector,
  Output,
  EventEmitter
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { Department } from '@shared/departments/department';
import { DepartmentService } from '@shared/departments/department.service';

@Component({
  templateUrl: 'edit-department-dialog.component.html'
})
export class EditDepartmentDialogComponent extends AppComponentBase {
  isLoading = false;
  department: Department;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private deparmentSerice: DepartmentService
  ) {
    super(injector);
  }

  save(): void {
    this.isLoading = true;

    this.deparmentSerice.updateDepartment(this.department).subscribe(
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
