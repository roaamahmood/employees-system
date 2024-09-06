import { Injectable } from '@angular/core';
import { LogService } from 'abp-ng2-module';
import { Observable, catchError, map } from 'rxjs';
import { Department } from './department';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { AppConsts } from '../AppConsts';
import { MultiItemApiResponse } from '../payload/multi-item-api-response';
import { ApiResponse } from '../payload/api-response';
import { ApiAction } from '@shared/AppEnums';

@Injectable()
export class DepartmentService {
    private apiRoute: string;

    constructor(
        private logService: LogService,
        private http: HttpClient
    ) {
        this.apiRoute = AppConsts.remoteServiceBaseUrl + "/api/services/app/Department/"
    }

    /**
     * Retrieves all departments
     * @returns Departments items api response
     */
    public getAllDepartments(): Observable<MultiItemApiResponse<Department>> {
        try {
            return this.http.get<MultiItemApiResponse<Department>>(this.apiRoute + "GetAll");
        } catch (error) {
            this.handleError(error as HttpErrorResponse);
            throw error;
        }
    }

    /**
     * Retrieves a department by its ID
     * @param id the department ID
     * @returns The retrieved department
     */
    public getDepartmentById(id: number): Observable<ApiResponse<Department>> {
        try {
            const params = new HttpParams().set('id', id.toString());
            return this.http.get<ApiResponse<Department>>(this.apiRoute + ApiAction.GET, {params});
        } catch (error) {
            this.handleError(error as HttpErrorResponse);
            throw error;
        }
    }

    /**
     * Retrieves a department details by its ID
     * @param id the department ID
     * @returns The retrieved detailed department
     */
    public getDepartmentDetailsById(id: number): Observable<ApiResponse<Department>> {
        try {
            const params = new HttpParams().set('id', id.toString());
            return this.http.get<ApiResponse<Department>>(this.apiRoute + ApiAction.DETAILS, {params});
        } catch (error) {
            this.handleError(error as HttpErrorResponse);
            throw error;
        }
    }

    /**
     * Deletes a department by its ID
     * @param id the department ID
     * @returns whether the department was deleted or not
     */
    public deleteDepartmentById(id: number): Observable<boolean> {
        try {
            const params = new HttpParams().set('id', id.toString());
            return this.http.delete<ApiResponse<null>>(this.apiRoute + ApiAction.DELETE, {params}).pipe(map((response: ApiResponse<null>) => response.success));
        } catch (error) {
            this.handleError(error as HttpErrorResponse);
            throw error;
        }
    }

    /**
     * Creates a new department
     * @param department department to create
     * @returns created department
     */
    public createDepartment(department: Department): Observable<ApiResponse<Department>> {
        try {
            return this.http.post<ApiResponse<Department>>(this.apiRoute + ApiAction.CREATE, department);
        } catch (error) {
            this.handleError(error as HttpErrorResponse);
            throw error;
        }
    }

    /**
     * Updates a department
     * @param department department to update
     * @returns updated department
     */
    public updateDepartment(department: Department): Observable<ApiResponse<Department>> {
        try {
            return this.http.put<ApiResponse<Department>>(this.apiRoute + ApiAction.UPDATE, department);
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
