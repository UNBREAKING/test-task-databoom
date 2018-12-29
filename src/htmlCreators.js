function objToString(obj) {
  let result = "";
  for (let key in obj){
      if (typeof obj[key] === "object")
          result += `${key}(${objToString(obj[key])}`;
      else
          result +=  `${key}: ${obj[key]}, `;
  }
  return result.slice(0, -2) + ")";
}

function createInput(elem, disabled) {
  let input = document.createElement('input');
  input.setAttribute('type', "text");
  input.setAttribute('placeholder', key + "..");
  input.value = elem;
  input.disabled = disabled;
  return input;
}

function createLabel(key) {
  let label = document.createElement('label');
  label.innerText = key;
  return label;
}

function createHeadRow(elem) {
  let row = document.createElement('tr');

  for (let key in elem) {
      let cell = document.createElement('th');
      cell.innerText = key;
      row.appendChild(cell);
  }

  return row;
}

function createRow(elem) {
  let row = document.createElement('tr');

  for (let key in elem) {
      let cell = document.createElement('td');

      if (Array.isArray(elem[key]))
          cell.appendChild(toGrid(elem[key]));
      else if (typeof elem[key] === "object")
          cell.appendChild(toGrid([elem[key]]));
      else
          cell.innerHTML = elem[key];

      row.appendChild(cell);
  }

  return row;
}

export const toGrid = function(list) {
  let table = document.createElement('table');

  if (list !== undefined) {
      table.appendChild(createHeadRow(list[0]));

      for (let elem in  list)
          table.appendChild(createRow(list[elem]));
  }

  return table;
}

export const toForm = (elem) => {
  let form = document.createElement('form');

  for (let key in elem) {
      form.appendChild(createLabel(key));
      if (Array.isArray(elem[key])){
          for (let obj in elem[key]){
              form.appendChild(createInput(objToString(elem[key][obj]), true));
          }
      }
      else
          form.appendChild(createInput(elem[key], true));
  }

  return form;
}