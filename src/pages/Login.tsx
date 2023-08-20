/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import { login } from "../redux/features/users/userSlice";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
      };

      const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
      };

      const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const userData = {
          email,
          password,
        };
        try {
          await dispatch(login(userData) as any);
          
          navigate("/home"); 
    
          console.log("Login form submitted");
          console.log("Email:", email);
          console.log("Password:", password);
    
          
          setEmail("");
          setPassword("");
        } catch (error) {
          
          console.log("Error during login:", error);
        }
      };

    return (
        <div>
          <Navbar />
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block font-bold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className="border border-gray-400 p-2 rounded w-full"
                />
              </div>
              <div>
                <label htmlFor="password" className="block font-bold mb-2">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="border border-gray-400 p-2 rounded w-full"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Login
                </button>
              </div>
              <div className="text-center">
                <p>
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-blue-500 hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      );
};

export default Login;