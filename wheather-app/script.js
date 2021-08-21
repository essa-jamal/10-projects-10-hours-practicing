
const apikey='3265874a2c77ae4a04bb96236a642d2f';
const url=(loc)=>'https://api.openweathermap.org/data/2.5/wheather?q='+loc+'&apid='+apikey;
async function getWeatherByLocation(_loc){

    
    console.log('url Text',url());
    const resp=await fetch(url(_loc));

    const respData=resp.json();
console.log(respData,urlText);
}
 
//getWeatherByLocation('london');