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
import { useAuth } from "@/app/useAuth";
import { useRouter } from "next/navigation";

interface PostFormProps {
  selectedCompany: string; // Receive company as a prop
}

const PostForm: React.FC<PostFormProps> = ({ selectedCompany }) => {
  const { user } = useAuth(); // Get the logged in user from useAuth
  const router = useRouter();

  const [formData, setFormData] = useState({
    description: "",
    status: "student", // Default status
  });

  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // If there's no user, prompt to log in
  if (!user) {
    return <p>Please log in to create a post.</p>;
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCompany) {
      setStatusMessage({
        text: "Please select a company.",
        type: "error",
      });
      return;
    }

    const companyInUppercase = selectedCompany.toUpperCase();

    try {
      // Create a new post in the "posts" collection
      const post = await addDoc(collection(db, "posts"), {
        description: formData.description,
        status: formData.status,
        userId: user.uid, // Use the logged in user's ID
        company: companyInUppercase, // Associate the post with the company
      });

      // Now update the user's post references in the user's collection
      const userRef = doc(db, "users", user.uid);
      const userCurrData = await getDoc(userRef);
      const userPosts = userCurrData.data()?.posts || [];

      await updateDoc(userRef, {
        posts: [...userPosts, post],
      });

      // reset form data and show success message
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
      <h2 className="text-2xl font-bold text-indigo-800 mb-6 text-center">
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
        {/* Description input */}
        <div>
          <label className="block text-sm text-indigo-600 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400"
            placeholder="Write your post..."
            required
          />
        </div>

        {/* Status select */}
        <div>
          <label className="block text-sm text-indigo-600 mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full border border-indigo-300 rounded px-3 py-2 focus:outline-none focus:ring-indigo-400"
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
