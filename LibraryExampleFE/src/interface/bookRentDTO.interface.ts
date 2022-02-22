export interface IBookRentDTO{
    id: number;
    userId: number;
    bookId: number;
    startOfRent: Date;
    endOfRent: Date;
    numOfPastDueDays: number;
    bookName: string;
    firstLastName: string;
}