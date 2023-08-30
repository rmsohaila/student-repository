using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Cap_NoArch.DataTransferObjects.Student;

public class CreateStudentRequest
{
    [Required]
    [JsonPropertyName("firstName")]
    public string FirstName { get; set; }

    [Required]
    [JsonPropertyName("lastName")]
    public string LastName { get; set; }

    [Required]
    [JsonPropertyName("dateOfBirth")]
    public DateTime DateOfBirth { get; set; }
}
