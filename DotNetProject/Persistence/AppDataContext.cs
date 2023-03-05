using Microsoft.EntityFrameworkCore;
using Domain;

namespace Persistence;
public class AppDataContext: DbContext
{
    public AppDataContext(DbContextOptions<AppDataContext> options): base(options)
    { }

    public DbSet<Merchant> Merchants { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Store> Stores { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Order>().HasKey(o => new { o.CustomerId, o.DateOrdered });
    }

}
