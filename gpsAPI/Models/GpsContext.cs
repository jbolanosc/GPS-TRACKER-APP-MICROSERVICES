using Microsoft.EntityFrameworkCore;

namespace gpsAPI.Models
{
    public class GpsContext : DbContext
    {
        public GpsContext(DbContextOptions<GpsContext> options) : base(options)
        {

        }

        public DbSet<Gps> GpsItems { get; set; }
    }
}