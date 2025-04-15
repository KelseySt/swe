
export interface FiscalYearData {
	fiscalYear: string;
	totalCurrentAssets: number;
	totalCurrentLiabilities: number;
	inventory: number;
	prepaids: number;
	totalStockholdersEquity: number;
	revenue: number;
	ebit: number; // Earnings Before Interest and Taxes
	netIncome: number;
  }

var companyBalanceData;
var companyIncomeData;

var FiveYearFinancials : FiscalYearData[] = [];

export const fmpBalance = async (company: string) => {
    
	try {
        const balance_url = 'https://financialmodelingprep.com/stable/balance-sheet-statement?symbol=' + company + '&period=FY&apikey=' + `${process.env.FMP_KEY}`;
		const balance_res = await fetch(balance_url);
		companyBalanceData = await balance_res.json();
		console.log("balance success");
		return companyBalanceData;
	} catch (err) {
		console.log(err);
	}
};

export const fmpIncome = async (company: string) => {
	try {
		const income_url = 'https://financialmodelingprep.com/stable/income-statement?symbol=' + company + '&period=FY&apikey=' + `${process.env.FMP_KEY}`;
		const income_res = await fetch(income_url);
		companyIncomeData = await income_res.json();
		console.log("success");
		return companyIncomeData;
	} catch (err) {
		console.log(err);
	}
};


export async function getFiveYearFinancials(companyBalanceData: any, companyIncomeData: any) {
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
