using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Customer
	{
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid CustomerId { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public string PhoneNumber { get; set; }
		public string PassWord { get; set; }
		public string Username { get; set; }
		public ICollection<Order> Orders { get; set; }
	}
}
