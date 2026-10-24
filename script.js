const typewriterElement = document.getElementById("typewriter");
const cursorElement = document.querySelector(".cursor");
const canvas = document.getElementById("heartTree");
const ctx = canvas.getContext("2d");
const photoSlider = document.getElementById("photoSlider");
const slides = Array.from(photoSlider.querySelectorAll(".slide"));
const dots = Array.from(document.querySelectorAll(".dot"));

const letterContent = [
  "Yêu ơii...",
  "",
  "Mỗi khi có em bên cạnh, thế giới này bỗng trở nên ấm áp và dịu dàng hơn biết bao.",
  "",
  "Cảm ơn em đã cho tớ những nụ cười, những cái ôm và cả những khoảnh khắc nhỏ mà tớ sẽ nhớ mãi.",
  "",
  "Tớ chỉ muốn được nắm tay em đi qua thật nhiều ngày nắng, thật nhiều chiều mưa và cùng viết tiếp câu chuyện của riêng hai đứa mình.",
  "",
  "Yêu em nhiều hơn những gì tớ có thể nói bằng lời...",
  "",
  "Mãi là của riêng nhau nhé Yêu ❤",
].join("\n");

let charIndex = 0;
const typingSpeed = 38;

function typeWriter() {
  if (charIndex <= letterContent.length) {
    typewriterElement.textContent = letterContent.slice(0, charIndex);
    charIndex++;
    setTimeout(typeWriter, typingSpeed);
  } else {
    cursorElement.classList.add("hidden");
  }
}

function startTransition() {
  setTimeout(() => {
    document.body.classList.remove("intro");
    document.body.classList.add("split");
    setTimeout(() => {
      document.body.classList.remove("split");
      typeWriter();
    }, 1700);
  }, 4600);
}

window.addEventListener("load", () => {
  setupCanvas();
  startTransition();
});

let bouquetAnimationFrame = 0;

function setupCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  if (rect.width === 0 || rect.height === 0) {
    setTimeout(setupCanvas, 100);
    return;
  }

  cancelAnimationFrame(bouquetAnimationFrame);

  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  drawBouquet(rect.width, rect.height);
}

