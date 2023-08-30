using Cap_NoArch.Data;
using Cap_NoArch.Data.Entities;
using Cap_NoArch.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Cap_NoArch.Services;

public class RelationshipService : IRelationshipService
{
    private readonly ApplicationDBContext context;

    public RelationshipService(ApplicationDBContext context)
    {
        this.context = context;
    }

    public async Task<List<Relationship>> GetAllAsync()
    {
        return await this.context.Relationships.ToListAsync();
    }
}
