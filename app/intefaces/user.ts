import { PostCount } from "./post";

export interface User {
  isFollowing: any;
  id: number;
  username: string;
  email: string;
  password: string;
  _count?: PostCount;

}

