using EmployeesSystem.Debugging;

namespace EmployeesSystem
{
    public class EmployeesSystemConsts
    {
        public const string LocalizationSourceName = "EmployeesSystem";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "b3e4cc44ab864c8980170e11318a06e5";
    }
}
