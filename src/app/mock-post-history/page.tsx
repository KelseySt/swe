"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  DocumentReference,
} from "firebase/firestore";
import { db } from "../firebase";

type User = {
  username: string;
  name: string;
  companies: string[];
  posts?: DocumentReference[];
};

type Post = {
  id: string;
  description: string;
  status: string;
  company: string;
};

const PostHistory = () => {
  const [users, setUsers] = useState<(User & { id: string })[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const currData = await getDocs(collection(db, "users"));
      const userList = currData.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as User),
      }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!selectedUserId) return;

      const userDoc = await getDoc(doc(db, "users", selectedUserId));
      const userData = userDoc.data() as User | undefined;

      if (!userData || !userData.posts || userData.posts.length === 0) {
        setPosts([]);
        return;
      }

      const postDataList: Post[] = [];

      for (let post of userData.posts) {
        const postData = await getDoc(post);
        if (postData.exists()) {
          postDataList.push({
            id: postData.id,
            ...(postData.data() as Omit<Post, "id">),
          });
        }
      }

      setPosts(postDataList);
    };

    fetchPosts();
  }, [selectedUserId]);

  const handleDelete = async (postId: string) => {
    try {
      await deleteDoc(doc(db, "users", postId));

      const user = doc(db, "users", selectedUserId);
      const userDocData = await getDoc(user);
      const userData = userDocData.data() as User;

      if (userData?.posts) {
        const updateedPosts = userData.posts.filter(
          (user) => user.id !== postId
        );
        await updateDoc(user, {
          posts: updateedPosts,
        });
      }

      setPosts((prev) => prev.filter((p) => p.id !== postId));
      setStatusMessage({
        text: "Post successfully deleted.",
        type: "success",
      });
    } catch (error) {
      setStatusMessage({
        text: "Failed to delete post.",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl text-purple-300 font-semibold mb-6 text-center">
        Post History
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
      <div className="max-w-xl mx-auto mb-6">
        <label className="block text-sm text-purple-400 mb-2">
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

      {posts.length === 0 ? (
        <p className="text-center text-gray-400">No posts to show.</p>
      ) : (
        <div className="space-y-4 max-w-2xl mx-auto">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-900 border border-purple-700 rounded-lg p-4 shadow flex justify-between items-center gap-4"
            >
              <div>
                <p className="text-lg text-purple-300 font-medium">
                  {post.description}
                </p>
                <p className="text-sm text-gray-400">
                  Status: {post.status} | Company: {post.company}
                </p>
              </div>
              <button
                onClick={() => handleDelete(post.id)}
                className="bg-red-600 hover:bg-red-500 text-white mt-2 px-4 py-1 rounded text-sm self-start center "
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostHistory;
