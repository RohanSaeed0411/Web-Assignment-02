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

const filter_buttons = document.querySelectorAll(".filter button");
// console.log(filter_buttons);
const filter_name = document.querySelector(".filter-info .name");
const filter_value = document.querySelector(".filter-info .value");
const filter_slide = document.querySelector(".slider input");
const rotate_buttons = document.querySelectorAll(".rotate button");
// console.log(rotate_buttons);

let brightness = "100",
  saturation = "100",
  inversion = "0",
  grayscale = "0",
  rotate = 0,
  horizontalFlip = 1,
  verticalFlip = 1;

// console.log(preview_image.style);

const changeFilterValues = () => {
  preview_image.style.transform = `rotate(${rotate}deg) scale(${horizontalFlip}, ${verticalFlip})`;
  preview_image.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
};

//reset the filter
const reset_button = document.querySelector(".reset-filter");

reset_button.onclick = () => {
  brightness = "100";
  saturation = "100";
  inversion = "0";
  grayscale = "0";
  rotate = 0;
  horizontalFlip = 1;
  verticalFlip = 1;
  changeFilterValues();
  document.querySelector("button#brightness").click();
};
// console.log(filter_buttons);

filter_buttons.forEach((item) => {
  item.addEventListener("click", () => {
    filter_name.innerText = item.innerText;
    // console.log(document.querySelector(".active"));
    document.querySelector(".active").classList.remove("active");
    item.classList.add("active");
    // console.log(item.classList);

    if (item.id === "brightness") {
      filter_value.innerText = `${brightness}%`;
      filter_slide.value = brightness;
      filter_slide.max = "200";
    } else if (item.id === "saturation") {
      filter_value.innerText = `${saturation}%`;
      filter_slide.value = saturation;
      filter_slide.max = "200";
    } else if (item.id === "inversion") {
      filter_value.innerText = `${inversion}%`;
      filter_slide.value = inversion;
      filter_slide.max = "100";
    } else {
      filter_value.innerText = `${grayscale}%`;
      filter_slide.value = grayscale;
      filter_slide.max = "100";
    }
  });
});

filter_slide.addEventListener("input", () => {
  filter_value.innerText = `${filter_slide.value}%`;

  const filter_active = document.querySelector(".filter .active");
  // console.dir(filter_active);
  if (filter_active.id === "brightness") {
    brightness = filter_slide.value;
  } else if (filter_active.id === "saturation") {
    saturation = filter_slide.value;
  } else if (filter_active.id === "inversion") {
    inversion = filter_slide.value;
  } else {
    grayscale = filter_slide.value;
  }
  changeFilterValues();
});

//rotate&flip

rotate_buttons.forEach((item) => {
  item.onclick = () => {
    // console.log(item);
    if (item.id === "left") {
      rotate -= 90;
    } else if (item.id === "right") {
      rotate += 90;
    } else if (item.id === "horizontal") {
      if (horizontalFlip === 1) {
        horizontalFlip = -1;
      } else {
        horizontalFlip = 1;
      }
    } else {
      if (verticalFlip === 1) {
        verticalFlip = -1;
      } else {
        verticalFlip = 1;
      }
    }
    changeFilterValues();
  };
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
  ctx.scale(horizontalFlip, verticalFlip);
  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
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
