using System.ComponentModel.DataAnnotations;

namespace EmployeesSystem.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}