function drawBouquet(width, height) {
  const bouquetScale = Math.min(width / 460, height / 598);
  const offsetX = (width - 460 * bouquetScale) / 2;
  const offsetY = (height - 598 * bouquetScale) / 2;
  const flowers = [
    { x: 132, y: 174, size: 34, color: "#fff9f0", delay: 120, tilt: -0.12 },
    { x: 183, y: 120, size: 38, color: "#f7c9d4", delay: 0, tilt: -0.05 },
    { x: 238, y: 105, size: 40, color: "#fffdf5", delay: 180, tilt: 0.03 },
    { x: 290, y: 128, size: 37, color: "#f4b8c9", delay: 80, tilt: 0.1 },
    { x: 337, y: 180, size: 34, color: "#fff8ef", delay: 240, tilt: 0.16 },
    { x: 104, y: 229, size: 33, color: "#f6c7d2", delay: 320, tilt: -0.15 },
    { x: 157, y: 214, size: 36, color: "#fffdf6", delay: 200, tilt: -0.08 },
    { x: 211, y: 193, size: 39, color: "#f2b3c4", delay: 360, tilt: 0 },
    { x: 267, y: 204, size: 36, color: "#fff9f0", delay: 280, tilt: 0.08 },
    { x: 316, y: 229, size: 34, color: "#f7c8d4", delay: 420, tilt: 0.14 },
    { x: 225, y: 151, size: 34, color: "#fbe1d7", delay: 480, tilt: -0.02 },
  ];
  const startTime = performance.now();

  function drawLeaf(startX, startY, endX, endY, leafWidth, color) {
    const direction = endX < startX ? -1 : 1;
    const curve = (endY - startY) * 0.42;
    const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
    gradient.addColorStop(0, "#477c55");
    gradient.addColorStop(0.55, color);
    gradient.addColorStop(1, "#a7c883");

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(
      startX + direction * leafWidth * 0.2,
      startY - curve,
      endX - direction * leafWidth * 0.2,
      endY - curve,
      endX,
      endY,
    );
    ctx.quadraticCurveTo(
      endX - direction * leafWidth * 0.15,
      endY + leafWidth * 0.12,
      startX,
      startY,
    );
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = "rgba(43, 98, 58, 0.42)";
    ctx.lineWidth = 0.8;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(
      (startX + endX) / 2,
      (startY + endY) / 2 - curve * 0.55,
      endX,
      endY,
    );
    ctx.strokeStyle = "rgba(235, 247, 211, 0.62)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function drawTulip(flower, bloomScale) {
    ctx.save();
    ctx.translate(flower.x, flower.y + flower.size * 0.32);
    ctx.rotate(flower.tilt);
    ctx.scale(bloomScale, bloomScale);

    const makePetal = (shape, shade) => {
      const gradient = ctx.createLinearGradient(0, -flower.size * 1.2, 0, 4);
      gradient.addColorStop(0, shade);
      gradient.addColorStop(0.7, flower.color);
      gradient.addColorStop(1, "#e6a6b3");
      ctx.beginPath();
      shape();
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.strokeStyle = "rgba(184, 111, 128, 0.26)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
    };

    const s = flower.size;
    makePetal(
      () => {
        ctx.moveTo(-s * 0.04, 1);
        ctx.bezierCurveTo(-s * 0.62, -s * 0.14, -s * 0.58, -s * 0.82, -s * 0.25, -s * 1.08);
        ctx.bezierCurveTo(-s * 0.08, -s * 0.94, 0, -s * 0.7, s * 0.02, -s * 0.48);
        ctx.lineTo(s * 0.08, 1);
      },
      "#f7d8dc",
    );
    makePetal(
      () => {
        ctx.moveTo(s * 0.02, 1);
        ctx.bezierCurveTo(s * 0.02, -s * 0.35, s * 0.18, -s * 0.96, s * 0.38, -s * 1.12);
        ctx.bezierCurveTo(s * 0.72, -s * 0.84, s * 0.58, -s * 0.18, s * 0.22, 1);
      },
      "#fff5ed",
    );
    makePetal(
      () => {
        ctx.moveTo(-s * 0.16, 1);
        ctx.bezierCurveTo(-s * 0.32, -s * 0.28, -s * 0.24, -s * 1.02, 0, -s * 1.18);
        ctx.bezierCurveTo(s * 0.25, -s * 1.02, s * 0.34, -s * 0.3, s * 0.18, 1);
      },
      "#ffffff",
    );
    ctx.restore();
  }

  function animate(now) {
    const elapsed = now - startTime;
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(bouquetScale, bouquetScale);

    const shadow = ctx.createRadialGradient(230, 526, 10, 230, 526, 130);
    shadow.addColorStop(0, "rgba(118, 75, 78, 0.2)");
    shadow.addColorStop(1, "rgba(118, 75, 78, 0)");
    ctx.fillStyle = shadow;
    ctx.beginPath();
    ctx.ellipse(230, 526, 130, 22, 0, 0, Math.PI * 2);
    ctx.fill();

    flowers.forEach((flower, index) => {
      const stemEndX = 218 + (index % 5) * 6;
      ctx.beginPath();
      ctx.moveTo(flower.x, flower.y + flower.size * 0.25);
      ctx.bezierCurveTo(
        flower.x + (stemEndX - flower.x) * 0.18,
        flower.y + 100,
        stemEndX + (flower.x - stemEndX) * 0.24,
        365,
        stemEndX,
        447,
      );
      const stemGradient = ctx.createLinearGradient(flower.x, 0, stemEndX, 0);
      stemGradient.addColorStop(0, "#4d8056");
      stemGradient.addColorStop(0.5, "#779c62");
      stemGradient.addColorStop(1, "#3d704b");
      ctx.strokeStyle = stemGradient;
      ctx.lineWidth = 3.2;
      ctx.lineCap = "round";
      ctx.stroke();
    });

    [
      [157, 286, 89, 354, 30, "#78a766"],
      [183, 302, 137, 394, 27, "#8bb574"],
      [209, 299, 183, 392, 25, "#6f9e5f"],
      [251, 294, 302, 365, 30, "#83ad69"],
      [277, 312, 337, 395, 26, "#719e5e"],
      [302, 296, 371, 344, 25, "#91b879"],
      [127, 310, 91, 399, 22, "#8aad70"],
    ].forEach((leaf) => drawLeaf(...leaf));

    const paperGradient = ctx.createLinearGradient(105, 300, 350, 505);
    paperGradient.addColorStop(0, "#fff8f0");
    paperGradient.addColorStop(0.48, "#f4e4d8");
    paperGradient.addColorStop(1, "#ead2ce");
    ctx.beginPath();
    ctx.moveTo(91, 290);
    ctx.bezierCurveTo(146, 310, 304, 308, 369, 290);
    ctx.bezierCurveTo(348, 363, 327, 430, 291, 478);
    ctx.lineTo(244, 520);
    ctx.quadraticCurveTo(231, 530, 218, 520);
    ctx.lineTo(168, 478);
    ctx.bezierCurveTo(132, 428, 109, 361, 91, 290);
    ctx.closePath();
    ctx.fillStyle = paperGradient;
    ctx.shadowColor = "rgba(116, 74, 71, 0.18)";
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 8;
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
    ctx.strokeStyle = "rgba(185, 143, 133, 0.48)";
    ctx.lineWidth = 1.4;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(110, 300);
    ctx.quadraticCurveTo(131, 372, 174, 464);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(350, 300);
    ctx.quadraticCurveTo(326, 379, 286, 464);
    ctx.strokeStyle = "rgba(199, 158, 148, 0.32)";
    ctx.lineWidth = 2;
    ctx.stroke();

    const ribbonGradient = ctx.createLinearGradient(184, 0, 278, 0);
    ribbonGradient.addColorStop(0, "#bd6278");
    ribbonGradient.addColorStop(0.5, "#f1a0ad");
    ribbonGradient.addColorStop(1, "#bb5e75");
    ctx.beginPath();
    ctx.moveTo(181, 432);
    ctx.quadraticCurveTo(230, 446, 279, 432);
    ctx.lineTo(273, 449);
    ctx.quadraticCurveTo(230, 463, 187, 449);
    ctx.closePath();
    ctx.fillStyle = ribbonGradient;
    ctx.fill();
    ctx.strokeStyle = "rgba(151, 70, 91, 0.35)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(218, 444);
    ctx.bezierCurveTo(186, 421, 174, 448, 211, 458);
    ctx.bezierCurveTo(192, 473, 210, 479, 229, 453);
    ctx.bezierCurveTo(247, 479, 267, 471, 246, 458);
    ctx.bezierCurveTo(281, 444, 265, 421, 237, 444);
    ctx.closePath();
    ctx.fillStyle = "#ed9bad";
    ctx.fill();
    ctx.strokeStyle = "rgba(151, 70, 91, 0.45)";
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(229, 450, 8, 7, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#d77f91";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(220, 455);
    ctx.lineTo(211, 489);
    ctx.quadraticCurveTo(222, 485, 227, 461);
    ctx.closePath();
    ctx.moveTo(236, 456);
    ctx.lineTo(251, 483);
    ctx.quadraticCurveTo(238, 481, 231, 461);
    ctx.closePath();
    ctx.fillStyle = "#d98495";
    ctx.fill();

    flowers.forEach((flower) => {
      const bloomScale = Math.min(1, Math.max(0, (elapsed - flower.delay) / 420));
      if (bloomScale > 0) drawTulip(flower, bloomScale);
    });

    ctx.restore();

    if (elapsed < 1000) {
      bouquetAnimationFrame = requestAnimationFrame(animate);
    }
  }

  bouquetAnimationFrame = requestAnimationFrame(animate);
}

let currentSlide = 0;
const slideCount = slides.length;
let slideInterval;

function goToSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
  currentSlide = index;
}

function nextSlide() {
  const next = (currentSlide + 1) % slideCount;
  goToSlide(next);
}

function startSlider() {
  slideInterval = setInterval(nextSlide, 3200);
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = Number(dot.dataset.index);
    goToSlide(index);
    clearInterval(slideInterval);
    startSlider();
  });
});

window.addEventListener("resize", setupCanvas);
startSlider();
