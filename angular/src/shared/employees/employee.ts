import { Department } from "@shared/departments/department";

export interface Employee {
  id?: number,
  name?: string,
  gender?: string,
  email?: string,
  phone?: string,
  salary?: number,
  department?: Department,
  departmentId?: number;
  creationTime?: Date,
  lastModificationTime?: Date,
}
