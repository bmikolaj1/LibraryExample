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

            CreateMap<BookRent, BookRentDTO>()
                //calculate corrent numOfPastDueDays
                .ForMember(dest => dest.NumOfPastDueDays, opt => opt.MapFrom(src => (src.EndOfRent - src.StartOfRent).TotalDays >= src.Book.OverdueDays
                                                                                                ? (src.EndOfRent - src.StartOfRent).TotalDays - src.Book.OverdueDays 
                                                                                                : 0 ))
                .ForMember(dest => dest.BookName, opt => opt.MapFrom(src => src.Book.Name))
                .ForMember(dest => dest.FirstLastName, opt => opt.MapFrom(src => $"{src.User.FirstName} {src.User.LastName}"));

        }
    }
}
