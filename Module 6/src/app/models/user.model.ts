import { model, Schema } from "mongoose";
import validator from "validator";
import { IUser } from "../interfaces/user.interface";
const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: [true, "Frist name keno daw nai?? "],
    trim: true,
    minlength: 8, // minlength or maxlength use hoi string a. String er length ke bujhai.
    maxlength: [10, "firstName length maximum 10, got "],
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: [true, "Common hoia gese ai email!!"],
    lowercase: true,
    required: true,
    trim: true,
    // validate: {   // Customvabe email ke validate koresi
    //   validator: function (value) {
    //     return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
    //   },
    //   message: function (props) {
    //     return `Email is not valid ${props.value}`;
    //   },
    // },

    // validate npm use kore email ke validate korbo
    validate: [validator.isEmail, "This email in not valid {VALUE}"],
  },
  age: {
    type: Number,
    required: true,
    min: 20, // min and max use hoi number type a. Aikhane charecter ke bujhai na. Number ta 20 er theke getter then hote hobe, aita bujhai.
    max: [50, "age maximum 50, got {VALUE}"], // data send korar somoi, validation a error asle, error message tader moto kore dito. But amra error message ke modify kore amader moto kore likhte pari. Ar double cottation er moddhe {VALUE} dila. User er send kora value ta dynamicaly show hobe.
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    uppercase: true,
    // enum: ["USER", "ADMIN", "SUPERADMIN"],  // aita sudho value gulo diaci, error hole mongoose tader error message show korbe. Amra custom error message dita chaila nicher moto kore dibo.
    enum: {
      values: ["USER", "ADMIN", "SUPERADMIN"],
      message: "User, admin, superadmin er moddhe value dita hobe",
    },
    default: "USER",
  },
});

export const User = model("User", userSchema);
