namespace LibraryExampleBE.Business.Models.DTO
{
    public class BookRentDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int BookId { get; set; }
        public DateTime StartOfRent { get; set; }
        public DateTime EndOfRent { get; set; }
        public int NumOfPastDueDays { get; set; }
        public string BookName { get; set; }
        public string FirstLastName { get; set; }
    }
}
