function selectDifficulty() {
    let diff = document.getElementsByName('difficulty');
    let diff1 = "";
    let missing = 0;
    for (let i = 0; i < diff.length; i++) {
        if (diff[i].checked)
            diff1 = diff[i].value;
    }
    document.getElementById('difficulty').style.display = "none";
    document.getElementById('container').style.filter = "none";

    switch (diff1) {
        case 'easy': missing = 20; break;
        case 'medium': missing = 40; break;
        case 'hard': missing = 60; break;
    }
    document.getElementById('startbutton').setAttribute('value', missing);
}
let board = [];
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    let squares = [];
    const colorcell = [3,4,5,12,13,14,21,22,23,27,28,29,36,37,38,45,46,47,33,34,35,42,43,44,51,52,53,57,58,59,66,67,68,75,76,77];
    function createBoard() {
        for (let i = 0; i < 81; i++) {
            sqaure = document.createElement('div');
            sqaure.setAttribute('class', 'cell');
            sqaure.setAttribute('id', i);
            if(colorcell.indexOf(i) !== -1)
            {
                sqaure.style.backgroundColor = 'darkgrey';
            }
            sqaure.innerHTML = '0';
            grid.appendChild(sqaure);
            squares.push(sqaure);
        }
    }

    createBoard();

    const sudo = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    let missing = 0;
    setTimeout(getUnk, 5000);
    function getUnk() {
        missing = document.getElementById('startbutton').getAttribute('value');
    }

    function startFilling() {
        fillDiagonal();
        fillRemain(0, 3);
        alert("Please Choose an Appropriate Level :) ");
        setTimeout(removeMissing, 7500);
    }

    function fillDiagonal() {
        for (let i = 0; i < 9; i += 3) {
            fillSubGrid(i, i);
        }
    }

    function notUsedInSubGrid(row, col, num) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (sudo[row + i][col + j] == num)
                    return false;
            }
        }
        return true;
    }

    function fillSubGrid(row, col) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let temp = 0;
                do {
                    temp = Math.floor(Math.random() * 9 + 1);
                } while (!notUsedInSubGrid(row, col, temp));
                sudo[row + i][col + j] = temp;
            }
        }
    }

    function notUsedInRow(row, num) {
        for (let i = 0; i < 9; i++) {
            if (sudo[row][i] == num)
                return false;
        }
        return true;
    }

    function notUsedInCol(col, num) {
        for (let i = 0; i < 9; i++) {
            if (sudo[i][col] == num)
                return false;
        }
        return true;
    }

    function checkIfSafe(row, col, num) {
        return (notUsedInRow(row, num) && notUsedInCol(col, num) && notUsedInSubGrid(row - row % 3, col - col % 3, num));
    }

    function fillRemain(i, j) {
        if (j >= 9 && i < 8) {
            i++;
            j = 0;
        }
        if (i >= 9 && j >= 9) {
            return true;
        }
        if (i < 3) {
            if (j < 3)
                j = 3;
        }
        else if (i < 6) {
            let temp = (i / 3);
            if (j == (~~temp) * 3)
                j += 3;
        }
        else {
            if (j == 6) {
                i++;
                j = 0;
                if (i >= 9)
                    return true;
            }
        }

        for (let k = 1; k <= 9; k++) {
            if (checkIfSafe(i, j, k)) {
                sudo[i][j] = k;
                if (fillRemain(i, j + 1))
                    return true;
                sudo[i][j] = 0;
            }
        }
        return false;
    }

    //before removing elements copy sudoku board to another array for verification when user submits
    function removeMissing() {
        // setting a default value so that if user delays in choosing level default value is chosen
        if (missing == 0 || missing == null)
            missing = 45;
        while (missing != 0) {
            let cellno = Math.floor(Math.random() * 81 + 1) - 1;
            let row = ~~(cellno / 9);
            let col = cellno % 9;
            if (sudo[row][col] != 0) {
                missing--;
                sudo[row][col] = 0;
            }
        }
        let k = 0;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                document.getElementById(k).innerHTML = sudo[i][j];
                k++;
            }
        }
    }

    startFilling();
    board = sudo;
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
                const number = parseInt(prompt('Enter suitable number (1-9): '));
                if(!isNaN(number) && number >= 1 && number <= 9)
                {
                    cell.textContent = number;
                }
                else
                {
                    alert('Please enter a valid number between 1 and 9.');
                }
        })
    })
});

function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    var minibut = document.getElementById("minibut");
    if (sidebar.style.width === "135px") {
        sidebar.style.width = "0px";
        minibut.style.left = "5px";
    }
    else {
        sidebar.style.width = "135px";
        minibut.style.left = "135px";
    }
}

function validate() {
    let k = 0;
    let win = true;
    const ansboard = sudokuSolver();
    console.log(ansboard);
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (document.getElementById(k).innerHTML !== ansboard[i][j]) {
                win = false;
                break;
            }
            k++;
        }
        if (!win)
            break;
    }
    if (win) {
        document.getElementById('result').innerHTML = 'Congrats!! You Win!';
    }
    else {
        document.getElementById('result').innerHTML = 'Try Again!!';
    }

}
function reset(val) {
    var res;
    if (val == null)
        res = confirm('Do you want to reload same board?');
    if (res) {
        let k = 0;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                document.getElementById(k).innerHTML = board[i][j];
                k++;
            }
        }
        document.getElementById('result').innerHTML = 'Validate Board';
    }
    else
        window.location.reload();
}


function sudokuSolver() {

    var copyboard = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            copyboard[i][j] = board[i][j];
        }
    }

    // Helper function to check if a number can be placed in a cell
    function isValid(row, col, num) {
        // Check if the number is already present in the row
        for (let i = 0; i < 9; i++) {
            if (copyboard[row][i] === num) {
                return false;
            }
        }
        // Check if the number is already present in the column
        for (let i = 0; i < 9; i++) {
            if (copyboard[i][col] === num) {
                return false;
            }
        }
        // Check if the number is already present in the 3x3 subgrid
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (copyboard[i][j] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    // Helper function to perform backtracking
    function solve() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                // Find an empty cell
                if (copyboard[row][col] === 0) {
                    // Try placing numbers 1-9 in the cell
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(row, col, num)) {
                            // Place the number if it's valid
                            copyboard[row][col] = num;
                            // Recursively solve the rest of the puzzle
                            if (solve()) {
                                return true;
                            }
                            // If the current placement leads to an invalid solution, backtrack
                            copyboard[row][col] = 0;
                        }
                    }
                    // If no number can be placed, the puzzle is unsolvable
                    return false;
                }
            }
        }
        // If all cells are filled, the puzzle is solved
        return true;
    }

    // Call the helper function to solve the puzzle
    if (solve()) {
        return copyboard; // Return the solved board
    } else {
        return null; // Puzzle is unsolvable
    }
}
