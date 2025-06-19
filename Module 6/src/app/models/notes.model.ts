import { model, Schema } from "mongoose";
import { INote } from "../interfaces/note.interface";

const noteSchema = new Schema<INote>(
  {
    title: { type: String, required: true, trim: true }, // trim er maddhome string er age, pore white space ke remove kore.
    content: { type: String, default: "" },
    category: {
      type: String,
      enum: ["personal", "work", "study", "other"], // enum er maddhome ai option er moddhei category er value hote hobe.
      default: "personal",
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    tags: {
      label: { type: String, required: true },
      color: { type: String, default: "yellow" },
    },
  },
  { versionKey: false, timestamps: true } // mongodb te data insert howerpor __v namer akta property create hoi. Aita automatic create howa off korar jonno versionKey false kore dita hoi. Kono data update korle, kotobar update kora hoiase, ta jana jai Ai version key er maddhome.
);

export const Note = model("Note", noteSchema);
