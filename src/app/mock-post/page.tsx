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
        setSelectedCompany(userData.companies[0]);
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
    <div className="p-6 bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Create a Post
      </h2>

      {statusMessage && (
        <div
          className={`mb-4 px-4 py-2 rounded text-sm font-medium text-center ${
            statusMessage.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">User</label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="" disabled>
              Select a user
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Company</label>
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="" disabled>
              Select a company
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
          <label className="block text-sm text-gray-600 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Write your post..."
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="student">Student</option>
            <option value="employee">Employee</option>
            <option value="customer">Customer</option>
          </select>
        </div>

        <div className="pt-4 text-center">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded transition-colors"
          >
            Submit Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;

