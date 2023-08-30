using Cap_NoArch.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Cap_NoArch.Data;

public class ApplicationDBContext : DbContext
{
    public ApplicationDBContext(DbContextOptions options) : base(options)
    { }

    #region Overrides
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        foreach (var entry in ChangeTracker.Entries<BaseEntity>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.CreatedAt = DateTime.Now;
                    break;
                case EntityState.Modified:
                    entry.Entity.UpdatedAt = DateTime.Now;
                    break;
            }
        }
        return base.SaveChangesAsync(cancellationToken);
    }
    #endregion

    #region Entities

    public DbSet<Student> Students { get; set; }
    public DbSet<FamilyMember> FamilyMembers { get; set; }
    public DbSet<Nationality> Nationalities { get; set; }
    public DbSet<Relationship> Relationships { get; set; }

    #endregion
}