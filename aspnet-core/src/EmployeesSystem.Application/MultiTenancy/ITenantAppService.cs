using Abp.Application.Services;
using EmployeesSystem.MultiTenancy.Dto;

namespace EmployeesSystem.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

