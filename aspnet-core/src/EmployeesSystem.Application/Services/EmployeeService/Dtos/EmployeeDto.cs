using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using EmployeesSystem.Domain.Entities;

namespace EmployeesSystem.Services.EmployeeService.Dtos
{
    /// <summary>
    /// Data transfer object for creating a new Employee.
    /// </summary>
    [AutoMap(typeof(Employee))]
    public class EmployeeDto : AuditedEntityDto<int>
    {
        public string Name { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public double Salary { get; set; }
        public int DepartmentId { get; set; }
    }
}