var charUsed = [];
var character;
var wishAnimationFinished = true;

function loadSite() {
    setTimeout(function () {
        if (wishAnimationFinished) {
            document.getElementById("charInfo").style.opacity = "0";
            document.getElementById("charInfo").style.transform = "translateX(0vh)";
            document.getElementById("element").src = "";
            document.getElementById("charName").innerHTML = "&nbsp";
            document.getElementById("charImg").src = "";
            document.getElementById("charImg").style.transform = "scale(5)";
            document.getElementById("charImg").style.filter = "brightness(0%)";
            document.getElementById("wish").style.opacity = "0";
            document.getElementById("wish").style.display = "none";
            document.getElementById("home").style.display = "block";
            document.getElementById("myInventory").style.display = "none";      
            document.getElementById("myInventory").style.opacity = "0";
            document.getElementById("home").style.opacity = "1";
        }
    }, 100);
}

function wish() {
    document.getElementById("home").style.opacity = "1";
    document.getElementById("myInventory").style.display = "none";      

    character = getRandomCharacter();
    console.log("character: " + charList[character][0] + " | number of characters: " + charUsed.length);
    if (charList[character][1] == "5star") {
        playAnimation("5star");
    } else {
        playAnimation("4star");
    }

}

function playAnimation(vid) {
    wishAnimationFinished = false;

    document.getElementById("home").style.display = "none";
    var video;
    if (vid == "5star") {
        video = document.getElementById("five-star");
        video.style.display = "block";
    } else {
        video = document.getElementById("four-star");
        video.style.display = "block";
    }

    video.play();

    setTimeout(function () {
        video.style.display = "none";
        document.getElementById("wish").style.opacity = "1";
        document.getElementById("wish").style.display = "block";
        document.getElementById("charImg").src = charList[character][2];
        setTimeout(function () {
            document.getElementById("charImg").style.transform = "scale(1)";
        }, 100);

        setTimeout(function () {
            document.getElementById("charImg").style.filter = "brightness(100%)";
            document.getElementById("element").src = "images/icons/elements/" + charList[character][3] + ".png";
            document.getElementById("charName").innerHTML = charList[character][0];
            document.getElementById("charInfo").style.opacity = "1";
            document.getElementById("charInfo").style.transform = "translateX(-10vh)";
            wishAnimationFinished = true;
        }, 800);
    }, 7000);
}

function getRandomCharacter() {
    var character = Math.floor(Math.random() * (charList.length - 1));

    if (charUsed.length == 0) {
        for (var i = 0; i < charList.length; i++) {
            if (charList[i][0] === "Kazuha") {
                character = i;
                break;
            }
        }
    }

    var monkaW = 0;
    while (charUsed.includes(character)) {
        character = Math.floor(Math.random() * (charList.length - 1));
        monkaW++;
        if (monkaW == 99) {
            character = 999
            document.write("ran out of characters OMEGALUL. just refresh page")
            break;
        }
    }
    charUsed.push(character);

    return character;
}

function inventory(){
    if (charUsed.length == 0){
        document.getElementById("characters").innerHTML = "EMPTY";
    } else {
        document.getElementById("characters").innerHTML = "";
    }
    
    setTimeout(function(){

        document.getElementById("inv").innerHTML = "INVENTORY";
    
        for (var i = 0; i < charUsed.length; i++){
            document.getElementById("characters").innerHTML += charList[charUsed[i]][0] + "<br>";
        }

        document.getElementById("myInventory").style.display = "block";        
        setTimeout(function(){
            document.getElementById("myInventory").style.opacity = "1";
            document.getElementById("home").style.opacity = "0.5";
        }, 200);
    }, 200);
}