"use client";
import Link from 'next/link';
import { useState } from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Input, Button, Tabs, Tab} from "@heroui/react";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({username: '', password: '' }); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Login:', loginData);
    // backend stuff
  };


  return (
    <div className = "flex justify-center items-center min-h-screen ">
      <Card className = "w-full max-w-md shadow-xl">
        <CardHeader className = "text-xl font-semibold text-center">Login
        </CardHeader>
        <CardBody>
          <Input
            type = "text"
            name = "username"
            label = "Username"
            value = {loginData.username}
            onChange = {handleChange}
            className = "mb-4"
            isRequired
          />
          <Input
            type = "password"
            name = "password"
            label = "Password"
            value = {loginData.password}
            onChange = {handleChange}
            className = "mb-4"
            isRequired
          />
          <Button color = "primary" fullWidth onClick = {handleSubmit}>
            Log In
          </Button>
        </CardBody>
        <CardFooter className = "text-sm text-center">
            Don't have an account?{' '}
            <Link href = "/signup" className='text-blue-500 ml-1 underline'>
            Sign up here
            </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
