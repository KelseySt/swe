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

  useEffect(() => {
    async function fetchProfiles() {
      console.log("Fetching profiles in AlumniCard..."); // Debugging log
      try {
        const linkedInProfiles = await getLinkedInProfiles(school, company);
        console.log("Fetched profiles in AlumniCard:", linkedInProfiles); // Debugging log
        setProfiles(linkedInProfiles);
      } catch (error) {
        console.error("Error fetching LinkedIn profiles in AlumniCard:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfiles();
  }, [school, company]);

  if (loading) {
    return <div>Loading profiles...</div>;
  }

  return (
    <div>
      {profiles.map((profile, index) => (
        <div key={index} style={{ margin: 20, padding: 20, border: "1px solid #ccc", borderRadius: 10 }}>
          <h2>{profile.name}</h2>
          <p>{profile.headline}</p>
          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
            View LinkedIn Profile
          </a>
        </div>
      ))}
    </div>
  );
}
