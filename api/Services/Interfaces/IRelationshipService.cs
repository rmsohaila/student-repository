using Cap_NoArch.Data.Entities;

namespace Cap_NoArch.Services.Interfaces
{
    public interface IRelationshipService
    {
        Task<List<Relationship>> GetAllAsync();
    }
}