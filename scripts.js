document.addEventListener("DOMContentLoaded", function() {
    const easyWords = [
        {word: 'cat', translation: 'кіт'},
        {word: 'dog', translation: 'собака'},
        {word: 'bye', translation: 'бувай'},
        {word: 'tree', translation: 'дерево'},
        {word: 'yes', translation: 'так'},
        {word: 'book', translation: 'книга'},
        {word: 'apple', translation: 'яблуко'},
        {word: 'table', translation: 'стіл'},
        {word: 'night', translation: 'ніч'},
        {word: 'panda', translation: 'панда'}
    ];

    const mediumWords = [
        {word: 'elephant', translation: 'слон'},
        {word: 'giraffe', translation: 'жираф'},
        {word: 'hippopotamus', translation: 'гіпопотам'},
        {word: 'crocodile', translation: 'крокодил'},
        {word: 'kangaroo', translation: 'кенгуру'},
        {word: 'alligator', translation: 'алігатор'},
        {word: 'chimpanzee', translation: 'шимпанзе'},
        {word: 'rhinoceros', translation: 'носоріг'},
        {word: 'gorilla', translation: 'горила'},
        {word: 'porcupine', translation: 'дикобраз'}
    ];

    const hardWords = [
        {word: 'circumstances', translation: 'обставини'},
        {word: 'phenomenon', translation: 'явище'},
        {word: 'accomplishment', translation: 'досягнення'},
        {word: 'architecture', translation: 'архітектура'},
        {word: 'investigation', translation: 'розслідування'},
        {word: 'sophisticated', translation: 'витончений'},
        {word: 'temperature', translation: 'температура'},
        {word: 'sustainability', translation: 'сталий розвиток'},
        {word: 'recommendation', translation: 'рекомендація'},
        {word: 'understanding', translation: 'розуміння'}
    ];

    let words = [];
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let currentStep = 0;
    let totalSteps = 0;

    const userName = prompt("Please enter your name:");
    $("#userName").text(`Hello, ${userName}!`);

    $("#startBtn").on('click', function() {
        const difficulty = $("#difficulty").val();
        if (difficulty === "easy") {
            words = easyWords;
        } else if (difficulty === "medium") {
            words = mediumWords;
        } else if (difficulty === "hard") {
            words = hardWords;
        }

        totalSteps = words.length;

        $("#difficulty-container").hide();
        $(".input-container").show();
        updateProgress();
        showNextCard();
    });

    function updateProgress() {
        $("#progress").text(`Step ${currentStep + 1} of ${totalSteps}`);
        $("#score").html(`<span class="correct">Correct: ${correctAnswers}</span>, <span class="incorrect">Incorrect: ${incorrectAnswers}</span>`);
    }

    function showModal(result) {
        $("#result").text(result);
        $("#modal").css("display", "block");
    }

    $(".close-btn").on('click', function() {
        $("#modal").css("display", "none");
    });

    function showNextCard() {
        if (currentStep < totalSteps) {
            const wordObj = words[currentStep];
            const card = $(`<div class="card">${wordObj.word}</div>`);
            $("#words-container").html(card);
        } else {
            showModal(`Your level: ${(correctAnswers / totalSteps * 100).toFixed(0)}%`);
            $("#words-container").html('<div class="card">Game Over</div>');
            $("#userInput").prop('disabled', true);
            $("#submitBtn").prop('disabled', true);
        }
    }

    $("#submitBtn").on('click', function() {
        const userTranslation = $("#userInput").val().trim().toLowerCase();
        if (userTranslation) {
            const wordObj = words[currentStep];
            if (userTranslation === wordObj.translation.toLowerCase()) {
                correctAnswers++;
            } else {
                incorrectAnswers++;
            }
            currentStep++;
            $("#userInput").val('');
            updateProgress();
            showNextCard();
        }
    });

    updateProgress();
});
