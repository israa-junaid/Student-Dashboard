const user = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const signup = async (req, res) => {
  //getting values from client

  try {
    // console.log(req.body);
    const {
      s_name,
      s_email,
      password,
      s_department,
      s_batch,

      s_rollno,
      s_contact,
    } = req.body;
    //checking that if email already exists
    const verify_e = await user.findOne({s_email});

    //******************IF EMAIL EXISTS SEND DUPLICATE STATUS */

    if (verify_e) {
      return res.status(409).send("email exists");
    }

    const add = await new user({
      id: s_rollno,
      s_name,
      s_email,
      password,
      s_batch,
      s_rollno,
      s_contact,
      s_department,
      // s_members: [{ stu1_id: "1", stu2_id: "2", stu3_id: "3" }],
    });

    //saving in database

    const result = await add.save();
    // console.log(result, "the result");
    // console.log(addData.email);
    res.send("Sucess signup");
  } catch (error) {
    res.status(400).send("error hay");
  }
};

//for form data
const formdata = async (req, res) => {
  //getting values from client

  try {
    // console.log(req.body);
    const {
      id,
      s_leader,
      s_organization,
      s_internal,
      s_external,
      s_proj_title,
      s_status,
      stu1_id,
      stu2_id,
      stu3_id,
      s_name1,
      s_name2,
      s_name3,
      group_count,
    } = req.body;
    const leaderfinal = await user.find({id: s_leader}, {s_name: 1});
    const ryu = await user.findOne({id: s_leader});

    const groupcount = Number(group_count);

    ryu.formdata = {
      id: stu1_id,
      mem_count: groupcount,
      s_organization,
      mem1: stu1_id,
      mem2: stu2_id,
      mem3: stu3_id,
      s_internal,
      s_external,
      s_proj_title,
    };
    const doc1 = await ryu.save();
    console.log(doc1);

    if (group_count == 2) {
      if (s_leader == stu1_id.toUpperCase()) {
        const status_res1 = await user.updateOne(
          {id: stu1_id},
          {$set: {isSUBMIT: true, isACCEPTED: true, groupRequest: stu1_id}}
        );
        const status_res2 = await user.updateOne(
          {id: stu2_id},
          {$set: {isSUBMIT: true, groupRequest: stu1_id}}
        );

        //okay functionality

        // console.log("leader is student 1");
      } else if (s_leader == stu2_id.toUpperCase()) {
        const status_res1 = await user.updateOne(
          {id: stu1_id},
          {$set: {isSUBMIT: true, groupRequest: stu2_id}}
        );
        const status_res2 = await user.updateOne(
          {id: stu2_id},
          {$set: {isSUBMIT: true, isACCEPTED: true, groupRequest: stu2_id}}
        );
        // console.log("leader is student 2");
        // console.log(status_res1);
      }
      const count = 2;
      //***sending mail function */
      sendMail(count, stu1_id, stu2_id, stu3_id, s_leader);
    } else if (group_count == 3) {
      if (s_leader == stu1_id.toUpperCase()) {
        const status_res1 = await user.updateOne(
          {id: stu1_id},
          {$set: {isSUBMIT: true, isACCEPTED: true, groupRequest: stu1_id}}
        );
        const status_res2 = await user.updateOne(
          {id: stu2_id},
          {$set: {isSUBMIT: true, groupRequest: stu1_id}}
        );
        const status_res3 = await user.updateOne(
          {id: stu3_id},
          {$set: {isSUBMIT: true, groupRequest: stu1_id}}
        );
        // console.log("leader is student 1");
      }
      // else if (s_leader == stu2_id.toUpperCase()) {
      //   const status_res1 = await user.updateOne(
      //     {id: stu1_id},
      //     {$set: {isSUBMIT: true, groupRequest: stu2_id}}
      //   );
      //   const status_res2 = await user.updateOne(
      //     {id: stu2_id},
      //     {$set: {isSUBMIT: true, isACCEPTED: true, groupRequest: stu2_id}}
      //   );
      //   const status_res3 = await user.updateOne(
      //     {id: stu3_id},
      //     {$set: {isSUBMIT: true, groupRequest: stu2_id}}
      //   );
      //   // console.log("leader is student 2");
      // } else if (s_leader == stu3_id.toUpperCase()) {
      //   const status_res1 = await user.updateOne(
      //     {id: stu1_id},
      //     {$set: {isSUBMIT: true, groupRequest: stu3_id}}
      //   );
      //   const status_res2 = await user.updateOne(
      //     {id: stu2_id},
      //     {$set: {isSUBMIT: true, groupRequest: stu3_id}}
      //   );
      //   const status_res3 = await user.updateOne(
      //     {id: stu3_id},
      //     {$set: {isSUBMIT: true, isACCEPTED: true, groupRequest: stu3_id}}
      //   );
      // }
      //   //*sendMail
      sendMail(group_count, stu1_id, stu2_id, stu3_id, s_leader);
    }
    // console.log(mail2, mail1, mail3);
    res.send("Sucess form");
  } catch (error) {
    res.status(400).send("error hay");
  }
};
//for login
const login = async (req, res) => {
  try {
    const {email, pass} = req.body;
    //finding the user if exiss
    const person = await user.findOne({s_email: email});
    // console.log(person, "perspn");
    if (!person) {
      return res.status(404).send("INVALID CREDENTIALS");
    }
    //****if user exists  matching the password */
    const match = await bcrypt.compare(pass, person.password);
    // console.log(match);
    // *********************************IF MATCH CREATE JWT TOKEN TAHT WILL EXPIRES IN 45 MINUTES***//
    if (match) {
      const token = await person.getToken();

      // console.log(token);
      var infortyfiveMinutes = new Date(new Date().getTime() + 45 * 60 * 1000);
      // console.log(inFifteenMinutes, "minutes");
      res.cookie("jwt", token, {
        expires: infortyfiveMinutes,
      });
      //*******************SENDING THE RESPONSE TO CLIENT IF SUCCCESS */

      return res.json({
        personid: person.id,
        name: person.s_name,
        email: person.s_email,
        contact: person.s_contact,
        isSUBMIT: person.isSUBMIT,
        isINVITE: person.isINVITE,
        isACCEPTED: person.isACCEPTED,
        department: person.s_department,
      });
    } else {
      res.cookie("jwt", {}, {maxAge: -1});
      return res.status(401).send("INVALID CREDENTIALS");
    }
  } catch (error) {
    res.clearCookie("jwt");
    res.status(401).send("INVALID CREDENTIALS");
  }
};
//*****CONTROLLER FOR AUTHENTICATION */
const about = async (req, res) => {
  // console.log(req.id, "the id");
  try {
    const result = await user.findOne({id: req.id}, {s_tokens: 0});
    const {
      s_name,
      id,
      s_email,
      s_contact,
      s_department,
      s_batch,
      isSUBMIT,
      isINVITE,
      isACCEPTED,
    } = result;
    res.json({
      personid: id,
      name: s_name,
      email: s_email,
      contact: s_contact,
      department: s_department,
      batch: s_batch,
      isSUBMIT,
      isINVITE,
      isACCEPTED,
    });
  } catch (error) {
    res.status(401).send(error, "ajaj");
  }
};
//***CONTROLLER FOR FETCHING SPECIFIC STUDENT NAME */
const userdata = async (req, res) => {
  try {
    // console.log(req.params);
    const result = await user.findOne(
      {id: req.params.id},
      {s_contact: 1, s_email: 1, s_name: 1}
    );
    // console.log(result);
    res.json({
      contact: result.s_contact,
      email: result.s_email,
      s_name: result.s_name,
    });
  } catch (error) {
    res.status(401).send("NOT EXIST");
  }
};

