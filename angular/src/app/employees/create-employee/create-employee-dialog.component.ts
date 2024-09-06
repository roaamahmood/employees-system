import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { EmployeeService } from '@shared/employees/employee.service';
import { Employee } from '@shared/employees/employee';
import { Department } from '@shared/departments/department';
import { DepartmentService } from '@shared/departments/department.service';

@Component({
  templateUrl: 'create-employee-dialog.component.html'
})
export class CreateEmployeeDialogComponent extends AppComponentBase implements OnInit {
  public isLoading = false;
  public isLoadingDepartments = false;
  public employee: Employee = {};
  public departments: Department[];

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private employeeSerice: EmployeeService,
    private deparmentSerice: DepartmentService,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.fetchDepartments();
  }

  /**
   * Saves the new employee
   */
  save(): void {
    this.isLoading = true;

    this.employeeSerice.createEmployee(this.employee).subscribe(
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

  /**
   * Retrieves the departments list
   */
  private fetchDepartments() {
    this.isLoadingDepartments = true;
    this.deparmentSerice.getAllDepartments().subscribe((response) => {
      this.isLoadingDepartments = false;
      this.departments = response.result.items;
    });
  }
}
