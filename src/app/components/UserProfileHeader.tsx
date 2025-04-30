import React from "react";

interface UserProfileHeaderProps {
  name: string;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ name }) => {
  if (!name) return null;

  // Display a circle with the first letter of the user's name and the user's name
  return (
    <div className="border-b border-blue-800 pb-3 mb-2">
      <div className="flex items-center mx-6 mt-4">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center font-semibold text-lg border-1 border-blue-600">
          {name.charAt(0)}
        </div>
        <h2 className="mt-2 ml-2 text-2xl font-semibold text-[#4e73df]">
          {name}
        </h2>
      </div>
    </div>
  );
};

export default UserProfileHeader;
