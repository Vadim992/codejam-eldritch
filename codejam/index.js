
import AncientsData from './data/ancients.js';
import Difficulties from './data/difficulties.js';
import blueCardsData from './data/mythicCards/blue/index.js';
import brownCardsData from './data/mythicCards/brown/index.js';
import greenCardsData from './data/mythicCards/green/index.js';

AncientsData.forEach(item => {
    const img = document.createElement('img');
    img.id = item.id;
    img.src = item.cardFace;
    img.alt = '';
    document.querySelector('.ancients-container').append(img);
})

Difficulties.forEach( item => {
    const div = document.createElement('div');
    div.classList.add('difficulty');
    div.id = item.id;
    div.textContent = item.name;
    document.querySelector('.difficulty-container').append(div);
})

const arrImg = document.querySelector('.ancients-container').querySelectorAll('img');


const difficultyContainer = document.querySelector('.difficulty-container');
const arrDifficulty = document.querySelectorAll('.difficulty');

const deckContainer = document.querySelector('.deck-container');
const kneadDeck = document.querySelector('.kneadDeck');
const currentState = document.querySelector('.current-state');
const deck = document.querySelector('.deck');
const randomDeck = document.querySelector('.random-deck');

const firstStage = document.getElementById('firstStage').querySelectorAll('.dot');
const secondStage = document.getElementById('secondStage').querySelectorAll('.dot');
const thirdStage = document.getElementById('thirdStage').querySelectorAll('.dot');

let antientClick;

let arrFirst = [];
let arrSecond = [];
let arrThird = [];

for (let i = 0; i < arrImg.length; i++) {
    arrImg[i].addEventListener('click', function() {

        if (i !== antientClick) {

        if (antientClick !== undefined) {
        arrImg[antientClick].style.border = 'none';
        }
        arrImg[i].style.border = '2px solid red';
        difficultyContainer.style.visibility = 'visible';


        
        antientClick = i;



        getArrAll();

        if ( kneadDeck.className.includes('active')) {
        kneadDeck.style.display = 'block';
        currentState.style.display = 'none';
        deck.style.display = 'none';
        randomDeck.style.display = 'none';
        randomDeck.style.visibility = 'hidden';
        randomDeck.style.backgroundImage = 'none';
        }


    } else {
        return false;
    }
    })
} 

let difficultyClick;

let arrGreen = [];
let arrBrown = [];
let arrBlue = [];

let difficultyLevel = '';
for (let i = 0; i < arrDifficulty.length; i++) {
    arrDifficulty[i].addEventListener('click', function(e) {

        if (i !== difficultyClick) {

        if (difficultyClick !== undefined) {
        arrDifficulty[difficultyClick].style.backgroundColor = 'transparent';
        }

        difficultyLevel = e.target.id;

        getArrAll();
        
        arrDifficulty[i].style.backgroundColor = 'red';
        deckContainer.style.visibility = 'visible';
        kneadDeck.classList.add('active');
        kneadDeck.style.display = 'block';
        currentState.style.display = 'none';
        deck.style.display = 'none';
        randomDeck.style.display = 'none';
        randomDeck.style.visibility = 'hidden';
        randomDeck.style.backgroundImage = 'none';

        difficultyClick = i;
        } else {
            return false
        }
    })
} 



