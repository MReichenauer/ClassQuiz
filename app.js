let currentQuestionIndex = 0;
let correctAnswers = 0;
let shuffledStudents = [];
// Start the game and at the same time hide the option to chose number of questions.
function startQuiz(selectedQuestionCount) {
    restartGame();
    if (selectedQuestionCount === 'all') {
        shuffledStudents = shuffleArray([...students]);
    } else {
        shuffledStudents = shuffleArray([...students]).slice(0, selectedQuestionCount);
    }

    // Show the quiz container by removing the "hide" class.
    document.getElementById('question-container').classList.remove('hide');
    // Hide the quiz setup by removing the "center" class and adding the "hide" class.
    document.getElementById('quiz-setup').classList.remove('center');
    document.getElementById('quiz-setup').classList.add('hide');
    // Show the restartButton class by removing "hide" class and center it by adding "restartBtn" class.
    document.getElementById('restartButton').classList.remove('hide');
    document.getElementById('restartButton').classList.add('restartBtn');
    document.getElementById('quiz-container').classList.add('quiz-container-class');

    // Show question with image and names.
    showQuestion(shuffledStudents[currentQuestionIndex]);
}

    // Function to get image from the array students.
function showQuestion(student) {
         document.getElementById('student-image').src = student.image;
        // Getting my options in a shuffled array.
        const options = shuffleArray([...students])
            .filter(s => s && s.name && s.image && s.name !== student.name && s.image !== student.image) 
            .slice(0, 3);

        // Adding the right option for the user to chose.
        options.push(student);

        const shuffledOptions = shuffleArray(options);

        // Adding the options to the dom page.
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';
        shuffledOptions.forEach(option => {
            const button = document.createElement('button');
            button.innerText = option.name;
            button.onclick = () => checkAnswer(button, option.name === student.name);
            optionsContainer.appendChild(button);
        });
    }
    // Check if the answer is correct. If so add 1 to the correctAnswer and highlight the correct answer green, highlight clicked answer red and correct answer green. Then move to next question.
function checkAnswer(button, isCorrect) {
        const buttons = document.querySelectorAll('#options-container button');
    
        if (isCorrect) {
            correctAnswers++;
            button.style.backgroundColor = 'green';
            
        } else {
            buttons.forEach(button => {
                if (button.innerText === shuffledStudents[currentQuestionIndex].name) {
                    button.style.backgroundColor = 'green';
                }
            });
            button.style.backgroundColor = 'red';   
        }
    
        // Disable the buttons after a click, so the user can se the highlighted buttons. After 2 sec move on to next question.
        buttons.forEach(button => (button.disabled = true));
    
        // Delay moving to the next question after 2 sec
        setTimeout(() => {
            currentQuestionIndex++;
    
            // If the index the user is at is less than the chosen game, go to the next question. Else, show results.
            if (currentQuestionIndex < shuffledStudents.length) {
                // Reset button colors before moving to next question.
                buttons.forEach(button => (button.style.backgroundColor = ''));
                // Enable buttons again so the use can chose a new answer for next question.
                buttons.forEach(button => (button.disabled = false));
                showQuestion(shuffledStudents[currentQuestionIndex]);
            } else {
                showResults();
            }
        }, 2000);
    }
        // Show the results in dom page.
function showResults() {
        const resultContainerH3 = document.getElementById('final-resultat');
        resultContainerH3.innerText = (`Final score: ${correctAnswers} / ${shuffledStudents.length} was correct`);
        document.getElementById('quiz-setup').classList.remove('hide');
        document.getElementById('quiz-setup').classList.add('center');
        document.getElementById('question-container').classList.add('hide');
        document.getElementById('quiz-container').classList.remove('quiz-container-class');

    }

    // Restart the game.
function restartGame() {
    currentQuestionIndex = 0;
    correctAnswers = 0;

    // making my quiz-setup center again by adding the class "center".
    document.getElementById('quiz-setup').classList.add('center');
    // Show quiz setup by removing the "hide" class.
    document.getElementById('quiz-setup').classList.remove('hide');
    // Hide quiz container by adding the "hide" class.
    document.getElementById('question-container').classList.add('hide');
    // Show  option container by removing the "hide" class.
    document.getElementById('options-container').classList.remove('hide');
    document.getElementById('final-resultat').innerText = ("");
    document.getElementById('quiz-container').classList.remove('quiz-container-class');

}



    // Using the fisher-wagner algorithm to make it really random for the user.
function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    
    
        // Start the game button.
    document.getElementById('startQuizButton').addEventListener('click', function () {
        const selectedQuestionCount = document.getElementById('questionCount').value;
        startQuiz(selectedQuestionCount);
    });


    // Restart the game button.
    document.getElementById('restartButton').addEventListener('click', restartGame);