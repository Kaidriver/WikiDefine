const submit = document.querySelector('button');
const form = document.querySelector('textarea');
const spanList = document.querySelector('ul');
var list;
var formatList;
var infoList = [];
var html = [];
function createSpan(info) {
  let element = `
    <li>
      <span class = "word text-center">${info}</span>
      <span class = "definition">${infoList[infoList.length-1][1]}</span>
      <button type = "button" class = "btn btn-primary">Next</button>
    </li>
  `;
  html.push(element);
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
        console.log(infoList[infoList.length-1]);
        info += ": ";
        if (infoList[infoList.length-1].length == 0) {
          form.value += info + "Definition can not be found, try a different phrase" + "\n";
          console.log("hi");
        }
        else if (infoList[infoList.length-1][0].includes("refers to")) {
          form.value += info + infoList[infoList.length-1][1] + "\n";
        }
        else {
          form.value += info + infoList[infoList.length-1][0] + "\n";
        }
        createSpan(info);
        spanList.innerHTML = html.join('');
      });
  });

}

submit.addEventListener('click', format);
