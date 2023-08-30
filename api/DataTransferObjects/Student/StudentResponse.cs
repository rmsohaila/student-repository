using Cap_NoArch.DataTransferObjects;
using System.Text.Json.Serialization;

namespace Cap_NoArch.Responses.Student;

public class StudentResponse : DtoBaseClass
{
    [JsonPropertyName("ID")]
    public int ID { get; set; }

    [JsonPropertyName("firstName")]
    public string FirstName { get; set; }

    [JsonPropertyName("lastName")]
    public string LastName { get; set; }

    [JsonPropertyName("dateOfBirth")]
    public DateTime DateOfBirth { get; set; }
}
