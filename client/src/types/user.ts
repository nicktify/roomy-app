export class User {
  email: string;
  id: string;
  name: string;
  ownedRooms: [string];
  participantRooms: [string];
  about: string;
  profilePicture: string | null;
  profileBackground: string | null;
  socialMediaLinks: {
    facebook: string,
    instagram: string,
    twitter: string,
  }
}

export class LoginData {
  email: string;
  password: string;
}

export class RegisterData {
  email: string;
  name: string;
  password: string;
}