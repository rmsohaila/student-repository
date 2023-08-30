﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Cap_NoArch.Data.Entities;

public abstract class BaseEntity
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
