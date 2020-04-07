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