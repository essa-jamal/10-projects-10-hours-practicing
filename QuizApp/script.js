let currentquizData=[],allquizes,quizIndex=0;
let answer=0,score=0;
function getQuestions(){
    const questions = [
        {
          type: "general",
          q: "what is HTML Stands for?",
          a: "hello to my lesson",
          b: "Hypertext Markup Language",
          c: "Java Script Langaue",
          d: "How are You?",
          ans: "b",
        },
        {
        type: "general",
          q: "what is the most used programming language?",
          a: "Java",
          b: "HTML",
          c: "JavaScript",
          d: "C++",
          ans: "c",
        },
        {
            type: "general",
          q: "One Mile is:",
          a: "1621 Meter",
          b: "1000 Meter",
          c: "1610 Meter",
          d: "1625 Meter",
          ans: "a",
        },
        {
            type: "general",
          q: "What is LTE Standing for?",
          a: "Low tem entity",
          b: "Long to Item",
          c: "Low To environment",
          d: "Long Term Evolution",
          ans: "d",
        },
        {
            type: "Language",
          q: "What is LTE Standing for?",
          a: "Low tem entity",
          b: "Long to Item",
          c: "Low To environment",
          d: "Long Term Evolution",
          ans: "d",
        },
        {
            type: "Language",
          q: "What is IT stands for?",
          a: "Information Technology",
          b: "Long to Item",
          c: "Low To environment",
          d: "Long Term Evolution",
          ans: "a",
        },
        {
            type: "Language",
          q: "What is HTML Standing for?",
          a: "Low tem entity",
          b: "Long to Item",
          c: "Hypertext Markup Language",
          d: "Long Term Evolution",
          ans: "d",
        },
        {
            type: "Language",
          q: "What is your Mother language?",
          a: "English",
          b: "Kurdish",
          c: "Arabic",
          d: "Turkish",
          ans: "b",
        },
        {
            type: "Computer Science",
          q: "What is HTML Standing for?",
          a: "Low tem entity",
          b: "Long to Item",
          c: "Hypertext Markup Language",
          d: "Long Term Evolution",
          ans: "c",
        },{
        type: "Computer Science",
        q: "What is IP Standing for?",
        a: "Internet Protocal",
        b: "Long to Item",
        c: "Hypertext Markup Language",
        d: "Long Term Evolution",
        ans: "a",
      }
        
    
      ];
return questions;    
}
let i=0;
getElements();
setQuizList();
function getQuizByType(type)
{
    console.log(type,'getQuizByType');
allquizes=getQuestions();
for(i=0;i<allquizes.length;i++){
    if(allquizes[i].type==type){
    currentquizData[quizIndex]=allquizes[i];
    quizIndex++;
    console.log(type,'getQuizByType');
    

}
}

}

function toggle(){
    loadQuiz();
    console.log(quiz_prepare.style.visibility,quiz_container.style.visibility,'before toggle');


    quiz_prepare.style.visibility="hidden";
    quiz_container.style.visibility="visible";
    console.log(quiz_prepare.style.visibility,quiz_container.style.visibility,'after toggle');

}

function setQuizList(){
   let qlist=getQuestions();
   let arr=[];
    let newOption ;
    for(i=0;i<qlist.length;i++){
        arr[i]=qlist[i].type;}
    const uniquearr = Array.from(new Set(arr))
    for(i=0;i<uniquearr.length;i++){
        console.log(uniquearr[i],'setEventList',i,uniquearr.length);
        newOption = new Option(uniquearr[i],i+1);
        
        
        quizListEl.add(newOption,undefined);
    }
   
       
    
        
    }

    function getElements(){
        quiz_prepare=document.getElementById("quiz_prepare");
        quiz_container= document.getElementById("quiz_container");
        quizListEl= document.getElementById("quizs");
        SubmitButtonPrepare= document.getElementById("SubmitButtonPrepare");
         a_text=document.getElementById("ab");
         b_text=document.getElementById("bb");
         c_text=document.getElementById("cb");
         d_text=document.getElementById("db");
         q_text=document.getElementById("quiz_text");
     
     }
     currentquiz=0;
     function loadQuiz() {
         console.log("test");
        quizData = currentquizData[currentquiz];
        q_text.innerHTML = quizData.q;
        a_text.innerHTML = quizData.a;
        b_text.innerHTML = quizData.b;
        c_text.innerHTML = quizData.c;
        d_text.innerHTML = quizData.d;
        console.log(a_text,q_text,b_text,c_text,d_text,'loadQuiz')
      }
      function getSelected() {
        const answersEl = document.querySelectorAll(".answer");
        answersEl.forEach((answerEl) => {
          if (answerEl.checked) {
            console.log("getselected", answerEl.id);
            answer = answerEl.id;
          }
        });
        return answer;
      }
    
      SubmitButton.addEventListener("click", () => {
          console.log("submit");
        answer = getSelected();
        console.log(answer, "test",quizData.ans);
        if (answer != undefined) {
          if (answer == quizData.ans) {

              console.log("true answer",score);
            score++;
          }
          if (currentquiz < currentquizData.length - 1) {
            currentquiz++;
      
            loadQuiz();
          } else {
            //alert("You finished the Quiz, you have Score of "+currentquiz+" / "+score);
            deSelectAnswers();
            document.getElementById("quiz_container").innerHTML =
              "<h4 style='margin-top:10px;'>Your Score is    " +
              score +
              " / " +
              currentquizData.length +
              "  </h4>" +
              "     <button  onclick='location.reload(true);' >Retry</button>     ";
          }
        }
      });


      function deSelectAnswers() {
        const answersEl = document.querySelectorAll(".answer");
        answersEl.forEach((answerEl) => {
          if (answerEl.checked) {
            answerEl.checked = false;
          }
        });
      }