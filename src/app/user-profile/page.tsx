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
import UserProfileHeader from "../components/UserProfileHeader";
import PersonalInformation from "../components/UserPersonalInformation";
import UserPostHistory from "../components/UserPostHistory";

const UserProfile = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    companies: [] as string[],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // Get the users in the database
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

  // Get data for users
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
    setFormData({
      ...formData,
      companies: [...formData.companies, ""],
    });
  };

  const handleDeleteCompany = (index: number) => {
    const updatedCompanies = formData.companies.filter((_, i) => i !== index);
    setFormData({ ...formData, companies: updatedCompanies });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUserId) return;

    try {
      await updateDoc(doc(db, "users", selectedUserId), formData);
      setStatusMessage({ text: "User updated successfully", type: "success" });
      setIsEditing(false);
    } catch (error) {
      setStatusMessage({ text: "Failed to update user", type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-[#c7dbe6] text-black flex justify-center items-center px-4 mt-2 mb-2">
      <div className="w-full max-w-xl bg-blue-50 p-8 rounded-lg shadow-xl border border-blue-800">
        {/* User "icon" and name displayed at the top */}
        <UserProfileHeader name={formData.name} />

        <div className="mb-5">
          <label className="block text-sm text-blue-400 mb-1">
            Select User
          </label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full bg-transparent border border-blue-600 rounded px-3 py-2 text-black"
          >
            {/* Pick a user to pull the data for */}
            <option value="">Choose a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* Personal information is pulled for a specific user */}
        {selectedUserId && (
          <PersonalInformation
            formData={formData}
            isEditing={isEditing}
            statusMessage={statusMessage}
            handleInputChange={handleInputChange}
            handleCompanyChange={handleCompanyChange}
            handleAddCompany={handleAddCompany}
            handleDeleteCompany={handleDeleteCompany}
            handleSubmit={handleSubmit}
            startEditing={() => setIsEditing(true)}
          />
        )}

        {/* Display UserPostHistory for a selected user if it exists */}
        {selectedUserId && (
          <div className="mt-8">
            <UserPostHistory userId={selectedUserId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
