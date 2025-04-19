"use client";
import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const PostForm = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedCompany, setSelectedCompany] = useState<string>("");

  const [formData, setFormData] = useState({
    description: "",
    status: "student",
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
    const fetchCompanies = async () => {
      if (!selectedUserId) return;
      const userDoc = await getDoc(doc(db, "users", selectedUserId));
      const userData = userDoc.data();
      if (userData && userData.companies?.length > 0) {
        setSelectedCompany(userData.companies[0]); // Default to first company
      } else {
        setSelectedCompany("");
      }
    };

    fetchCompanies();
  }, [selectedUserId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    if (!selectedUserId || !selectedCompany) {
      setStatusMessage({
        text: "Please select a user and a company.",
        type: "error",
      });
      return;
    }

    try {
      const post = await addDoc(collection(db, "posts"), {
        description: formData.description,
        status: formData.status,
        userId: selectedUserId,
        company: selectedCompany,
      });

      const user = doc(db, "users", selectedUserId);
      const userCurrData = await getDoc(user);
      const userPosts = userCurrData.data()?.posts || [];

      await updateDoc(user, {
        posts: [...userPosts, post],
      });

      setFormData({ description: "", status: "student" });
      setStatusMessage({
        text: "Post successfully created!",
        type: "success",
      });
    } catch (error) {
      setStatusMessage({ text: "Failed to create post.", type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl text-purple-300 font-semibold mb-6 text-center">
        Create Post
      </h1>

      {statusMessage && (
        <div
          className={`mb-6 px-4 py-3 rounded text-center font-medium ${
            statusMessage.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
        <div>
          <label className="block text-sm text-purple-400 mb-1">
            Select User
          </label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full bg-transparent border border-purple-600 rounded px-3 py-2 text-white"
            required
          >
            <option value="" disabled>
              Choose a user
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-purple-400 mb-1">
            Select Company
          </label>
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="w-full bg-transparent border border-purple-600 rounded px-3 py-2 text-white"
            required
          >
            <option value="" disabled>
              Choose a company
            </option>
            {users
              .find((u) => u.id === selectedUserId)
              ?.companies?.map((company: string, idx: number) => (
                <option key={idx} value={company}>
                  {company}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-purple-400 mb-1">
            Post Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full bg-transparent border border-purple-600 rounded px-3 py-2 text-white"
            placeholder="Enter a description for the post"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-purple-400 mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full bg-transparent border border-purple-600 rounded px-3 py-2 text-white"
            required
          >
            <option value="student">Student</option>
            <option value="employee">Employee</option>
            <option value="customer">Customer</option>
          </select>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
