const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");

let x = 100;          // 丸の中心の位置
let y = 80;
let vx = 180;         // 横の速さ（1秒に180px）
let vy = 140;         // 縦の速さ（1秒に140px。＋ は下へ）
const r = 14;         // 半径
let color = "#ffd166";
let last = performance.now();

function update(dt) {
  x = x + vx * dt;
  y = y + vy * dt;

    // 左右の壁（丸は x が中心なので、半径 r を足し引きする）
    if (x + r > canvas.width) {
        x = canvas.width - r;
        vx = -vx;
        color = color === "#ffd166" ? "#06d6a0" : "#ffd166";
    }
    if (x - r < 0) {
      x = r;
      vx = -vx;
      color = color === "#ffd166" ? "#06d6a0" : "#ffd166";
    }
    // 上下の壁
    if (y + r > canvas.height) {
        y = canvas.height - r;
        vy = -vy;
        color = color === "#ffd166" ? "#06d6a0" : "#ffd166";
    }
    if (y - r < 0) {
        y = r;
        vy = -vy;
        color = color === "#ffd166" ? "#06d6a0" : "#ffd166";
    }
}

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp") {
    vx = vx * 1.2;   // 速さを1.2倍（向きはそのまま）
    vy = vy * 1.2;
  }
  // ここに、ほかのキーを足す
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

function loop(now) {
  const dt = (now - last) / 1000;
  last = now;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);