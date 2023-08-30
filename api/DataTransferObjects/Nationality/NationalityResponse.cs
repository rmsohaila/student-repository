using System.Text.Json.Serialization;

namespace Cap_NoArch.Responses.Nationality;

public class NationalityResponse
{
    [JsonPropertyName("ID")]
    public int ID { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }
}
