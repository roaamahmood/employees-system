using Abp.EntityFrameworkCore.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Zero.EntityFrameworkCore;
using EmployeesSystem.EntityFrameworkCore.Seed;

namespace EmployeesSystem.EntityFrameworkCore
{
    [DependsOn(
        typeof(EmployeesSystemCoreModule), 
        typeof(AbpZeroCoreEntityFrameworkCoreModule))]
    public class EmployeesSystemEntityFrameworkModule : AbpModule
    {
        /* Used it tests to skip dbcontext registration, in order to use in-memory database of EF Core */
        public bool SkipDbContextRegistration { get; set; }

        public bool SkipDbSeed { get; set; }

        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false;

            if (!SkipDbContextRegistration)
            {
                Configuration.Modules.AbpEfCore().AddDbContext<EmployeesSystemDbContext>(options =>
                {
                    //options.UseInMemoryDatabase("");
                    if (options.ExistingConnection != null)
                    {
                        EmployeesSystemDbContextConfigurer.Configure(options.DbContextOptions, options.ExistingConnection);
                    }
                    else
                    {
                        EmployeesSystemDbContextConfigurer.Configure(options.DbContextOptions, options.ConnectionString);
                    }
                });
            }
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(EmployeesSystemEntityFrameworkModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            if (!SkipDbSeed)
            {
                SeedHelper.SeedHostDb(IocManager);
            }
        }
    }
}
