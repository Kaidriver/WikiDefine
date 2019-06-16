const submit = document.querySelector('button');
const form = document.querySelector('textarea');
var list;
var formatList;

function format() {
  list = form.value;
  formatList = list.split('\n');
  console.log(formatList);
  form.value = "";
}

submit.addEventListener('click', format);
