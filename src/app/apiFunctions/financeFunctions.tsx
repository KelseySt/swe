
export interface FiscalYearData {
	fiscalYear: string; // e.g. 2023
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

