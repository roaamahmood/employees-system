using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using EmployeesSystem.Domain.Entities;
using EmployeesSystem.Services.EmployeeService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeesSystem.Services.DepartmentService.Dtos
{
    /// <summary>
    /// Data transfer object for Department entity.
    /// </summary>
    [AutoMap(typeof(Department))]
    public class DepartmentDetailsDto : AuditedEntityDto<int>
    {
        public string Name { get; set; }
        public List<EmployeeDto> Employees { get; set; }
    }
}
