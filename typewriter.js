"use strict";
let soundOn = false;
let spaceSound;
let lastSound;
let standardSounds = [];
let linebreakSound;

window.onload = initAnimation;

function initAnimation(){
    spaceSound = document.querySelector("#typespace");
    lastSound = document.querySelector("#typelast");
    linebreakSound = document.querySelector("#typereturn");
    standardSounds.push(document.querySelector("#typekey1"));
    standardSounds.push(document.querySelector("#typekey2"));
    let textElements = document.querySelectorAll(".typewritten");
    
    textElements.forEach(textElement => {
        let textContent = textElement.innerHTML;
        textElement.textContent = "";
        writeSingleCharacterLoop(textContent, textElement);
    });
}

function writeSingleCharacterLoop(remainingText, textElement){
    let char;
    let isLineBreak = remainingText.startsWith("<br>") || remainingText.startsWith("<br/>");

    if (isLineBreak) {
        // remove all of the linebreak tag.
        char = remainingText.substring(remainingText.indexOf("<"), remainingText.indexOf(">") + 1);
        remainingText = remainingText.substring(remainingText.indexOf(">") + 1, remainingText.length); 
    } else {
        char = remainingText.substring(0, 1);
        remainingText = remainingText.substring(1, remainingText.length);
    }

    textElement.innerHTML += char;

    if (soundOn){
        playAudioForChar(char);
    }    

    if (remainingText.length > 0){
        let timeout;
        //longer sound for linebreak, because it shouldn't overlap with the rest.
        if (isLineBreak){
            timeout = 1000;
        } else {
            timeout = 100 + (Math.random() * 300)
        }
        setTimeout(() => {
            writeSingleCharacterLoop(remainingText, textElement);
            
        }, timeout);
    }
}

function playAudioForChar(character){
    if (character === " "){
        let clone = spaceSound.cloneNode();
        clone.play();
    } else if(character  === "<br>" || character  === "<br/>"){
        let clone = linebreakSound.cloneNode();
        clone.play();
    } else {
        let clone = standardSounds[Math.round(Math.random())].cloneNode();
        clone.play();
    }
}


function toggleSound(){
    soundOn = !soundOn;
}