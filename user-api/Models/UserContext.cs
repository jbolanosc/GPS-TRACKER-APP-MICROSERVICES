using Microsoft.EntityFrameworkCore;

namespace user_api.Models
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {

        }
        public DbSet<User> UserItems { get; set; }
    }
}