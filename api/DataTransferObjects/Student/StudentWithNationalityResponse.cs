using System.Text.Json.Serialization;

namespace Cap_NoArch.Responses.Student;

public class StudentWithNationalityResponse
{
    [JsonPropertyName("ID")]
    public int ID { get; set; }

    [JsonPropertyName("firstName")]
    public string FirstName { get; set; }

    [JsonPropertyName("lastName")]
    public string LastName { get; set; }

    [JsonPropertyName("nationalityId")]
    public int NationalityId { get; set; }
}
