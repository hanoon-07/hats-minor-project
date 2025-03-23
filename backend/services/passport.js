import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {getUsersWithEmail, getUsersWithUserId} from "../models/authModel.js";
import bcrypt from "bcrypt";

passport.use(
  new LocalStrategy({usernameField: "email"}, async (email, password, done) => {
    try {
      //console.log(email + " " + password);
      const user = await getUsersWithEmail(email);
      //console.log(user);
      if (user.length < 1) {
        return done(null, false, {error: "Incorrect email or password"});
      } else if (user.length > 1) {
        return done(null, false, {error: "Error  "});
      }
      const isMatch = user[0].password === password;

      if (!isMatch) {
        return done(null, false, {error: "Incorrect email or password"});
      }

      done(null, user[0]);
    } catch (error) {
      done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});
passport.deserializeUser(async (userId, done) => {
  try {
    const user = await getUsersWithUserId(userId);

    if (user.msg) {
      return done(new Error("User not found"));
    }

    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
