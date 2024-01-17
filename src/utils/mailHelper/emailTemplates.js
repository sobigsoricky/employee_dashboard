import { Subject } from "@mui/icons-material";
import { createMailOptions } from "./sendMail";

export function TEMPLATE_VERIFY_YOUR_EMAIL(from, to, otp) {
  const subject = "Verify Your Email";
  const html = `<p> Enter <b>${otp} </b> in the app to verify your email address and complete signup</p><p>This code <b> expires in 1 hour </b></p>`;
  return createMailOptions(from, to, subject, html);
}