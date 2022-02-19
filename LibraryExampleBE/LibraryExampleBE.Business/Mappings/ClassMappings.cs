using AutoMapper;
using LibraryExampleBE.Business.Models.DTO;
using LibraryExampleBE.Infrastructure.Model;

namespace LibraryExampleBE.Business.Mappings
{
    public class ClassMappings : Profile
    {
        public ClassMappings()
        {
            CreateMap<User, UserDTO>();

            CreateMap<UserDetailsDTO, User>();

        }
    }
}
