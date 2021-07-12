const user = require("../models/user");
require("dotenv").config();
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

    if (group_count == 1) {
      const status_res1 = await user.updateOne(
        {id: stu1_id},
        {$set: {isSUBMIT: true, isACCEPTED: true, groupRequest: stu1_id}}
      );
    }
    if (group_count == 2) {
      if (s_leader == stu1_id.toUpperCase()) {
        const status_res1 = await user.updateOne(
          {id: stu1_id},
          {$set: {isSUBMIT: true, isACCEPTED: true, groupRequest: stu1_id}}
        );
        const status_res2 = await user.updateOne(
          {id: stu2_id},
          {$set: {isSUBMIT: true, isINVITE: true, groupRequest: stu1_id}}
        );

        //okay functionality

        // console.log("leader is student 1");
      } else if (s_leader == stu2_id.toUpperCase()) {
        const status_res1 = await user.updateOne(
          {id: stu1_id},
          {$set: {isSUBMIT: true, isINVITE: true, groupRequest: stu2_id}}
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
      const OutputOF = `<div>
      <h1>Hello Group Members!</h1><br/><h4>You have been invited for the fyp project group formation by ${s_leader} Go and Check dashboard</h4></div>`;
      sendMail(count, stu1_id, stu2_id, stu3_id, s_leader, OutputOF);
    } else if (group_count == 3) {
      if (s_leader == stu1_id.toUpperCase()) {
        const status_res1 = await user.updateOne(
          {id: stu1_id},
          {$set: {isSUBMIT: true, isACCEPTED: true, groupRequest: stu1_id}}
        );
        const status_res2 = await user.updateOne(
          {id: stu2_id},
          {$set: {isSUBMIT: true, isINVITE: true, groupRequest: stu1_id}}
        );
        const status_res3 = await user.updateOne(
          {id: stu3_id},
          {$set: {isSUBMIT: true, isINVITE: true, groupRequest: stu1_id}}
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
      const OutputOF = `<div>
      <h1>Hello Group Members!</h1><br/><h4>You have been invited for the fyp project group formation by ${s_leader} Go and Check dashboard</h4></div>`;
      sendMail(group_count, stu1_id, stu2_id, stu3_id, s_leader, OutputOF);
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
    // *********************************IF MATCH CREATE JWT TOKEN TAHT WILL EXPIRES IN 15 MINUTES***//
    if (match) {
      const token = await person.getToken();

      // console.log(token);
      var inFifteenMinutes = new Date(new Date().getTime() + 45 * 60 * 1000);
      // console.log(inFifteenMinutes, "minutes");
      res.cookie("jwt", token, {
        expires: inFifteenMinutes,
      });
      //*******************SENDING THE RESPONSE TO CLIENT IF SUCCCESS */
      console.log(person, "id");
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
    res.status(401).send("NOT EXIST user");
  }
};

//***** CONTROLLER FOR FETCHING ALL STUDENT NAME */

const usernames = async (req, res) => {
  const result = await user.find({}, {id: 1, _id: 0});
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

  // ryu.formdata.mem_count = 2;
  const doc = await ryu.save();
  // console.log(doc, "the doc");

  res.json({
    name: "asalm",
  });
};

const sendMail = async (
  count,
  stu1_id,
  stu2_id,
  stu3_id,
  s_leader,
  OutputOF
) => {
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
  if (count == 2) {
    ///*****START FOR NODE MAIL  */
    // create reusable transporter object using the default SMTP transport

    // console.log(mail1, mail2, "heh");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "ahmaq098@gmail.com",
        pass: process.env.PASSWORD,
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    const list = [`${mail2.s_email}`];
    const mailOptions = {
      from: "ahmaq098@gmail.com",
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

    // console.log(mail1, mail2, "heh");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "ahmaq098@gmail.com",
        pass: process.env.PASSWORD,
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    const OutputOf = `<div>
      <h1>Hello Group Members!</h1><br/><h4>You have been invited for the fyp project group formation by ${s_leader} Go and Check dashboard</h4></div>`;

    // send mail with defined transport object
    const list = [`${mail2.s_email}`, `${mail3.s_email}`];
    const mailOptions = {
      from: "ahmaq098@gmail.com",
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

//***CONTROLLER FOR THE ACCEPT OR REJECT THE GROUP INVITE */
const updateStatus = async (req, res) => {
  console.log(req.query);
  const {val} = req.query;
  console.log(req.body);

  //****************FIRST CHECKING THAT STUDENT HAS ACCEPTED OR REJECTED THE INVITATION */
  //****if STUDENT HAS ACCEPTED THE INVITE THENN */
  if (val == "true") {
    console.log("student has accpeted the proposal");
    //**FIND THE ID OF THE STUDENT WHO HAS ACCEPTED THE INVITATION */
    const {rollNo} = req.body;
    //***FIND PARTICULAR STUDENT DATA IN ORDER TO UPDATE */
    const findStudent = await user.findOne({id: rollNo});
    //***UPDATING THE STDUENT DATA AS PER ITS REQUEST */
    const updateStudent = await user.updateOne(
      {id: rollNo},
      {isACCEPTED: "true", isINVITE: "false"}
    );
    console.log(findStudent.groupRequest);

    //**  FINDING FOR THE GROUP LEADER IN ORDER TO GET FORM DATA AND ADD IT TO THE RECORD OF STUDENT WHO HAS ACCEPTED THE INVITE */
    const findLeader = await user.findOne({id: findStudent.groupRequest});
    console.log(findLeader.formdata);

    ///****************SAVING TEH FORM DATA OF PARTICULAR INVITATION ACCEPTED  STUDENT */
    findStudent.formdata = findLeader.formdata;
    //**SAVING THE DATA IN DATABASE */
    const doc1 = await findStudent.save();
    console.log(doc1);
    //********************************LETS CHECK THAT EVERYONE HAS ACCEPTED OR NOT */
    console.log(findLeader.formdata.mem_count, "it is your group count");

    //**NOW LETS CHECK FOR GROUP COUNT TO CHECK THAT IF ALL MEMBERS HAS ACCEPTED THEN SEND PEOPOSAL TO INTERNAL ADVISOR */
    if (findLeader.formdata.mem_count == 3) {
      console.log("group members are 3");
      const member1 = findLeader.formdata.mem1;
      const member2 = findLeader.formdata.mem2;
      const member3 = findLeader.formdata.mem3;
      const member1_status = findLeader;
      const member2_status = await user.findOne(
        {id: member2},
        {isACCEPTED: 1, _id: 0}
      );
      const member3_status = await user.findOne(
        {id: member3},
        {isACCEPTED: 1, _id: 0}
      );
      console.log(
        member1_status.isACCEPTED,
        member2_status.isACCEPTED,
        member3_status.isACCEPTED
      );
      //********************************CHECKING EACH GROUP MEMBERS STATUS TO GO AHEAD */
      if (
        member1_status.isACCEPTED &&
        member2_status.isACCEPTED &&
        member3_status.isACCEPTED
      ) {
        console.log("all 3 members has accepted the invite");
      } else {
        console.log("not all the members has accepted");
      }
      // const mem3 =  await user.findOne({id:})

      //***if the group count is 2 */
    } else if (findLeader.formdata.mem_count == 2) {
      console.log("group members are 2");
      const member2 = findLeader.formdata.mem2;
      const member1_status = findLeader;
      const member2_status = await user.findOne(
        {id: member2},
        {isACCEPTED: 1, _id: 0}
      );
      //********************************CHECKING EACH GROUP MEMBERS STATUS TO GO AHEAD */
      if (member1_status.isACCEPTED && member2_status.isACCEPTED) {
        console.log("all 2 members has accepted the invite");
      } else {
        console.log("not all the members has accepted");
      }
    }
  } else if (val == "false") {
    console.log("student has rejected the proposal");
    const {rollNo} = req.body;
    console.log(req.body, "req.body");
    const findStudent = await user.findOne({id: rollNo.toUpperCase()});
    // const findLeader = await user.findOne({id: findStudent.groupRequest});
    const findLeader = await user.findOne({id: findStudent.groupRequest});
    console.log(findLeader, "the leader");
    if (findLeader.formdata.mem_count == 2) {
      console.log(findLeader.formdata.mem_count, "  member rejection");

      //**INITIALLY UPDATE THE PARTICULAR STUDENT RECORD ON REJECTING THE INVITE */
      findStudent.formdata = {};
      findStudent.groupRequest = "";
      findStudent.isINVITE = false;
      findStudent.isSUBMIT = false;
      const doc1 = await findStudent.save();
      ///DONE UPDATING OF PARTICULAR STUDENT RECORD
      //********************************NOW TO UPDATE GROUP LEADER REMOVING MEBER FROM THE GROUP LEADER */
      // findLeader.formdata.mem_count = 2;
      const mem2 = findLeader.formdata.mem2;
      console.log(mem2);
      if (rollNo.toUpperCase() == mem2) {
        console.log("student 2 roll no");
        findLeader.formdata.mem2 = "";
        findLeader.isSUBMIT = false;
        findLeader.isACCEPTED = false;
        findLeader.groupRequest = "";
        const doc = await findLeader.save();
        console.log(doc, "your response");
        console.log("everything updated");
      }
    } else if (findLeader.formdata.mem_count == 3) {
      console.log("3 member rejection");
      //**INITIALLY UPDATE THE PARTICULAR STUDENT RECORD ON REJECTING THE INVITE */
      findStudent.formdata = {};
      findStudent.groupRequest = "";
      findStudent.isINVITE = false;
      findStudent.isSUBMIT = false;
      const doc1 = await findStudent.save();
      ///DONE UPDATING OF PARTICULAR STUDENT RECORD
      //********************************NOW TO UPDATE GROUP LEADER REMOVING MEBER FROM THE GROUP LEADER */
      // findLeader.formdata.mem_count = 2;
      const mem2 = findLeader.formdata.mem2;
      const mem3 = findLeader.formdata.mem3;
      if (rollNo == mem2) {
        console.log("student 2 roll no");
        findLeader.formdata.mem2 = "";
        findLeader.isSUBMIT = false;
        findLeader.isACCEPTED = false;
        const doc = await findLeader.save();
        console.log(doc, "your response");
        console.log("everything updated in mem 2");
      } else if (rollNo == mem3) {
        console.log("student 3 roll no");
        findLeader.formdata.mem3 = "";
        findLeader.isSUBMIT = false;
        findLeader.isACCEPTED = false;
        const doc = await findLeader.save();
        console.log(doc, "your response");
        console.log("everything updated in mem 3");
      }
    }
  }
  res.send("you have hiten the route");
};

const testmai = async (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "ahmaq098@gmail.com",
      pass: process.env.PASSWORD,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
  // const transporter = nodemailer.createTransport({
  //   service: "hotmail",

  //   auth: {
  //     user: "ahmaddddd56@outlook.com",
  //     pass: "1712ahmad",
  //   },
  //   tls: {
  //     // do not fail on invalid certs
  //     rejectUnauthorized: false,
  //   },
  // });
  const OutputOf = `<div>
      <h1>Hello Group Members!</h1><br/><h4>You have been invited for the fyp project group formation by Go and Check dashboard</h4></div>`;

  // send mail with defined transport object
  const list = [`ahmed4100353@cloud.neduet.edu.pk`, `mzlapq639@gmail.com`];
  const mailOptions = {
    from: "ahmaq098@gmail.com",
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
  res.send("mail");
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
  updateStatus,
  testmai,
};
