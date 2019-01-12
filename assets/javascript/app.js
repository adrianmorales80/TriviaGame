var userResponse;
var questionNumber = 0;
var twentySeconds;
var intervalId; // Used to clear interval
var numAnsCorrect = 0; // Counter used to display final score by end of game
var timeOut = false; // Flag for logic when user runs out of time
// All questions are stored as objects in an array
var questions = [
    
    {
        question: `Ronda Rousey, a fighter in the UFC Women's Bantamweight division, shares her nickname with a very popular ex-WWE star. What is her very appropriate nickname?`,
        choices: [`Rumble`, `Rowdy`, `Evil`, `Roughshod` ],
        answer: 1, //Number is matched to html attribute value of userResponse for grading
        explanation: `"Rowdy" Ronda Rousey, the first Women's Bantamweight Champion in the UFC was also a bronze medalist in judo for the United States at the 2008 Olympic summer games in Beijing. She began her UFC career with 6 wins. "Rumble" is the nickname of Anthony Johnson, a male Light Heavyweight UFC fighter. "Evil" belongs to Jessica "Evil" Eye, Bantamweight contender. "Roughshod" is made up but does seem to describe how "Rowdy" Ronda Rousey runs over her opponents`
    },
    {
        question: `Who was Frankie Edgar's first UFC fight against?`,
        choices: [`Tyson Griffin`, `Jim Miller`, `Mark Bocek`, `Jose Aldo`],
        answer: 0,
        explanation: `In 2007, Edgar amassed a 5-0 record before trying out for season five of "The Ultimate Fighter". Edgar tried out in front of Dana White and Joe Silva, but was not selected to be on the show. However, a month later the UFC contacted Edgar and asked if he would accept a fight with fellow undefeated fighter Tyson Griffin at UFC 67.`,
    },
    {
        question: `Which of the following fighters was the first-ever UFC Middleweight Champion?`,
        choices: [`Gil Castillo`, `Carlos Newton`, `Pat Miletech`, `Dave Menne`],
        answer: 3,
        explanation: `Dave Menne defeated Gil Castillo by unanimous decision in an event that has been rated the worst in UFC history, UFC 33. As for Carlos Newton and Pat Militech, they were both welterweight fighters.`,
    },
    {
        question: `Which fighter won "Fight Of The Year" honors in 2005?`,
        choices: [`Chuck Lidell`, `Tito Ortiz`, `Rich Franklin`, `Forrest Griffin`],
        answer: 3,
        explanation: `Forrest Griffin won "Fight Of The Year" for his fight with Stephan Bonnar. It was the fight that put UFC on the map.`,
    },
    {
        question: `Chuck Liddell made his debut at which UFC event?`,
        choices: [`UFC 19 Ultimate Young Guns`, `UFC 17 Redemption`, `UFC 18 The Road To The Heavyweight Title`, `UFC 16 Battle In The Bayou`],
        answer: 1, 
        explanation: `Chuck Liddell beat Mexican Noe Hernandez by unanimous decision. This fight took place May 15, 1998.`,
    },
    {
        question: `Who was the first man to hold two Pride titles in two separate weight classes at the same time?`,
        choices: [`Dan Henderson`, `Mauricio Rua`, `Wanderlei Silva`, `Fedor Emelianenko`],
        answer: 0,
        explanation: `He held both the Middleweight and Welterweight belt at the same time in 2005.`,
    },
    {
        question: `The sport of mixed martial arts has some of the best athletes in the world. One of these famous fighters is the controversial loud mouth Tito Ortiz. What is his well known nickname?`,
        choices: [`The Iceman`, `The World Most Dangerous Man`, `Does not have one`, `The Huntington Beach Bad Boy`],
        answer: 3,
        explanation: `Tito is from Huntington Beach, California, and is known for being a bad boy. His name suits him perfectly.`,
    },
    {
        question: `The UFC returned to an eight man tournament format after a brief experiment with a 16 man tournament at UFC 2. The event also saw the return of defending champion Royce Gracie, but which other competitor was making their second attempt at UFC glory?`,
        choices: [`Harold Howard`, `Keith Hackney`, `Ken Shamrock`, `Roland Payne`],
        answer: 2,
        explanation: `Ken Shamrock missed the UFC 2 event because of a broken hand, but he was deemed fit enough to fight in UFC 3 despite having a partial tear in his ACL. Aside from Gracie and Shamrock all of the six other main competitors and the alternates had not fought in the UFC before.`,
    },
    {
        question: `What was NOT allowed in UFC 1?`,
        choices: [`Hair pulling`, `Choking`, `Groin strikes`, `Fish hooking`],
        answer: 3, 
        explanation: `Fish hooking is inserting your fingers into the mouth, nose, or other orifice of your opponent and then pulling in an attempt to tear the tissue. All of the others were perfectly legal and, with the exception of choking, are now illegal.`,
    },
    {
        question: `The second UFC show welcomed back defending champion Royce Gracie to the Octagon, but which other fighter from UFC 1 returned to compete in the second tournament?`,
        choices: [`Ken Shamrock`, `Teila Tuli`, `Patrick Smith`,`Zane Frazier`],
        answer: 2,
        explanation: `Pat Smith lost to Ken Shamrock in the first round of UFC 1, but his performance in the fight meant that he got an invite to the second tournament. Shamrock himself was invited to take part in UFC 2 as well, but could not compete due to a broken hand.`,
    }
]

