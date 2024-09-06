using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using EmployeesSystem.Configuration.Dto;

namespace EmployeesSystem.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : EmployeesSystemAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
