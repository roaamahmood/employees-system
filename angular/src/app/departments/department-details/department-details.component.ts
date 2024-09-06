import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map } from 'rxjs';
import { DepartmentService } from '@shared/departments/department.service';
import { ApiResponse } from '@shared/payload/api-response';
import { Department } from '@shared/departments/department';

@Component({
  templateUrl: './department-details.component.html',
  animations: [appModuleAnimation()]
})
export class DepartmentDetailsComponent extends AppComponentBase {
  isLoading = false;
  department: Department;

  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private location: Location,
    private deparmentSerice: DepartmentService,
    private router: Router
  ) {
    super(injector);
  }

  ngOnInit() {
    this.route.paramMap
    .pipe(
      map((params: ParamMap) => params.get('id'))
    )
    .subscribe((departmentId: string) => {
      const parsedId = parseInt(departmentId);
      if (isNaN(parsedId)) {
        this.notify.error("Invalid department ID");
      }
      this.getDepartmentDetails(parsedId);
    });
  }

  /**
   * Gets the detailed department
   * @param id the department ID
   */
  private getDepartmentDetails(id: number) {
    this.isLoading = true;
    this.deparmentSerice.getDepartmentDetailsById(id).subscribe((response: ApiResponse<Department>) => {
      this.department = response.result
      this.isLoading = false;
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
   * Navigates back to previous page
   */
  public navigateBack(): void {
    this.location.back();
  }
}
