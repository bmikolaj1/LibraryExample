using AutoMapper;
using LibraryExampleBE.Business.Models.DTO;
using LibraryExampleBE.Business.Services.Interfaces;
using LibraryExampleBE.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace LibraryExampleBE.Business.Services
{
    public class BookService : IBookService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public BookService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<BookRentDTO>> GetAll()
        {
            var bookRents = await _context.BookRent.Include(b => b.Book).Include(b => b.User).ToListAsync();
            return _mapper.Map<IEnumerable<BookRentDTO>>(bookRents);
        }
    }
}
