using LibraryExampleBE.Business.Models.DTO;

namespace LibraryExampleBE.Business.Services.Interfaces
{
    public interface IBookService
    {
        Task<IEnumerable<BookRentDTO>> GetAll();
    }
}