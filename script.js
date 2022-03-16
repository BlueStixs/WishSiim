var charUsed = [];

function loadSite() {

}

function wish(){
    var character = getRandomCharacter();
    console.log(charList[character][0])
    if (charList[character][1] == "5star"){
        playVideo("5star");
    } else {
        playVideo("4star");
    }

}

function playVideo(vid){
    document.getElementById("home").style.display = "none";
    var video;
    if (vid == "5star"){
        video = document.getElementById("five-star");
        video.style.display = "block";
    } else {
        video = document.getElementById("four-star");
        video.style.display = "block";
    }


    console.log("POG");
    video.play();

    setTimeout(function(){
        video.style.display ="none";
        document.getElementById("home").style.display = "block";
        
    }, 7000);
}

function getRandomCharacter(){
    var character = Math.floor(Math.random() * (charList.length - 1));

    if (charUsed.length == 0){
        var justChar = [];
        for (var i = 0; i < charList.length; i++){
            justChar.push(charList[i][0]);
        }
        character = justChar.indexOf("Kazuha");
    }

    var monkaW = 0;
    while (charUsed.includes(character)){
        character = Math.floor(Math.random() * (charList.length - 1));
        monkaW++;
        if (monkaW == 99){
            character = 999
            break;
        }
    }
    charUsed.push(character);

    return character;
}