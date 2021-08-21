let day,hour,minute,second,currentDate,events
,currentEvent,eventDesc,totalSeconds,eventsEl;
currentEvent={desc:"Default",
date:"1 jan 2022",
status:false,
image:'snow.jpg'
}
let i=1;
getElements();
setElements("Default");
function reStart(textvalue){
    setElements(textvalue);

}

setEventList();
setInterval(
setElements,1000);

function getElements(){
   eventsEl= document.getElementById("eventEl");
    eventDesc=document.getElementById("eventDesc");
    day=document.getElementById("day");
    hour=document.getElementById("hour");
    minute=document.getElementById("minute");
    second=document.getElementById("second");
console.log(day.innerHTML);
}
function setElements(text){
    getCurrentEvent(text);
    console.log(currentEvent.date);
    totalSeconds=(new Date(currentEvent.date)-new Date())/1000;
    eventDesc.innerHTML=currentEvent.desc;
    document.body.style.backgroundImage='URL(images/'+currentEvent.image+')';
    day.innerHTML=formatDigit(Math.floor(totalSeconds/60/60/24));
    second.innerHTML=formatDigit(Math.floor(totalSeconds%60));
    minute.innerHTML=formatDigit(Math.floor((totalSeconds/60)%60));
    hour.innerHTML=formatDigit(Math.floor((totalSeconds/60/60)%24));
}

function formatDigit(a){
return a<10?"0"+a:a;
}

function setEventList(){
    eventlist=setEvents();
    let newOption ;
    for(i=0;i<eventlist.length;i++){
        console.log(eventlist[i].desc,'setEventList',i,eventlist.length);
        newOption = new Option(eventlist[i].desc,i+1);
        
        
        eventsEl.add(newOption,undefined);
    }
   
       
    
        
    }

function getCurrentEvent(text){
events=setEvents();
events.forEach(event => {
    
    if(event.desc==text){
        console.log(event.desc,currentEvent.desc);
    currentEvent.desc=event.desc;
    currentEvent.day=event.date;
    currentEvent.date=event.date;
    currentEvent.image=event.image; 
    console.log(event.desc,currentEvent.desc);

}
});

}

function setEvents(){
eventlist=[{
    desc:"Time to New Year",
    date:"1 jan 2022",
    status:true,
    image:'snow.jpg'
},
{
    desc:"Time to My Birthday",
    date:"10 dec 2021",
    status:true,
    image:"birthday.jpg"
},
{
    desc:"Time to New Year Islamic",
    date:"1 dec 2021",
    status:true,
    image:'birthday.jpg'
},
{
    desc:"Time to My Birthday Rozita",
    date:"23 july 2022",
    status:true,
    image:"birthday.jpg"
},{
    desc:"Time to New Year Kurdi",
    date:"21 mar 2022",
    status:true,
    image:'newroz.jpg'
},
{
    desc:"Time to My Birthday Muhamed",
    date:"17 dec 2021",
    status:true,
    image:"birthday.jpg"
}
]
return eventlist;

}
function toggle(){
    let setting=document.getElementById("setting");

    setting.style.visibility=(setting.style.visibility=='visible')?"hidden":"visible";
    }


    