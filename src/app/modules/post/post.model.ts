import { model, Schema } from 'mongoose';
import { TPost } from './post.interface';

const postSchema = new Schema<TPost>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    premium: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ['Tip', 'Story'],
      default: 'Story',
    },
    upvote: {
      type: Number,
      default: 0,
    },
    downvote: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    comment: {
      type: [
        {
          _id: false,
          author: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
          postId: {
            type: Schema.Types.ObjectId,
            ref: 'post',
            required: true,
          },
        },
      ],
      ref: 'comment',
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const PostModel = model<TPost>('post', postSchema);
