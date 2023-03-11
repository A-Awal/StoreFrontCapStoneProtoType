using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Merchant
	{
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid MerchantID { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public string PhoneNumber { get; set; }
		public string Password { get; set; }
        public ICollection<Store> Stores { get; set; }
    }
}
