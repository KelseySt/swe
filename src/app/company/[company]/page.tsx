import { FiscalYearData } from "../../apiFunctions/financeFunctions";
import { fmpBalance, fmpIncome } from "../../apiFunctions/financeFunctions";

var FiveYearFinancials : FiscalYearData[] = [];

async function getFiveYearFinancials(companyBalanceData: any, companyIncomeData: any) {
    try{
        for(var i = 0; i < 5; i++) {
            const fiscalYearData: FiscalYearData = {
                fiscalYear: companyBalanceData[i].fiscalYear,
                totalCurrentAssets: companyBalanceData[i].totalCurrentAssets,
                totalCurrentLiabilities: companyBalanceData[i].totalCurrentLiabilities,
                inventory: companyBalanceData[i].inventory,
                prepaids: companyBalanceData[i].prepaids,
                totalStockholdersEquity: companyBalanceData[i].totalStockholdersEquity,
                revenue: companyIncomeData[i].revenue,
                ebit: companyIncomeData[i].ebit,
                netIncome: companyIncomeData[i].netIncome
            };
            FiveYearFinancials[i] = fiscalYearData;
        }
        console.log(FiveYearFinancials);
        return FiveYearFinancials;
    } catch (err) {
        console.log(err);
        return FiveYearFinancials;
    }
}

const testData = [
    {
      fiscalYear: '2024',
      totalCurrentAssets: 163711000000,
      totalCurrentLiabilities: 89122000000,
      inventory: 0,
      prepaids: 0,
      totalStockholdersEquity: 325084000000,
      revenue: 350018000000,
      ebit: 112390000000,
      netIncome: 100118000000
    },
    {
      fiscalYear: '2023',
      totalCurrentAssets: 171530000000,
      totalCurrentLiabilities: 81814000000,
      inventory: 0,
      prepaids: 0,
      totalStockholdersEquity: 283379000000,
      revenue: 307394000000,
      ebit: 86025000000,
      netIncome: 73795000000
    },
    {
      fiscalYear: '2022',
      totalCurrentAssets: 164795000000,
      totalCurrentLiabilities: 69300000000,
      inventory: 2670000000,
      prepaids: 0,
      totalStockholdersEquity: 256144000000,
      revenue: 282836000000,
      ebit: 71685000000,
      netIncome: 59972000000
    },
    {
      fiscalYear: '2021',
      totalCurrentAssets: 188143000000,
      totalCurrentLiabilities: 64254000000,
      inventory: 1170000000,
      prepaids: 0,
      totalStockholdersEquity: 251635000000,
      revenue: 257637000000,
      ebit: 91080000000,
      netIncome: 76033000000
    },
    {
      fiscalYear: '2020',
      totalCurrentAssets: 174296000000,
      totalCurrentLiabilities: 56834000000,
      inventory: 728000000,
      prepaids: 0,
      totalStockholdersEquity: 222544000000,
      revenue: 182527000000,
      ebit: 48217000000,
      netIncome: 40269000000
    }
  ]

export default async function CompanyPage({params, }: { params: Promise<{ company: string }>}) {
    const { company } = await params;
    console.log(company);

    /* For the sake of saving api calls, do not uncomment 
     these, and use the testData for UI testing instead :) */

    //const companyBalanceData = await fmpBalance(company);
    //const companyIncomeData = await fmpIncome(company);
    //const fiveYearFinancials = await getFiveYearFinancials(companyBalanceData, companyIncomeData);

    const fiveYearFinancials = testData; 
    // This component just lists all of the available data currently, we'll be making big changes
    // to make an effective company page display
    return (
        <div>
            {fiveYearFinancials.map((data) => (
                <div key={data.fiscalYear} className="m-6 p-5 bg-purple-300 rounded-md">
                    <p>company: {company}</p>
                    <p>Fiscal Year: {data.fiscalYear}</p>
                    <p>Total Current Assets: {data.totalCurrentAssets}</p>
                    <p>Total Current Liabilities: {data.totalCurrentLiabilities}</p>
                    <p>Inventory: {data.inventory}</p>
                    <p>Prepaids: {data.prepaids}</p>
                    <p>Total Stockholders Equity: {data.totalStockholdersEquity}</p>
                    <p>Revenue: {data.revenue}</p>
                    <p>EBIT: {data.ebit}</p>
                    <p>Net Income: {data.netIncome}</p>
                </div>
            ))}
        </div>
    );
}  