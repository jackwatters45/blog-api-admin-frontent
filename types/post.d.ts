import IUser from './user';
import IComment from './comment';
export interface ILike {
  userId: string;
  date: string;
}

interface IPost {
  _id: string;
  title: string;
  content: string;
  author: Partial<IUser> | string;
  published: boolean;
  tags?: string[];
  topic?: string;
  likes?: ILike[];
  comments?: IComment[] | string[];
  url?: string;
  createdAt: string;
  updatedAt: string;
}

export default IPost;
