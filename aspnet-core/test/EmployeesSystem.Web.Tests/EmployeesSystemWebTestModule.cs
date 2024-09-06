using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using EmployeesSystem.EntityFrameworkCore;
using EmployeesSystem.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace EmployeesSystem.Web.Tests
{
    [DependsOn(
        typeof(EmployeesSystemWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class EmployeesSystemWebTestModule : AbpModule
    {
        public EmployeesSystemWebTestModule(EmployeesSystemEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(EmployeesSystemWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(EmployeesSystemWebMvcModule).Assembly);
        }
    }
}