using LibraryExampleBE.Business.Models.DTO;

namespace LibraryExampleBE.Business.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDTO>> GetAll();
        Task<UserDetailsDTO?> GetById(int id);
        Task<bool> Create(UserDetailsDTO user);
        Task<bool> Update(UserDetailsDTO user);
        Task<bool> DeleteById(int id);
    }
}
