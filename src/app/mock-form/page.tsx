"use client";
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { stringify } from "querystring";

type UserData = {
  username: string;
  password: string;
  name: string;
  companies: string[];
};

const UserForm = () => {
  const [formData, setFormData] = useState<UserData>({
    username: "",
    password: "",
    name: "",
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
        companies: [],
      });
    } catch (error) {
      setStatusMessage({ text: "Failed to create user.", type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center px-4">
      <div className="w-full max-w-lg bg-gray-950 p-8 rounded-lg shadow-lg border border-purple-800">
        <h2 className="text-2xl text-center text-purple-300 mb-6">
          Create New User
        </h2>

        {statusMessage && (
          <div
            className={`mb-4 px-4 py-2 rounded text-center ${
              statusMessage.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-purple-400 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-purple-600 rounded px-3 py-2 text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-purple-400 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-purple-600 rounded px-3 py-2 text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-purple-400 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-purple-600 rounded px-3 py-2 text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-purple-400 mb-1">
              Companies
            </label>
            {formData.companies.map((company, index) => (
              <input
                key={index}
                type="text"
                value={company}
                onChange={(e) => handleCompanyChange(e, index)}
                className="w-full bg-transparent border border-purple-600 rounded px-3 py-2 text-white mb-2"
                placeholder="Enter company"
              />
            ))}
            <button
              type="button"
              onClick={handleAddCompany}
              className="mt-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded"
            >
              + Add Company
            </button>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
