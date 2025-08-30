import { useState } from "react";
import { registerWithEmail } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerWithEmail(email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 border rounded-md shadow-md w-96">
        <h2 className="text-2xl mb-4">Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button onClick={handleRegister} className="bg-green-500 text-white p-2 w-full">
          Register
        </button>
      </div>
    </div>
  );
}
