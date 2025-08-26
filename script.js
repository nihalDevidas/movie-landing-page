const imgArr = [
  "./images2/avatar.jpg",
  "./images2/coco.jpeg",
  "./images2/godzilla.jpg",
  "./images2/kgf2.jpg",
  "./images2/kong.jpg",
  "./images2/opehiemer.png",
  "./images2/matrix.jpg",
  "./images2/blackpanther.webp",
  "./images2/kungfupanda.jpg",
];

document.addEventListener("DOMContentLoaded", async (event) => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  animate_navbar();
  try {
    const response = await preloadImages(imgArr);
    animate_title_button_subtitle();
  } catch (error) {
    console.log("error: some images were not loaded:" + error);
  }

  animate_genres_cards();
  animate_payment_cards();
});

const gridContainer = document.getElementById("img-con2");

function imageLoadCheck(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;

    if (img.complete) {
      // Already cached
      resolve(img);
    } else {
      img.onload = () => resolve(img);
      img.onerror = reject;
    }
  });
}

async function preloadImages(imageList) {
  return new Promise(async (resolve, reject) => {
    try {
      const loadedImages = await Promise.all(imageList.map(imageLoadCheck));
      // All images are loaded (or cached)
      resolve(loadedImages);
    } catch (err) {
      console.error("Some images failed to load:", err);
      reject(err);
    }
  });
}

const getRandomImage = () => {
  let index = Math.floor(Math.random() * imgArr.length);
  return imgArr[index];
};

const loadRandomImagesInGrid = () => {
  const gridBlocks = document.querySelectorAll(".img-con-2 > .item");
  gridBlocks.forEach((block) => {
    let url = 'url("' + getRandomImage() + '")';
    block.style.backgroundImage = url;
  });
};

function LargeScreenGrigConfiguration() {
  // clean the previous configuration
  gridContainer.innerHTML = "";
  gridContainer.classList.add("img-con-2");
  gridContainer.classList.remove("grid-layout-medium");

  let arr = [];
  for (let i = 2; i <= 12; i++) {
    arr.push(`<div class="item" id="it${i}"></div>`);
  }
  gridContainer.innerHTML = arr.join(" ");

  loadRandomImagesInGrid();

  const block1 = document.getElementById("it3");
  const block2 = document.getElementById("it12");
  const block3 = document.getElementById("it2");
  const block4 = document.getElementById("it9");

  injectRandomImage([block1, block2, block3, block4], [7, 5, 7, 5]);
}

function MediumScreenGridConfiguration() {
  // clean the previous configuration
  gridContainer.innerHTML = "";
  gridContainer.classList.remove("img-con-2");
  gridContainer.classList.add("grid-layout-medium");

  let arr = [];
  for (let i = 1; i <= 4; i++) {
    arr.push(`<div class="item-med" id="md${i}"></div>`);
  }
  gridContainer.innerHTML = arr.join(" ");

  const gridBlocks = document.querySelectorAll(
    ".grid-layout-medium > .item-med"
  );
  gridBlocks.forEach((block) => {
    let url = 'url("' + getRandomImage() + '")';
    block.style.backgroundImage = url;
  });

  const block1 = document.getElementById("md1");
  const block2 = document.getElementById("md2");
  const block3 = document.getElementById("md3");
  const block4 = document.getElementById("md4");

  injectRandomImage([block1, block2, block3, block4], [7, 5, 7, 5]);
}

function injectRandomImage(elementArr, delayArr) {
  if (elementArr.length !== delayArr.length) {
    return;
  }
  elementArr.forEach((imageBox, index) => {
    setInterval(() => {
      imageBox.style.backgroundImage = 'url("' + getRandomImage() + '")';
    }, delayArr[index] * 1000);
  });
}

//load for the first time and in-between window reload
if (window.innerWidth >= 901) {
  gridContainer.setAttribute("data-screensize", "large");
  LargeScreenGrigConfiguration();
}
if (window.innerWidth <= 900) {
  gridContainer.setAttribute("data-screensize", "medium");
  MediumScreenGridConfiguration();
}

//for screen width 900px and above
window.addEventListener("resize", () => {
  const screenSize = gridContainer.getAttribute("data-screensize");
  // preventing redundant func call on resize
  if (window.innerWidth >= 901 && screenSize !== "large") {
    gridContainer.setAttribute("data-screensize", "large");
    LargeScreenGrigConfiguration();
  }
});
//for screen widthless ttha 900px
window.addEventListener("resize", () => {
  const screenSize = gridContainer.getAttribute("data-screensize");
  if (window.innerWidth <= 900 && screenSize !== "medium") {
    gridContainer.setAttribute("data-screensize", "medium");
    MediumScreenGridConfiguration();
  }
});

//gsap animation functions

const animate_navbar = () => {
  gsap.fromTo(
    ".nav",
    {
      yPercent: -100,
      opacity: 0,
    },
    {
      yPercent: 0,
      duration: 1,
      opacity: 1,
      ease: "power1.out",
    }
  );
};

const animate_title_button_subtitle = () => {
  gsap.fromTo(
    ".item",
    {
      z: -50,
      opacity: 0,
      ease: "expo.out",
      duration: 0.8,
      stagger: 0.16,
    },
    {
      z: 0,
      opacity: 1,
      ease: "expo.out",
      duration: 0.8,
      stagger: 0.16,
    }
  );

  gsap.fromTo(
    ".title1",
    {
      yPercent: -100,
      opacity: 0,
      ease: "expo.out",
      duration: 0.7,
    },
    {
      yPercent: 0,
      opacity: 1,
      ease: "expo.out",
      duration: 0.7,
    },
    "+=0.01"
  );
  gsap.fromTo(
    ".title",
    {
      yPercent: 30,
      opacity: 0,
      ease: "power1.out",
      duration: 0.6,
    },
    {
      yPercent: 0,
      opacity: 1,
      ease: "power1.out",
      duration: 0.6,
    },
    "+=0.015"
  );
  gsap.fromTo(
    ".sub-title",
    {
      yPercent: 30,
      opacity: 0,
      ease: "power1.out",
      duration: 0.6,
    },
    {
      yPercent: 0,
      opacity: 1,
      ease: "power1.out",
      duration: 0.6,
    },
    "+=0.018"
  );
  gsap.fromTo(
    ".btn-con",
    {
      yPercent: 40,
      opacity: 0,
      ease: "power1.out",
      duration: 0.4,
    },
    {
      yPercent: 0,
      opacity: 1,
      ease: "power1.out",
      duration: 0.4,
    },
    "+=0.020"
  );
};

const animate_genres_cards = () => {
  const cardTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".genres-section",
      start: "top 40%",
    },
  });
  cardTimeline.from(".left-top, .left-sec, .right-bottom, .right-sec", {
    yPercent: 50,
    opacity: 0,
    duration: 1,
    stagger: {
      each: 0.04,
      grid: [2, 2],
      axis: "x",
      start: "start",
      ease: "power1.Out",
    },
  });
};

const animate_payment_cards = () => {
  const paymentWords = SplitText.create(".des-title", { type: "words" });

  const paymentTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".payment-section",
      start: "top 40%",
    },
  });
  paymentTimeline
    .from(paymentWords.words, {
      yPercent: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: "power1.out",
    })
    .from(
      ".subtitle",
      {
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
      },
      "+=0.01"
    );
  paymentTimeline.fromTo(
    ".basic, .premium",
    {
      opacity: 0,
      duration: 0.5,
      ease: "power1.out",
    },
    {
      opacity: 1,
      duration: 0.5,
      ease: "power1.out",
      stagger: 0.04,
    },
    0
  );
};
