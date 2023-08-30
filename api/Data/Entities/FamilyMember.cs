using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cap_NoArch.Data.Entities;

public class FamilyMember : BaseEntity
{
    [NotMapped]
    public string Fullname
    {
        get
        {
            return this.LastName + " " + this.FirstName;
        }
    }

    #region Columns

    [Required]
    [Column(("firstname"))]
    public string FirstName { get; set; }

    [Column(("lastname"))]
    public string? LastName { get; set; }

    [Column("dob")]
    public DateTime DateOfBirth { get; set; }

    #endregion

    #region ForeignKeys

    [ForeignKey("relationship_id")]
    public int RelationshipId { get; set; }

    [ForeignKey("nationality_id")]
    public int? NationalityId { get; set; }

    [ForeignKey("student_id")]
    public int StudentId { get; set; }
    
    #endregion

    #region Navigation Properties

    public virtual Student Student { get; set; }
    public virtual Nationality Nationality { get; set; }
    public virtual Relationship Relationship { get; set; }
    
    #endregion
}
