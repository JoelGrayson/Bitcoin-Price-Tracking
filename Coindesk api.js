let price;
let pPrice=0; //previous price
let lastUpdated=0; //num seconds
const priceSpan=document.getElementById('priceSpan');
const lastUpdatedSpan=document.getElementById('lastUpdated');

function requestBitcoin() {
    const req=new XMLHttpRequest();
    req.addEventListener('readystatechange', ()=>{
        if (req.readyState===4) {
            let jsonResponse=JSON.parse(req.responseText);
            pPrice=price;
            price=jsonResponse.bpi.USD.rate_float;
            if (pPrice===price)
                lastUpdated++;
            else
                lastUpdated=0;
            console.log('Price: '+price);
            priceSpan.innerHTML=`Price: $${price}`;
            lastUpdatedSpan.innerHTML=`Last updated ${lastUpdated} second${lastUpdated!==1?'s':''} ago.`;
        }
    });
    req.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice.json');
    req.send();
}

requestBitcoin();
setInterval(()=>{
    requestBitcoin();
}, 1000); //updates every sec