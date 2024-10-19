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
    image: {
      type: [
        {
          _id: false,
          id: { type: String, required: true },
          url: { type: String, required: true },
          isRemove: { type: Boolean, default: false },
        },
      ],
      default: [],
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
    votes: {
      type: [
        {
          userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
          },
          voteType: {
            type: String,
            enum: ['upvote', 'downvote'],
            required: true,
          },
        },
      ],
      default: [],
    },
    comments: {
      type: [
        {
          author: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
        },
      ],
      ref: 'comment',
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const PostModel = model<TPost>('post', postSchema);
