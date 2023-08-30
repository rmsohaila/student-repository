using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cap_NoArch.Data.Entities;

public class Student : BaseEntity
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

    [ForeignKey("nationality_id")]
    public int? NationalityId { get; set; }

    #endregion

    #region Navigation Properties

    public virtual Nationality Nationality { get; set; }

    public virtual IList<FamilyMember> FamilyMembers { get; set; } = new List<FamilyMember>();

    #endregion
}
