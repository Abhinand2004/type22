import { Schema, model, models, Types } from "mongoose";

export interface IMessage {
  _id: string;
  chatId: Types.ObjectId;
  senderId: Types.ObjectId;
  content?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    chatId: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export const Message = models.Message || model<IMessage>("Message", MessageSchema);



