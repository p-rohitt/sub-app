"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import db from "config/firebase";
export default function Home() {
  const router = useRouter();

  const { user, login } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      await login(data.email, data.password);
      alert("logged in");
      const subs = await db
        .collection("customers")
        .doc(user.uid)
        .collection("subscriptions")
        .get();
      subs.size > 0
        ? router.push("/subscribed")
        : router.push("/subscriptions");


    } catch (err) {
      alert("Login Unsuccessful! Please check your credentials.");
      setData({ email: "", password: "" });
      console.log(err);
    }

  
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-[#204d91] w-[70%] h-[80vh] flex rounded-xl justify-center items-center">
        <div className="bg-white w-[60vh] h-[60vh] rounded-xl flex flex-col items-center justify-around p-5">
          <div className="text-2xl font-semibold">Login to your account</div>

          <form className="flex flex-col space-y-3" onSubmit={handleLogin}>
            <h2>Email</h2>
            <input
              type="email"
              value={data.email}
              onChange={(e) =>
                setData({
                  ...data,
                  email: e.target.value,
                })
              }
              required
              placeholder="Email"
              className="border border-gray-300 h-[35px] rounded-md p-2"
            />

            <h2>Password</h2>
            <input
              type="password"
              onChange={(e) =>
                setData({
                  ...data,
                  password: e.target.value,
                })
              }
              value={data.password}
              required
              placeholder="Password"
              className="border border-gray-300 h-[35px] rounded-md p-2"
            />

            <span className="flex space-x-2">
              <input type="checkbox" />
              <p>Remember Me</p>
            </span>

            <button
              type="submit"
              className="bg-[#204d91] text-white h-[40px] rounded-md"
            >
              Login
            </button>
          </form>

          <div className="">
            <h4 className="text-sm">
              New to MyApp?{" "}
              <button
                className="text-blue-500"
                onClick={() => {
                  router.push("/createAccount");
                }}
              >
                SignUp
              </button>
            </h4>
          </div>
        </div>
      </div>
    </main>
  );
}
