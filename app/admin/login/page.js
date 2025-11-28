"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

function AdminLogin() {
  const [visibilityword, setvisibilityword] = useState("visibility_off");
  const [adminname, setadminname] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const router = useRouter();

  const changevisibility = () => {
    setvisibilityword((prev) => (prev === "visibility" ? "visibility_off" : "visibility"));
  };

  async function handlelogin(e) {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminname, password }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        router.push("/admin/dashboard");
      } else {
        toast.error(result.message);
        seterror(result.message);
      }
    } catch (err) {
      console.error(err);
      seterror("Something went wrong. Try again!");
    }
  }

  return (
    <div className="flex justify-center flex-col text-white items-center min-h-screen">
      <h1 className="text-2xl font-bold">Admin Panel Login</h1>
      <form onSubmit={handlelogin} className="w-full p-2 flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 w-full md:w-1/3 my-4">
          <label htmlFor="adminname">Admin Name:</label>
          <input
            type="text"
            value={adminname}
            onChange={(e) => {
              setadminname(e.target.value);
              seterror("");
            }}
            className="bg-white rounded-lg py-2 px-1 text-black"
            placeholder="Enter Admin Name"
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/3 my-4">
          <label htmlFor="password">Password:</label>
          <div className="w-full flex justify-center items-center gap-2">
            <input
              type={visibilityword === "visibility" ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
                seterror("");
              }}
              className="bg-white w-[90%] rounded-lg py-2 px-1 text-black"
              placeholder="Enter Your Password"
            />
            <span
              onClick={changevisibility}
              className="material-symbols-outlined relative text-black active:scale-95 bg-white rounded-full p-1 cursor-pointer"
            >
              {visibilityword}
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#00ffff] cursor-pointer px-2 py-1 rounded-lg text-black active:scale-95"
        >
          Submit
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <ToastContainer />
    </div>
  );
}

export default AdminLogin;
