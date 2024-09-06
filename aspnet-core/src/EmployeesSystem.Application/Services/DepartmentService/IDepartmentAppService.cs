using Abp.Application.Services;
using Abp.Application.Services.Dto;
using EmployeesSystem.Services.DepartmentService.Dtos;
using System.Threading.Tasks;

namespace EmployeesSystem.Services.DepartmentService
{
    /// <summary>
    /// Defines the contract for DepartmentAppService.
    /// </summary>
    public interface IDepartmentAppService : IAsyncCrudAppService<DepartmentDto, int>
    {
        Task<DepartmentDetailsDto> GetDetailsAsync(EntityDto<int> input);
    }
}
