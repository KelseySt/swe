"use client";
import React, { useEffect, useState } from "react";
import { getLinkedInProfiles } from "../apiFunctions/linkedinProfiles"; // Import the function
import { Person } from "../apiFunctions/duckScraper"; // Import the Person interface


interface AlumniCardProps {
  school: string;
  company: string;
}

export default function AlumniCard({ school, company }: AlumniCardProps) {
  const [profiles, setProfiles] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfiles() {
      console.log("SCHOOLOL: " + school);
      console.log(`Fetching profiles in AlumniCard for ${school} at ${company}...`); // Debugging log
      
      
        
      
      if (!school) {
        setError("Please add your college in your profile to see alumni");
        setLoading(false);
        return;
      }
      
      try {
        const linkedInProfiles = await getLinkedInProfiles(school, company);
        console.log("Fetched profiles in AlumniCard:", linkedInProfiles); 
        setProfiles(linkedInProfiles);
        setError(null);
      } catch (error) {
        console.error("Error fetching LinkedIn profiles in AlumniCard:", error);
        setError("Failed to fetch alumni information");
        setProfiles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProfiles();
  }, [school, company]);

  // Loading state
  if (loading) {
    return (
      <div className="p-6 border rounded-xl shadow-lg w-full">
        <h2 className="text-xl font-bold mb-4">Alumni Profiles</h2>
        <p className="text-gray-500 mb-4">Loading...</p>
        <div className="animate-pulse space-y-4">
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 border rounded-xl shadow-lg w-full">
        <h2 className="text-xl font-bold mb-4">Alumni Profiles</h2>
        <div className="text-red-500">{error}</div>
        
      </div>
    );
  }


  if (profiles.length === 0) {
    return (
      <div className="p-6 border rounded-xl shadow-lg w-full">
        <h2 className="text-xl font-bold mb-4">Alumni Profiles</h2>
        <p>No alumni found from {school} at {company}.</p>
      </div>
    );
  }
  
  return (
    <div className="p-6 border rounded-xl shadow-lg w-full">
      <h2 className="text-xl font-bold mb-4">{school} Alumni at {company}</h2>
      <div className="max-h-[600px] overflow-y-auto space-y-4">
        {profiles.map((profile, index) => (
          <div key={index} className="border-b pb-3 last:border-b-0 hover:bg-gray-50 transition-colors duration-300">
            <h4 className="text-lg font-medium">{profile.name}</h4>
            <p className="text-sm text-gray-600">{profile.headline}</p>
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                View LinkedIn Profile
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}



