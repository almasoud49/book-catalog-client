/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { INewUser } from "../shared/globalTypes";
import { createUser } from "../redux/features/users/userSlice";
import Navbar from "../layout/Navbar";


const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    console.log("file: SignUp.tsx:18 ~ SignUp ~ isLoading:", isLoading)

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
      };

      const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
      };

      const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
      };

      const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          setPasswordError("Passwords Do not Match");
          return;
        }
        setIsLoading(true);
        try {
          const formData: INewUser = { email, password, confirmPassword };
          await dispatch(createUser(formData) as any);
          
          navigate("/login");
        } catch (error) {
          console.error("Signup error:", error);
        }
        setIsLoading(false);
      };

    return (
        <div>
          <Navbar />
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
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
                <label htmlFor="confirmPassword" className="block font-bold mb-2">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  className="border border-gray-400 p-2 rounded w-full"
                />
                {passwordError && <p className="text-red-500">{passwordError}</p>}
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Sign Up
                </button>
              </div>
              <div className="text-center">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-500 hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      );
};

export default SignUp;