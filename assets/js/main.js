
function resetQuiz() {
	window.location = '';

	window.localStorage.removeItem('quiz');

}


function clearStorage() {
	window.localStorage.removeItem('quiz');
}




document.getElementById('reset').style.display = 'none';
document.getElementById('solutionCard').style.display = 'none';

const quiz = [
	{
		"ques": "A ..... is used to repeatedly execute a block of code until a specified condition is met.",
		"ans": "loop"
	},
	{
		"ques": "Which of these can create a pop-up dialog box in JavaScript.",
		"ans": "alert()"
	},
	{
		"ques": "The .... operator returns a string indicating the data type of a value or variable.",
		"ans": "typeof"
	},
	{
		"ques": "An .... is a data structure in JavaScript used to store a collection of values, indexed by numerical positions.",
		"ans": "array"
	},
	{
		"ques": ".... is used to print messages or values to the browser's console for debugging.",
		"ans": "console.log()"
	},
	{
		"ques": "A .... in JavaScript is a sequence of characters, enclosed in either single (') or double ('') quotes",
		"ans": "string"
	},
	{
		"ques": "An .... in JavaScript is a collection of key-value pairs, where keys are strings (or Symbols) and values can be of any data type",
		"ans": "object"
	},
	{
		"ques": "You can add an element to the end of an array using the .... method, like this",
		"ans": "push()"
	},
	{
		"ques": "A .... statement in a function is used to specify the value that the function should output. It also exits the function's execution",
		"ans": "return"
	},
	{
		"ques": "The .... value represents the intentional absence of any object value or the lack of a value.",
		"ans": "null"
	},
	{
		"ques": "The .... value represents a variable that has been declared but has not been assigned a value.",
		"ans": "undefined"
	},
	{
		"ques": "You can access an object's property using .... notation",
		"ans": "dot"
	}
];

var available = document.getElementById('available');
available.innerText = quiz.length - 2;

function changeQuiz() {
	var newTimerConfig = document.getElementById('newTimer');
	var totalQuestions = document.getElementById('totalQuestions');


	var newTimer = document.querySelector('#timer');


	if (newTimerConfig.value == "") {
		alert("Please enter new Time value. ");

	} else if (totalQuestions.value == "") {
		alert("Please enter new total number of questions");
	}
	else if ((quiz.length - 2) < totalQuestions.value) {
		alert("Your total number of question is beyond limit. Change your total questions value or add more questions to the system");
		totalQuestions.value = '';
	}

	else {
		$('#quizModal').modal('hide');
		newTimer.innerText = newTimerConfig.value;
		$(function () { //ready
			toastr.success('Configurations successfully applied')

		});
	}

}




function random(a, b = 1) {
	if (b === 1) {
		[a, b] = [b, a];
	}
	return Math.floor((b - a + 1) * Math.random()) + a;
}
function shuffle(array) {
	for (let i = array.length; i; i--) {
		let j = random(i) - 1;
		[array[i - 1], array[j]] = [array[j], array[i - 1]];
	}
}



const view = {
	timer: document.querySelector('#timer'),
	score: document.querySelector('#score'),
	question: document.getElementById('question'),
	response: document.getElementById('response'),
	result: document.getElementById('result'),
	info: document.getElementById('info'),
	start: document.getElementById('start'),
	chart: document.getElementById('chart'),
	progress: document.getElementById('progress'),
	reset: document.getElementById('reset'),
	config: document.getElementById('config'),
	solutionCard: document.getElementById("solutionCard"),



	render(target, content, attributes) {
		for (const key in attributes) {
			target.setAttribute(key, attributes[key]);
		}
		target.innerHTML = content;
	},

	hide(element) {
		element.style.display = 'none';
	},

	show(element) {
		element.style.display = 'block';
	},

	setup() {
		this.show(this.question);
		this.show(this.response);
		this.show(this.result);

		this.hide(this.reset);
		this.hide(this.start);
		this.hide(this.solutionCard);
		this.hide(this.chart);
		this.hide(this.config);

		this.render(this.score, quizGame.score);
		this.render(this.result, '');
		this.render(this.info, '');

		this.show(this.chart);
	},

	itteration() {
		this.hide(this.chart);
		this.hide(this.question);
		this.hide(this.response);
		this.hide(this.start);
		this.show(this.reset);
		this.show(this.chart);
		this.show(this.solutionCard);

	},
	buttons(array) {
		return `Ans: ` + array.map(value => `<button class="btn btn-outline-info btn-sm">${value}</button>`).join(' ');
	}

};


