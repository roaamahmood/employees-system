using Abp.Domain.Entities;
using System.Collections.Generic;

namespace EmployeesSystem.Domain.Entities
{
    /// <summary>
    /// Represents a department in the system.
    /// </summary>
    public class Department : Entity<int>
    {
        public string Name { get; set; }

        #region Relationship
        public virtual ICollection<Employee> Employees { get; set; }
        #endregion

    }
}
