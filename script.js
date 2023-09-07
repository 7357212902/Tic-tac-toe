window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerdisplay = document.querySelector('.display-player');
    const resetbutton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');


    let board = ['', '', '', '', '', '', '', '', ''];
    let currentplayer = 'X';
    let isGameActive = true;

    const playerX_won = ' playerX_won';
    const playero_won = 'playero_won';
    const TIE = 'TIE';


    const winningconditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundwon = false;
        for (let i = 0; i <= 7; i++) {
            const wincondition = winningconditions[i];
            const a = board[wincondition[0]];
            const b = board[wincondition[1]];
            const c = board[wincondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundwon = true;
                break;
            }
        }
        if (roundwon) {
            announce(currentplayer === 'X' ? playerX_won : playero_won);
            isGameActive = false;
            return;

        }
        if (!board.includes(''))
            announce(TIE);
    }
    const announce = (type) => {
        switch (type) {
            case playero_won:
                announcer.innerHTML = 'player <span class="playero">o</span> won';
                break;
            case playerX_won:
                announcer.innerHTML = 'player <span class="playerX">X</span> won';
                break;
            case TIE:
                announcer.innerText = 'TIE';

        }
        announcer.classList.remove('hide');
    };
    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'o') {
            return false;
        }
        return true;
    };
    const updateboard = (index) => {
        board[index] = currentplayer;
    }
    const changeplayer = () => {
        playerdisplay.classList.remove('player$(currentplayer)');
        currentplayer = currentplayer === 'X' ? 'o' : 'X';
        playerdisplay.innerText = currentplayer;
        playerdisplay.classList.add('player$(currentplayer)');
    }
    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerText = currentplayer;
            tile.classList.add('player$(currentplayer)');
            updateboard(index);
            handleResultValidation();
            changeplayer();
        }
    }
    const resetboard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentplayer === 'o') {
            changeplayer();
        }
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playero');

        });
    }
    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });
    resetbutton.addEventListener('click', resetboard);

});