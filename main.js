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
      .then(data => {
        infoPieces.push(...data)
        console.log(infoPieces);
        if (infoPieces[2].length == 0) {
          info += ": ";
          form.value += info + "Definition can not be found, try a different phrase" + "\n";
          console.log("hi");
        }
        else if (infoPieces[2][0].includes("refers to")) {
          info += ": " + infoPieces[2][1];
          form.value += info + "\n";
        }
        else {
          info += ": " + infoPieces[2][0];
          form.value += info + "\n";
        }

      });

  });
}

submit.addEventListener('click', format);
