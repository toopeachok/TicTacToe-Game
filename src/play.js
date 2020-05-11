import {generateField} from '@/field'

export const startGame = (dimension) => {

  const arrayOfCells = generateField(dimension);

  const $field = document.querySelector('.field');

  const $cells = $field.querySelectorAll('[data-position');

  let lastTurn = 'X';

  let turnsCount = 1;

  $field.addEventListener('click', (event) => {

    if (event.target.dataset.position) {

      if (!_isCheckedCell(event.target)) {

        let cellPosition = event.target.dataset.position;
        cellPosition = cellPosition.split(',');
        let cellRow = parseInt(cellPosition[0]);
        let cellCol = parseInt(cellPosition[1]);

        arrayOfCells[cellRow][cellCol] = lastTurn;

        event.target.innerHTML = lastTurn;

        if (turnsCount > dimension - 1) {

          if (_WinInRow(cellRow, arrayOfCells, lastTurn)) {
            _showResult(`${lastTurn} won!!!`);
            _restartGame();
            return;
          }

          if (_WinInColl(cellCol, arrayOfCells, lastTurn)) {
            _showResult(`${lastTurn} won!!!`);
            _restartGame();
            return;
          }

          if (_WinInMainDiagonal(arrayOfCells, lastTurn)) {
            _showResult(`${lastTurn} won!!!`);
            _restartGame();
            return;
          }

          if (_WinInSideDiagonal(arrayOfCells, lastTurn)) {
            _showResult(`${lastTurn} won!!!`);
            _restartGame();
            return;
          }

          if (_isDraw(turnsCount, dimension)) {
            _showResult('Draw!!!');
            _restartGame();
            return;
          }

        }

        lastTurn = _whichPlayerTurn(lastTurn);

        turnsCount++;

      }

    }

  });

  function _isCheckedCell(cell) {

    return cell.innerHTML !== '';

  }

  function _whichPlayerTurn(lastTurn) {

    if (lastTurn === 'X') {
      return 'O';
    } else {
      return 'X';
    }

  }

  function _WinInRow(rowIndex, arrayOfCells, lastTurn) {

    for (let i = 0; i < arrayOfCells.length; i++) {

      if (arrayOfCells[rowIndex][i] !== lastTurn) {
        return false;
      }

    }

    return true;

  }

  function _WinInColl(collIndex, arrayOfCells, lastTurn) {

    for (let i = 0; i < arrayOfCells.length; i++) {

      if (arrayOfCells[i][collIndex] !== lastTurn) {
        return false;
      }

    }

    return true;

  }

  function _WinInMainDiagonal(arrayOfCells, lastTurn) {

    let i = 0;
    let j = i;

    while (i < arrayOfCells.length) {

      if (arrayOfCells[i][j] !== lastTurn) {
        return false;
      }

      i++;
      j++;

    }

    return true;

  }

  function _WinInSideDiagonal(arrayOfCells, lastTurn) {

    let i = 0;
    let j = arrayOfCells.length - 1;

    while (i < arrayOfCells.length || j > 0) {

      if (arrayOfCells[i][j] !== lastTurn) {
        return false;
      }

      i++;
      j--;

    }

    return true;

  }

  function _isDraw(turnsCount, dimension) {
    return turnsCount === (dimension * dimension);
  }

  function _restartGame() {

    setTimeout(() => {

      for (let i = 0; i < arrayOfCells.length; i++) {

        for (let j = 0; j < arrayOfCells.length; j++)

          arrayOfCells[i][j] = '';

      }

      lastTurn = 'X';

      turnsCount = '1';

      for (let i = 0; i < $cells.length; i++) {
        $cells[i].innerHTML = '';
      }

      const $resultOverlay = $field.querySelector('.result-overlay');

      $resultOverlay.classList.remove('result-overlay--active');

    }, 3000);

  }

  function _showResult(resultType) {

    const $resultOverlay = $field.querySelector('.result-overlay');

    $resultOverlay.classList.add('result-overlay--active');

    $resultOverlay.innerHTML = resultType;

  }

};



