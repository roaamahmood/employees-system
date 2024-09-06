using Abp.Authorization;
using EmployeesSystem.Authorization.Roles;
using EmployeesSystem.Authorization.Users;

namespace EmployeesSystem.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
