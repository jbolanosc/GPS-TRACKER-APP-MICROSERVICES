using Microsoft.EntityFrameworkCore;

namespace owner_api.Models
{
    public class OwnerContext : DbContext
    {
        public OwnerContext(DbContextOptions<OwnerContext> options) : base(options)
        {

        }

        public DbSet<Owner> OwnerItems { get; set; }
    }
}