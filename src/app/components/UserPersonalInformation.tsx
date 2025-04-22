import React from "react";

interface PersonalInformationProps {
  formData: {
    username: string;
    password: string;
    name: string;
    email: string;
    companies: string[];
  };
  isEditing: boolean;
  statusMessage: { text: string; type: "success" | "error" } | null;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => void;
  handleCompanyChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleAddCompany: () => void;
  handleDeleteCompany: (index: number) => void;
  handleSubmit: (e: React.FormEvent) => void;
  startEditing: () => void;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  formData,
  isEditing,
  statusMessage,
  handleInputChange,
  handleCompanyChange,
  handleAddCompany,
  handleDeleteCompany,
  handleSubmit,
  startEditing,
}) => {
  return (
    <div>
      {statusMessage && (
        <div
          className={`mb-6 px-4 py-2 rounded text-center font-medium ${
            statusMessage.type === "success" ? "bg-green-400" : "bg-red-400"
          }`}
        >
          {statusMessage.text}
        </div>
      )}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Personal Information</h3>
        <form onSubmit={handleSubmit}>
          {/* Username input */}
          <div className="mb-4">
            <label className="block text-sm text-blue-400 mb-1">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange(e, "username")}
              className="w-full bg-transparent border border-blue-600 rounded px-3 py-2 text-black"
              required
              disabled={!isEditing} // Disabled if not in editing mode
            />
          </div>

          <div className="mb-4">
            {/* Password input */}
            <label className="block text-sm text-blue-400 mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange(e, "password")}
              className="w-full bg-transparent border border-blue-600 rounded px-3 py-2 text-black"
              required
              disabled={!isEditing} // Disabled if not in editing mode
            />
          </div>

          {/* Name input */}
          <div className="mb-4">
            <label className="block text-sm text-blue-400 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange(e, "name")}
              className="w-full bg-transparent border border-blue-600 rounded px-3 py-2 text-black"
              required
              disabled={!isEditing} // Disabled if not in editing mode
            />
          </div>

          {/* Email input */}
          <div className="mb-4">
            <label className="block text-sm text-blue-400 mb-1">Email</label>
            <input
              type="emqil"
              value={formData.email}
              onChange={(e) => handleInputChange(e, "email")}
              className="w-full bg-transparent border border-blue-600 rounded px-3 py-2 text-black"
              required
              disabled={!isEditing} // Disabled if not in editing mode
            />
          </div>

          {/* Company input (can be multiple) */}
          <div className="mb-6">
            <label className="block text-sm text-blue-400 mb-1">
              Companies
            </label>
            {formData.companies.map((company, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={company}
                  onChange={(e) => handleCompanyChange(e, index)}
                  className="w-full bg-transparent border border-blue-600 rounded px-3 py-2 text-black"
                  disabled={!isEditing} // Disabled if not in editing mode
                />
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => handleDeleteCompany(index)}
                    className="ml-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                type="button"
                onClick={handleAddCompany}
                className="mt-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
              >
                + Add Company
              </button>
            )}
          </div>

          {isEditing && (
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded"
              >
                Update
              </button>
            </div>
          )}
        </form>
      </div>

      {!isEditing && (
        <div className="text-center mt-4">
          <button
            onClick={startEditing}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalInformation;
