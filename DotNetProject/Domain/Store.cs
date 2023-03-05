using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
	public class Store
	{
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid StoreId { get; set; }
		public Guid MerchantId { get; set; }
		public string StoreCategory { get; set; }
        public Merchant Merchant { get; set; }
        public string StoreName { get; set; }
		public ICollection<Product> Inventory { get; set; }
	}
}
