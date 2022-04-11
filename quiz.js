const duration = 10
const passMark = 70
const questions = [
    {
        question: "What language is use for structuring a webpage",
        options: ["English Language", "HTML", "General Language", "Universal Language"],
        answer: 1
    },
    {
        question: "Who is the tallest in AluSoft",
        options: ["Mr. Ayo", "Mr. Ola", "Mr. Bolu", "Mr. Ade"],
        answer: 0
    },
    {
        question: "Who is the shortest in AluSoft",
        options: ["Mr. Ayo", "Mr. Ola", "Mr. Bolu", "Mr. Ade"],
        answer: 3
    },
    {
        question: "Who is the tallest in AluSoft",
        options: ["Mr. Ayo", "Mr. Ola", "Mr. Bolu", "Mr. Ade"],
        answer: 1
    },
    {
        question: "Who is the tallest in AluSoft",
        options: ["Mr. Ayo", "Mr. Ola", "Mr. Bolu", "Mr. Ade"],
        answer: 0
    },
    {
        question: "Who is the tallest in AluSoft",
        options: ["Mr. Ayo", "Mr. Ola", "Mr. Bolu", "Mr. Ade"],
        answer: 0
    },
    {
        question: "Who is the tallest in AluSoft",
        options: ["Mr. Ayo", "Mr. Ola", "Mr. Bolu", "Mr. Ade"],
        answer: 0
    },
    {
        question: "Who is the tallest in AluSoft",
        options: ["Mr. Ayo", "Mr. Ola", "Mr. Bolu", "Mr. Ade"],
        answer: 0
    },
    {
        question: "Who is the tallest in AluSoft",
        options: ["Mr. Ayo", "Mr. Ola", "Mr. Bolu", "Mr. Ade"],
        answer: 0
    },
    {
        question: "Who is the tallest in AluSoft",
        options: ["Mr. Ayo", "Mr. Ola", "Mr. Bolu", "Mr. Ade"],
        answer: 0
    },
    {
        question: "Who is the tallest in AluSoft",
        options: ["Mr. Ayo", "Mr. Ola", "Mr. Bolu", "Mr. Ade"],
        answer: 0
    },
    {
        question: "Who is the tallest in AluSoft",
        options: ["Mr. Ayo", "Mr. Ola", "Mr. Bolu", "Mr. Ade"],
        answer: 0
    },
]
var qIndex = 0;
var currentQuestion
var time = duration
var score = 0;
var interval
function timer() {
    document.querySelector('.timer_sec').innerHTML = time;
    if(interval != undefined)
    clearInterval(interval);
    interval = setInterval(function(){
        time--
        document.querySelector('.timer_sec').innerHTML = time;
        if(time < 1){            
            nextQuestion()
            document.querySelector(`#status${qIndex -1}`).classList.add('wrong')
        }
    }, 1000)
}

function render() {
    
    timer()
    currentQuestion = questions[qIndex]
    document.querySelector(".quiz_box section").innerHTML = `
    <div class="question">
      ${currentQuestion.question}          
    </div>
    <div class="option_list">
        <div class="option" result="1">
            ${currentQuestion.options[1]}
            
        </div>
        <div class="option" result="1">
            ${currentQuestion.options[1]}
            
        </div>
        <div class="option" result="2">
            ${currentQuestion.options[2]}
            
        </div>
        <div class="option" result="3">
            ${currentQuestion.options[3]}
            
        </div>
    </div>
    `
    document.querySelector(`#status${qIndex}`).classList.add('running')
    var options = document.querySelectorAll('.option')
    for (const option of options) {
        option.addEventListener('click', checkResult)
    }
   
}

function checkResult(e) {
    if(currentQuestion.answer == e.target.getAttribute('result')){
        score++
        document.querySelector(`#status${qIndex}`).classList.add('correct')
    }else{
        document.querySelector(`#status${qIndex}`).classList.add('wrong')
    }
    // var timeOut = setTimeout(nextQuestion, 1000)
    nextQuestion()
}
function nextQuestion() {
    qIndex++
    if (qIndex >= questions.length) {
        return finish()
    }
    time += duration
    render()
}
function start() {
    var status = ''
    document.querySelector('.quiz_box').style.display = 'block'
    document.querySelector('.result_box').style.display = 'none'
    document.querySelector('.info_box').style.display = 'none'
    questions.forEach(function(q, i){
        status += `<div class="status" id="status${i}">${i+1}</div>`
    })
    document.querySelector(".quiz_box footer").innerHTML = status
    time = duration;
    render()
}
function finish() {
    clearInterval(interval)
    var percentageScore = score/questions.length * 100;    
    percentageScore = percentageScore.toString().indexOf('.') != -1 ? percentageScore.toFixed(2) : percentageScore
    var passed = percentageScore >= passMark;
    document.querySelector('.quiz_box').style.display = 'none'
    document.querySelector('.result_box').style.display = 'flex'
    document.querySelector('.result_box').innerHTML = 
    `
        <div class="icon">
            <i class="fas ${(passed)? 'fa-crown' : 'fa-times text-red'}"></i>
        </div>
        <div class="complete_text">You have completed the Quiz!</div>
        <div class="score_text">
            <span>${(passed)? 'Congratulations' : 'Oops!'}You score<p>${percentageScore} percent</p></span>
        </div>
        <div class="buttons">
            <button class="restart" onclick="start()">Replay Quiz</button>
            <button class="restart" onclick="exit()">Exit Quiz</button>
        </div>
    `
    qIndex = 0;
    score = 0
}
function exit() {
    document.querySelector('.result_box').style.display = 'none'
    document.querySelector('.info_box').style.display = 'block'
}