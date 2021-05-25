export class User {
  Id?: string;
  FirstName: string;
  LastName: string;
  DisplayName?: string;
  Email?: string | null | undefined;
  Password?: string;
  PhotoUrl?: string;

  constructor({Id, FirstName, LastName, DisplayName, Email, Password, PhotoUrl}: any) {
    this.Id = Id;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.DisplayName = DisplayName;
    this.Email = Email;
    this.Password = Password;
    this.PhotoUrl = PhotoUrl;
  }
}
