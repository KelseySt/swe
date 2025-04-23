"use client";
import React, { ChangeEvent, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

type UserData = {
  username: string;
  password: string;
  name: string;
  email: string;
  companies: string[];
};

const Signup = () => {
  const [formData, setFormData] = useState<UserData>({
    username: "",
    password: "",
    name: "",
    email: "",
    companies: [],
  });

  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCompany = () => {
    if (formData.companies.length < 1000) {
      setFormData({
        ...formData,
        companies: [...formData.companies, ""],
      });
    }
  };

  const handleCompanyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedCompanies = [...formData.companies];
    updatedCompanies[index] = e.target.value;
    setFormData({ ...formData, companies: updatedCompanies });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "users"), formData);
      setStatusMessage({ text: "User successfully created!", type: "success" });
      setFormData({
        username: "",
        password: "",
        name: "",
        email: "",
        companies: [],
      });
    } catch (error) {
      setStatusMessage({
        text: "Failed to create user. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#c7dbe6] text-black flex justify-center items-center px-4 mt-2 mb-2">
      <div className="w-full max-w-lg bg-blue-50 p-8 rounded-lg border border-blue-800">
        <h2 className="text-2xl text-center text-[#4e73df] mb-6">
          Create New User
        </h2>

        {statusMessage && (
          <div
            className={`mb-4 px-4 py-2 rounded text-center ${
              statusMessage.type === "success" ? "bg-green-400" : "bg-red-400"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username input */}
          <div className="mb-4">
            <label className="block text-sm text-blue-400 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-blue-600 rounded px-3 py-2 text-black"
              required
            />
          </div>

          {/* Password input */}
          <div className="mb-4">
            <label className="block text-sm text-blue-400 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-blue-600 rounded px-3 py-2 text-black"
              required
            />
          </div>

          {/* Name input */}
          <div className="mb-4">
            <label className="block text-sm text-blue-400 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-blue-600 rounded px-3 py-2 text-black"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm text-blue-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-blue-600 rounded px-3 py-2 text-black"
              required
            />
          </div>

          {/* Companies input */}
          <div className="mb-4">
            <label className="block text-blue-400 mb-1">Companies</label>
            {formData.companies.map((company, index) => (
              <input
                key={index}
                type="text"
                value={company}
                onChange={(e) => handleCompanyChange(e, index)}
                className="w-full bg-transparent border border-blue-600 rounded px-3 py-2 mb-2 text-black"
                placeholder="Enter company"
              />
            ))}
            <button
              type="button"
              onClick={handleAddCompany}
              className="mt-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
            >
              + Add Company
            </button>
          </div>

          {/* Submit button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

/*"use client";
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
          placeholder="Username"
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
          placeholder="Email"
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
          placeholder="Password"
          style = {{ backgroundColor: 'white'}}
          value={SignupData.password}
          onChange={handleChange}
          classNames= {{
            input: "rounded-md",
            innerWrapper:"w-full mb-0 p-0"}}
          isRequired
        />
        <div className="flex justify-center">
          <Button 
          /*fullWidth */
/*
          onPress = {handleSubmit}
          style = {{ backgroundColor: "#BFB1C1"}}
          className = "text-white p-2 rounded w-20 h-8" >
            Sign Up
          </Button>
          </div>
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
*/
