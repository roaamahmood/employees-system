using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using EmployeesSystem.Domain.Entities;

namespace EmployeesSystem.Services.DepartmentService.Dtos
{
    /// <summary>
    /// Data transfer object for Department entity.
    /// </summary>
    [AutoMap(typeof(Department))]
    public class DepartmentDto : AuditedEntityDto<int>
    {
        public string Name { get; set; }
    }
}
