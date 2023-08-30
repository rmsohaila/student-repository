using System.Text.Json.Serialization;

namespace Cap_NoArch.DataTransferObjects.FamilyMember;

public class UpdateFamilyMemberRequest
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
