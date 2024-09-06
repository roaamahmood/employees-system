using Abp.Application.Services;
using Abp.Domain.Repositories;
using EmployeesSystem.Domain.Entities;
using EmployeesSystem.Services.EmployeeService.Dtos;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeesSystem.Services.DepartmentService.Dtos;
using Abp.Application.Services.Dto;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Abp.UI;

namespace EmployeesSystem.Services.DepartmentService
{
    /// <summary>
    /// Provides CRUD operations and additional functionalities for managing department.
    /// </summary>
    public class DepartmentAppService : AsyncCrudAppService<Department, DepartmentDto, int>, IDepartmentAppService
    {
        private readonly IRepository<Employee, int> _employeeRepository;
        private readonly IMapper _mapper;
        public DepartmentAppService(IRepository<Department, int> repository , IRepository<Employee, int> employeeRepository, IMapper mapper) : base(repository)
        {
            _employeeRepository = employeeRepository;
            _mapper = mapper;
        }
        
        public async Task<DepartmentDetailsDto> GetDetailsAsync(EntityDto<int> input)
        {
            var department = await Repository.GetAsync(input.Id);
            if (department == null)
            {
                throw new UserFriendlyException(L("DepartmentNotFound"));
            }

            var employees = await _employeeRepository.GetAll()
                .Where(e => e.DepartmentId == input.Id)
                .ToListAsync();

            var departmentDto = _mapper.Map<DepartmentDetailsDto>(department);
            departmentDto.Employees = _mapper.Map<List<EmployeeDto>>(employees);

            return departmentDto;
        }

    }
}
