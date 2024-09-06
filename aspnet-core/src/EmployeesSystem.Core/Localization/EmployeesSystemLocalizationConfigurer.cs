using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace EmployeesSystem.Localization
{
    public static class EmployeesSystemLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(EmployeesSystemConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(EmployeesSystemLocalizationConfigurer).GetAssembly(),
                        "EmployeesSystem.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
