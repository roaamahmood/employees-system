import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Employee } from '@shared/employees/employee';
import { Router } from '@angular/router';
import { EmployeeService } from '@shared/employees/employee.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import swal from 'sweetalert2';
import { CreateEmployeeDialogComponent } from './create-employee/create-employee-dialog.component';
import { EditEmployeeDialogComponent } from './edit-employee/edit-employee-dialog.component';
import { Department } from '@shared/departments/department';

@Component({
    templateUrl: './employees.component.html',
    animations: [appModuleAnimation()],
})
export class EmployeesComponent extends AppComponentBase {
    public employees: Employee[] | undefined;
    public employeesCount: number;
    public isLoading = false;
    public isLoadingDepartments = false;

    constructor(
        injector: Injector,
        private router: Router,
        private employeeSerice: EmployeeService,
        private modalService: BsModalService) {
        super(injector);
    }

    ngOnInit() {
        this.fetchEmployees();
    }

    /**
     * Deletes a employee
     * @param id ID of the employee to be deleted
     */
    public deleteEmployee(id: number) {
        swal.fire({
            title: "Do you want to delete this employee?",
            showCancelButton: true,
            confirmButtonColor: "Red",
            confirmButtonText: "Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                this.employeeSerice.deleteEmployeeById(id).subscribe((isDeleted) => {
                    if (isDeleted) {
                        this.removeEmployeeFromList(id);
                    }
                });
            }
        });
    }

    /**
     * Navigates to the employee details page
     * @param id ID of the employee to be opened
     */
    public openEmployee(id: number) {
        this.router.navigate(['app/employees', id]);
    }

    /**
     * Opens the employee creation dialog
     */
    public openEmployeeCreateDialog() {
        const dialog: BsModalRef = this.modalService.show(
            CreateEmployeeDialogComponent,
            { class: 'modal-lg' }
        );

        dialog.content.onSave.subscribe(() => {
            this.fetchEmployees();
        });
    }

    /**
     * Opens the employee editing dialog
     */
    public openEmployeeEditDialog(employee: Employee) {
        const dialog: BsModalRef = this.modalService.show(
            EditEmployeeDialogComponent,
            { class: 'modal-lg', initialState: { employee } }
        );

        dialog.content.onSave.subscribe(() => {
            this.fetchEmployees();
        });
    }

    /**
     * Retrieves the employees list
     */
    private fetchEmployees() {
        this.isLoading = true;
        this.employeeSerice.getAllEmployees().subscribe((response) => {
            this.isLoading = false;
            this.employees = response.result.items;
            this.employeesCount = response.result.totalCount;
        });
    }

    /**
     * Removes a employee from the list of employees
     * @param id The ID of the employee to remove
     */
    private removeEmployeeFromList(id: number) {
        this.employees = this.employees.filter((dept: Employee) => dept.id !== id);
        this.employeesCount--;
    }
}
