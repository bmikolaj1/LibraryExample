import { IUserDTO } from "./userDTO.interface";

export interface IUserDetailsDTO extends IUserDTO{
    dob: Date;
}