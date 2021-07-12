const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const FormSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  mem_count: {
    type: Number,
  },
  s_status: {
    type: Boolean,
    default: false,
  },
  mem1: {
    type: String,
    uppercase: true,
  },

  mem2: {
    type: String,
    uppercase: true,
  },
  mem3: {
    type: String,
    uppercase: true,
  },
  s_internal: {
    type: String,
    trim: true,
  },
  s_external: {
    type: String,
    trim: true,
  },
  s_Proj_title: {
    type: String,
    trim: true,
  },
  s_organization: {
    type: String,
    trim: true,
  },
});

const studentSchema = new mongoose.Schema({
  id: {
    type: String,
    uppercase: true,
  },
  groupid: {
    type: Number,
    default: 0,
  },
  s_name: {
    type: String,
    trim: true,
  },
  isSUBMIT: {
    type: Boolean,
    default: false,
  },
  isINVITE: {
    type: Boolean,
    default: false,
  },
  isACCEPTED: {
    type: Boolean,
    default: false,
  },
  s_rollno: {
    type: String,
    trim: true,
  },
  s_email: {
    type: String,
    trim: true,
  },
  s_batch: {
    type: Number,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  s_contact: {
    type: String,
    trim: true,
  },
  s_department: {
    type: String,
    trim: true,
  },
  s_tokens: [
    {
      token: String,
    },
  ],
  formdata: {
    type: FormSchema,
    default: () => ({}),
  },
  groupRequest: {
    type: String,
  },
});

const u = "user";

studentSchema.pre("save", async function (req, res, next) {
  // console.log("run");
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});
// userSchema.methods.addData = async function (stu1_id, stu2_id, stu3_id) {
//   try {
//     // console.log("run", { name1, rollno1, name2, rollno2 });
//     if (!stu3id) {
//       this.s_members.concat({ stu1_id, stu2_id });
//     } else {
//       this.s_members.concat({ stu1_id, stu2_id, stu3_id });
//     }
//     // this.s_members = this.s_members.concat({ name1, rollno1, name2, rollno2 });
//     // this.messages = this.messages.concat({ name, email, message });
//     this.save();
//   } catch (error) {
//     console.log(error);
//   }
// };
studentSchema.methods.addform = async function () {
  console.log("runed");
  this.formdata = this.formdata.concat({ mem_count: 4 });
  this.save();
};

studentSchema.methods.getToken = async function () {
  try {
    const tok = jwt.sign({ _id: this._id.toString() }, process.env.SECRET);

    this.s_tokens = this.s_tokens.concat({ token: tok });
    this.save();
    return tok;
  } catch (error) {
    console.log(error);
  }
};

const student = mongoose.model("student", studentSchema);
const doc = student();

module.exports = student;
