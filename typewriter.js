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
        let textContent = textElement.textContent;
        textElement.textContent = "";
        writesingleCharacterLoop(textContent, textElement);
    });
}

function writesingleCharacterLoop(remainingText, textElement){
    let char = remainingText.substring(0, 1);
    remainingText = remainingText.substring(1, remainingText.length);
    textElement.textContent += char;

    if (soundOn){
        playAudioForChar(char);
    }    

    if (remainingText.length > 0){
        setTimeout(() => {
            writesingleCharacterLoop(remainingText, textElement);
            
        }, 100 + (Math.random() * 300));
    }
}

function playAudioForChar(character){
    if (character === " "){
        let clone = spaceSound.cloneNode();
        clone.play();
    } else {
        let clone = standardSounds[0].cloneNode();
        clone.play();
    }
}


function toggleSound(){
    soundOn = !soundOn;
}