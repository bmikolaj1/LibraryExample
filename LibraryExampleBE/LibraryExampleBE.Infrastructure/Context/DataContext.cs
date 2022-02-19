using LibraryExampleBE.Infrastructure.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryExampleBE.Infrastructure.Context
{
    public class DataContext: DbContext
    {
        const string connectionString = "server=DESKTOP-B20SLJP\\LOCAL;database=librarydb;trusted_connection=true";
        public DataContext()
        {

        }
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(connectionString);
        }

        public DbSet<User> User { get; set; }
        public DbSet<Contact> Contact { get; set; }
        public DbSet<Book> Book { get; set; }
        public DbSet<BookRent> BookRent { get; set; }
    }
}
