using Abp.Application.Services;
using Abp.Domain.Repositories;
using EmployeesSystem.Domain.Entities;
using EmployeesSystem.Services.EmployeeService.Dtos;
using System.Threading.Tasks;
using AutoMapper;
using Abp.Application.Services.Dto;
using Abp.UI;
using Microsoft.EntityFrameworkCore;

namespace EmployeesSystem.Services.EmployeeService
{
    /// <summary>
    /// Provides CRUD operations and additional functionalities for managing employees.
    /// </summary>
    public class EmployeeAppService : AsyncCrudAppService<Employee, EmployeeDto, int>, IEmployeeAppService
    {
        private readonly IRepository<Department, int> _departmentRepository;
        private readonly IMapper _mapper;
        public EmployeeAppService(IRepository<Employee, int> repository, IRepository<Department, int> departmentRepository, IMapper mapper) : base(repository)
        {
            _departmentRepository = departmentRepository;
            _mapper = mapper;
        }

        public async Task<EmployeeDetailsDto> GetDetailsAsync(EntityDto<int> input)
        {
            var employee = await Repository.GetAllIncluding(e => e.Department)
                .FirstOrDefaultAsync(e => e.Id == input.Id);

            if (employee == null)
            {
                throw new UserFriendlyException(L("EmployeeNotFound"));
            }

            return _mapper.Map<EmployeeDetailsDto>(employee);
        }
    }
}
