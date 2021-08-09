const choicesButtons = $("[data-choice]")
// const choicesButtons = document.querySelectorAll("[data-choice]");

const finalColumn = $("[data-final-column]");
// const finalColumn = document.querySelector('[data-final-column]');

// const computerScoreSpan = $("[data-computer-score]");
const computerScoreSpan = document.querySelector('[data-computer-score]')

// const playerScoreSpan = $('[data-player-score]');
const playerScoreSpan = document.querySelector('[data-player-score]')
/* Returns : Inside my choicesButtons Array : 
NodeList(3) [ button.choice, button.choice, button.choice]
 0: <button class="choice" data-choice="rock">​
1: <button class="choice" data-choice="paper">​
2: <button class="choice" data-choice="scissors">
 length: 3 */



 const shifumiChoices = [
     {
         name : 'rock',
         image: 'images/moutainRock.png',
         beats: ['scissors', 'lizard'],
     },
     {
        name : 'paper',
        image: 'images/plantPaper.png',
        beats: ['rock', 'spock']
    },
    {
        name : 'scissors',
        image: 'images/scissors2.png',
        beats: ['paper', 'lizard']
    },
    {
        name : 'lizard',
        image: 'images/lizard.png',
        beats: ['spock', 'paper'],
    },
    {
        name : 'spock',
        image: 'images/alienSpock.png',
        beats: ['rock', 'scissors'],
    }
 ]

$(document).ready(function () {

    //JQUERY METHOD
    $(choicesButtons).each(function () {
        $(this).click(function () {
            const choiceName = $(this).data("choice");
            // Avec cette const je fais un lien entre mes boutons (utilisant la valeu de la data) et mes objets dans l'array (utilisant la key-value pair "name")
            // A présent la const ChoiceMade contient l'objet sur lequel on a cliqué
            const playerChoice = shifumiChoices.find( shifumiChoice => shifumiChoice.name === choiceName);
            console.log(playerChoice)
            makeGame(playerChoice);

        })
    })

      //VANILLA JS METHOD
    /*choicesButtons.forEach(eachButton => {
        eachButton.addEventListener('click', e => {
            const choiceName = eachButton.dataset.choice;
            // With this variable we get the name thanks to dataset of the button we clicked on. We re use that variable for the next const
            const choiceMade = shifumiChoices.find( shifumiChoice => shifumiChoice.name === choiceName)
            // const choiceMade will contain the object choice we cliked on (with its name, value, and beats , with its key/value pair )
            makeChoice(choiceMade)
        })
    })*/

    function makeGame(selection){
        // La const computerChoice sera égale à la valeur retournée par la fonction randomComputerChoice()
        const computerChoice = randomComputerChoice();
        const playerWinner = isWinner(selection, computerChoice); // can return true or false
        const computerWinner = isWinner(computerChoice, selection); // One will be true, so the other will be false 
        console.log(computerChoice);

        addGameResult(computerChoice, computerWinner);
        addGameResult(selection, playerWinner);

        if (playerWinner) incrementScore(playerScoreSpan); // If playerWinner is true increment playerScore
        if (computerWinner) incrementScore(computerScoreSpan); // if computerWinner is true increment computerScore
    }

    function incrementScore(scoreSpan){
        scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
    }

    function addGameResult(choice, winner){
        const imgResult = document.createElement('img');
        imgResult.src= choice.image;
        $(imgResult).addClass('resultLastGame');
        if (winner) $(imgResult).addClass('winner'); // If winner --> If playerWinner or computerWinner is true then add this class
        // So it always be right after the div computer. The last result is then always display on the top of the column
        finalColumn.after(imgResult);
        // $("#computer").after(divResult)
    }


    function isWinner(choice, opponentChoice){
        // isWinner is when the the first parameter choice beats the opponentChoice --> which is when choice.beats is equal to opponentChoice.name
        return choice.beats[0] === opponentChoice.name || choice.beats[1] === opponentChoice.name // RETURNS A BOOLEAN --> TRUE OR FALSE 
        
        console.log(isWinner);
    }

    function randomComputerChoice(){
        const randomIndex = Math.floor(Math.random() * shifumiChoices.length);
        // A chaque fois qu'on appelera cette fonction, ça nous retournera de façon random un des objets du tableau shifumiChoices
        return shifumiChoices[randomIndex];
    }



})






