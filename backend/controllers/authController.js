import {
  getStudentWith_admission,
  createUserData,
  insertInto_student,
  getUsersWithEmail,
  getAll,
} from "../models/authModel.js";
/* import sendMail from "../services/mailService.js"; */
import passport from "../services/passport.js";

export const getAllUsers = async (req, res) => {
  try {
    const result = await getAll(); //class id is provided as 1 , will change later
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const registerStudent = async (req, res) => {
  const {name, email, password, uni, admi_num, roll} = req.body;
  console.log(req.body);
  try {
    if (!name || !email || !password || !admi_num || !uni) {
      return res.status(422).json({message: "All fields are required"});
    }

    if ((await getStudentWith_admission(admi_num)).length > 0) {
      return res.status(409).json({message: "Registered Account"});
    }
    if ((await getUsersWithEmail(email)).length > 0) {
      return res.status(409).json({message: "Registered Account"});
    }

    const result1 = await createUserData(name, email, password, "student");
    console.log(result1);
    const result2 = await insertInto_student(
      result1.user_id,
      roll,
      admi_num,
      uni
    );

    res.status(201).json({ktu_admissionNum: result2.admission_no});
  } catch (error) {
    console.log("in register student" + error);
    res.status(500).json({error: "Something went wrong"});
  }
};

export const registerTeacher = async (req, res) => {
  const {name, email, password} = req.body;
  console.log("in resgister " + {...req.body});
  try {
    if (!name || !email || !password) {
      return res.status(422).json({error: "All fields are required"});
    }

    if ((await getUsersWithEmail(email)).length > 0) {
      return res.status(409).json({error: "Registered Account"});
    }

    const result1 = await createUserData(name, email, password, "teacher");

    res.status(201).json({name: result1.name, email: result1.email});
  } catch (error) {
    console.log("in register teacher" + error);
    res.status(500).json({error: "Something went wrong"});
  }
};

export const loginControl = async (req, res) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return res.status(500).json({error: "Something went wrong"});
    }

    if (!user) {
      return res.status(401).json(info);
    }

    req.login(user, (error) => {
      if (error) {
        return res.status(500).json({error: "Something went wrong"});
      }

      return res.status(200).json({...user, password: "hidden"});
    });
  })(req, res);
};

export const checkAuthControl = async (req, res) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return res
      .status(200)
      .json({success: true, user: {...req.user, password: "hidden"}});
  }
  return res.status(401).json({success: false, message: "Unauthorized"});
};

/* export const sendPassMail = async (req, res) => {
  const {email} = req.body;
  console.log(email);
  try {
    if (!email) {
      return res.status(422).json({error: "Email requierd"});
    }
    //const pass;
    const result = await getUsersWithEmail(email);
    if (result.length <= 0) {
      return res.status(404).json({error: "Invalid Email"});
    }
    const user = result[0];
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Something went wrong"});
  }
}; */

export const logoutControl = async (req, res) => {
  req.logout((error) => {
    if (error) {
      return res.status(500).json({error: "Something went wrong"});
    }
  });
  return res
    .status(204)
    .json({success: true, message: "Logged out Succesfully"});
};
