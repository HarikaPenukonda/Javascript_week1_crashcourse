//Challenge 1 : Age in days
function ageInDays(){
    var birthyear = prompt("The year you were born?");
    var numberOfDays = (2020 - birthyear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + numberOfDays + ' days old');
    h1.setAttribute('id', 'numberOfDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
    console.log(numberOfDays);
}

function reset(){
    document.getElementById('flex-box-result').remove();
}

//Challenge 2 : Cat Generator
function generateCat(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "https://media1.tenor.com/images/c652b110ce9854cef9ba399eed60417b/tenor.gif?itemid=3429739";
    div.appendChild(image);
}

//Challenge 3 : Rock, Paper, Scissors
function rpsGame(yourChoice){
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    console.log('computerChoice',botChoice);
    results = decideWinner(humanChoice,botChoice);
    console.log(results);
    message = finalMessage(results);
    console.log(message);
    rpsFrontEnd(humanChoice, botChoice, message);
}
    function randToRpsInt(){
        return Math.floor(Math.random() * 3);
    }

    function numberToChoice(number){
        return ['rock', 'paper', 'scissors'][number];
    }

    function decideWinner (yourChoice, computerChoice){
        var rpsDatabase = {
            'rock'    : {'scissors':1, 'rock':0.5, 'paper':0},
            'paper'   : {'rock':1, 'paper':0.5, 'scissors':0},
            'scissors': {'paper':1, 'scissors':0.5, 'rock':0}
        }

        var yourScore = rpsDatabase[yourChoice][computerChoice];
        var computerScore = rpsDatabase[computerChoice][yourChoice];

        return[yourScore,computerScore];
    }

    function finalMessage([yourScore, computerScore]){
        if (yourScore === 0) {
            return {'message' : 'you lost!', 'color' : 'red'};
        } else if (yourScore === 0.5){
            return {'message' : 'you tied!', 'color' : 'yellow'};
        } else {
            return {'message' : 'you won!', 'color' : 'green'};
        }
    }

    function rpsFrontEnd(humanImageChoice, computerImageChoice, finalMessage){
        var imageDatabase = {
            'rock'    : document.getElementById('rock').src,
            'paper'   : document.getElementById('paper').src,
            'scissors': document.getElementById('scissors').src

        }

        //lets remove all the images
        document.getElementById('rock').remove();
        document.getElementById('paper').remove();
        document.getElementById('scissors').remove();

        var humanDiv = document.createElement('div');
        var botDiv = document.createElement('div');
        var messageDiv = document.createElement('div');

       humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice]+ "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
       botDiv.innerHTML   = "<img src='" + imageDatabase[computerImageChoice]+ "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"
       messageDiv.innerHTML = "<h1 style='color : " + finalMessage['color'] +"; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"

        document.getElementById('flex-box-rps-div').appendChild(humanDiv);
        document.getElementById('flex-box-rps-div').appendChild(messageDiv);
        document.getElementById('flex-box-rps-div').appendChild(botDiv);
    }

//Challenge 4 : Change the color of the buttons
    var all_buttons = document.getElementsByTagName('button');
    console.log(all_buttons);
    var copyAllButtons = [];
    for (var i=0; i<all_buttons.length;i++){
        copyAllButtons.push(all_buttons[i].classList[1]);
    }
    console.log(copyAllButtons);

function buttonColorChange(buttonColor){
    //console.log(buttonColor.value);
    if (buttonColor.value === 'red'){
        buttonsRed();
    } else if (buttonColor.value === 'green'){
        buttonsGreen();
    }else if (buttonColor.value === 'reset'){
        buttonColorReset();
    }else if (buttonColor.value === 'random'){
        randomColor();
    }
}