const quizGame = {
	start(quiz) {
		var newTimerConfig = document.getElementById('newTimer').value;
		this.score = 0;
		this.count = 0;
		this.questions = [...quiz];
		view.setup();
		this.secondsRemaining = `${newTimerConfig == "" ? 25 : newTimerConfig}`;
		this.timer = setInterval(this.countdown, 1000);
		this.progSecondsRemaining = 100;
		this.progtimer = setInterval(this.progcountdown, (`${newTimerConfig == "" ? 250 : (newTimerConfig * 10)}`));
		this.ask();
	},

	ask(ques) {
		var totalQuestions = document.getElementById('totalQuestions').value;

		var limit = (quiz.length - (totalQuestions));
		var check = quiz.length;



		if (this.questions.length > `${limit == check ? 2 : limit}`) {
			shuffle(this.questions);
			this.question = this.questions.pop();
			this.count++;
			const options = [this.questions[0].ans, this.questions[1].ans, this.question.ans];
			shuffle(options);
			const question = `${this.count}. ${this.question.ques}?`;
			view.render(view.question, question);
			view.render(view.response, view.buttons(options));
		}
		else {
			this.gameOver();
		}

	},
	check(event) {
		console.log('check(event) invoked');
		//event.preventDefault();
		const response = event.target.textContent;
		const answer = this.question.ans;
		const questionQ = this.question.ques;
		if (response === answer) {
			$(function () { //ready
				toastr.success('Correct Answer');
			});
			view.render(view.result, 'Correct', { 'class': 'correct' });
			this.score++;
			view.render(view.score, this.score);
		} else {
			$(function () { //ready
				toastr.error(`Wrong! the answer is ${answer.toUpperCase()}`);
			});
			var myQuiz = { question: questionQ, answer: answer };
			let itemsArray = localStorage.getItem('quiz') ? JSON.parse(localStorage.getItem('quiz')) : [];

			itemsArray.push(myQuiz);
			localStorage.setItem('quiz', JSON.stringify(itemsArray));

			const data = JSON.parse(localStorage.getItem('quiz'));
			displayResult = document.getElementById("showWrongQuestions");

			displayResult.innerHTML = '';
			var countOuput = 0;

			for (var i = 0; i < data.length; i++) {
				countOuput++;
				displayResult.innerHTML += `
			<li>${countOuput}. ${data[i].question}<br> Ans: <i class="text-success col">${data[i].answer}</i></li>
			`;

			}


			view.render(view.result, `Wrong! the correct answer was ${answer}`, { 'class': 'wrong' });
		}
		this.ask();
	},
	countdown() {
		quizGame.secondsRemaining--;
		view.render(view.timer, quizGame.secondsRemaining);
		if (quizGame.secondsRemaining == 0) {
			quizGame.gameOver();
		}
	},

	progcountdown() {
		quizGame.progSecondsRemaining--;

		this.progress.style.width = `${quizGame.progSecondsRemaining}%`;

		if (quizGame.progSecondsRemaining == 0) {
			quizGame.gameOver();

		}
	},

	gameOver() {
		var maxValue = parseInt(totalQuestions.value) || (parseInt(quiz.length) - 2);
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
							beginAtZero: true,
							steps: 1,
							stepValue: 2,
							max: maxValue
						}
					}],

					xAxes: [{
						barPercentage: 0.5,
						gridLines: {
							display: false
						}
					}],
				}
			}
		});



		view.render(view.info, `<div style="margin-top:75px;">Quiz Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''} out of ${totalQuestions.value == "" ? (quiz.length - 2) : totalQuestions.value}.</div>


		  
		`);
		view.itteration();
		clearInterval(this.timer);
		clearInterval(this.progtimer);

	}


}

view.start.addEventListener('click', () => quizGame.start(quiz), false);
view.response.addEventListener('click', (event) => quizGame.check(event), false);
if ($('#showWrongQuestions li').length == 0) {
	document.getElementById('solutionCard').style.display = 'none';
}

