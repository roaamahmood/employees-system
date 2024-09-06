using Abp.Application.Services;
using Abp.Application.Services.Dto;
using EmployeesSystem.Services.EmployeeService.Dtos;
using System.Threading.Tasks;

namespace EmployeesSystem.Services.EmployeeService
{
    /// <summary>
    /// Defines the contract for EmployeeAppService.
    /// </summary>
    public interface IEmployeeAppService : IAsyncCrudAppService<EmployeeDto, int>
    {
        Task<EmployeeDetailsDto> GetDetailsAsync(EntityDto<int> input);
    }
}
