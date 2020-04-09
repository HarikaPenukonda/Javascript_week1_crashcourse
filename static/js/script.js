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
    document.getElementById('ageInDays').remove();
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
    rpsFrontEnd(humanChoice.id, botChoice, message);
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

       humanDiv.innerHTML   = "<img src='" + imageDatabase[humanImageChoice]+ "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
       botDiv.innerHTML   = "<img src='" + imageDatabase[computerImageChoice]+ "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"
       messageDiv.innerHTML = "<h1 style='color : " + finalMessage['color'] +"; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"

        document.getElementById('flex-box-rps-div').appendChild(humanDiv);
        document.getElementById('flex-box-rps-div').appendChild(messageDiv);
        document.getElementById('flex-box-rps-div').appendChild(botDiv);
    }

