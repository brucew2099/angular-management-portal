export class User {
  FirstName: string;
  LastName: string;
  Email?: string;
  Password?: string;
  PhotoUrl?: string;

  constructor({FirstName, LastName, Email, Password, PhotoUrl}: any) {
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.Email = Email;
    this.Password = Password;
    this.PhotoUrl = PhotoUrl;
  }
}
