import { useEffect, useState } from "react"

function useCurrencyInfo(currency) {
    if (currency.includes('(') && currency.includes(')')) {
        const match = currency.match(/\(([^)]+)\)/);
        currency = match ? match[1] : null;
    }
    const [data, setData] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            try {
                let avaiableCurrency = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json");
                avaiableCurrency = await avaiableCurrency.json();

                let currencyValues = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
                currencyValues = await currencyValues.json();
                currencyValues = await currencyValues[currency]

                const newJson = {};
                for (const key in avaiableCurrency) {
                    if (avaiableCurrency.hasOwnProperty(key) && currencyValues.hasOwnProperty(key)) {
                        const newKey = `${avaiableCurrency[key]}(${key})`;
                        const newValue = currencyValues[key];
                        newJson[newKey] = newValue;
                    }
                }
                setData(newJson);
                console.log("newJson: ", newJson);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [currency])
    return data
}

export default useCurrencyInfo;
