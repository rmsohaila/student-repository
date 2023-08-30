using System.ComponentModel.DataAnnotations;

namespace Cap_NoArch.Data.Entities;

public class Relationship
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(50)]
    public string Name { get; set; }
}
