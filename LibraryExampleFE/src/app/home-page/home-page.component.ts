import { Component, OnInit } from '@angular/core';
import { IBookRentDTO } from 'src/interface/bookRentDTO.interface';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public displayedColumns: string[] = ["bookName","firstLastName", "startOfRent", "endOfRent", "numOfPastDueDays"];
  public dataSource: IBookRentDTO[] = [];
  public isLoading: boolean = false;

  constructor(private _homeService: HomeService) { }

  
  ngOnInit(): void {
   this.refreshGrid();
  }

  public refreshGrid(): void{
    this.isLoading = true;
    this._homeService.getBookRents().subscribe((result) => {
      this.isLoading = false;
      this.dataSource = result;
      });
  }

}