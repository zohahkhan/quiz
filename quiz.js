const quizData = [
	 {
	 question: "What is the capital of France?",
	 options: ["Berlin", "Madrid", "Paris", "Rome"],
	 answer: "Paris",
	 points: 10 
	 },
	 {
	 question: "Which planet is known as the Red Planet?",
	 options: ["Earth", "Mars", "Jupiter", "Venus"],
	 answer: "Mars",
	 points: 10
	 },
	 {
	 question: "What is the largest ocean on Earth?",
	 options: ["Atlantic", "Indian", "Arctic", "Pacific"],
	 answer: "Pacific", 
	 points: 15
	 },
	 {
	 question: "Who wrote 'Hamlet'?",
	 options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy",
	"Mark Twain"],
	 answer: "William Shakespeare",
	 points: 10
	 }
];

const questionTextElement = document.getElementById('questionText');
const optionsListElement = document.getElementById('optionsList');
const nextButton = document.getElementById('nextBtn'); 

const feedbackElement = document.getElementById('feedbackArea');
const scoreAreaElement = document.getElementById('scoreArea');
const scoreTextElement = document.getElementById('scoreText');
let currentQuestionIndex = 0;
let score = 0;
let questionsAnswered = 0; //keeps track of how many questions have been attempted

function displayQuestion() {
	 if (currentQuestionIndex >= quizData.length) {	
	 showFinalScore();
	 return;
	 }
	 
	 const currentQuestion = quizData[currentQuestionIndex];
	 questionTextElement.textContent = currentQuestion.question;
	 optionsListElement.innerHTML = ''; //clears previous options
	 
	 for (let i = 0; i < currentQuestion.options.length; i++) { 
		 const option = currentQuestion.options[i];
		 const li = document.createElement('li');
		 li.textContent = option;
		 li.addEventListener('click', selectAnswer);
			 optionsListElement.appendChild(li);
	}
	 nextButton.style.display = 'none'; //Hide next button until an answer is selected
	 feedbackElement.textContent = '';
}

function selectAnswer(event) {
	 const selectedOptionElement = event.target;
	 const selectedAnswer = selectedOptionElement.textContent;
	 const currentQuestion = quizData[currentQuestionIndex];
	 
	 //disable further clicks on options for this question
	 const allOptions = optionsListElement.querySelectorAll('li');
	allOptions.forEach(opt => opt.removeEventListener('click',selectAnswer));
	
	 if (selectedAnswer === currentQuestion.answer) {
		 feedbackElement.textContent = "Correct!";
		 feedbackElement.className = 'feedback correct'; //Ensure class is set
		 score = score + Number(currentQuestion.points);  
	 } 
	 else {
		 feedbackElement.textContent = `Incorrect. The correct answer was: ${currentQuestion.answer}`;
		 feedbackElement.className = 'feedback incorrect'; //Ensure class is set
	 }
	 questionsAnswered++;
	 nextButton.style.display = 'block'; //Show next button
	 selectedOptionElement.classList.add('selected'); //Highlight selected option
}

function handleNextQuestion() {
	 currentQuestionIndex++;
	 if (currentQuestionIndex < quizData.length) {
	 displayQuestion();
	 } 
	 else {
	 showFinalScore();
	 }
}

function showFinalScore() {
	 questionTextElement.style.display = 'none';
	 optionsListElement.style.display = 'none';
	 nextButton.style.display = 'none';
	 feedbackElement.style.display = 'none';
	 scoreAreaElement.style.display = 'block';
	 scoreTextElement.textContent = `${score} / ${calculateMaxScore()}`;
	 console.log("Final score calculated:", score);
}

function calculateMaxScore() {
	 let maxScore = 0;
	 quizData.forEach(q => {
	 maxScore += q.points;
	 });
	 return maxScore;
}

//event listeners
 nextButton.addEventListener('click', handleNextQuestion); 

//initial load
displayQuestion();