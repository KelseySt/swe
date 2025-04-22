


import { fmpBalance, fmpIncome } from "./apiFunctions/financeFunctions";
import Autocomplete from "./components/Autocomplete";
import Navbar from "./components/Navbar";
import { usePathname } from "next/navigation";
import SavedCompanies from "./components/SavedCompanies";
import CompanyGrid from './components/CompanyGrid';

export default function Home() {

  return (
    <div>
      {/* NavBar at the top */}
      {/* <Navbar title="Business Health" /> */}

        <Autocomplete />
        
        <SavedCompanies />
    </div>
  );
}