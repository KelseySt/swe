
import { callFMP } from "./apiFunctions/financeFunctions";
import Autocomplete from "./components/Autocomplete";

export default function Home({searchParams,}:{searchParams?:{
  query?: string;
  page?: string;
}}) {
  
  const handleClick = async(data : FormData) => {
    "use server";
    const company = data.get("company");
    callFMP(company);
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
