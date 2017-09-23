const urlInput = document.getElementById("url-input");
const fetchBtn = document.getElementById("fetch-btn");

const leftSelect = document.getElementById("left-select");
const rightSelect = document.getElementById("right-select");

let leftSelectOptions = [];
let rightSelectOptions = [];
function addOption(target, timestamp, url) {
  const splitTimestamp = /^([0-9]{4})([0-9]{2})([0-9]{2})(.*$)/.exec(timestamp);
  const text = `${splitTimestamp[1]}-${splitTimestamp[2]}-${splitTimestamp[3]} ${splitTimestamp[4]}`
  target.push(`<option value="${timestamp + '/' + url}">${text}</option>`);
}

fetchBtn.onclick = async () => {
  const response = await fetch(
    `https://cors-anywhere.herokuapp.com/https://web.archive.org/web/timemap/json/${urlInput.value}`
  );
  const data = await response.json();

  for (let i = 1; i < data.length; i++) {
    addOption(leftSelectOptions, data[i][1], data[i][2]);
    addOption(rightSelectOptions, data[i][1], data[i][2]);
  }
  leftSelect.innerHTML = leftSelectOptions.join("\n");
  rightSelect.innerHTML = rightSelectOptions.join("\n");
};

const leftIframe = document.getElementById("left-iframe");
leftSelect.onchange = () => {
  leftIframe.src = `https://web.archive.org/web/${leftSelect.value}`
};
const rightIframe = document.getElementById("right-iframe");
rightSelect.onchange = () => {
  rightIframe.src = `https://web.archive.org/web/${rightSelect.value}`
};

console.log(resemble);

let leftImageUrl;
let rightImageUrl;
function appendImage(data, documentUrl) {
  const img = document.createElement("img");
  img.src = data;
  img.width = 400;
  img.style.display = "none";
  document.body.appendChild(img);

  if (documentUrl === leftIframe.src) {
    console.log('got left');
    leftImageUrl = data;
  } else {
    console.log('got right');
    rightImageUrl = data;
  }

  resemble(leftImageUrl).compareTo(rightImageUrl).onComplete(data => {
    const diffUrl = data.getImageDataUrl()
    const img = document.getElementById("bottom-img");
    img.src = diffUrl;
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  appendImage(request.data, request.documentUrl);
});
