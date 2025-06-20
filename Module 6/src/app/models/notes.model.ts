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
    user: {
      type: Schema.Types.ObjectId, // Jeheto akta collection er _id field ta aikhane bosbe, tai type ta hobe aita.
      ref: "User", // aikhane ref er value hobe,, jei collection er _id ta userId hisabe use korbo. Sei collection er jonno jei model create kora hioase, sei model er name.
      required: true,
    },
  },
  { versionKey: false, timestamps: true } // mongodb te data insert howerpor __v namer akta property create hoi. Aita automatic create howa off korar jonno versionKey false kore dita hoi. Kono data update korle, kotobar update kora hoiase, ta jana jai Ai version key er maddhome.
);

export const Note = model("Note", noteSchema);
