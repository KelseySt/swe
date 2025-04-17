
import { fmpBalance, fmpIncome } from "./apiFunctions/financeFunctions";
import Autocomplete from "./components/Autocomplete";
import { usePathname } from "next/navigation";



export default function CompanyPage() {
  
  const handleClick = async(data : FormData) => {
    "use server";
    const company = data.get('company') as string
    

    
  };

  return (
    <div className="">
      <form action={handleClick}>
        <input type="text" name="company" placeholder="Company Name" className="bg-amber-200"/>
        <button className="m-6 p-2 bg-amber-600" type="submit">Call API</button>
      </form>

      <Autocomplete />
    </div>
  );
}
