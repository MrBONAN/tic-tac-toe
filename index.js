const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const DRAW = '*';

const container = document.getElementById('fieldWrapper');







class Field {
    constructor() {
        this.sign = ZERO;
        this.countMove = 0;
        this.field = [
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY]
        ];
    }

    addSign(row, column) {
        if (this.field[row][column] === EMPTY) {
            this.sign = this.sign === CROSS ? ZERO : CROSS;
            this.field[row][column] = this.sign;
            this.countMove++;
            return true;
        }
        return false;
    }

    checkWin() {
        let sign = this.sign;
        let count3 = 0;
        let count4 = 0;
        for (let i = 0; i < 2; i++) {
            let count1 = 0;
            let count2 = 0;
            if (this.field[i][i] === sign){
                count3++;
            }
            if (this.field[2 - i][i] === sign){
                count4++;
            }
            for (let j = 0; j < 2; j++) {
                if (this.field[i][j] === sign) {
                    count1++;
                }
                if (this.field[j][i] === sign) {
                    count2++;
                }
            }
            if (count1 === 3 || count2 === 3) {
                return true;
            }
        }
        return count3 === 3 || count4 === 3;
    }
}

function startGame() {
    field = new Field();
    renderGrid(3);
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    let result = field.addSign(row, col);
    if (result === true) {
        renderSymbolInCell(field.sign, row, col)
        if (field.checkWin()) {
            alert(`${field.sign} win!!!`);
        } else if (field.countMove === 9) {
            alert(`Победила дружба`);
        }
    }

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    console.log('reset!');
}


/* Test Function */

/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell(row, col) {
    findCell(row, col).click();
}


startGame();
addResetListener();