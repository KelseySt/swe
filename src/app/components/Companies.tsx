import Link from 'next/link';
import Image from 'next/image';
import { companies } from '../apiFunctions/companies';

export default async function Companies({ query, currentPage,}: { query: string; currentPage: number; }) {

    const response = companies;

    const searchCompanies = Array.isArray(response) ? response.filter((data) => {
        return data.abrev.toLowerCase().includes(query.toLowerCase()) || data.name.toLowerCase().includes(query.toLowerCase());
    }) : [];

    const pages = response.length;
    const perPage = Math.ceil(pages / 10)

    const start = (Number(currentPage) - 1) * perPage
    const end = start + perPage

    const entries = searchCompanies.slice(start, end)

    return (
        <div>
            <div className="w-full px-8 md:px-14 pt-10 md:grid md:grid-cols-4 md:gap-10 flex flex-wrap justify-between" >
                {
                    Array.isArray(response) && entries.map((data: any) => {
                        return (
                            <div key={data.name.common} className="w-full h-96 mb-16 shadow-2xl rounded-lg" >
                                <Link href={`/details/${data.name.common}`} >
                                    <div className="p-4">
                                        <h2 className="font-extrabold text-xl py-3">{data.name}</h2>
                                        <div className='pb-1 text-sm'>
                                            <small>{data.abrev}</small>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}