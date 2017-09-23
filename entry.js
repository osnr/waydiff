const urlInput = document.getElementById("urlInput");
const fetchBtn = document.getElementById("fetchBtn");
const container = document.getElementById("container");
fetchBtn.onclick = async () => {
  const response = await fetch(
    `https://cors-anywhere.herokuapp.com/https://web.archive.org/web/timemap/json/${urlInput.value}`
  );
  const data = await response.json();
  container.innerHTML = JSON.stringify(data);
};

function loadInIframe(src) {
  const iframe = document.createElement("iframe");
  iframe.src = src;
  iframe.width = 600;
  iframe.height = 500;
  iframe.style.display = "none";
  document.body.appendChild(iframe);
}

loadInIframe("http://web.archive.org/web/19990208005517/http://news.bbc.co.uk:80/");
loadInIframe("http://web.archive.org/web/19991013082010/http://news.bbc.co.uk:80/");

console.log(resemble);

const images = [];
function appendImage(url) {
  const img = document.createElement("img");
  img.src = url;
  img.width = 400;
  document.body.appendChild(img);

  images.push(url);

  if (images.length === 2) {
    resemble(images[0]).compareTo(images[1]).onComplete(data => {
      const diffUrl = data.getImageDataUrl()
      const img = document.createElement("img");
      img.src = diffUrl;
      document.body.appendChild(img);
    });
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  appendImage(request);
});