//***** CONTROLLER FOR FETCHING ALL STUDENT NAME */

const usernames = async (req, res) => {
  const result = await user.find({}, {s_name: 1, _id: 0});
  // console.log(result);
  res.send(result);
};
///***** CONTROLLER FOR FETCHING STUDENT DATA ON THE BASIS OF NAME */
const student_data = async (req, res) => {
  // console.log(req.params);
  if (!req.params) {
    // console.log("no params");
  }
  const result = await user.find(
    {s_name: req.params.name},
    {s_contact: 1, s_email: 1, id: 1}
  );
  // console.log(result);
  res.json({
    contact: result[0].s_contact,
    email: result[0].s_email,
    id: result[0].id,
  });
};

const test = async (req, res) => {
  const ryu = await user.findOne({id: "CT-19000"});

  ryu.formdata.mem_count = 2;
  const doc = await ryu.save();
  // console.log(doc, "the doc");

  res.json({
    name: "asalm",
  });
};

const sendMail = async (count, stu1_id, stu2_id, stu3_id, s_leader) => {
  if (count == 2) {
    ///*****START FOR NODE MAIL  */
    // create reusable transporter object using the default SMTP transport

    const mail1 = await user.findOne(
      {id: stu1_id},
      {s_email: 1, s_name: 1, _id: 0}
    );
    // console.log(mail1.s_email, "mail1");
    const mail2 = await user.findOne(
      {id: stu2_id},
      {s_email: 1, s_name: 1, _id: 0}
    );
    const mail3 = await user.findOne(
      {id: stu3_id},
      {s_email: 1, s_name: 1, _id: 0}
    );

    // console.log(mail1, mail2, "heh");
    const transporter = nodemailer.createTransport({
      service: "hotmail",

      auth: {
        user: "ahmaddddd56@outlook.com",
        pass: "1712ahmad",
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });
    const OutputOF = `<div>
      <h1>Hello Group Members!</h1><br/><h4>You have been invited for the fyp project group formation by ${s_leader} Go and Check dashboard</h4></div>`;

    // send mail with defined transport object
    const list = [`${mail1.s_email}`, `${mail2.s_email}`];
    const mailOptions = {
      from: "ahmaddddd56@outlook.com",
      to: list,
      subject: "FYP PROJECT INVITIATION",
      text: "check mail!",
      html: OutputOF,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    //***END OD NODE MAIL */
    // res.send("mail sended");
  } else if (count == 3) {
    ///*****START FOR NODE MAIL if group members are 3 */
    // create reusable transporter object using the default SMTP transport

    const mail1 = await user.findOne(
      {id: stu1_id},
      {s_email: 1, s_name: 1, _id: 0}
    );
    // console.log(mail1.s_email, "mail1");
    const mail2 = await user.findOne(
      {id: stu2_id},
      {s_email: 1, s_name: 1, _id: 0}
    );
    const mail3 = await user.findOne(
      {id: stu3_id},
      {s_email: 1, s_name: 1, _id: 0}
    );

    // console.log(mail1, mail2, "heh");
    const transporter = nodemailer.createTransport({
      service: "Outlook365",

      auth: {
        user: "ahmaddddd56@outlook.com",
        pass: "1712ahmad",
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });
    const OutputOf = `<div>
      <h1>Hello Group Members!</h1><br/><h4>You have been invited for the fyp project group formation by ${s_leader} Go and Check dashboard</h4></div>`;

    // send mail with defined transport object
    const list = [`${mail1.s_email}`, `${mail2.s_email}`, `${mail3.s_email}`];
    const mailOptions = {
      from: "ahmaddddd56@outlook.com",
      to: list,
      subject: "FYP PROJECT INVITIATION",
      text: "check mail!",
      html: OutputOf,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    //***END OD NODE MAIL */
  }
};
module.exports = {
  signup,
  login,
  about,
  formdata,
  userdata,
  usernames,
  student_data,
  test,
};
