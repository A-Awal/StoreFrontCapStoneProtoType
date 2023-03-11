using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Product
{
    public class ProductDto
    {
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public string ProductCategory { get; set; }
        public string Unit { get; set; }
        public int Quantity { get; set; }
        public Guid StoreId { get; set; }
        //public Store Store { get; set; }
        //public List<Order> Orders { get; set; }
    }
}
