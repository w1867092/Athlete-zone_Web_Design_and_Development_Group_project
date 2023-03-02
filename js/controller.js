
let question_array = document.getElementsByClassName("question");


let feedback_array = document.getElementsByClassName("feedback");
let user_answers=[];
let correct_answers=["2008","Chaminda Vaas", "Muttiah Muralitharan", "Bandula Warnapura","1960","Sir Alex Ferguson", "Sadio Mane","Alan Shearer","Miroslav Klose","2016"];
let correct_count=0;
let question= ["In which year did Sri Lanka first win an Asia Cup away from home?","Which Sri Lankan won the Player of the Series award in the 1996 ICC World Cup?"," Which of the following players has played in the most World Cup games for Sri Lanka?","Who was Sri Lanka's first Test captain?","In which year was the first European Championship held?","Which manager was famously said to have given players 'the Hairdryer Treatment'?","Which player scored the fastest hat-trick in the Premier League?","With 260 goals, who is the Premier League's all-time top scorer?"," The record number of World Cup goals is 16, scored by who?"," Ronaldo helped Portugal win the European Championship in which year?"];
let answers=[["2012","2004","2016","2008"],["kuma sangakkara","Mahela Jayawardhana","Chaminda Vaas","Lasith Malinga"],["Bandula Warnapura","Sanath Jayasuriya","Muttiah Muralitharan","Roshan Mahanama"],["Bandula Warnapura","Mohhmad Ali","Roshan Mahanama","Angulo Methiuws"],["2008","1960","1998","2001"],["Sir Alex Ferguson","pobba","messi","Ronaldo"],["Sadio Mane","Messi","Ronaldo","Ali"],["Alan Shearer","Ronaldo","Messi","Pobba"],["iroslav Klose","Ronaldo","Mesi","Miroslav Klose"],["2016","2025","2006","2018"],[" Cristiano Ronaldo","Messi","Pobba","Nemayr"]];

function show_question()
{
    for(i=0; i<10; i++)
    {
        question_array[i].innerHTML = question[i];
    }
}
function timer() {
    var sec = 60;

    var time = setInterval(myTimer, 1000);

    {
        document.getElementById('full').style.display = "block";
    }


    {document.getElementById("start").disabled=true;
    }



    function myTimer() {
        document.getElementById('timer').innerHTML = sec + "sec left";
        sec--;
        if (sec == -1) {
            clearInterval(time);

            //alert("Time out!! :(");
            submit_answer();

        }
    }

//function myFunction(){
   //  timer();
  //  alert("YOUR TIME IS OUT!");


 //submit_answer();





}
function getradiovalue(radio_array)
{
    for(let i=0; i<radio_array.length;i++)
    {
        if(radio_array[i].checked)
        {
            return radio_array[i].value;
        }
    }
    return "";
}

function submit_answer()

{

   // console.log("submit_answer_activated");
   for(let i=0; i<10; i++)
   {
    let answers_radio_array= document.getElementsByClassName("option"+(i+1));
    user_answers[i] = getradiovalue(answers_radio_array);
    //console.log(user_answers);
   }
   check_answers();
    {document.getElementById("submit").disabled=true;
    }
}

document.addEventListener("DOMContentLoaded", function()
{

    //console.log("onload activated.adding onchange attributes to all text field elements in the class txt_number and adding onclick attribute to all clear buttons in the class btn_clear.");
    for(i=0; i<10; i++)
    {
        let answers_radio_array= document.getElementsByClassName("option"+(i+1));
        let answers_label_array= document.getElementsByClassName("labels"+(i+1));
        for(let j=0; j<4; j++)
        {    
            answers_radio_array[j].setAttribute("type","radio");
            answers_radio_array[j].setAttribute("name","opt_"+i);
            answers_radio_array[j].setAttribute("value",answers[i][j]);

            answers_label_array[j].setAttribute("for","opt_"+i);
            answers_label_array[j].nextSibling.data=answers[i][j];
        }	
    }
});

function check_answers()
{
    console.log(user_answers);
    console.log(correct_answers);
    console.log(question);
    for(i=0; i<correct_answers.length; i++)
    {
        if(user_answers[i] == correct_answers[i])
        {
            feedback_array[i].innerHTML="&checkmark; Your answer is Correct";
            feedback_array[i].classList.add("correct");
            correct_count++;
        }
        else
        {
            feedback_array[i].innerHTML="&cross; Your answer is incorrect. The correct answer is :"+correct_answers[i];
            feedback_array[i].classList.add("incorrect");
        }
    }

    result_sheet();

}

function result_sheet()
{
    let result_holder = document.getElementById("result");
    result_holder.innerHTML="your grade is :"+correct_count+"/10   >> Converted into out of 100  :"+correct_count*10+"/100";
    set_background_according_to_result();
}

function set_background_according_to_result()
{

    let body_element = document.getElementById("body_area");
    if(correct_count<4)
    {
        body_element.classList.add("one_to_three");

    }
    else if(correct_count<8)
    {
        body_element.classList.add("four_to_seven");

    }
    else
    {
        body_element.classList.add("eight_to_ten");

    }
}

