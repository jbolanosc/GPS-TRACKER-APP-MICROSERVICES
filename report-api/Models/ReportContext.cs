using Microsoft.EntityFrameworkCore;

namespace report_api.Models
{
    public class ReportContext : DbContext
    {
        public ReportContext(DbContextOptions<ReportContext> options) : base(options)
        {

        }

        public DbSet<Report> ReportItems { get; set; }
    }
}