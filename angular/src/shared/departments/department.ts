import { Employee } from '../employees/employee';

export interface Department {
  id?: number;
  name?: string;
  creationTime?: Date;
  lastModificationTime?: Date;
  employees?: Employee[];
}
