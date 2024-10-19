import { Types } from 'mongoose';
import { TImage } from '../user/user.interface';
export type TCategory = 'Tip' | 'Story';
export type TComment = {
  author: Types.ObjectId;
  comment: string;
  postId: Types.ObjectId;
};
export type TVotes = {
  userId: Types.ObjectId;
  voteType: 'upvote' | 'downvote';
};
export type TPost = {
  user: Types.ObjectId;
  id: Types.ObjectId;
  title: String;
  content: String;
  published: Boolean;
  image: TImage[];
  votes: TVotes[] | [];
  premium: boolean;
  category: TCategory;
  comments: TComment[] | [];
  upvote: number;
  downvote: number;
};
