export interface IUser {
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  fullName: string;
  imageUrl: string;
}
