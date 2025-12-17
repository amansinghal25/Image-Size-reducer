function compressImage() {
  const input = document.getElementById("imageInput");
  const file = input.files[0];

  if (!file) {
    alert("Please select an image");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("Please upload image below 5MB");
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.onload = function (e) {
    img.src = e.target.result;
  };

  img.onload = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    let quality = 0.9;

    function tryCompress() {
      canvas.toBlob(
        function (blob) {
          if (blob.size <= 1024 * 1024 || quality <= 0.1) {
            const url = URL.createObjectURL(blob);
            document.getElementById("output").innerHTML = `
              <p>Compressed Size: ${(blob.size / 1024).toFixed(2)} KB</p>
              <a href="${url}" download="compressed-image.jpg">
                <button>Download Image</button>
              </a>
            `;
          } else {
            quality -= 0.05;
            tryCompress();
          }
        },
        "image/jpeg",
        quality
      );
    }

    tryCompress();
  };

  reader.readAsDataURL(file);
}
