using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace EmployeesSystem.EntityFrameworkCore
{
    public static class EmployeesSystemDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<EmployeesSystemDbContext> builder, string connectionString)
        {
            builder.UseInMemoryDatabase(databaseName: "TestDatabase");
            //builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<EmployeesSystemDbContext> builder, DbConnection connection)
        {
            builder.UseInMemoryDatabase(databaseName: "TestDatabase");
            //builder.UseSqlServer(connection);
        }
    }
}
