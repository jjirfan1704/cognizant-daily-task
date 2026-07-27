import { catalog } from './data.js';

// --- Warm-up: iterate and destructure ---
for (const entry of catalog) {
    const { title, credits } = entry;
    console.log(title, credits);
}

// --- map: build display strings ---
const displayList = catalog.map(({ code, title, credits }) =>
    `${code} : ${title} (${credits} cr)`
);
console.log('Display list:', displayList);

// --- filter: courses worth 3 or more credits ---
const majorCourses = catalog.filter(entry => entry.credits >= 3);
console.log('Major (3+ credit) courses:', majorCourses.length);

// --- reduce: sum of all credits ---
const creditSum = catalog.reduce((acc, entry) => acc + entry.credits, 0);
console.log('Credit sum:', creditSum);

// --- DOM references ---
const gridContainer = document.querySelector('.course-grid');
const creditSummaryEl = document.getElementById('total-credits');
const detailEl = document.getElementById('selected-course');

// --- render course cards into the grid ---
function paintGrid(entries) {
    gridContainer.innerHTML = '';

    const chunk = document.createDocumentFragment();

    entries.forEach(entry => {
        const card = document.createElement('article');
        card.className = 'course-card';
        card.dataset.id = entry.id;
        card.innerHTML = `
            <h3>${entry.code}</h3>
            <p>${entry.title}</p>
            <p>${entry.credits} Credits</p>
        `;
        chunk.appendChild(card);
    });

    gridContainer.appendChild(chunk);

    const sum = entries.reduce((acc, e) => acc + e.credits, 0);
    creditSummaryEl.textContent = `Total Credits: ${sum}`;
}

paintGrid(catalog);

// --- live search on title ---
document.getElementById('search-courses').addEventListener('input', function () {
    const term = this.value.toLowerCase();
    const matches = catalog.filter(e => e.title.toLowerCase().includes(term));
    paintGrid(matches);
});

// --- sort toggle (highest credits first) ---
document.getElementById('sort-btn').addEventListener('click', () => {
    const ranked = [...catalog].sort((a, b) => b.credits - a.credits);
    paintGrid(ranked);
});

// --- event delegation: single listener for all cards ---
gridContainer.addEventListener('click', (event) => {
    const card = event.target.closest('.course-card');
    if (!card) return;

    const id = Number(card.dataset.id);
    const entry = catalog.find(e => e.id === id);

    detailEl.textContent = `Selected: ${entry.title} | Grade: ${entry.grade}`;
});
