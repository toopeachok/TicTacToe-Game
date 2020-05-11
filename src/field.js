export function generateField(dimension = 3) {

  if (typeof dimension !== 'number') return;

  const arrayOfCells = _createArrayOfCells(dimension);

  const $fieldBox = document.createElement('div');

  $fieldBox.classList.add('field-box');

  const $field = document.createElement('div');

  $field.style.gridTemplateRows = `repeat(${dimension}, 1fr)`;

  $field.style.gridTemplateColumns = `repeat(${dimension}, 1fr)`;

  $field.classList.add('field');

  const $resultOverlay = document.createElement('div');

  $resultOverlay.classList.add('result-overlay');

  let cells = '';

  for (let i = 0; i < dimension; i++) {

    for (let j = 0; j < dimension; j++)

    cells += `<div class="cell" data-position="${i}, ${j}"></div>`;

  }

  $field.innerHTML = cells;

  $field.insertAdjacentElement('beforeend', $resultOverlay);

  $fieldBox.insertAdjacentElement('afterbegin', $field);

  document.body.insertAdjacentElement('afterbegin', $fieldBox);

  return arrayOfCells;

}

function _createArrayOfCells(dimension) {

  const cells = new Array(dimension);

  for (let i = 0; i < cells.length; i++) {
    cells[i] = new Array(dimension);
  }

  for (let i = 0; i < dimension; i++) {

    for (let j = 0; j < dimension; j++)

      cells[i][j] = '';

  }

  return cells;

}

