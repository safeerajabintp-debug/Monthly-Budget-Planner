import {useState, useEffect } from "react";
import { WalletIcon } from "@heroicons/react/24/solid";
import bg1Video from "/videos/bg1-video.mp4";
import { useFormik } from "formik";
import * as Yup from "yup";

// Validation Schemas
const registerSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/\d/, "Password must contain a number")
    .required("Password is required"),
});

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      window.location.href = "/Monthly-Budget-Planner/#/budget-planner";
    }
  }, []);

  // Formik setup
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: isLogin ? loginSchema : registerSchema,
    onSubmit: (values) => {
      if (isLogin) {
        // Login logic
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
          (u) => u.email === values.email && u.password === values.password
        );
        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user));
          window.location.href = "/Monthly-Budget-Planner/#/budget-planner";
        } else {
          alert("Invalid email or password!");
        }
      } else {
        // Register logic
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find((u) => u.email === values.email);
        if (existingUser) {
          alert("Email already registered!");
          return;
        }
        users.push(values);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful! Please login.");
        setIsLogin(true);
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src={bg1Video} type="video/mp4" />
      </video>

      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-md px-6 py-4 flex items-center gap-3 text-white mt-2  rounded-4xl">
        <WalletIcon className="w-10 h-10" />
        <h1 className="text-2xl font-bold">Budget Planner</h1>
      </nav>

      {/* Auth Card */}
      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-xl border border-gray-200"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            {isLogin ? "Login" : "Register"}
          </h2>

          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                {...formik.getFieldProps("name")}
                className="w-full border rounded-lg p-3 mb-2"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mb-2">{formik.errors.name}</p>
              )}
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            {...formik.getFieldProps("email")}
            className="w-full border rounded-lg p-3 mb-2"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mb-2">{formik.errors.email}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            {...formik.getFieldProps("password")}
            className="w-full border rounded-lg p-3 mb-2"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mb-2">{formik.errors.password}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-md transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>

          <p
            className="mt-6 text-sm text-center text-blue-600 cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have an account? Register" : "Already registered? Login"}
          </p>
        </form>
      </div>
    </div>
  );
}








// import { useState, useEffect } from "react";
// import { WalletIcon } from "@heroicons/react/24/solid";
// import bg1Video from "/videos/bg1-video.mp4";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const registerSchema = Yup.object({
//   name: Yup.string()
//     .min(3, "Name must be at least 3 characters")
//     .required("Name is required"),
//   email: Yup.string()
//     .email("Invalid email format")
//     .required("Email is required"),
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters")
//     .matches(/\d/, "Password must contain a number")
//     .required("Password is required"),
// });

// const loginSchema = Yup.object({
//   email: Yup.string()
//     .email("Invalid email format")
//     .required("Email is required"),
//   password: Yup.string().required("Password is required"),
// });

// export default function AuthPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLogin, setIsLogin] = useState(false);

//   useEffect(() => {
//     const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//     if (currentUser) {
//       window.location.href = "/Monthly-Budget-Planner/#/budget-planner"; // redirect if already logged in
//     }
//   }, []);

  // const handleRegister = () => {
  //   if (!name || !email || !password) {
  //     alert("All fields are required!");
  //     return;
  //   }

  //   const users = JSON.parse(localStorage.getItem("users")) || [];
  //   const existingUser = users.find((user) => user.email === email);

  //   if (existingUser) {
  //     alert("Email already registered!");
  //     return;
  //   }

  //   const newUser = { name, email, password };
  //   users.push(newUser);
  //   localStorage.setItem("users", JSON.stringify(users));

  //   alert("Registration successful! Please login.");
  //   setIsLogin(true);
  // };

//   const handleLogin = () => {
//     if (!email || !password) {
//       alert("Email and password required!");
//       return;
//     }

//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const user = users.find((u) => u.email === email && u.password === password);

//     if (user) {
//       alert(`Welcome back, ${user.name}!`);
//       localStorage.setItem("currentUser", JSON.stringify(user));
//       window.location.href = "/Monthly-Budget-Planner/#/budget-planner";
// // redirect to Budget Planner
//     } else {
//       alert("Invalid email or password!");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover -z-10">
//   <source src={bg1Video} type="video/mp4" />
// </video>
     
      
      
//       {/* Navbar */}
//       <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-md px-6 py-4 mt-1 flex items-center gap-3 text-white rounded-4xl
//        shadow-xl ">
//         <WalletIcon className="w-10 h-10" />
//         <h1 className="text-2xl font-bold">Budget Planner</h1>
//       </nav>

//       {/* Auth Card */}
//       <div className="flex flex-1 items-center justify-center">
//         <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-xl border border-gray-200">
//           <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
//             {isLogin ? "Login" : "Register"}
//           </h2>

//           {!isLogin && (
//             <input
//               type="text"
//               placeholder="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full border rounded-lg p-3 mb-4 shadow-sm focus:ring-2 focus:ring-blue-400"
//             />
//           )}

//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border rounded-lg p-3 mb-4 shadow-sm focus:ring-2 focus:ring-blue-400"
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full border rounded-lg p-3 mb-6 shadow-sm focus:ring-2 focus:ring-blue-400"
//           />

//           <button
//             onClick={isLogin ? handleLogin : handleRegister}
//             className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-md transition"
//           >
//             {isLogin ? "Login" : "Register"}
//           </button>

//           <p
//             className="mt-6 text-sm text-center text-blue-600 cursor-pointer hover:underline"
//             onClick={() => setIsLogin(!isLogin)}
//           >
//             {isLogin ? "Don't have an account? Register" : "Already registered? Login"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
