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

            CreateMap<UserDTO, UserDetailsDTO>();

            CreateMap<User, UserDetailsDTO>()
                .ForMember(dest => dest.Dob, opt => opt.MapFrom(src => src.DoB.ToLocalTime()));
            CreateMap<UserDetailsDTO, User>()
                .ForMember(dest => dest.DoB, opt => opt.MapFrom(src => src.Dob.ToLocalTime()));
            CreateMap<ContactDTO, Contact>();

            CreateMap<Contact, ContactDTO>(); 

        }
    }
}
