using System.Threading.Tasks;
using Abp.Application.Services;
using EmployeesSystem.Sessions.Dto;

namespace EmployeesSystem.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
