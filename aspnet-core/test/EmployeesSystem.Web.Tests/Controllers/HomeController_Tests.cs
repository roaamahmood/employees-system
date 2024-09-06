using System.Threading.Tasks;
using EmployeesSystem.Models.TokenAuth;
using EmployeesSystem.Web.Controllers;
using Shouldly;
using Xunit;

namespace EmployeesSystem.Web.Tests.Controllers
{
    public class HomeController_Tests: EmployeesSystemWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}