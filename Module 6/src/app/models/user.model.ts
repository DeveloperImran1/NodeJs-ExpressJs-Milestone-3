import bcrypt from "bcryptjs";
import { model, Schema } from "mongoose";
import validator from "validator";
import {
  IAddress,
  IUser,
  UserInstanceMethods,
  UserStaticMethods,
} from "../interfaces/user.interface";
import { Note } from "./notes.model";

const addressSchema = new Schema<IAddress>( // aikhane addressSchema holo userSchemar akta part. Aitake alada kore likha hoiase, jake embedding bole. Embeddig korar main reason holo, IUser interface a address property er jonno alada kore interface create koresi. Jar fole oi address object er moddhe kiki property ase, and tader data type gulo accsess kora jabe. So aikhane userSchemar moddhe jodi addressSchema kortam, tahole vul kono type set korlew red color dia error show korbena. Tai alada kore schema defing koresi. jate error color show hoi.
  {
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
  },
  {
    _id: false, // aita new akta schema howai,, aikhanew _id property add hobe defaultvabe. Tai _id ke false kore dita hobe.
  }
);

const userSchema = new Schema<IUser, UserStaticMethods, UserInstanceMethods>( // age aikhane type hisabe sudho <IUser> silo.But akhon Model<IUser>, UserInstanceMethods  aigulo add koresi. Karon user.interface.ts file UserInstanceMethods name a akta interface create koreci. jar maddhome password hashd korbo.
  {
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
    address: {
      type: addressSchema,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//  Instance mehod
userSchema.method("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

// Static method
userSchema.static("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

// Middleware
// aita document model. Jeita post korar age exicute hobe.
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  console.log("Inside pre save hook", this);
  next();
});

// Ar kono data create hoia, tarpor ai middleware exicute hobe. Because userSchema.post use koreci.
userSchema.post("save", async function (doc, next) {
  console.log(`${doc.email} has been saved`);
  next();
});

userSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    console.log(doc);
    await Note.deleteMany({ user: doc._id });
  }
  next();
});

userSchema.pre("find", async function (next) {
  console.log("Inside the pre find hook");
  next();
});

// amader onek somoi need pore, firstName and lastName nia fullName create korar. But seita jodi mongodb te set kori, tahole redundency create kore. Because firstName and lastName asei. Sudho DB te srote kore memory full kora hobe. So mongodb te add hobena, but mongoose dia data get korle fullName namer akta property thakbe and tader value hobe 2ta namer concat. aita korar jonno schema create korar somoi 2nd perameter a jeikhane timestamps true kori, seikhane ai 2 ta property bosate hobe:  toJSON: { virtuals: true },   toObject: { virtuals: true } and sobar last a ai code ta bosate hobe.
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

export const User = model<IUser, UserStaticMethods>("User", userSchema);
