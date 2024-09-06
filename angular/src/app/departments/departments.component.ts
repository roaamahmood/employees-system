import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Department } from '@shared/departments/department';
import { Router } from '@angular/router';
import { DepartmentService } from '@shared/departments/department.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateDepartmentDialogComponent } from './create-department/create-department-dialog.component';
import { EditDepartmentDialogComponent } from './edit-department/edit-department-dialog.component';
import swal from 'sweetalert2'; 

@Component({
  templateUrl: './departments.component.html',
  animations: [appModuleAnimation()]
})
export class DepartmentsComponent extends AppComponentBase implements OnInit {
  public departments: Department[] | undefined;
  public departmentsCount: number;
  public isLoading = false;

  constructor(
    injector: Injector,
    private router: Router,
    private deparmentSerice: DepartmentService,
    private modalService: BsModalService) {
    super(injector);
  }

  ngOnInit() {
    this.fetchDepartments();
  }

  /**
   * Deletes a department
   * @param id ID of the department to be deleted
   */
  public deleteDepartment(id: number) {
    swal.fire({
      title: "Do you want to delete this department?",
      showCancelButton: true,
      confirmButtonColor: "Red",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        this.deparmentSerice.deleteDepartmentById(id).subscribe((isDeleted) => {
          if (isDeleted) {
            this.removeDepartmentFromList(id);
          }
        });
      }
    });
  }

  /**
   * Navigates to the department details page
   * @param id ID of the department to be opened
   */
  public openDepartment(id: number) {
    this.router.navigate(['app/departments', id]);
  }

  /**
   * Opens the department creation dialog
   */
  public openDepartmentCreateDialog() {
    const dialog: BsModalRef = this.modalService.show(
      CreateDepartmentDialogComponent,
      {class: 'modal-lg'}
    );

    dialog.content.onSave.subscribe(() => {
      this.fetchDepartments();
    });
  }

  /**
   * Opens the department editing dialog
   */
  public openDepartmentEditDialog(department: Department) {
    const dialog: BsModalRef = this.modalService.show(
      EditDepartmentDialogComponent,
      {class: 'modal-lg', initialState: {department}}
    );

    dialog.content.onSave.subscribe(() => {
      this.fetchDepartments();
    });
  }

  /**
   * Retrieves the departments list
   */
  private fetchDepartments() {
    this.isLoading = true;
    this.deparmentSerice.getAllDepartments().subscribe((response) => {
      this.isLoading = false;
      this.departments = response.result.items;
      this.departmentsCount = response.result.totalCount;
    });
  }

  /**
   * Removes a department from the list of departments
   * @param id The ID of the department to remove
   */
  private removeDepartmentFromList(id: number) {
    this.departments = this.departments.filter((dept: Department) => dept.id !== id);
    this.departmentsCount--;
  }
}