function buttonsRed(){
    for(var i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for(var i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset(){
    for(var i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColor(){
    var choices = ['btn-primary', 'btn-success', 'btn-warning', 'btn-danger'];
    for(var i=0;i<all_buttons.length;i++){
        var randomNumber = Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}

//Challenge 5 : Blackjack Game
var blackjackGame = {
    'you'    : {'scorespan' : '#your-blackjack-result', 'div' : '#your-box', 'score' : 0},
    'dealer' : {'scorespan' : '#dealer-blackjack-result', 'div' : '#dealer-box', 'score' : 0},
    'cards'  : ['2','3','4','5','6','7','8','9','K','Q','J','A'],
    'cardsMap' : {'2': 2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'K':10,'Q':10,'J':10,'A':[1,11]},
    'wins' : 0,
    'losses' : 0,
    'draws' : 0,
    'isStand' : false,
    'turnsOver' : false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const loseSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackhit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackdeal);

function blackjackhit(){
    if(blackjackGame['isStand'] === false){
    var card = randomCard();
    //console.log(card);
    showCard(card, YOU);
    updateScore(card,YOU);
    showScore(YOU);
    console.log(YOU['score']);
    }
    
}

function randomCard(){
    var randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer){
    if (activePlayer['score'] <= 21){
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
    }    
}
/* We need to deactivate the stand mode and turnsOver mode inside deal i..e when we hit deal button 
the deal button should only work when both user and dealer turn has been done */
function blackjackdeal() {
    if(blackjackGame['turnsOver'] === true)
    {
        //deactivates the deal button, deaactivates the entire game
        blackjackGame['isStand'] = false;
        var yourImages = document.querySelector('#your-box').querySelectorAll('img');
        var dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        
        for(i=0;i<yourImages.length;i++){
            yourImages[i].remove();
        } 
        for(i=0;i<dealerImages.length;i++){
        dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

        document.querySelector('#blackjack-result').textContent = 'Lets Play';
        document.querySelector('#blackjack-result').style.color = 'black';
        //deactivated
        blackjackGame['turnsOver'] = true;
    }
}

function updateScore(card, activePlayer){
    if(card === 'A'){
        //If adding 11 keeps me below 21,add 11 otherwise add 1
        if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }else{
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }else
    {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scorespan']).textContent = 'Bust!';
        document.querySelector(activePlayer['scorespan']).style.color = 'red';
    }else {
        document.querySelector(activePlayer['scorespan']).textContent = activePlayer['score'];
    }
    
}

async function dealerLogic (){
    blackjackGame['isStand'] = true; //As soon as you hit the stand button then the dealer logic function runs
    //and that function will change the stand state to true
    while(DEALER['score'] < 16 && blackjackGame['isStand'] === true)
    {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    

    //if(DEALER['score'] > 15)
 /*Once you hit stand and the dealer starts playing, when the dealer is done playing the turns over needs 
to change to true, beacuse we need to hit those buttons again*/
 blackjackGame['turnsOver'] = true;
    //This below code indicates the turns are over
let winner = computeWinner();
showResult(winner);
    //console.log(blackjackGame['turnsOver']);

}

//compute the winner and return the result
//update the scores of wins, losses and draws

function computeWinner(){
    let winner;

    if (YOU['score'] <= 21) {
        if ((YOU['score'] > DEALER['score']) || (DEALER['score'] > 21)){
            //console.log('You Won!');
            blackjackGame['wins']++;
            winner = YOU;
        
        }else if ((YOU['score'] < DEALER['score'])){
            //console.log('You Lost!');
            blackjackGame['losses']++;
            winner = DEALER;
        
        }else if (YOU['score'] === DEALER['score']){
            //console.log('You drew');
            blackjackGame['draws']++;
        }
    //condition : when the user busts but the dealer doesnt 
    }else if  ((YOU['score'] > 21) && (DEALER['score'] < 21))
    {
        //console.log('You lost!');
        blackjackGame['losses']++;
        winner = DEALER;
    
    //condition : when you and the dealer both busts
    }else if ((YOU['score'] > 21) && (DEALER['score'] > 21)){
        //console.log("You drew!");
        blackjackGame['draws']++;
    }
    console.log('winner is ', winner)
    console.log(blackjackGame);
    return winner;
    
}

function showResult(winner){
    let message, messagecolor;
/*it should first check wether all the turns are over before running and showing the results  
we shouldnt see the results until all the turns are over */
    if (blackjackGame['turnsOver'] === true)
    {
        if (YOU === winner){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messagecolor = 'green';
            winSound.play();

        }else if (DEALER === winner){
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!';
            messagecolor = 'red';
            loseSound.play();
        }else{
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            messagecolor = 'black';
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messagecolor;
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
