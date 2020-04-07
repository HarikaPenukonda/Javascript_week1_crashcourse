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
