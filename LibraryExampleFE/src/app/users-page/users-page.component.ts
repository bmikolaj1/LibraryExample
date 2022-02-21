import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, switchMap, take } from 'rxjs';
import { IUserDetailsDTO } from 'src/interface/userDetailsDTO.interface';
import { IUserDTO } from 'src/interface/userDTO.interface';
import { UsersPageDetailsComponent } from './users-page-details/users-page-details.component';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  public displayedColumns: string[] = ["firstName", "lastName", "actions"];
  public dataSource: IUserDTO[] = [];
  public isLoading: boolean = false;
  public user: IUserDetailsDTO | undefined;
  
  constructor(private _userService: UsersService, public dialog: MatDialog) { }

  ngOnInit(): void {
   this.refreshGrid();
  }

  public refreshGrid(): void{
    this.isLoading = true;
    this._userService.getUsers().subscribe((result) => {
      this.isLoading = false;
      this.dataSource = result;
      });
  }

  public getUser(id: number): void{
    this._userService.getUser(id).pipe(map((user: IUserDetailsDTO) => {
      user.dob = new Date(user.dob);
      return user;
    })).subscribe((result) => {
      this.user = result;
      this.openDialog();
    })
  }

  public openDialog(): void{
    let form = this._userService.createUserForm(this.user);
     
    const dialogRef = this.dialog.open(UsersPageDetailsComponent, {
      width: '600px',
      data: form
   });

   const subscribeDialog = dialogRef.componentInstance.onSave.subscribe((data) => {
    let formValue = data.value;
    let user: IUserDetailsDTO = {id: formValue.id, firstName: formValue.firstName,lastName: formValue.lastName, dob: formValue.dob, contacts: formValue.contacts };

    const request = user.id !== 0 ? this._userService.editUser(user) : this._userService.adduser(user);

    request.pipe(take(1)).subscribe((result) =>{
      //display notification message based on result 
      this.refreshGrid();
    })
      
   
  });

  dialogRef.afterClosed().subscribe(result => {      
    this.user = undefined;
    subscribeDialog.unsubscribe();
  });

  }

  public deleteUser(id: number): void{
    this._userService.deleteUser(id).subscribe((result) =>{
      this.refreshGrid();
    })
  }


}
