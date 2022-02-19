using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryExampleBE.Infrastructure.Model
{
    public class Book
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int OverdueDays { get; set; }
        public int Quantity { get; set; }

        public ICollection<BookRent> BookRents { get; set; }
    }
}
