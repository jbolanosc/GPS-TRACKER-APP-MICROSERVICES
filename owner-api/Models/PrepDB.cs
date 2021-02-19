using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;

namespace owner_api.Models
{
    public static class PrepDB
    {
        public static void PrepPopulation(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                SeedData(serviceScope.ServiceProvider.GetService<OwnerContext>());
            }
        }

        public static void SeedData(OwnerContext context)
        {
            System.Console.WriteLine("Applying migrations...");

            context.Database.Migrate();

            if (!context.OwnerItems.Any())
            {
                System.Console.WriteLine("Seeding..");
                context.OwnerItems.AddRange(
                    new Owner() { firstname = "Josue", lastname = "Bolaños", email = "bolanos.carit@gmail.com", address = "122 mts south", country = "Costa rica", phone = "60403930" },
                    new Owner() { firstname = "Josue", lastname = "Bolaños 2", email = "bolanos.carit2@gmail.com", address = "122 mts south", country = "Costa rica", phone = "60403930" },
                    new Owner() { firstname = "Josue", lastname = "Bolaños 3", email = "bolanos.carit3@gmail.com", address = "122 mts south", country = "Costa rica", phone = "60403930" }
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