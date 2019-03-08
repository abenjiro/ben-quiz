



function changeQuiz(){
	var newTimerConfig = document.getElementById('newTimer').value;
	var totalQuestions = document.getElementById('totalQuestions').value;

	var newTimer= document.querySelector('#timer');
	newTimer.innerText = newTimerConfig;

	// alert(totalQuestions);

	$('#quizModal').modal('hide');


}










document.getElementById('reset').style.display ='none';

const quiz = [
	{ ques:"IT Consortium is one of ........ leading financial services technology solutions provider.", ans:"Africa’s"},
	{ ques:"We exist to provide ........ systems that bring obvious value to our patrons.", ans:"innovative"},
	{ ques:"We are committed to high ...... standards both internally and externally.", ans:"Ethical"},
	{ ques:"We strive for .......  in our approach to work and delivery.", ans:"excellence"},
	{ ques:"We demonstrate ....... in the design of our work and solutions.", ans:"Creativity"},
	{ ques:"Our clients trust us to provide them ....... solutions to increase efficiency", ans:"innovative"},
	{ ques:"ITC is at home in ensuring that ...... value is derived from what we offer", ans:"maximum"},
	{ ques:"We love to solve problems, and to solve them ......", ans:"holistically"},
	{ ques:"Our products and services are architected around ......", ans:"Transflow"},
	{ ques:"our flagship product, is a payment platform that seeks to simplify and improve the ...... of payments between customers", ans:"efficiency"},
	{ ques:"We deliver ...... engagement with customers by providing agile payment solutions that are easy to use", ans:"realtime"},
	{ ques:"IT Consortium has completed the ..... certification programme", ans:"PCI-DSS"},
];

console.log(quiz.length);

function random(a,b=1){
	if (b===1) {
		[a,b] = [b,a];
	}
	return Math.floor((b-a+1)*Math.random())+a;
}
function shuffle(array){
	for (let i = array.length; i; i--) {
		let j = random(i)-1;
		[array[i-1],array[j]]= [array[j],array[i-1]];
	}
}



const view = {
	timer:document.querySelector('#timer'),
	score:document.querySelector('#score'),
	question: document.getElementById('question'),
	response: document.getElementById('response'),
	result: document.getElementById('result'),
	info: document.getElementById('info'),
	start: document.getElementById('start'),
	chart: document.getElementById('chart'),
	progress: document.getElementById('progress'),
	reset: document.getElementById('reset'),
	config: document.getElementById('config'),



	render(target,content,attributes){
		for(const key in attributes){
			target.setAttribute(key,attributes[key]);
		}
		target.innerHTML = content;
	},

	hide(element){
		element.style.display = 'none';
	},

	show(element){
		element.style.display = 'block';
	},

	setup(){
		this.show(this.question);
		this.show(this.response);
		this.show(this.result);

		this.hide(this.reset);
		this.hide(this.start);
		this.hide(this.chart);
		this.hide(this.config);
		//console.log("benjiro hide");
		
		this.render(this.score,quizGame.score);
		this.render(this.result, '');
		this.render(this.info , '');
		this.show(this.chart);
	},

	itteration(){
		this.hide(this.chart);
		this.hide(this.question);
		this.hide(this.response);
		this.hide(this.start);
		this.show(this.reset);
		console.log("benjiro");
		this.show(this.chart);

	},
	buttons(array){
		return `Ans: `+ array.map(value=>`<button class="btn btn-outline-info btn-sm">${value}</button>`).join(' ');
	}

};


const quizGame={
	start(quiz){
		var newTimerConfig = document.getElementById('newTimer').value;
		console.log(newTimerConfig);
		this.score = 0;
		this.count = 0;
		this.questions = [...quiz];
		console.log(this.questions.length);
		view.setup();
		this.secondsRemaining = `${newTimerConfig == "" ? 25: newTimerConfig}`;
		this.timer = setInterval(this.countdown,1000);
		this.progSecondsRemaining = 100;
		this.progtimer = setInterval(this.progcountdown,(`${newTimerConfig=="" ? 250 : (newTimerConfig*10)}`));
		this.ask();
	},

	ask(ques){
		var totalQuestions = document.getElementById('totalQuestions').value;

      var limit = (quiz.length - (totalQuestions));
      var check = quiz.length;

      if (limit > quiz.length) {
      	alert("Your total number of question is beyond limit. Change your total questions or add more questions to the system")
      }

	if (this.questions.length > `${limit == check ? 2: limit}`) {
		shuffle(this.questions);
		this.question = this.questions.pop();
		this.count++;
		const options = [this.questions[0].ans,this.questions[1].ans,this.question.ans];
		shuffle(options);
		const question = `${this.count}. ${this.question.ques}?`;
		view.render(view.question,question);
		view.render(view.response,view.buttons(options));
	}else {
		this.gameOver();
	}

},
check(event){
		console.log('check(event) invoked');
	//event.preventDefault();
	const response = event.target.textContent;
	const answer = this.question.ans;
	if (response === answer) {
		//alert('answer');
		$(function () { //ready
          toastr.success('Correct Answer');
      });
		view.render(view.result, 'Correct',{'class':'correct'});
		this.score++;
		view.render(view.score, this.score);
	}else{
		$(function () { //ready
          toastr.error(`Wrong! the answer is ${answer.toUpperCase()}`);
      });
		view.render(view.result, `Wrong! the correct answer was ${answer}`,{'class':'wrong'});
	}
	//view.resetForm();
	this.ask();
},
countdown(){
	quizGame.secondsRemaining--;
	view.render(view.timer,quizGame.secondsRemaining);
	if (quizGame.secondsRemaining==0) {
		quizGame.gameOver();
	}
},

progcountdown(){
	quizGame.progSecondsRemaining--;
	
	this.progress.style.width = `${quizGame.progSecondsRemaining}%`;
	
	console.log(quizGame.progSecondsRemaining);
	//view.render(view.progress,quizGame.progSecondsRemaining);
	if (quizGame.progSecondsRemaining==0) {
		quizGame.gameOver();
		
	}
},

gameOver(){
	var maxValue = 10;
	alert(maxValue);
	var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["You"],
        datasets: [{
            label: 'Score',
            data: [this.score],
            backgroundColor: [
                //'rgba(255, 99, 132, 0.2)',
                '#182B59',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                //'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    steps: 1,
                                stepValue: 2,
                                max: maxValue
                }
            }],

            xAxes:[{
     barPercentage: 0.5,
    		gridLines: {
        	display:false
        }
    }],
        }
    }
});











	view.render(view.info, `<div style="margin-top:75px;">Quiz Over, you scored ${this.score} point${this.score !==1 ? 's': ''} out of ${totalQuestions.value == ""? '10' : totalQuestions.value}</div>`);
	view.itteration();
	clearInterval(this.timer);
	clearInterval(this.progtimer);
	
}


}

view.start.addEventListener('click',()=>quizGame.start(quiz),false);
view.response.addEventListener('click',(event)=>quizGame.check(event),false);

//console.log(quizGame.score);



