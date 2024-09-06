using System.Threading.Tasks;
using EmployeesSystem.Configuration.Dto;

namespace EmployeesSystem.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
