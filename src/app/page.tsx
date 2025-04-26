'use client';
import Autocomplete from "./components/Autocomplete";
import SavedCompanies from "./components/SavedCompanies";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from "@/app/firebase";
import { useRouter } from "next/navigation";

export default function Home() {
  
  return (
    <div>
        <Autocomplete />
        
        <SavedCompanies />
    </div>
  );
}