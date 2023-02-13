$(function () {
    let score = 0;
    let isGenerated = false;
    let time = 10000;
    let timerStage;

    // const num = document.querySelector(".number");
    // const numVal = time/1000;
    // let counter = 0;
    // setInterval(() => {
    //     if (counter !== numVal) {
    //         counter++;
    //         num.innerHTML = `${counter}%`;
    //     }
    // }, 80);

    $(".playAgainButton").hide();
    $(".stopButton").hide();
    $(".nextQuiz").hide();
    $(".timeout").hide();
    $(".incorrectQuiz").hide();
    $(".game").hide();

    $(".playButton").click(function () {
        playClickAudio();
        startGame();
    });

    $(".stopButton").click(function () {
        playClickAudio();
        score = 0;
        refreshScore();
        $(".timeout").hide();
        $(".game").hide();
        $(".playButton").show();
        $(".stopButton").fadeOut();
        $(".nextQuiz").fadeOut();
        $(".incorrectQuiz").fadeOut();
        $(".playButton").css({ opacity: "1", cursor: "pointer" });
        $(".playButton").click(function () {
            startGame();
        });
    });

    function startGame() {
        $(".timeout").hide();
        startCountdown();
        setTimeout(function () {
            $(".game").fadeIn();
            $(".playButton").css({ opacity: ".3", cursor: "default" });
            $(".playButton").unbind("click");
            $(".stopButton").show();
            generateQuiz();
        }, 4000);
    }

    function startCountdown() {
        $(".welcomeText").fadeOut("fast");
        $(".incorrectQuiz").hide();
        let staticTime = 4000;
        var timer = setInterval(function () {
            staticTime -= 1000;
            $(".counterText")
                .fadeIn("slow")
                .text(staticTime / 1000 + 0);
            if (staticTime <= 0) {
                clearInterval(timer);
                $(".counterText").fadeOut("fast");
            }
            playBeepAudio();
        }, 1000);
    }

    function nextQuiz() {
        $(".game").hide();
        $(".nextQuiz").show();
        isGenerated = false;
        $(".nextButton").click(function () {
            playClickAudio();
            generateQuiz();
        });
    }

    function incorrectQuiz() {
        $(".game").hide();
        $(".incorrectQuiz").show();
        $(".playAgainButton").show();
        $(".incorrectScore").text("TOTAL SCORE : " + score);
        isGenerated = false;
        $(".playAgainButton").click(function () {
            playClickAudio();
            score = 0;
            refreshScore();
            startGame();
        });
    }

    function timeOut() {
        $(".game").hide();
        $(".incorrectQuiz").hide();
        $(".timeout").show();
        $(".playAgainButton").show();
        $(".incorrectScore").text("TOTAL SCORE : " + score);
        isGenerated = false;
        $(".playAgainButton").click(function () {
            score = 0;
            $(".timeout").fadeOut();
            refreshScore();
            startGame();
        });
    }

    function refreshScore() {
        $(".score").text("YOUR SCORE : " + score);
    }

    function generateQuiz() {
        if (!isGenerated) {
            clearInterval(timerStage);
            time = 10000;
            $(".timer").text(time / 1000);
            $(".nextQuiz").hide();
            $(".game").show();
            isGenerated = true;
            const min = 1;
            const max = 20;
            var answer = [];
            var n1 = Math.floor(Math.random() * (max - min + 1)) + min;
            var n2 = Math.floor(Math.random() * (max - min + 1)) + min;
            var correctAnswer = n1 + n2;
            for (let i = 0; i < 3; i++) {
                answer[i] = Math.floor(Math.random() * (40 - 1 + 1)) + 1;
            }
            answer.push(correctAnswer);
            shuffle(answer);
            $(".gameQuestion").fadeIn("slow");
            $(".gameQuestion").text(`${n1} + ${n2} = ?`);
            for (let i = 0; i < 4; i++) {
                $(`.choice${[i]}`).fadeIn("fast");
                $(`.choice${[i]}`).text(`${answer[i]}`);
                $(`.choice${[i]}`)
                    .off("click")
                    .click(function () {
                        playClickAudio();
                        checkAnswer(answer[i], correctAnswer);
                        if (answer[i] === correctAnswer) {
                            clearInterval(timerStage);
                        } else {
                            clearInterval(timerStage);
                        }
                    });
            }
            // =================================================
            timerStage = setInterval(function () {
                $(".timer").text(time / 1000 - 1);
                time -= 1000;
                console.log(time);
                if (time <= 0) {
                    clearInterval(timerStage);
                    timeOut();
                }
            }, 1000);
        } else {
            return;
        }
    }

    function checkAnswer(i, correctAnswer) {
        if (i === correctAnswer) {
            score += 1;
            playSuccessAudio();
            clearInterval(timerStage);
            refreshScore();
            nextQuiz();
        } else {
            playWrongAudio();
            incorrectQuiz();
        }
    }

    function shuffle(array) {
        let currentIndex = array.length,
            randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }
        return array;
    }

    function playClickAudio() {
        let audio = new Audio("./assets/click.mp3");
        audio.play();
    }

    function playBeepAudio() {
        let audio = new Audio("./assets/beep.mp3");
        audio.play();
    }

    function playSuccessAudio() {
        let audio = new Audio("./assets/success.mp3");
        audio.play();
    }

    function playWrongAudio() {
        let audio = new Audio("./assets/wrong.mp3");
        audio.play();
    }
});
