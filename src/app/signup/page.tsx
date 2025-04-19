"use client";
import Link from 'next/link';
import { useState } from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Input, Button, Tabs, Tab} from "@heroui/react";
import { useRouter, useSearchParams } from 'next/navigation';


export default function SignupPage() {
  const [SignupData, setSignupData] = useState({username: '', email: '', password: '' }); 

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...SignupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Signup:', SignupData);
    // backend stuff
    router.push(redirectTo);
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
          style = {{ backgroundColor: 'white'}}
          value={SignupData.username}
          onChange={handleChange}
          classNames= {{
            input: "rounded-md",
            innerWrapper:"w-full mb-0 p-0"}}
          isRequired
        />
        <Input
          type="email"
          name="email"
          label="Email"
          style = {{ backgroundColor: 'white'}}
          value={SignupData.email}
          onChange={handleChange}
          classNames= {{
            input: "rounded-md",
            innerWrapper:"w-full mb-0 p-0"}}
          isRequired
        />
        <Input
          type="password"
          name="password"
          label="Password"
          style = {{ backgroundColor: 'white'}}
          value={SignupData.password}
          onChange={handleChange}
          classNames= {{
            input: "rounded-md",
            innerWrapper:"w-full mb-0 p-0"}}
          isRequired
        />
        <Button
        fullWidth 
        onPress={handleSubmit}
        style = {{ backgroundColor: "#BFB1C1"}}
        className="text-white p-2 rounded">
          Sign Up
        </Button>
      </CardBody>
      <CardFooter className="text-sm text-center">
        Already have an account?{' '}
        <Link href={`/login?redirect=${encodeURIComponent(redirectTo)}`}className="text-blue-500 ml-1 underline">
          Log in here
        </Link>
      </CardFooter>
    </Card>
  </div>
);
}
  