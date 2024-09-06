using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using EmployeesSystem.Authorization;

namespace EmployeesSystem
{
    [DependsOn(
        typeof(EmployeesSystemCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class EmployeesSystemApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<EmployeesSystemAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(EmployeesSystemApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
