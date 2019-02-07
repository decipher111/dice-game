/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var gamePlaying, activePlayer, roundScore, dice

init()

$('.btn-roll').on('click', () => {
    if(gamePlaying){
    dice = Math.floor(Math.random() * 6) + 1
    if(dice === 1){
        resetRoundScore()
        $('#current-'+ activePlayer).text(roundScore)
        $('.player-'+activePlayer+'-panel').removeClass('active')
        switchPlayer()
        $('.player-'+activePlayer+'-panel').addClass('active')
    }
    else{
        roundScore= roundScore + dice
        $('#current-'+ activePlayer).text(roundScore)
        $('.dice').css('display', 'block').attr('src', 'dice-'+dice+'.png')
    }
}
})
$('.btn-hold').on('click', () => {
    if(gamePlaying){
    var x = parseInt($('#score-'+activePlayer).text()) + roundScore
    $('#score-'+activePlayer).text(x)
    $('#current-'+activePlayer).text(0)
    resetRoundScore()
    if(x>=10){
        $('#name-'+activePlayer).text('WINNER')
        $('.dice').css('display', 'none')
        $('.player-'+activePlayer+'panel').addClass('winner')
        $('.player-'+activePlayer+'panel').removeClass('active')
        gamePlaying = false
    }
    else{
        switchPlayer()
    }
}
})

$('.btn-new').on('click', ()=> {
    init()
})

function init() {
    activePlayer = 0
    gamePlaying = true
    resetRoundScore()
    $('.dice').css('display', 'none')
    $('#score-0').text('0')
    $('#score-1').text('0')
    $('#current-0').text('0')
    $('#current-1').text('0')
    $('#name-0').text('Player 1')
    $('#name-1').text('Player 2')
    $('.player-0-panel').removeClass('winner')
    $('.player-0-panel').removeClass('active')
    $('.player-1-panel').removeClass('winner')
    $('.player-1-panel').removeClass('active')
    $('.player-0-panel').addClass('active')
}

$('#current-' + activePlayer).html(`<em>${roundScore}</em>`)
$('.dice').css('display', 'none')



function switchPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
}

function resetRoundScore() {
    roundScore = 0
}
