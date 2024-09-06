import { Injectable } from '@angular/core';
import { LogService } from 'abp-ng2-module';
import { Observable, catchError, map } from 'rxjs';
import { Employee } from './employee';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { AppConsts } from '../AppConsts';
import { MultiItemApiResponse } from '../payload/multi-item-api-response';
import { ApiResponse } from '../payload/api-response';
import { ApiAction } from '@shared/AppEnums';

@Injectable()
export class EmployeeService {
    private apiRoute: string;

    constructor(
        private logService: LogService,
        private http: HttpClient
    ) {
        this.apiRoute = AppConsts.remoteServiceBaseUrl + "/api/services/app/Employee/"
    }

    /**
     * Retrieves all employees
     * @returns Employees items api response
     */
    public getAllEmployees(): Observable<MultiItemApiResponse<Employee>> {
        try {
            return this.http.get<MultiItemApiResponse<Employee>>(this.apiRoute + "GetAll");
        } catch (error) {
            this.handleError(error as HttpErrorResponse);
            throw error;
        }
    }

    /**
 * Retrieves a employee details by its ID
 * @param id the employee ID
 * @returns The retrieved detailed employee
 */
    public getEmployeeDetailsById(id: number): Observable<ApiResponse<Employee>> {
        try {
            const params = new HttpParams().set('id', id.toString());
            return this.http.get<ApiResponse<Employee>>(this.apiRoute + ApiAction.DETAILS, { params });
        } catch (error) {
            this.handleError(error as HttpErrorResponse);
            throw error;
        }
    }

    /**
     * Deletes a employee by its ID
     * @param id the employee ID
     * @returns whether the employee was deleted or not
     */
    public deleteEmployeeById(id: number): Observable<boolean> {
        try {
            const params = new HttpParams().set('id', id.toString());
            return this.http.delete<ApiResponse<null>>(this.apiRoute + ApiAction.DELETE, { params }).pipe(map((response: ApiResponse<null>) => response.success));
        } catch (error) {
            this.handleError(error as HttpErrorResponse);
            throw error;
        }
    }

    /**
     * Creates a new employee
     * @param employee employee to create
     * @returns created employee
     */
    public createEmployee(employee: Employee): Observable<ApiResponse<Employee>> {
        try {
            return this.http.post<ApiResponse<Employee>>(this.apiRoute + ApiAction.CREATE, employee);
        } catch (error) {
            this.handleError(error as HttpErrorResponse);
            throw error;
        }
    }

    /**
     * Updates a employee
     * @param employee employee to update
     * @returns updated employee
     */
    public updateEmployee(employee: Employee): Observable<ApiResponse<Employee>> {
        try {
            return this.http.put<ApiResponse<Employee>>(this.apiRoute + ApiAction.UPDATE, employee);
        } catch (error) {
            this.handleError(error as HttpErrorResponse);
            throw error;
        }
    }

    /**
     * Handles request errors
     * @param error the HTTP error response 
     */
    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An error occurred';

        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        this.logService.error(errorMessage);
    }
}
