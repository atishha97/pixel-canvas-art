const gridElement = document.getElementById("grid");
const colorPicker = document.getElementById("color-picker");
const drawButton = document.getElementById("draw-mode");
const eraseButton = document.getElementById("erase-mode");
const toggleGridButton = document.getElementById("toggle-grid");
const clearButton = document.getElementById("clear-grid");
const gridSizeSlider = document.getElementById("grid-size");
const gridSizeLabel = document.getElementById("grid-size-label");

let currentMode = "draw";
let showOutlines = true;
let isPointerDown = false;

function setMode(mode) {
  currentMode = mode;
  drawButton.classList.toggle("is-active", mode === "draw");
  eraseButton.classList.toggle("is-active", mode === "erase");
}

function updateGridSizeLabel(size) {
  gridSizeLabel.textContent = `${size} × ${size}`;
}

function buildGrid(size) {
  gridElement.innerHTML = "";
  gridElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridElement.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < size * size; i += 1) {
    const cell = document.createElement("div");
    cell.className = "pixel";
    fragment.appendChild(cell);
  }
  gridElement.appendChild(fragment);
}

function paintCell(cell) {
  if (!cell || !cell.classList.contains("pixel")) return;
  if (currentMode === "draw") {
    cell.style.backgroundColor = colorPicker.value;
  } else {
    cell.style.backgroundColor = "transparent";
  }
}

function handlePointerDown(event) {
  if (!event.target.classList.contains("pixel")) return;
  event.preventDefault();
  isPointerDown = true;
  paintCell(event.target);
}

function handlePointerEnter(event) {
  if (!isPointerDown) return;
  paintCell(event.target);
}

function handlePointerUp() {
  isPointerDown = false;
}

function clearGrid() {
  gridElement.querySelectorAll(".pixel").forEach((cell) => {
    // eslint-disable-next-line no-param-reassign
    cell.style.backgroundColor = "transparent";
  });
}

function toggleOutlines() {
  showOutlines = !showOutlines;
  gridElement.classList.toggle("hide-outlines", !showOutlines);
  toggleGridButton.textContent = showOutlines ? "Hide Grid" : "Show Grid";
}

drawButton.addEventListener("click", () => setMode("draw"));
eraseButton.addEventListener("click", () => setMode("erase"));
toggleGridButton.addEventListener("click", toggleOutlines);
clearButton.addEventListener("click", clearGrid);

gridSizeSlider.addEventListener("input", (event) => {
  const size = Number(event.target.value);
  updateGridSizeLabel(size);
  buildGrid(size);
});

gridElement.addEventListener("pointerdown", handlePointerDown);
gridElement.addEventListener("pointerenter", handlePointerEnter, true);
window.addEventListener("pointerup", handlePointerUp);

// Initialize
updateGridSizeLabel(Number(gridSizeSlider.value));
buildGrid(Number(gridSizeSlider.value));

