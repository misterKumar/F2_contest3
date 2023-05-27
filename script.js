async function fetchDataUsingAsyncAwait() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}
fetchDataUsingAsyncAwait().then(data => {
    console.log(data);
    const nameSymbol = document.getElementById('name');
    const sort_mkt_cap = document.getElementById('sort-by-mkt-cap');
    const sort_by_pctng = document.getElementById('sort-by-pctng');
    let isAscMkt = false;
    let isAscPct = false;
    console.log(nameSymbol);
    nameSymbol.addEventListener('input', (e) => {
        const inputStr = e.target.value;
        populateData(inputStr);
    })
    sort_mkt_cap.addEventListener('click', () => {
        if (isAscMkt) {
            data.sort((a, b) => a.market_cap - b.market_cap);
        } else {
            data.sort((a, b) => b.market_cap - a.market_cap);
        }
        isAscMkt = !isAscMkt;
        populateData('')
    })
    sort_by_pctng.addEventListener('click', () => {
        if (isAscPct) {
            data.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
        } else {
            data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        }
        isAscPct = !isAscPct;
        populateData('')
    })

    function populateData(inputStr) {
        const table = document.getElementById('data-table');
        table.innerHTML = '';
        inputStr=inputStr.toUpperCase();
        data.filter((element) => (element.name.toUpperCase().includes(inputStr) || element.symbol.toUpperCase().includes(inputStr))).forEach((e) => {
            const table_row = `
        <tr>
        <td align="left"><span><img src="${e.image}" alt=""></span>${e.name !== null ? e.name : 'NA'}</td>
        <td>${e.symbol !== null ? e.symbol : 'NA'}</td>
        <td>$${e.current_price != null ? e.current_price.toLocaleString() : 'NA'}</td>
        <td>$${e.fully_diluted_valuation !== null ? e.fully_diluted_valuation.toLocaleString() : 'NA'}</td>
        <td style="color:${e.price_change_percentage_24h >= 0 ? 'green' : 'red'}">${e.price_change_percentage_24h !== null ? e.price_change_percentage_24h.toFixed(2) : 'NA'}%</td>
        <td align="right">Mkt Cap:$${e.market_cap !== null ? e.market_cap.toLocaleString() : 'NA'}</td>
        </tr>
        `
            table.innerHTML += table_row;
        });
    }
    populateData('')
});
