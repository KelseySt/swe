"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const UserProfile = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    companies: [] as string[],
  });

  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const currData = await getDocs(collection(db, "users"));
      const userList = currData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!selectedUserId) return;

      const userDoc = await getDoc(doc(db, "users", selectedUserId));
      const userData = userDoc.data();
      if (userData) {
        setFormData({
          username: userData.username || "",
          password: userData.password || "",
          name: userData.name || "",
          companies: userData.companies || [],
        });
      }
    };

    fetchUserData();
  }, [selectedUserId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleCompanyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedCompanies = [...formData.companies];
    updatedCompanies[index] = e.target.value;
    setFormData({ ...formData, companies: updatedCompanies });
  };

  const handleAddCompany = () => {
    if (formData.companies.length < 5) {
      setFormData({
        ...formData,
        companies: [...formData.companies, ""],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();

    if (!selectedUserId) return;

    try {
      await updateDoc(doc(db, "users", selectedUserId), formData);
      setStatusMessage({ text: "User updated successfully", type: "success" });
      setFormData({
        username: "",
        password: "",
        name: "",
        companies: [],
      });
      setSelectedUserId("");
    } catch (error) {
      setStatusMessage({ text: "Failed to update user", type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center px-4">
      <div className="w-full max-w-xl bg-gray-950 p-8 rounded-lg shadow-lg border border-purple-800">
        <h2 className="text-3xl font-semibold text-center text-purple-300 mb-6">
          User Profile
        </h2>

        {statusMessage && (
          <div
            className={`mb-6 px-4 py-2 rounded text-center font-medium ${
              statusMessage.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        <div className="mb-5">
          <label className="block text-sm text-purple-400 mb-1">
            Select User
          </label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full bg-transparent border border-purple-600 rounded px-3 py-2 text-white"
          >
            <option value="">Choose a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {selectedUserId && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm text-purple-400 mb-1">
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange(e, "username")}
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
                value={formData.password}
                onChange={(e) => handleInputChange(e, "password")}
                className="w-full bg-transparent border border-purple-600 rounded px-3 py-2 text-white"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-purple-400 mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange(e, "name")}
                className="w-full bg-transparent border border-purple-600 rounded px-3 py-2 text-white"
                required
              />
            </div>

            <div className="mb-6">
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
                Update
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
