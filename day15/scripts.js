const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text,
    done: false
  }
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  (this.querySelector('[name=item]')).value="";
  //this.reset();
}

function populateList(plates=[], platesList) {
  //console.table(plates);
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id=item${i} ${plate.done? 'checked': ''} />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
  }).join('');
}

function toggleDone(e) {
  if(!e.target.matches('input')) return;
  const element = e.target;
  const index = element.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

function removeAll(e) {
  items.splice(0);
  itemsList.innerHTML = "";
  localStorage.clear();
}

addItems.addEventListener("submit", addItem);
addItems.addEventListener("reset", removeAll);
itemsList.addEventListener("click", toggleDone);

populateList(items, itemsList);
