'use client';
import Autocomplete from "./components/Autocomplete";
import SavedCompanies from "./components/SavedCompanies";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from "@/app/firebase";
import { useRouter } from "next/navigation";

export default function Home() {
  console.log('API Key:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
  return (
    <div>
        <Autocomplete />
        
        <SavedCompanies />
    </div>
  );
}