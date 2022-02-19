using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryExampleBE.Business.Models.DTO
{
    public class UserDetailsDTO : UserDTO
    {
        public DateTime DoB { get; set; }
    }
}
