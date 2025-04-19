import { fmpBalance, fmpIncome } from "./apiFunctions/financeFunctions";
import Autocomplete from "./components/Autocomplete";
import Navbar from "./components/Navbar";
import { usePathname } from "next/navigation";
import SavedCompanies from "./components/SavedCompanies";
import CompanyGrid from './components/CompanyGrid';
export default function CompanyPage() {
  const handleClick = async (data: FormData) => {
    "use server";
    const company = data.get("company") as string;
    // You can call your API functions here
    // const balance = await fmpBalance(company);
    // const income = await fmpIncome(company);
  };


export default function Home() {
  return (
    <div>
      {/* NavBar at the top */}
      <Navbar title="Business Health" />

      <div className="p-6">
        <form action={handleClick}>
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            className="bg-amber-200"
          />
          <button className="m-6 p-2 bg-amber-600" type="submit">
            Call API
          </button>
        </form>

        <Autocomplete />
        <CompanyGrid/>
        <SavedCompanies />
      </div>
    </div>
  );
}
