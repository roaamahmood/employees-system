import { Component, Injector } from '@angular/core';
import { Location } from '@angular/common';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs';
import { EmployeeService } from '@shared/employees/employee.service';
import { ApiResponse } from '@shared/payload/api-response';
import { Employee } from '@shared/employees/employee';

@Component({
  templateUrl: './employee-details.component.html',
  animations: [appModuleAnimation()]
})
export class EmployeeDetailsComponent extends AppComponentBase {
  isLoading = false;
  employee: Employee;

  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private location: Location,
    private employeeSerice: EmployeeService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.route.paramMap
    .pipe(
      map((params: ParamMap) => params.get('id'))
    )
    .subscribe((employeeId: string) => {
      const parsedId = parseInt(employeeId);
      if (isNaN(parsedId)) {
        this.notify.error("Invalid employee ID");
      }
      this.getEmployeeDetails(parsedId);
    });
  }

  /**
   * Gets the detailed employee
   * @param id the employee ID
   */
  private getEmployeeDetails(id: number) {
    this.isLoading = true;
    this.employeeSerice.getEmployeeDetailsById(id).subscribe((response: ApiResponse<Employee>) => {
      this.employee = response.result
      this.isLoading = false;
    });
  }

  /**
   * Navigates back to previous page
   */
  public navigateBack(): void {
    this.location.back();
  }
}
