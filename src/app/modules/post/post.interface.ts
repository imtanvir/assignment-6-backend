import { Types } from 'mongoose';
export type TCategory = 'Tip' | 'Story';
export type TComment = {
  author: Types.ObjectId;
  comment: string;
  postId: Types.ObjectId;
};
export type TPost = {
  user: Types.ObjectId;
  id: Types.ObjectId;
  premium: boolean;
  category: TCategory;
  comment: TComment[] | null;
  upvote: number;
  downvote: number;
};
