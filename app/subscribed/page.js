"use client"
import { useAuth } from "context/AuthContext";
import { useEffect, useState } from "react";
import db from "config/firebase";

export default function Home() {
    const [activePlan, setActivePlan] = useState({});
    const { user } = useAuth();
     db.collection("customers")
       .doc(user.uid)
       .collection("subscriptions")
       .get()
       .then((querySnapshot) => {
           setActivePlan(querySnapshot);
         });
return (
<main className="min-h-screen flex items-center justify-center">
  <div className="bg-[#204d91] w-[70%] h-[80vh] flex rounded-xl justify-center items-center">
    <div className="bg-white w-[60vh] h-[60vh] rounded-xl flex flex-col items-center justify-around p-5">
  
                You have an active plan.


    </div>
  </div>
</main>
)

}