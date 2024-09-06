using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using EmployeesSystem.Configuration;

namespace EmployeesSystem.Web.Host.Startup
{
    [DependsOn(
       typeof(EmployeesSystemWebCoreModule))]
    public class EmployeesSystemWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public EmployeesSystemWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(EmployeesSystemWebHostModule).GetAssembly());
        }
    }
}
