const checkboxes = document.querySelectorAll(".inbox input[type='checkbox']");
let lastChecked;

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click', handleCheck);
  checkbox.checked = false;
});

function handleCheck(e) {
  let inBetween = false;
  if(e.shiftKey && this.checked) {
    checkboxes.forEach(checkbox => {
      console.log(checkbox);
      if(checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }

      if(inBetween) {
        checkbox.checked = true;
      }
    });
  }
  lastChecked=this;
}
