using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using EmployeesSystem.Domain.Entities;
using EmployeesSystem.Services.DepartmentService.Dtos;
using System;


namespace EmployeesSystem.Services.EmployeeService.Dtos
{
    /// <summary>
    /// Data transfer object for Employee entity.
    /// </summary>
    [AutoMap(typeof(Employee))]
    public class EmployeeDetailsDto : EmployeeDto
    {
        public DepartmentDto Department { get; set; }
    }
}
