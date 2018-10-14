/* 
 * Word List JS
 * Purpose: This module creates the Word_List variable, which handles word-checking and random word generation.
 * Instructions: Add <script> element to include this file first, and then another <script> element to add the wordBank file.
 * Author: Tim Crouch
 * Date: 10.9.2012
 * Version: 0.21
 */

var Word_List = (function() {
    var publicInt = {};
    var wordBank = new Array();
    
    //Create method for checking if word is in list
    function listCheck(toCheck){
        toCheck = toCheck.toLowerCase();
        var letter = toCheck.charAt(0);
        regex = toCheck.replace(/_/g,'.');
        reg = new RegExp("^"+regex+"$");
        //wordBank will be an array initialized with the full word list, indexed by letter.
        var flag = false;
        theword = "";
        if(letter!='_') {
            for(var i = 0;i<wordBank[letter].length;i++){
                if(wordBank[letter][i].match(reg)){
                    flag = true;
                    theword = wordBank[letter][i];
                    return flag;
                }
            }
        }
        else {
            for(var j = 0;j<26;j++){
                var key = String.fromCharCode(97+j)
                for(var k = 0;k<wordBank[key].length;k++){
                    if(wordBank[key][k].match(reg)){
                        flag = true;
                        theword = wordBank[key][k];
                        return flag;
                    }
                }
            }
        }
        return flag;
    }
    
    function getRand(letterCount) {
        
        letterCount = letterCount || 0;
        
        if (letterCount == 0) {
            //If 0 was entered, get a random number of digits between 4 and 10
            letterCount = Math.floor(Math.random() * 7) + 4;
        }
        
        //Check bounds
        if (letterCount < 4) {
            letterCount = 4;
        }
        
        if (letterCount > 10) {
            letterCount = 10;
        }
        
        //Randomize the letter you are looking in
        var checkLetterNum = Math.floor(Math.random() * 26),
        		checkLetter = String.fromCharCode(checkLetterNum + 97),
        		wordNum,
        		wordPick;
        
        //check if the word is the correct length and repeat if not
        do {
		        //Randomly choose the number of an element in the correct wordBank letter array
            wordNum = Math.floor(Math.random() * wordBank[checkLetter].length);
      			wordPick = wordBank[checkLetter][wordNum];
        } while (wordPick.length != letterCount);        
        
        return wordPick;     
    }
    
    function loadWordDat(wordArray) {
        var character = wordArray[12].charAt(0);
        if (!character) {
            throw "Not able to get first letter from word to determine word bank.";
        }
        wordBank[character] = wordArray;
    }
    
    publicInt.isInList = listCheck;
    publicInt.getRandomWord = getRand;
    publicInt.loadBank = loadWordDat;
    
    return publicInt;

}());
