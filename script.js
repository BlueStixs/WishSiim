var completed = [];

var charSearches1;
var charSearches2;

var charOne = Math.floor(Math.random() * (charList.length - 1));
var charTwo;

var score = 0;

function homePage() {
    document.location.reload();
}

function loadSite() {
    if (!localStorage.highScore) {
        localStorage.highScore = 0;
    }
    document.getElementById("highscore").innerHTML = "High Score: " + localStorage.highScore;
    document.getElementById("currScore").innerHTML = "Score: " + score;
}

function play() {
    clearAll();

    document.getElementById("logo").style.width = "25vh";

    // random characters
    if (charTwo == null) {
        charTwo = generateRandom(charOne);
    } else {
        charOne = charTwo;
        charTwo = generateRandom(charOne);
    }
    completed.push(charOne);

    // console.log(charOne);
    // console.log(charTwo);

    //document.getElementById("bg-image home").style.display = "none";
    document.getElementById("image1").src = charList[charOne][2];
    document.getElementById("image2").src = charList[charTwo][2];

    makeCharInfoVisible();

    document.getElementById("character1").innerHTML = charList[charOne][0];
    document.getElementById("character2").innerHTML = charList[charTwo][0];

    charSearches1 = charList[charOne][1];
    charSearches2 = charList[charTwo][1];

    document.getElementById("searches1").innerHTML = addDecimals(charSearches1) + " searches";

    document.getElementById("buttons").style.display = "block";

    // console.log(completed);
}

function generateRandom(charOne) {
    var charTwo = Math.floor(Math.random() * (charList.length - 1));

    if (charOne == charTwo || completed.includes(charTwo)) {
        while (charOne == charTwo || completed.includes(charTwo)) {
            charTwo = Math.floor(Math.random() * (charList.length - 1))
            console.log(charTwo);
        }
    }
    //adds current character to completed
    completed.push(charTwo);

    return charTwo;
}

function addDecimals(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function checkWin(input) {
    document.getElementById("buttons").style.display = "none";
    document.getElementById("searches2").innerHTML = 0 + " searches";
    document.getElementById("searches2").style.display = "block";

    //animating search count
    var count = Math.round(charSearches2 / 10);
    var num = 1111;
    if (charSearches2 > 500000) {
        num = 3333;
    }

    animateNum = setInterval(
        function () {
            document.getElementById("searches2").innerHTML = addDecimals(count) + " searches";
            count += num;

            if (count > charSearches2 - 1111) {
                num = charSearches2 - count;
            }
            if (count == charSearches2) {
                clearInterval(animateNum);
                document.getElementById("searches2").innerHTML = addDecimals(charSearches2) + " searches";

                setTimeout(function () {
                    // player chose higher
                    // console.log(charSearches1);
                    // console.log(charSearches2);
                    if (input) {
                        if (charSearches1 < charSearches2) {
                            score++;
                            changeScore(score);
                            playerWin()
                        } else {
                            playerLose();
                        }
                    }
                    // player chose lower
                    else {
                        if (charSearches1 < charSearches2) {
                            playerLose();
                        } else {
                            score++;
                            changeScore(score);
                            playerWin()
                        }
                    }
                }, 1000);
            }
        }, 1);

}

function changeScore(score) {
    console.log(score);
    document.getElementById("currScore").innerHTML = "Score: " + score;
    if (score > Number(localStorage.highScore)) {
        localStorage.highScore = score;
        document.getElementById("highscore").innerHTML = "High Score: " + localStorage.highScore;
    }
}

function playerWin() {
    if (score == charList.length - 1) {
        setTimeout(function () {
            clearAll();
            //resets
            charOne = Math.floor(Math.random() * (charList.length - 1));
            charTwo = null;
            completed = [];
            document.getElementById("win").style.display = "block";
            document.getElementById("finalscore").innerHTML = "Your final score: " + score;
            score = 0;
        }, 1000);
    } else {
        play();
    }
}

function playerLose() {
    setTimeout(function () {
        clearAll();
        //resets
        charOne = Math.floor(Math.random() * (charList.length - 1));
        charTwo = null;
        completed = [];
        document.getElementById("lose").style.display = "block";
        document.getElementById("finalscore").innerHTML = "Your final score: " + score;
        score = 0;
    }, 1000);
}

function clearAll() {
    document.getElementById("logo").style.display = "none";
    document.getElementById("win").style.display = "none";
    document.getElementById("lose").style.display = "none";
    document.getElementById("image1").style.display = "none";
    document.getElementById("image2").style.display = "none";
    document.getElementById("character1").style.display = "none";
    document.getElementById("character2").style.display = "none";
    document.getElementById("searches1").style.display = "none";
    document.getElementById("searches2").style.display = "none";
    document.getElementById("highscore").style.display = "none";
    document.getElementById("currScore").style.display = "none";
    document.getElementById("homeScreen").style.opacity = 0;
    setTimeout(function () {
        document.getElementById("homeScreen").style.display = "none";
    }, 250);
}

function makeCharInfoVisible() {
    document.getElementById("logo").style.display = "block";
    document.getElementById("image1").style.display = "block";
    document.getElementById("image2").style.display = "block";
    document.getElementById("character1").style.display = "block";
    document.getElementById("character2").style.display = "block";
    document.getElementById("searches1").style.display = "block";
    document.getElementById("highscore").style.display = "block";
    document.getElementById("currScore").style.display = "block";

}