// preview image

const choose_image = document.querySelector(".choose-img");
const input_image = document.querySelector(".file-input");
const preview_image = document.querySelector(".preview-img img");

// console.log(input_image);

input_image.onchange = () => {
  let img = input_image.files[0];
  //   console.log(img);
  preview_image.src = URL.createObjectURL(img);
  preview_image.addEventListener("load", () => {
    reset_button.click();
  });
};

choose_image.onclick = () => input_image.click();
// console.dir(input_image);
// console.log(choose_image);

//filters

let rotate = 0,
  blurr = "0",
  grayscale = "0",
  sepia = "0";

// console.log(preview_image.style);

const changeFilterValues = () => {
  preview_image.style.transform = `rotate(${rotate}deg)`;
  preview_image.style.filter = `grayscale(${grayscale}%) blur(${blurr}px) sepia(${sepia}%)`;
};

//reset the filter
const reset_button = document.querySelector(".reset-filter");

reset_button.onclick = () => {
  blurr = "0";
  grayscale = "0";
  rotate = 0;
  sepia = "0";

  grayscale_slider.value = grayscale;
  blur_slider.value = blurr;
  rotate_slider.value = rotate;
  sepia_slider.value = sepia;

  grayscale_value.innerText = `${grayscale}%`;
  blur_value.innerText = `${blurr}px`;
  rotate_value.innerText = `${rotate}deg`;
  sepia_value.innerText = `${sepia}%`;

  changeFilterValues();
};
// console.log(filter_buttons);

const grayscale_slider = document.querySelector(".grayscale-slider input"),
  blur_slider = document.querySelector(".blur-slider input"),
  rotate_slider = document.querySelector(".rotate-slider input"),
  sepia_slider = document.querySelector(".sepia-slider input");

// console.log(grayscale_slider);

grayscale_slider.value = grayscale;
blur_slider.value = blurr;
rotate_slider.value = rotate;
sepia_slider.value = sepia;

grayscale_slider.max = "100";
blur_slider.max = "10";
rotate_slider.max = 360;
sepia_slider.max = "100";

const grayscale_value = document.querySelector(".grayscale-slider .value"),
  blur_value = document.querySelector(".blur-slider .value"),
  rotate_value = document.querySelector(".rotate-slider .value"),
  sepia_value = document.querySelector(".sepia-slider .value");

// console.log(blur_value.innerText);

grayscale_slider.addEventListener("input", () => {
  grayscale = grayscale_slider.value;
  grayscale_value.innerText = `${grayscale}%`;
  changeFilterValues();
});

blur_slider.addEventListener("input", () => {
  blurr = blur_slider.value;
  blur_value.innerText = `${blurr}px`;
  changeFilterValues();
});

rotate_slider.addEventListener("input", () => {
  rotate = rotate_slider.value;
  rotate_value.innerText = `${rotate}deg`;
  changeFilterValues();
});

sepia_slider.addEventListener("input", () => {
  sepia = sepia_slider.value;
  sepia_value.innerText = `${sepia}%`;
  changeFilterValues();
});

//save image

const save_button = document.querySelector(".save-img");

save_button.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = preview_image.naturalWidth;
  canvas.height = preview_image.naturalHeight;
  //   console.log(preview_image.naturalWidth);
  //   console.log(preview_image.naturalHeight);
  
  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180);
  }
  ctx.filter = `grayscale(${grayscale}%) blur(${blurr}px) sepia(${sepia}%)`;
  ctx.drawImage(
    preview_image,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
  const saveImg = document.createElement("a");
  saveImg.download = "image.jpg";
  saveImg.href = canvas.toDataURL();
  saveImg.click();
});
