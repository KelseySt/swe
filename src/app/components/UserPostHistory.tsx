import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { getDocs, doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";

// Post structure
type Post = {
  id: string;
  description: string;
  status: string;
  company: string;
};

interface UserPostsProps {
  userId: string;
}

const UserPosts: React.FC<UserPostsProps> = ({ userId }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null); // Track the post being edited
  const [newDescription, setNewDescription] = useState<string>(""); // Store new description for editing
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // Get posts for a user
  useEffect(() => {
    const fetchPosts = async () => {
      if (!userId) return;

      const userDoc = await getDoc(doc(db, "users", userId));
      const userData = userDoc.data();
      if (userData && userData.posts) {
        const postDataList: Post[] = [];

        for (let postRef of userData.posts) {
          const postDoc = await getDoc(postRef);
          if (postDoc.exists()) {
            const postData = postDoc.data() as Post;
            postDataList.push({
              id: postDoc.id,
              description: postData.description,
              status: postData.status,
              company: postData.company,
            });
          }
        }
        setPosts(postDataList);
      }
    };
    fetchPosts();
  }, [userId]);

  // Handle delete post
  const handleDelete = async (postId: string) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();
      if (userData && userData.posts) {
        const updatedPosts = userData.posts.filter(
          (postRef: any) => postRef.id !== postId
        );
        await updateDoc(userDocRef, { posts: updatedPosts });
      }
      // Update state to remove the post from the list
      setPosts((prev) => prev.filter((post) => post.id !== postId));
      setStatusMessage({ text: "Post successfully deleted.", type: "success" });
    } catch (error) {
      setStatusMessage({ text: "Failed to delete post.", type: "error" });
    }
  };

  // Handle edit post
  const handleEdit = (post: Post) => {
    setEditingPost(post); // Set the post to be edited
    setNewDescription(post.description); // Set the description to be edited
  };

  const handleSaveEdit = async () => {
    if (!editingPost) return;
    try {
      const postDocRef = doc(db, "posts", editingPost.id);
      await updateDoc(postDocRef, { description: newDescription });
      // Update the posts array with the edited post
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === editingPost.id
            ? { ...post, description: newDescription }
            : post
        )
      );
      setEditingPost(null); // Clear editing mode
      setStatusMessage({ text: "Post updated successfully.", type: "success" });
    } catch (error) {
      setStatusMessage({ text: "Failed to update post.", type: "error" });
    }
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
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
            className="bg-[#c7dbe6] border border-blue-800 rounded-lg p-4 shadow flex justify-between items-center gap-4"
          >
            <div className="flex flex-col w-full">
              {/* Company name and status displayed at top */}
              <div className="flex justify-between items-center">
                <p className="text-lg text-blue-600 font-medium">
                  {post.company}
                </p>
                <p className="text-sm text-blue-600 font-medium">
                  {post.status}
                </p>{" "}
              </div>

              {/* Post description */}
              <p className="text-black text-sm mt-2">{post.description}</p>

              {editingPost?.id === post.id ? (
                <div className="mt-2">
                  <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full bg-blue-50 text-black p-2 mt-2"
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="mt-2 mr-2 bg-blue-600 text-white py-1 px-4 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingPost(null)}
                    className="mt-2 bg-red-600 text-white py-1 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="bg-purple-300 hover:bg-purple-400 text-black py-1 px-4 rounded"
                  >
                    {/* Buttons to edit and delete posts*/}
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserPosts;
