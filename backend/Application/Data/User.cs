using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Data
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string StreetName { get; set; }
        [Required]
        public string HouseNumber { get; set; }
        public int? ApartmentNumber { get; set; }
        [Required]
        public string PostalCode { get; set; }
        [Required]
        public string Town { get; set; }
        [Required]
        public int PhoneNumber { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
    }
}
