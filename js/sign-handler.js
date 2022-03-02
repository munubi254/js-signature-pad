var canvas = document.getElementById("canvas");
var saveSignBtn = document.querySelector("[data-action=action-save]");
var undoBtn = document.querySelector("[data-action=action-undo]");
var clearBtn = document.querySelector("[data-action=action-clear]");
var createPDFBtn = document.querySelector("[data-action=action-pdf]");

var ourPad = new SignaturePad(canvas, {
  backgroundColor: 'rgb(255, 255, 255)'
});

canvas.getContext("2d")

function processImage() {
  //creating a blob and displaying the image in the image element
  canvas.toBlob(function (blob) {
    var targetImg = document.querySelector('img'),
      url = URL.createObjectURL(blob);
    targetImg.src = url;
  });

}

saveSignBtn.addEventListener("click", function (event) {
  if (ourPad.isEmpty()) {
    alert("Please sign first.");
  } else {
    processImage();
  }
});

//clearing the signature drawing
clearBtn.addEventListener("click", function (event) {
  if (ourPad.isEmpty()) {
    alert("Please sign first.");
  } else {
    ourPad.clear();
  }
});

undoBtn.addEventListener("click", function (event) {
  var signMark = ourPad.toData();
  if (ourPad.isEmpty()) {
    alert("Please sign first.");
  } else {
    if (signMark) {
      signMark.pop(); // deletinging the last marked dot or drawn line
      ourPad.fromData(signMark);
    }
  }
});

//creating a pdf using the jsPDF library
createPDFBtn.addEventListener("click", function (event) {
  window.html2canvas = html2canvas;
  window.jsPDF = window.jspdf.jsPDF
  var doc = new jsPDF(
    'l', 'pt', 'a4'
  );

  doc.html(document.getElementById('toPrint'), {
    callback: function (doc) {
      doc.save();
    },
    x: 10,
    y: 10
  });
});
