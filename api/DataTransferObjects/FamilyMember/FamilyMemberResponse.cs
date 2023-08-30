using Cap_NoArch.DataTransferObjects;
using System.Text.Json.Serialization;

namespace Cap_NoArch.Responses.FamilyMember;

public class FamilyMemberResponse : DtoBaseClass
{
    [JsonPropertyName("ID")]
    public int ID { get; set; }

    [JsonPropertyName("firstName")]
    public string FirstName { get; set; }

    [JsonPropertyName("lastName")]
    public string LastName { get; set; }

    [JsonPropertyName("dateOfBirth")]
    public DateTime DateOfBirth { get; set; }

    [JsonPropertyName("relationshipId")]
    public int RelationshipId { get; set; }

    [JsonPropertyName("nationalityId")]
    public int NationalityId { get; set; }
}
