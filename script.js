const gameBoard = document.getElementById('gameBoard');

const pixel = 10;
const boardWidth = 500;
const boardHeight = 400;
const row = boardHeight / pixel;
const col = boardWidth / pixel;


gameBoard.style.gridTemplateColumns = `repeat(${col}, ${pixel}px)`;
gameBoard.style.gridTemplateRows = `repeat(${row}, ${pixel}px)`;



const createBox = (isAlive = 1) => `
		<div 
			style='
				background-color: ${isAlive ? 'black' : 'white'};
				width: ${pixel}px;
				height: ${pixel}px;
				border: 1px solid white;
			'
		></div>
	`;

function create2dArr(row, col) {
    let arr = new Array(row);
    for (let i = 0; i < row; i++) {
        arr[i] = new Array(col);
        for (let j = 0; j < col; j++) {
            arr[i][j] = Math.round(Math.random())
        }
    }
    return arr;
}

let bordArr = create2dArr(row, col);

function draw() {
    let gameBoardInnerHTML = ''
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            gameBoardInnerHTML += createBox(bordArr[i][j]);
        }
    }
    gameBoard.innerHTML = gameBoardInnerHTML;


    let newBord = create2dArr(row, col);

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            let alive = countAlive(bordArr, i, j);

            if (bordArr[i][j] == 1 && (alive < 2 || alive > 3)) {
                newBord[i][j] = 0;
            } else if (bordArr[i][j] == 0 && alive == 3) {
                newBord[i][j] = 1;
            } else {
                newBord[i][j] = bordArr[i][j];
            }
        }
    }

    bordArr = newBord;

    setTimeout(() => {
        requestAnimationFrame(draw);
    }, 1000 / 30);

}

requestAnimationFrame(draw)



function countAlive(bord, x, y) {
    let count = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let x1 = (x + i + row) % row;
            let y1 = (y + j + col) % col;
            count += bord[x1][y1]
        }
    }
    count -= bord[x][y];
    return count;
}

