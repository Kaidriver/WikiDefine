const submit = document.querySelector('button');
const form = document.querySelector('textarea');
const spanList = document.querySelector('ul');
var list;
var formatList;
var infoList = [];
var html = [];
var indices = [];
var links = [];
var counter = 0;
function createSpan(info) {
  let element = `
    <li data-key = ${counter}>
      <span class = "word text-center"><a href = "${links[links.length-1][0]}">${info}</a></span>
      <span class = "definition">${infoList[infoList.length-1][indices[counter]]}</span>
      <button type = "button" class = "btn btn-primary info" data-key = ${counter}>Next</button>
    </li>
  `;
  counter++;
  html.push(element);
}
function changeDef() {

  const index = this.getAttribute('data-key');
  console.log(infoList[index].length);
  console.log(indices[index]);
  if (indices[index] >= infoList[index].length - 1) {
    indices[index] = 0;
    console.log("hi");
  }
  else {
    indices[index]++;
  }

  const li = document.querySelector(`li[data-key="${index}"]`);
  let newDef = document.createElement('span');
  newDef.innerHTML = infoList[index][indices[index]];
  console.log(newDef);
  li.replaceChild(newDef, li.childNodes[3]);
}

function format() {
  list = form.value;
  formatList = list.split('\n');
  console.log(formatList);
  form.value = "";

  formatList.forEach(function(info) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=${info}`;
    let infoPieces = [];
    fetch(endpoint)
      .then(blob => blob.json())
      .then(data => {
        infoPieces.push(...data)
        console.log(infoPieces);
        infoList.push(infoPieces[2]);
        links.push(infoPieces[3]);
        console.log(infoList[infoList.length-1]);
        info += ": ";
        if (infoList[infoList.length-1].length == 0) {
          form.value += info + "Definition can not be found, try a different phrase" + "\n";
          console.log("hi");
          indices.push(-1);
        }
        else if (infoList[infoList.length-1][0].includes("refers to")) {
          form.value += info + infoList[infoList.length-1][1] + "\n";
          indices.push(1);
        }
        else {
          form.value += info + infoList[infoList.length-1][0] + "\n";
          indices.push(0);
        }
        createSpan(info);
        spanList.innerHTML = html.join('');

        const buttons = document.querySelectorAll('.info');
        console.log(buttons);
        buttons.forEach(button => button.addEventListener('click', changeDef));
      });
  });

}

submit.addEventListener('click', format);
