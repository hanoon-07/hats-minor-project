import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "amarnathppp431@gmail.com",
    pass: "fzdnyraydwprwxek",
  },
});

export const sendMail = (to, sub, msg) => {
  transporter.sendMail({
    to: to,
    subject: sub,
    html: msg,
  });
};
export const ForgotEmailFormat = (otp) => {
  return `<div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
      <h2 style="color: #4CAF50;">Password Reset Request</h2>
      <p>Your OTP for password reset is:</p>
      <h1 style="background: #f4f4f4; padding: 10px; display: inline-block; border-radius: 5px;">
        ${otp}
      </h1>
      <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>
    </div>`;
};
