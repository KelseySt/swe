"use client";
import React, { useEffect, useState } from "react";
import { getLinkedInProfiles } from "../apiFunctions/linkedinProfiles"; // Import the function
import { Person } from "../apiFunctions/duckScraper"; // Import the Person interface
import { Card, CardHeader, CardBody } from "@heroui/react"; // Import the necessary components

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
    <div className="max-h-[600px] overflow-y-auto space-y-4 p-4">
      <h2 className="text-xl font-bold mb-4">Alumni Profiles</h2>
      {profiles.map((profile, index) => (
        <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardHeader>{profile.name}</CardHeader>
          </CardHeader>
          <CardBody className="space-y-2">
            <p className="text-sm text-gray-600">{profile.headline}</p>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              View LinkedIn Profile
            </a>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
