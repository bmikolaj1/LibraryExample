using AutoMapper;
using LibraryExampleBE.Business.Models.DTO;
using LibraryExampleBE.Business.Services.Interfaces;
using LibraryExampleBE.Infrastructure.Context;
using LibraryExampleBE.Infrastructure.Model;
using Microsoft.EntityFrameworkCore;

namespace LibraryExampleBE.Business.Services
{
    public class UserService : IUserService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserDTO>> GetAll()
        {
            List<User>? result = await _context.User.ToListAsync();
            return _mapper.Map<IEnumerable<UserDTO>>(result);
        }

        public async Task<UserDetailsDTO?> GetById(int id)
        {
            User? user = await _context.User.Include(u => u.Contacts).FirstOrDefaultAsync(u => u.Id == id);
            return user is null ? null : _mapper.Map<UserDetailsDTO?>(user);
        }
        public async Task<bool> Create(UserDetailsDTO user)
        {
            User? userDB = _mapper.Map<User>(user);
            if (user is null)
            {
                return false;
            }
            await _context.User.AddAsync(userDB);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> Update(UserDetailsDTO user)
        {
            User? mappedUser = _mapper.Map<User>(user);
            if (user is null)
            {
                return false;
            }

            //need to manualy remove linked entities which were removed on front end
            List<Contact>? userContacs = _context.Contact.Where(i => i.UserId == user.Id).ToList();
            if (userContacs.Any())
            {
                IEnumerable<Contact>? diff = userContacs.Except(mappedUser.Contacts);
                _context.Contact.RemoveRange(diff);
            }

            _context.User.Update(mappedUser);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteById(int id)
        {
            User? user = await _context.User.FirstOrDefaultAsync(u => u.Id == id);
            if (user is null)
            {
                return false;
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }


    }
}
