"use client";
import Link from 'next/link';
import { useState } from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Input, Button, Tabs, Tab} from "@heroui/react";
import { useRouter, useSearchParams } from 'next/navigation';



export default function LoginPage() {
  const [loginData, setLoginData] = useState({username: '', password: '' }); 

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Login:', loginData);
    // backend stuff
    router.push(redirectTo);
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
            placeholder = "Username"
            style = {{ backgroundColor: 'white'}}
            value = {loginData.username}
            onChange = {handleChange}
            classNames= {{
              input: "rounded-md",
              innerWrapper:"w-full mb-0 p-0"}}
            isRequired
          />
          <Input
            type = "password"
            name = "password"
            placeholder = "Password"
            style = {{ backgroundColor: 'white'}}
            value = {loginData.password}
            onChange = {handleChange}
            classNames= {{
              input: "rounded-md",
              innerWrapper:"w-full mb-0 p-0"}}
            isRequired
          />
          <div className="flex justify-center">
          <Button 
          /*fullWidth */
          onPress = {handleSubmit}
          style = {{ backgroundColor: "#BFB1C1"}}
          className = "text-white p-2 rounded w-17 h-8" >
            Log In
          </Button>
          </div>
        </CardBody>
        <CardFooter className = "text-sm text-center">
            Don't have an account?{' '}
            <Link href = {`/signup?redirect=${encodeURIComponent(redirectTo)}`} className='text-blue-500 ml-1 underline'>
            Sign up here
            </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
