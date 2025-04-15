
export const callFMP = async (company: string) => {
    
	try {
        const url = 'https://financialmodelingprep.com/stable/balance-sheet-statement?symbol=' + company + '&period=FY&apikey=' + `${process.env.FMP_KEY}`;
		const res = await fetch(url);
		const data = await res.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
};