function getArrAll() {
    for (let i = 0; i < document.querySelectorAll('.stage-text').length; i++){
        document.querySelectorAll('.stage-text')[i].classList.remove('red-text');
    }
    deck.classList.remove('deckAllcards');
    arrFirst = [];
    arrSecond = [];
    arrThird = [];

    for (let j = 0; j < firstStage.length; j++) {
        firstStage[j].textContent = Object.values(AncientsData[antientClick].firstStage)[j];
        secondStage[j].textContent = Object.values(AncientsData[antientClick].secondStage)[j];
        thirdStage[j].textContent = Object.values(AncientsData[antientClick].thirdStage)[j];

        Number(firstStage[j].textContent) > 0 ? arrFirst.push(firstStage[j]) : arrFirst;
        Number(secondStage[j].textContent) > 0 ? arrSecond.push(secondStage[j]) : arrSecond;
        Number(thirdStage[j].textContent) > 0 ? arrThird.push(thirdStage[j]) : arrThird;
     }
    arrGreen = [];
    arrBrown = [];
    arrBlue = [];
    

if (difficultyLevel) {
switch(difficultyLevel) {
    case Difficulties[0].id:
        arrGreen = arrGreen.concat(getVeryArr(Difficulties[1].id, 'normal', greenCardsData, 'green'));
        arrBrown = arrBrown.concat(getVeryArr(Difficulties[1].id, 'normal', brownCardsData, 'brown'));
        arrBlue = arrBlue.concat(getVeryArr(Difficulties[1].id, 'normal', blueCardsData, 'blue'));
        break;
    case Difficulties[1].id:
        arrGreen = getArrWithOut(Difficulties[3].id,greenCardsData);
        arrBrown = getArrWithOut(Difficulties[3].id,brownCardsData);
        arrBlue = getArrWithOut(Difficulties[3].id,blueCardsData);
        break;
    case Difficulties[3].id:
        arrGreen = getArrWithOut(Difficulties[1].id,greenCardsData);
        arrBrown = getArrWithOut(Difficulties[1].id,brownCardsData);
        arrBlue = getArrWithOut(Difficulties[1].id,blueCardsData);
        break;
    case Difficulties[4].id:
        arrGreen = arrGreen.concat(getVeryArr(Difficulties[3].id, 'normal', greenCardsData, 'green'));
        arrBrown = arrBrown.concat(getVeryArr(Difficulties[3].id, 'normal', brownCardsData, 'brown'));
        arrBlue = arrBlue.concat(getVeryArr(Difficulties[3].id, 'normal', blueCardsData, 'blue'));
        break;

    default: 
      arrGreen = getArr(greenCardsData);
      arrBrown = getArr(brownCardsData);
      arrBlue = getArr(blueCardsData);
}
}
}

function getVeryArr(easy, norm, card, color) {
    let colorArr = document.querySelectorAll('.' + color);
    let num = 0;
    for (let j = 0; j < colorArr.length; j++){
         num += Number(colorArr[j].textContent);
    }
    let mas = getArrWith(easy, card);
    let length = mas.length;
    let normArr = [];

    if (length < num) {
        normArr = getArrWith(norm,card); 
        let i = 0;
        while (i < (num - length)) {
            let ind = getRandomNum(0, normArr.length - 1);
            mas.push(normArr[ind]);
            normArr.splice(ind,1);
            i++;
        }
    }
        return mas;
}

kneadDeck.addEventListener('click', function(){
    kneadDeck.style.display = 'none';
    currentState.style.display = 'flex';
    deck.style.display = 'block';
    randomDeck.style.display = 'block';
})

function getRandomNum(min,max) {
     min = Math.ceil(min);
     max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getArrWith(diffLvl,cards) {
    let arr = [];
   cards.forEach( item => {
      item.difficulty === diffLvl ? arr.push(item.cardFace) : null;
   })
   return arr;
}
function getArr(cards) {
    let arr = [];
    cards.forEach( item => {
      arr.push(item.cardFace)
    })
    return arr;
}

function getArrWithOut(outDiffLvl,cards) {
    let arr = [];
    cards.forEach( item => {
        item.difficulty === outDiffLvl ? null : arr.push(item.cardFace);
    } )
    return arr;
}



function getStageCard(arr){
    randomDeck.style.visibility = 'visible';
    const ind = getRandomNum(0,arr.length - 1);
    let index = 0;
    arr[ind].textContent = arr[ind].textContent - 1; 
    switch(arr[ind].className.split(' ').at(-1)) {
        case 'green':
            index = getRandomNum(0, arrGreen.length-1);
            randomDeck.style.backgroundImage = `url(${arrGreen[index]})`;
            arrGreen.splice(index,1);
          break;
        case 'brown':
             index = getRandomNum(0, arrBrown.length-1);
            randomDeck.style.backgroundImage = `url(${arrBrown[index]})`;
            arrBrown.splice(index,1);
            break;
        default:
            index = getRandomNum(0, arrBlue.length-1);
            randomDeck.style.backgroundImage = `url(${arrBlue[index]})`;
            arrBlue.splice(index,1);
    }
    if (Number(arr[ind].textContent) <= 0)  {
        arr[ind].textContent = 0;
        arr.splice(ind,1);
    }
}


deck.addEventListener('click', function() {
    if (arrFirst.length > 0) {
        getStageCard(arrFirst);
        arrFirst.length === 0 ? document.querySelectorAll('.stage-text')[0].classList.add('red-text') : null;
    } else if (arrSecond.length > 0) {
        getStageCard(arrSecond);
        arrSecond.length === 0 ? document.querySelectorAll('.stage-text')[1].classList.add('red-text') : null;
    } else if (arrThird.length > 0) {
        getStageCard(arrThird);
    }
    if (arrThird.length === 0) {
        document.querySelectorAll('.stage-text')[2].classList.add('red-text');
        deck.classList.add('deckAllcards');
    }
    
})
