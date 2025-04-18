"use client";
import Link from 'next/link';
import { useState } from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Input, Button, Tabs, Tab} from "@heroui/react";

export default function SignupPage() {
  const [SignupData, setSignupData] = useState({username: '', email: '', password: '' }); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...SignupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Signup:', SignupData);
    // backend stuff
  };
  return (
    <div className="flex justify-center items-center min-h-screen ">
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-xl font-semibold text-center">Sign Up</CardHeader>
      <CardBody>
        <Input
          type="text"
          name="username"
          label="Username"
          value={SignupData.username}
          onChange={handleChange}
          className="mb-4"
          isRequired
        />
        <Input
          type="email"
          name="email"
          label="Email"
          value={SignupData.email}
          onChange={handleChange}
          className="mb-4"
          isRequired
        />
        <Input
          type="password"
          name="password"
          label="Password"
          value={SignupData.password}
          onChange={handleChange}
          className="mb-4"
          isRequired
        />
        <Button color="primary" fullWidth onClick={handleSubmit}>
          Sign Up
        </Button>
      </CardBody>
      <CardFooter className="text-sm text-center">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-500 ml-1 underline">
          Log in here
        </Link>
      </CardFooter>
    </Card>
  </div>
);
}
  