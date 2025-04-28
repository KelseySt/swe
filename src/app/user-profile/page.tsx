"use client";
import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firestore
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import UserProfileHeader from "../components/UserProfileHeader";
import UserPostHistory from "../components/UserPostHistory";
import { useAuth } from "@/app/useAuth";

const UserProfile = () => {
  const { user } = useAuth(); // Get the current authenticated user
  const [userData, setUserData] = useState<any>(null); // Hold user data
  const [isEditing, setIsEditing] = useState(false); // Switch between edit and view modes
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [loading, setLoading] = useState(true); // Loading state to wait for user data

  // Fetch user data when the user is logged in
  useEffect(() => {
    console.log("User: " + user);
    if (user) {
      const fetchUserData = async () => {
        try {
          const userDocRef = doc(db, "users", user.uid); // Reference to the user's data in the database
          const userDoc = await getDoc(userDocRef); // Fetch the user document

          if (userDoc.exists()) {
            setUserData(userDoc.data()); // Set user data if it exists
          } else {
            // If the user doesn't exist, create a new profile with default values
            await setDoc(userDocRef, {
              name: user.displayName || "Unnamed User",
              email: user.email,
              companies: [],
              college: "",
            });
            setUserData({ name: user.displayName, email: user.email }); // Set default data
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setStatusMessage({
            text: "Failed to fetch profile data",
            type: "error",
          });
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Handle profile update
  const handleProfileUpdate = async () => {
    if (user && userData) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          name: userData.name, // Update name
          college: userData.college || "", // Update college (optional)
          companies: userData.companies || [], // Update companies (optional)
        });
        setStatusMessage({
          text: "Profile updated successfully",
          type: "success",
        });
        setIsEditing(false); // Exit editing
      } catch (error) {
        console.error("Error updating profile:", error);
        setStatusMessage({ text: "Failed to update profile", type: "error" });
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching user data
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>; // Show if no user is logged in
  }

  return (
    <div className="min-h-screen bg-[#c7dbe6] text-black flex justify-center items-center px-4 mt-2 mb-2">
      <div className="w-full max-w-xl bg-blue-50 rounded-lg shadow-xl border border-blue-800">
        {/* User profile header */}
        <UserProfileHeader name={userData?.name || "Unnamed User"} />

        <div className="p-4">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Profile</h2>

          {/* Status message */}
          {statusMessage && (
            <div
              className={`mb-6 px-4 py-3 rounded text-center font-medium ${
                statusMessage.type === "success" ? "bg-green-400" : "bg-red-400"
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          {/* Profile form */}
          {isEditing ? (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block text-sm text-blue-800 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  value={userData?.name || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  className="w-full p-2 mt-2 border border-blue-500 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-blue-800 font-medium">
                  College
                </label>
                <input
                  type="text"
                  value={userData?.college || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, college: e.target.value })
                  }
                  className="w-full p-2 mt-2 border border-blue-500 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-blue-800 font-medium">
                  Companies
                </label>
                {userData?.companies?.map((company: string, index: number) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => {
                        const updatedCompanies = [...userData.companies];
                        updatedCompanies[index] = e.target.value;
                        setUserData({
                          ...userData,
                          companies: updatedCompanies,
                        });
                      }}
                      className="w-full p-2 border border-blue-500 rounded"
                      placeholder={`Company ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedCompanies = userData.companies.filter(
                          (company: string, i: number) => i !== index
                        );
                        setUserData({
                          ...userData,
                          companies: updatedCompanies,
                        });
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setUserData({
                      ...userData,
                      companies: [...userData.companies, ""],
                    })
                  }
                  className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
                >
                  + Add Company
                </button>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleProfileUpdate}
                  className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-red-600 hover:bg-red-500 text-white py-2 px-6 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <p>
                <strong className="text-blue-600">Name:</strong>{" "}
                {userData?.name || "Unnamed User"}
              </p>
              <p>
                <strong className="text-blue-600">College:</strong>{" "}
                {userData?.college || "Not Provided"}
              </p>
              <div>
                <strong className="text-blue-600">Companies</strong>
                <ul className="list-disc ml-5">
                  {userData?.companies?.length ? (
                    userData.companies.map((company: string, index: number) => (
                      <li key={index}>{company}</li>
                    ))
                  ) : (
                    <p>No companies listed</p>
                  )}
                </ul>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* User post history */}
        <div className="mt-8">
          <UserPostHistory userId={user.uid} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
