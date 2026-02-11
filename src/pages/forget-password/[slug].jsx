import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IoEye, IoEyeOff } from "react-icons/io5";
import toast from "react-hot-toast";
import AuthLayout from "../common/AuthLayout";
import Listing from "../api/Listing";

export default function Index() {
  const router = useRouter();
  const [Regs, setRegs] = useState({
    token: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Update token once router query is ready


  const [newPasswordStrength, setNewPasswordStrength] = useState("");
  const [confirmPasswordStrength, setConfirmPasswordStrength] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setRegs((prevState) => ({ ...prevState, [name]: value }));

    if (name === "newPassword") {
      const strength = checkPasswordStrength(value);
      setNewPasswordStrength(strength);
    }

    if (name === "confirmPassword") {
      const strength = checkPasswordStrength(value);
      setConfirmPasswordStrength(strength);
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[@$!%*?&#]/.test(password)
    ) {
      return "Strong";
    }
    return "Medium";
  };

  async function handleForms(e) {
    e.preventDefault();
    if (loading) {
      return false;
    }

    if (newPasswordStrength !== "Strong") {
      toast.error(
        "Weak password. Use at least 6 characters, with letters, numbers, and special characters."
      );
      return;
    }

    if (Regs.newPassword !== Regs.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    const main = new Listing();
    try {
      const response = await main.ForgetPassword({
        token :router?.query?.slug, 
        newPassword :Regs.newPassword
      });
      if (response?.data) {
        toast.success(response.data.message);
        router.push("/login");
      }
    } catch (error) {
      console.log("error", error?.response);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const newPasswordStrengthColor =
    newPasswordStrength === "Strong"
      ? "text-green-500"
      : newPasswordStrength === "Medium"
        ? "text-yellow-500"
        : "text-red-500";

  const confirmPasswordStrengthColor =
    confirmPasswordStrength === "Strong"
      ? "text-green-500"
      : confirmPasswordStrength === "Medium"
        ? "text-yellow-500"
        : "text-red-500";

  return (
    <div className="bg-white h-full min-h-screen">
      <div className="w-[90%] max-w-[580px] bg-white rounded-[10px] mx-auto mt-[80px] py-[15px] md:py-[40px]">
        <h2 className="font-manpore font-[600] text-black text-center text-[25px] lg:text-[30px] md:text-[40px] lg:text-[48px] leading-[28px] md:leading-[40px] lg:leading-[48px] mb-[10px] md:mb-[20px]">
          Forgot Password
        </h2>
        <form onSubmit={handleForms} className="login-form p-[15px] md:p-[30px] pb-[0]">
          <div className="mb-5 relative">
            <input
              type={showNewPassword ? "text" : "password"}
              autoComplete="new-password"
              name="newPassword"
              onChange={handleInputs}
              value={Regs.newPassword}
              placeholder="Enter new password.."
              className="w-full px-4 lg:px-5 py-2 border h-[48px] lg:h-[56px] border-[#F4F6F8] rounded-[6px] lg:rounded-[10px] bg-[#F4F6F8] focus:outline-none focus:ring-1 focus:ring-[#c9c9c9]"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute top-[20px] right-5"
            >
              {showNewPassword ? (
                <IoEyeOff size={24} className="text-black" />
              ) : (
                <IoEye size={24} className="text-black" />
              )}
            </button>
            <p className={`mt-2 text-sm font-semibold ${newPasswordStrengthColor}`}>
              {newPasswordStrength && `${newPasswordStrength} Password`}
            </p>
          </div>

          <div className="mb-5 relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              name="confirmPassword"
              onChange={handleInputs}
              value={Regs.confirmPassword}
              placeholder="Confirm new password.."
                className="w-full px-4 lg:px-5 py-2 border h-[48px] lg:h-[56px] border-[#F4F6F8] rounded-[6px] lg:rounded-[10px] bg-[#F4F6F8] focus:outline-none focus:ring-1 focus:ring-[#c9c9c9]"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-[20px] right-5"
            >
              {showConfirmPassword ? (
                <IoEyeOff size={24} className="text-black" />
              ) : (
                <IoEye size={24} className="text-black" />
              )}
            </button>
            <p className={`mt-2 text-sm font-semibold ${confirmPasswordStrengthColor}`}>
              {confirmPasswordStrength && `${confirmPasswordStrength} Password`}
            </p>
          </div>
          <div className="mb-5 text-center">
            <button
              type="submit"
              disabled={loading}
                 className="w-full cursor-pointer border border-[rgba(0,0,0,0.1)] bg-[#55844D] hover:bg-green-700 uppercase text-white py-3.5 cursor-pointer rounded-[10px] font-bold text-base transition"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
