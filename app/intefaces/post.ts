import { User } from "./user";

export interface Post {
    id: number;
    content: string;
    userId: number;
    user?: User;
    created_at: Date;
    image: string | null;
  }

  
  export interface PostCount {
    post: number;
    following:number,
    followers:number
  }
  