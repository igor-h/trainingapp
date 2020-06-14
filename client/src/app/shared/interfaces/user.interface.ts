export interface User {
  _id: string;
  fullname: string;
  email:string;
  createdAt: string;
  roles: string[];
  isAdmin: boolean;
}
