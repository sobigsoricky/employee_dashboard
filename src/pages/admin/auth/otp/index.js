"user client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { BuildCircleTwoTone } from "@mui/icons-material";

const Index = () => {
  const [otpInput, setOtpInput] = useState("");
  const router = useRouter();

  // Retrieve email from localStorage if available
  const email =
    typeof window !== "undefined" ? localStorage.getItem("email") : null;

  const handleChange = (e) => {
    setOtpInput(e.target.value);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp: otpInput,
        }),
      });

      const resJson = await res.json();

      if (resJson.verified) {
        router.push("/admin/profile");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const resendOTP = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/admin/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
        }),
      });

      const resJson = await res.json();

      if (resJson.status === "PENDING") {
        alert("Otp Sent");
      }
    } catch (error) {
      console.error("Error during OTP resend:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-5 rounded-lg">
        <div className="text-center">
          <h2>Email Verification</h2>
          {email && (
            <p className="text-sm font-medium text-gray-400">
              {`We have sent a code to your email ${email}`}
            </p>
          )}
        </div>
        <form onSubmit={submitForm}>
          <div className="flex flex-col space-y-3 mt-4">
            <TextField
              className="form-control text-center"
              type="number"
              min={1000}
              max={9999}
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
            />
            <div className="flex flex-col space-y-4">
              <div className="d-flex align-items-center justify-content-center m-3">
                <Button className="btn--dark">Verify Account</Button>
              </div>
              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't receive the code?</p>{" "}
                <button
                  onClick={resendOTP}
                  className="btn">
                  Resend
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
