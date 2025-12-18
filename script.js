const upload = document.getElementById("upload");
const controls = document.getElementById("controls");
const originalSizeEl = document.getElementById("originalSize");

const compressionSlider = document.getElementById("compression");
const compressionValue = document.getElementById("compressionValue");
const compressBtn = document.getElementById("compressBtn");

const result = document.getElementById("result");
const compressedSizeEl = document.getElementById("compressedSize");
const reductionEl = document.getElementById("reduction");
const downloadBtn = document.getElementById("downloadBtn");

const presetButtons = document.querySelectorAll(".presets button");

let file;
let img = new Image();

upload.addEventListener("change", () => {
  file = upload.files[0];
  if (!file) return;

  originalSizeEl.textContent =
    (file.size / 1024).toFixed(2) + " KB";

  controls.classList.remove("hidden");

  const reader = new FileReader();
  reader.onload = e => img.src = e.target.result;
  reader.readAsDataURL(file);
});

compressionSlider.addEventListener("input", () => {
  compressionValue.textContent = compressionSlider.value;
});

presetButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.getAttribute("data-value");
    compressionSlider.value = value;
    compressionValue.textContent = value;
  });
});

compressBtn.addEventListener("click", () => {
  if (!img.src) return;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  const quality = compressionSlider.value / 100;
  const compressedData = canvas.toDataURL("image/jpeg", quality);

  const compressedKB =
    Math.round((compressedData.length * 3) / 4 / 1024);

  compressedSizeEl.textContent = compressedKB + " KB";

  const reduction =
    ((1 - compressedKB / (file.size / 1024)) * 100).toFixed(1);

  reductionEl.textContent = reduction + "%";

  downloadBtn.href = compressedData;
  downloadBtn.download = "compressed-image.jpg";

  result.classList.remove("hidden");
});
