using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryExampleBE.Infrastructure.Model
{
    public class BookRent
    {
        [Key]
        public int Id { get; set; }
        public DateTime StartOfRent { get; set; }
        public DateTime EndOfRent { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int BookId { get; set; }
        public Book Book { get; set; }
    }
}
