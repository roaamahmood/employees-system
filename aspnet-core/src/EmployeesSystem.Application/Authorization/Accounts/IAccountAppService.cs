using System.Threading.Tasks;
using Abp.Application.Services;
using EmployeesSystem.Authorization.Accounts.Dto;

namespace EmployeesSystem.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
