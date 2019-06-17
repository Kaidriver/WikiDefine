const submit = document.querySelector('button');
const form = document.querySelector('textarea');
var list;
var formatList;

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
      .then(data => {infoPieces.push(...data)
                     info += ": " + infoPieces[2][0];
                     console.log(info);
                     form.value += info + "\n";
      });
  });
}

submit.addEventListener('click', format);
