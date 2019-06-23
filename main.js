const submit = document.querySelector('.submit');
const form = document.querySelector('textarea');
const divList = document.querySelector('ul');
const copyBtn = document.querySelector('.copy');
const clearBtn = document.querySelector('.clear');
var list;
var formatList;
var infoList = [];
var html = [];
var indices = [];
var links = [];
var counter = 0;
function createSpan(info) {
  let element = `
    <li class = "mb-2">
      <div class = "row" data-key = ${counter}>
        <div class = "word text-center col-3"><a href = "${links[links.length-1][0]}">${info}</a></div>
        <div class = "definition col-7">${infoList[infoList.length-1][indices[counter]]}</div>
        <button type = "button" class = "btn btn-primary info col-2" data-key = ${counter}>Next</button>
      </div>
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

  const div = document.querySelector(`div[data-key="${index}"]`);
  let newDef = document.createElement('div');
  newDef.innerHTML = infoList[index][indices[index]];
  newDef.classList.add("col-7");
  newDef.classList.add("definition");
  console.log(div.childNodes[3]);
  div.replaceChild(newDef, div.childNodes[3]);

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
        divList.innerHTML = html.join('');

        const buttons = document.querySelectorAll('.info');
        console.log(buttons);
        buttons.forEach(button => button.addEventListener('click', changeDef));
      });
  });

}

function copyToClip () {
  form.select();
  document.execCommand("copy");
  alert("Copied!");
  form.deSelect();
}

function clearInfo() {
  form.value = "";
  while (divList.firstChild) {
    divList.removeChild(divList.firstChild);
  }
}

submit.addEventListener('click', format);
copyBtn.addEventListener('click', copyToClip);
clearBtn.addEventListener('click', clearInfo);
