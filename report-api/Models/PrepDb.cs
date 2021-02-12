using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;

namespace report_api.Models
{
    public static class PrepDB
    {
        public static void PrepPopulation(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                SeedData(serviceScope.ServiceProvider.GetService<ReportContext>());
            }
        }

        public static void SeedData(ReportContext context)
        {
            System.Console.WriteLine("Applying migrations...");

            context.Database.Migrate();

            if (!context.ReportItems.Any())
            {
                System.Console.WriteLine("Seeding..");
                context.ReportItems.AddRange(
                    new Report() { type = "THIEFT", description = "device stolen days ago", gps = 1, owner = 1 },
                    new Report() { type = "LOST", description = "computer lost", gps = 2, owner = 2 },
                    new Report() { type = "LOST", description = "phone lost", gps = 3, owner = 1 }
                );
                context.SaveChanges();
            }
            else
            {
                System.Console.WriteLine("Already with data not seeding...");
            }

        }
    }
}