//Begins the game
$('#start-button').on('click', function() {
    $(this).hide();
    $('#ufc-trivia').hide();
    $('html').css('background', 'white');
    $('body').css('background', 'white');
    $('#game-window').addClass('jumbotron container mt-5');
    play(questionNumber); //Game starts on question 0 of the array above
})

//Submits user's answer to check whether right or wrong
$('#submit-button').on('click', function() {
    clearInterval(intervalId); //Clear interval ID upon submitting an anser
    var userResponseString = $("input[name=trivia]:checked").val();
    userResponse = parseInt(userResponseString);
    seeAnswer();
})

//Allows using to move to the next question after checking their answer submission
$('#next-button').on('click', function() {
    $('#next-button').css('visibility', 'hidden');
    $('#explanation').empty();
    $('#time-remaining').html('<h1>'+ '20' +'</h1>' );
    questionNumber++;
    play(questionNumber);
})

//At the end of the game, allows user to start with first question again
$('#restart-button').on('click', function() {
    $('#restart-button').css('visibility', 'hidden');
    $('#explanation').empty();
    $('#time-remaining').html('<h1>'+ '20' +'</h1>' );
    questionNumber = 0;
    numAnsCorrect = 0;
    play(questionNumber);
})

//Displays question and answer choices
function play(i) {
    twentySeconds = 20;
    intervalId = setInterval(timer, 1000); // starts twenty second timer
    //Display question
    $('.card').css('visibility', 'visible');
    $('#submit-button').css('visibility', 'visible');
    $('.radio-buttons').css('visibility', 'visible');
    $('#question').html(questions[i].question + '<br><br><hr><br>');
    $( ".radio-buttons" ).prop( "checked", false ); // Leaves answer choices unchecked by default
    $('#answer-a').html(' ' + questions[i].choices[0] + '<br>');
    $('#answer-b').html(' ' + questions[i].choices[1] + '<br>');
    $('#answer-c').html(' ' + questions[i].choices[2] + '<br>');
    $('#answer-d').html(' ' + questions[i].choices[3] + '<br><br>');
}

//20 second timer function
function timer() {
    twentySeconds--;
    $('#time-remaining').html('<h1>' + twentySeconds + '</h1>');
    if (twentySeconds === -1) {
        clearInterval(intervalId);
        $('#time-remaining').html('<h1>' + '0' + '</h1>') 
        alert("Time is up!");
        timeOut = true;
        seeAnswer();
    }
}

function seeAnswer() {
    //Hide time, submit, button, and radio buttons
    $('#time-remaining').css('visibility', 'visible')
    $('#submit-button').css('visibility', 'hidden');
    $('.radio-buttons').css('visibility', 'hidden');
    //Empty the question and choices displayed for the next question
    $('#question').empty();
    $('.choices').empty();
    //Check whether user answered correctly if they did not time out
    if (!timeOut && (userResponse === questions[questionNumber].answer)) {
        $('#question').html('<h2>' + 'Nice Job!' + '</h2>')
        numAnsCorrect++; //Counter goes up by one if question answered correctly
    } else {
        $('#question').html('<h2>' + 'Sorry!' + '</h2>');
        timeOut = false; //If user ran out of time, sets timeOut back to false
    }
    $('#explanation').text(questions[questionNumber].explanation);
    //Make the next or restart question available
    if (questionNumber < (questions.length - 1)){
        $('#next-button').css('visibility', 'visible');
    } else {
        $('#restart-button').css('visibility', 'visible');
        //Display user's score and explain how they can restart after the last question
        $('#explanation').append('<p><h3><strong>' + 'Your final score: ' + ((numAnsCorrect / questions.length)*100) + '%' + '</strong></h3></p>');
        $('#explanation').append('<p><h3>Click the restart to play again!</h3></p>');
    }
}

