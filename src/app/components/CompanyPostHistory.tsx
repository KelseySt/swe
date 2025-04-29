import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

// Post structure
type Post = {
  id: string;
  description: string;
  status: string;
  company: string;
};

interface ComapnyPostHistoryProps {
  company: string; // Company abbreviation passed as a prop
}

const CompanyPostHistory: React.FC<ComapnyPostHistoryProps> = ({ company }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, "posts");

        // Fetch posts related to the selected company
        const q = query(postsRef, where("company", "==", company));
        const queryData = await getDocs(q);

        const fetchedPosts: Post[] = [];
        queryData.forEach((doc) => {
          fetchedPosts.push({
            id: doc.id,
            ...doc.data(),
          } as Post);
        });
        setPosts(fetchedPosts);
      } catch (error) {
        setStatusMessage({ text: "Failed to fetch posts.", type: "error" });
      }
    };

    if (company) {
      fetchPosts();
    }
  }, [company]); // Fetch whenever the company changes

  return (
    <div className="space-y-4 max-w-2xl mx-auto mt-6">
      {statusMessage && (
        <div
          className={`mb-6 px-4 py-3 rounded text-center font-medium ${
            statusMessage.type === "success" ? "bg-green-400" : "bg-red-400"
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      {posts.length === 0 ? (
        <p className="text-center text-gray-400">No posts to show.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="bg-[#c7dbe6] border border-blue-800 rounded-lg p-4 shadow"
          >
            <div className="flex flex-col w-full">
              {/* Display company name and status */}
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg text-blue-600 font-medium">
                  {post.company}
                </p>
                <p className="text-blue-600 font-medium">{post.status}</p>
              </div>

              {/* Post description */}
              <p className="text-black text-sm mt-2">{post.description}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CompanyPostHistory;
