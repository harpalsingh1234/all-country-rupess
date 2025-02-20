const BASE_URL='https://app.currencyapi.com/dashboard';
const dropdowns =document.querySelectorAll('.dropdown select');
const btn=document.querySelector('form button');
const fromCurr=document.querySelector('.from select');
const toCurr=document.querySelector('.to select');
const msg=document.querySelector('.msg');


for(let select of dropdowns){
    for(currCode in countryList){
        let newOPtion=document.createElement('option');
        newOPtion.innerText=currCode;
        newOPtion.value=currCode;
        if(select.name==='from'&&currCode==='USD'){
            newOPtion.selected='selected';
        }else if(select.name==='to'&&currCode==='INR'){
            newOPtion.selected='selected';
             }
        select.append(newOPtion);
    }
    select.addEventListener('change',(evt)=>{
        updateFlag(evt.target);
    })
};
const updateExchangeRate=async ()=>{
    let amount=document.querySelector('.amount input');
    let amtVal=amount.value;
    if(amtVal===''||amtVal<1){
        amtVal=1;
        amount.value='1';
    }
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.dashboard`;
    let response= await fetch(BASE_URL);
    let data= await response.dashboard();
    let rate=data[toCurr.value.toLowerCase()];
    let finalAmount=amtVal*rate;
    msg.innerText=`${amtVal}${fromCurr.value}=${finalAmount}${toCurr.value}`
};

const updateFlag=(element)=>{
    let currCode=element.value;
    let countrycode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector('img');
    img.src=newsrc;
};

btn.addEventListener('click',(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
   
});
window.addEventListener('load',()=>{
    updateExchangeRate();
});

