export class User {
  id?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string | null | undefined;
  photoUrl?: string;

  constructor({id, firstName, lastName, displayName, email, photoUrl}: any) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.displayName = displayName;
    this.email = email;
    this.photoUrl = photoUrl;
  }
}
