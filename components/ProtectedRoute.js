// "use client";

// import { useRouter } from "next/navigation";
// import React, { useEffect } from "react";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ( {children} ) => {
//   const { user } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!user) {
//       router.push("/login");
//     }
//   }, [router, user]);

//   return <>{user ? children : <h1>You are not logged in!</h1>}</>;
// };

// export default ProtectedRoute;
