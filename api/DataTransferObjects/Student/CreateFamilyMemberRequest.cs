using System.Text.Json.Serialization;

namespace Cap_NoArch.Responses.Student;

public class CreateFamilyMemberRequest
{
    [JsonPropertyName("firstName")]
    public string FirstName { get; set; }

    [JsonPropertyName("lastName")]
    public string LastName { get; set; }

    [JsonPropertyName("dateOfBirth")]
    public DateTime DateOfBirth { get; set; }

    [JsonPropertyName("relationshipId")]
    public int RelationshipId { get; set; }
}
