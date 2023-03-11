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
        modelBuilder.Entity<Merchant>().HasKey(m => m.MerchantID);
        modelBuilder.Entity<Customer>().HasKey(c => c.CustomerId);
        modelBuilder.Entity<Product>().HasKey(p => p.ProductId);
        modelBuilder.Entity<Store>( s => 
        {
            s.HasKey(s => s.StoreId);

            s.HasOne<Merchant>(s => s.Merchant)
            .WithMany(m => m.Stores)
            .HasForeignKey(s => s.MerchantId);

            s.HasMany<Product>(s => s.Inventory)
            .WithOne(p => p.Store)
            .HasForeignKey(p => p.StoreId);

        });


        modelBuilder.Entity<Order>( 
            o =>
            {
            o.HasKey(d => new { d.CustomerId, d.DateOrdered });

            o.HasOne<Product>(d => d.Product)
            .WithMany(p => p.Orders)
            .HasForeignKey(o => o.ProductId);

            o.HasOne<Customer>()
            .WithMany( o => o.Orders)
            .HasForeignKey(o => o.CustomerId);

            }
        );
    }

}
