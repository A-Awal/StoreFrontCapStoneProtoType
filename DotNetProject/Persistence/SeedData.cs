using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class SeedData
    {
        public static async Task Seed(AppDataContext context)
        {

            var customers = new List<Customer>
                {
                    new Customer
                    {
                        Email = "chipo@test.com",
                        FirstName = "Chipo",
                        LastName = "Poolo",
                        PhoneNumber = "0298827",
                        Username = "Chipoolopoolo",
                        PassWord = "Pa$$w0rd",
                    },
                     new Customer
                    {
                        Email = "boole@test.com",
                        FirstName = "Boole",
                        LastName = "ata",
                        PhoneNumber = "0298827",
                        Username = "Boleeta",
                        PassWord = "Pa$$w0rd",
                    },
                      new Customer
                    {
                        Email = "giri@test.com",
                        FirstName = "Gire",
                        LastName = "Gire",
                        PhoneNumber = "0298827",
                        Username = "Girigiri",
                        PassWord = "Pa$$w0rd",
                    },
                       new Customer
                    {
                        Email = "riginal@test.com",
                        FirstName = "Oroginal",
                        LastName = "Fawat",
                        PhoneNumber = "0298827",
                        Username = "Fawwat",
                        PassWord = "Pa$$w0rd",
                    },

                };
            await context.Customers.AddRangeAsync(customers);
            await context.SaveChangesAsync();

            var merchants = new List<Merchant>
                {
                    new Merchant
                    {
                        Email = "hansome@mer.com",
                        FirstName = "hansome",
                        LastName = "General",
                        PhoneNumber = "02036478",
                        Password = "Pa$$w0rd",

                    },
                    new Merchant
                    {
                        Email = "maili@mer.com",
                        FirstName = "linsu",
                        LastName = "maili",
                        PhoneNumber = "02036478",
                        Password = "Pa$$w0rd",

                    },
                    new Merchant
                    {
                        Email = "grendel@mer.com",
                        FirstName = "Grendel",
                        LastName = "Wiglaf",
                        PhoneNumber = "020037478",
                        Password = "Pa$$w0rd",

                    },
                    new Merchant
                    {
                        Email = "smith@mer.com",
                        FirstName = "Sonia",
                        LastName = "Smith",
                        PhoneNumber = "0206737478",
                        Password = "Pa$$w0rd",

                    },
                    new Merchant
                    {
                        Email = "Kofi@mer.com",
                        FirstName = "Kofi",
                        LastName = "yeboa",
                        PhoneNumber = "02036478",
                        Password = "Pa$$w0rd",

                    }
                };
            await context.Merchants.AddRangeAsync(merchants);
            await context.SaveChangesAsync();

            var mer = await context.Merchants.ToListAsync();

            var stores = new List<Store>
            {
                new Store
                {
                    MerchantId = mer[1].MerchantID,
                    StoreCategory = "Inventory",

                },
                new Store
                {
                    MerchantId = mer[1].MerchantID,
                    StoreCategory = "someOther",

                },
                new Store
                {
                    MerchantId = mer[4].MerchantID,
                    StoreCategory = "Please Suggest",

                },
                new Store
                {
                    MerchantId = mer[4].MerchantID,
                    StoreCategory = "I don't Know",

                },
                new Store
                {
                    MerchantId = mer[0].MerchantID,
                    StoreCategory = "Don't as me that again",

                },
                new Store
                {
                    MerchantId = mer[2].MerchantID,
                    StoreCategory = "I Vex now",

                },

            };
            await context.Stores.AddRangeAsync(stores);
            await context.SaveChangesAsync();

            var sto = await context.Stores.ToListAsync();

            var products = new List<Product>
            {
                new Product
                {
                    ProductCategory = "Finace",
                    ProductDescription = "Banking and other services",
                    ProductName = "Life assurance",
                    StoreId = sto[0].StoreId,
                },
                new Product
                {
                    ProductCategory = "Inventory",
                    ProductDescription = "cement",
                    ProductName = "Gacem",
                    StoreId = sto[3].StoreId,
                },
                new Product
                {
                    ProductCategory = "Inventory",
                    ProductDescription = "Some Description",
                    ProductName = "Iron Rod",
                    StoreId = sto[1].StoreId,
                },
                new Product
                {
                    ProductCategory = "someCate",
                    ProductDescription = "SomecategoryDescription",
                    ProductName = "SomeProdut",
                    StoreId = sto[0].StoreId,
                },
                
                new Product
                {
                    ProductCategory = "sggs",
                    ProductDescription = "hkahua",
                    ProductName = "jhsghka",
                    StoreId = sto[4].StoreId,
                },

            };
            await context.Products.AddRangeAsync(products);
            await context.SaveChangesAsync();

            var cus = await context.Customers.ToListAsync();
            var pro = await context.Products.ToListAsync();


            var orders = new List<Order>
            {
                new Order
                { 
                    CustomerId = cus[3].CustomerId,
                    DateOrdered = new DateTime().AddDays(9),
                    ProductId = pro[1].ProductId,
                    QuantityOrdered = 30,
                },
                new Order
                {
                    CustomerId = cus[2].CustomerId,
                    DateOrdered = new DateTime().AddDays(5),
                    ProductId = pro[4].ProductId,                   
                    QuantityOrdered = 5,
                },
                new Order
                {
                    CustomerId = cus[3].CustomerId,
                    DateOrdered = new DateTime().AddDays(1),
                    ProductId = pro[3].ProductId,
                    QuantityOrdered = 10,
                },
                new Order
                {
                    CustomerId = cus[2].CustomerId,
                    DateOrdered = new DateTime(),
                    ProductId = pro[0].ProductId,
                    QuantityOrdered = 15,
                },
                new Order
                {
                    CustomerId = cus[0].CustomerId,
                    DateOrdered = new DateTime().AddDays(2),
                    ProductId = pro[4].ProductId,
                    QuantityOrdered = 30,
                },
                new Order
                {
                    CustomerId = cus[3].CustomerId,
                    DateOrdered = new DateTime().AddDays(2),
                    ProductId = pro[1].ProductId,
                    QuantityOrdered = 30,
                },
                new Order
                {
                    CustomerId = cus[0].CustomerId,
                    DateOrdered = new DateTime(),
                    ProductId = pro[1].ProductId,
                    QuantityOrdered = 30,
                },

            };
            await context.Orders.AddRangeAsync(orders);
            await context.SaveChangesAsync();
            
        }
    }
}
