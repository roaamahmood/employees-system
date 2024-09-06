using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using EmployeesSystem.Authorization.Roles;
using EmployeesSystem.Authorization.Users;
using EmployeesSystem.MultiTenancy;
using EmployeesSystem.Domain.Entities;

namespace EmployeesSystem.EntityFrameworkCore
{
    public class EmployeesSystemDbContext : AbpZeroDbContext<Tenant, Role, User, EmployeesSystemDbContext>
    {
        /*  a DbSet for each entity of the application */
         public DbSet<Department> Departments { get; set; }
         public DbSet<Employee> Employees { get; set; }

        public EmployeesSystemDbContext(DbContextOptions<EmployeesSystemDbContext> options)
            : base(options)
        {
            
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Employee>().HasOne(e => e.Department).WithMany(e => e.Employees).HasForeignKey(e => e.DepartmentId);
        }
    }
}
