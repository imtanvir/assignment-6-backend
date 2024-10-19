import { Types } from 'mongoose';
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
  votes: TVotes[] | [];
  premium: boolean;
  category: TCategory;
  comments: TComment[] | [];
  upvote: number;
  downvote: number;
};
