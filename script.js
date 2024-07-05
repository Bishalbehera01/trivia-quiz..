const questions = [
    {
        question: "What is the capital of Italy?",
        choices: ["Rome", "Venice", "Milan", "Naples"],
        correctAnswer: 0
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        choices: ["Osmium", "Oxygen", "Oganesson", "Oxidane"],
        correctAnswer: 1
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        choices: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
        correctAnswer: 0
    },
    {
        question: "Which planet is known as the Morning Star or the Evening Star?",
        choices: ["Mars", "Jupiter", "Venus", "Saturn"],
        correctAnswer: 2
    },
    {
        question: "What is the smallest prime number?",
        choices: ["0", "1", "2", "3"],
        correctAnswer: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.getElementById('quiz-container');
const nextButton = document.getElementById('next-question');
const submitButton = document.getElementById('submit-quiz');

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    quizContainer.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${question.question}</h5>
                <div class="list-group">
                    ${question.choices.map((choice, index) => `
                        <label class="list-group-item">
                            <input type="radio" name="choice" value="${index}">
                            ${choice}
                        </label>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function showNextQuestion() {
    const selectedOption = document.querySelector('input[name="choice"]:checked');
    if (selectedOption) {
        const answer = parseInt(selectedOption.value);
        if (answer === questions[currentQuestionIndex].correctAnswer) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        }
    } else {
        alert("Please select an answer before proceeding.");
    }
}

function showResult() {
    document.getElementById('score').textContent = `${score} out of ${questions.length}`;
    $('#resultModal').modal('show');
}

nextButton.addEventListener('click', showNextQuestion);
submitButton.addEventListener('click', showResult);

loadQuestion();

document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validate form inputs
    if (validateForm()) {
        // Simulate form submission (you can replace this with actual form submission code)
        // For demonstration, we'll show a toast message
        $('#successToast').toast('show');
        // Reset form after submission (optional)
        this.reset();
    }
});

    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Check if all fields are filled
        if (name === '' || email === '' || message === '') {
            alert('Please fill in all fields.');
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        return true;
    }

    function showToast() {
        const toastElement = document.getElementById('successToast');
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    }

    function resetForm() {
        form.reset();
    }
});
