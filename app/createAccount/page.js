"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const { user, signup } = useAuth();
  console.log(user);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signup(data.email, data.password);
      // Redirect after successful signup
      setData({ name: "", email: "", password: "" });   
      router.push("/"); // Redirect to login page
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-[#204d91] w-[70%] h-[80vh] flex rounded-xl justify-center items-center">
        <div className="bg-white w-[60vh] h-[60vh] rounded-xl flex flex-col items-center justify-around p-5">
          <div className="text-2xl font-semibold">Create an account</div>

          <form className="flex flex-col space-y-2" onSubmit={handleSignup}>
            <h2>Name</h2>
            <input
              type="text"
              name="user_name"
              className="border border-gray-300 h-[35px] rounded-md p-2"
              required
              value={data.name}
              onChange={(e) => {
                setData({
                  ...data,
                  name: e.target.value,
                });
              }}
              placeholder="Your name"
            />

            <h2>Email</h2>
            <input
              type="email"
              name="user_email"
              className="border border-gray-300 h-[35px] rounded-md p-2"
              required
              value={data.email}
              onChange={(e) => {
                setData({
                  ...data,
                  email: e.target.value,
                });
              }}
              placeholder="Email"
            />
            <h2>Password</h2>
            <input
              type="password"
              name="user_password"
              className="border border-gray-300 h-[35px] rounded-md p-2 "
              required
              value={data.password}
              onChange={(e) => {
                setData({
                  ...data,
                  password: e.target.value,
                });
              }}
              placeholder="Password"
            />

            <span className="flex space-x-2">
              <input type="checkbox" name="remember" />
              <p>Remember me</p>
            </span>

            <button
              className="bg-[#204d91] text-white h-[40px] rounded-md"
              type="submit"
            >
              Sign up
            </button>
          </form>

          <div className="">
            <h4 className="text-sm">
              Already have an account?{" "}
              <button
                className="text-blue-500"
                onClick={() => router.push("/")}
              >
                Login
              </button>
            </h4>
          </div>
        </div>
      </div>
    </main>
  );
}
