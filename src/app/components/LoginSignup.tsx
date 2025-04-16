"use client";
import { useState } from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Input, Button, Tabs, Tab} from "@heroui/react";

interface LoginSignupProps {
  onLoginSuccess?: () => void;
}

export default function LoginSignup({ onLoginSuccess }: LoginSignupProps) {
  const [isSignup, setIsSignup] = useState(false); 

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const [selectedTab, setSelectedTab] = useState("login");

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = () => {
    console.log("Signup Data:", signupData);
    // Backend call would go here
  };

  const handleLoginSubmit = () => {
    console.log("Login Data:", loginData);
    // Backend call would go here
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 to-sky-100">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-xl font-semibold text-center">
          {isSignup ? "Sign Up" : "Login"}
        </CardHeader>
        <Divider />
        <CardBody>
        {isSignup ? (
            <>
              <Input
                type="text"
                label="Username"
                name="username"
                className="mb-4"
                value={signupData.username}
                onChange={handleSignupChange}
                isRequired
              />
              <Input
                type="email"
                label="Email"
                name="email"
                className="mb-4"
                value={signupData.email}
                onChange={handleSignupChange}
                isRequired
              />
              <Input
                type="password"
                label="Password"
                name="password"
                className="mb-4"
                value={signupData.password}
                onChange={handleSignupChange}
                isRequired
              />
              <Button color="primary" fullWidth onClick={handleSignupSubmit}>
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Input
                type="email"
                label="Email"
                name="email"
                className="mb-4"
                value={loginData.email}
                onChange={handleLoginChange}
                isRequired
              />
              <Input
                type="password"
                label="Password"
                name="password"
                className="mb-4"
                value={loginData.password}
                onChange={handleLoginChange}
                isRequired
              />
              <Button color="primary" fullWidth onClick={handleLoginSubmit}>
                Login
              </Button>
            </>
          )}
        </CardBody>
        <Divider />
        <CardFooter className="text-sm text-center">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsSignup(false)}
                className="text-blue-600 underline ml-1"
              >
                Log in
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setIsSignup(true)}
                className="text-blue-600 underline ml-1"
              >
                Click here to sign up
              </button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}