using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
	public class Order
	{
		public Guid CustomerId { get; set; }
		public Guid ProductId { get; set; }
		public Product Product { get; set; }
		public int QuantityOrdered { get; set; }
		public DateTime DateOrdered { get; set; }
	}
}
