
import { callFMP } from "./apiFunctions/financeFunctions";
import Search from "./components/Search";
import Companies from "./components/Companies";
import Autocomplete from "./components/Autocomplete";

export default function Home({searchParams,}:{searchParams?:{
  query?: string;
  page?: string;
}}) {
  
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
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
