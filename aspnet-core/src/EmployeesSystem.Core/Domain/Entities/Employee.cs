using Abp.Domain.Entities;

namespace EmployeesSystem.Domain.Entities
{
    /// <summary>
    /// Represents an employee in the system.
    /// </summary>
    public class Employee : Entity<int>
    {
        public string Name { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public double Salary { get; set; }
        public int DepartmentId { get; set; }

        #region Relationship
        public virtual Department Department { get; set; }
        #endregion
    }
}
