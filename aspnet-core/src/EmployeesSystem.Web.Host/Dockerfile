FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src
COPY ["src/EmployeesSystem.Web.Host/EmployeesSystem.Web.Host.csproj", "src/EmployeesSystem.Web.Host/"]
COPY ["src/EmployeesSystem.Web.Core/EmployeesSystem.Web.Core.csproj", "src/EmployeesSystem.Web.Core/"]
COPY ["src/EmployeesSystem.Application/EmployeesSystem.Application.csproj", "src/EmployeesSystem.Application/"]
COPY ["src/EmployeesSystem.Core/EmployeesSystem.Core.csproj", "src/EmployeesSystem.Core/"]
COPY ["src/EmployeesSystem.EntityFrameworkCore/EmployeesSystem.EntityFrameworkCore.csproj", "src/EmployeesSystem.EntityFrameworkCore/"]
WORKDIR "/src/src/EmployeesSystem.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/EmployeesSystem.Web.Host", "src/EmployeesSystem.Web.Host"]
COPY ["src/EmployeesSystem.Web.Core", "src/EmployeesSystem.Web.Core"]
COPY ["src/EmployeesSystem.Application", "src/EmployeesSystem.Application"]
COPY ["src/EmployeesSystem.Core", "src/EmployeesSystem.Core"]
COPY ["src/EmployeesSystem.EntityFrameworkCore", "src/EmployeesSystem.EntityFrameworkCore"]
WORKDIR "/src/src/EmployeesSystem.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "EmployeesSystem.Web.Host.dll"]
