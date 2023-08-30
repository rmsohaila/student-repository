using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace Cap_NoArch.DataTransferObjects;

public abstract class DtoBaseClass
{
    public override string ToString()
    {
        Type type = GetType();
        PropertyInfo[] properties = type.GetProperties(BindingFlags.Public | BindingFlags.Instance);

        string result = $"{type.Name} - ";
        foreach (PropertyInfo prop in properties)
        {
            if (prop.CanRead && ShouldIncludeProperty(prop))
            {
                object value = prop.GetValue(this);
                result += $"{prop.Name}: {value}, ";
            }
        }

        return "{ " + result.TrimEnd(',', ' ') + " }";
    }

    protected virtual bool ShouldIncludeProperty(PropertyInfo property)
    {
        return !property.GetCustomAttributes(typeof(RequiredAttribute), true).Any();
    }

}
