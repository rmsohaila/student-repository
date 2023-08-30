using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Cap_NoArch.DataTransferObjects.Student;

public class UpdateStudentRequest
{
    [Required]
    [JsonPropertyName("ID")]
    public int ID { get; set; }

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
