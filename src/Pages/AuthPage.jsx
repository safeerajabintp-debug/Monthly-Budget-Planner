import { useState, useEffect } from "react";
import { WalletIcon } from "@heroicons/react/24/solid";

export default function AuthPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      window.location.href = "/budget-planner"; // redirect if already logged in
    }
  }, []);

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert("All fields are required!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      alert("Email already registered!");
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    setIsLogin(true);
  };

  const handleLogin = () => {
    if (!email || !password) {
      alert("Email and password required!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      alert(`Welcome back, ${user.name}!`);
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "/Monthly-Budget-Planner/#/budget-planner";
// redirect to Budget Planner
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-100 via-orange-200 to-pink-200">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-md px-6 py-4 flex items-center gap-3 text-white">
        <WalletIcon className="w-10 h-10" />
        <h1 className="text-2xl font-bold">Budget Planner</h1>
      </nav>

      {/* Auth Card */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            {isLogin ? "Login" : "Register"}
          </h2>

          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-3 mb-4 shadow-sm focus:ring-2 focus:ring-blue-400"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-3 mb-4 shadow-sm focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-3 mb-6 shadow-sm focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={isLogin ? handleLogin : handleRegister}
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
        </div>
      </div>
    </div>
  );
}
