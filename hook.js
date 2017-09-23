// Hide Wayback nav bar.
try {
  document.getElementById("wm-ipp").style.display = "none";
} catch (e) {}

console.log(document.URL, 'content');

html2canvas(document.body, {
  onrendered: function(canvas) {
    chrome.runtime.sendMessage({
      data: canvas.toDataURL(),
      documentUrl: document.URL
    });
  },
  width: 600,
  height: 500
});
