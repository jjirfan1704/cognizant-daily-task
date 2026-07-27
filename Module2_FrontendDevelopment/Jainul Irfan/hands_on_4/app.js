import { catalog } from './data.js';

const API_ROOT = 'https://jsonplaceholder.typicode.com';


// ============================================================
// PART A — Promises and async/await
// ============================================================

// Promise-chain version of a user lookup
function getStudentPromise(id) {
    return fetch(`${API_ROOT}/users/${id}`)
        .then(res => res.json())
        .then(student => console.log('Promise chain - student name:', student.name));
}
getStudentPromise(3);

// same lookup rewritten with async/await + try/catch
async function getStudent(id) {
    try {
        const res = await fetch(`${API_ROOT}/users/${id}`);
        const student = await res.json();
        console.log('async/await - student name:', student.name);
    } catch (err) {
        console.error('getStudent error:', err.message);
    }
}
getStudent(3);

// simulated network delay, then resolves with the local catalog
function loadCatalogAsync() {
    return new Promise(resolve => setTimeout(() => resolve(catalog), 1000));
}

// show a loading message, then paint cards once the promise resolves
const catalogGrid = document.getElementById('course-grid');
const catalogLoadingEl = document.getElementById('courses-loading');
const creditTotalEl = document.getElementById('total-credits');

loadCatalogAsync().then(entries => {
    catalogLoadingEl.style.display = 'none';
    entries.forEach(entry => {
        const card = document.createElement('article');
        card.className = 'course-card';
        card.innerHTML = `<h3>${entry.code}</h3><p>${entry.name}</p><p>${entry.credits} Credits</p>`;
        catalogGrid.appendChild(card);
    });
    const total = entries.reduce((sum, e) => sum + e.credits, 0);
    creditTotalEl.textContent = `Total Credits: ${total}`;
});

// Promise.all — fetch two students at the same time
Promise.all([
    fetch(`${API_ROOT}/users/3`).then(r => r.json()),
    fetch(`${API_ROOT}/users/4`).then(r => r.json())
]).then(([studentA, studentB]) => {
    console.log('Promise.all - students:', studentA.name, '&', studentB.name);
});


// ============================================================
// PART B — Fetch API with Error Handling
// ============================================================

// reusable fetch wrapper that throws on a bad HTTP status
async function safeFetch(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}: ${url}`);
    }
    return res.json();
}

const announceLoading = document.getElementById('notif-loading');
const announceError = document.getElementById('notif-error');
const announceList = document.getElementById('notif-list');

// load announcements, show a loading state, render cards, handle failure
async function loadAnnouncements(url) {
    announceLoading.style.display = 'block';
    announceError.innerHTML = '';
    announceList.innerHTML = '';

    try {
        const items = await safeFetch(url);
        announceLoading.style.display = 'none';
        items.slice(0, 5).forEach(item => {
            const card = document.createElement('div');
            card.className = 'notif-card';
            card.innerHTML = `<strong>${item.title}</strong><p>${item.body.slice(0, 60)}...</p>`;
            announceList.appendChild(card);
        });
    } catch (err) {
        announceLoading.style.display = 'none';
        announceError.innerHTML = `
            <p class="error-msg">Couldn't load announcements: ${err.message}</p>
            <button id="retry-btn" type="button">Try Again</button>
        `;
        document.getElementById('retry-btn').addEventListener('click', () => {
            loadAnnouncements(`${API_ROOT}/posts`);
        });
    }
}

loadAnnouncements(`${API_ROOT}/posts`);

// Swap the line above for this one to test the error + retry path:
// loadAnnouncements(`${API_ROOT}/does-not-exist`);


// ============================================================
// PART C — Axios
// ============================================================

// request interceptor — logs every outgoing call
axios.interceptors.request.use(config => {
    console.log('Outgoing request:', config.url);
    return config;
});

// same safeFetch behaviour, rewritten with axios (auto JSON parse + auto-throw)
async function axiosGet(url) {
    const res = await axios.get(url);
    return res.data;
}

// fetch posts belonging to userId 2, using a params object
async function loadAxiosFeed() {
    try {
        const res = await axios.get(`${API_ROOT}/posts`, { params: { userId: 2 } });
        const items = res.data;
        const feedEl = document.getElementById('axios-posts');
        items.slice(0, 3).forEach(item => {
            const card = document.createElement('div');
            card.className = 'notif-card';
            card.innerHTML = `<strong>${item.title}</strong>`;
            feedEl.appendChild(card);
        });
    } catch (err) {
        console.error('Axios error:', err.message);
    }
}
loadAxiosFeed();

/*
 * fetch vs axios — quick comparison:
 *
 * 1. JSON parsing: fetch needs a manual res.json() call; axios parses the body
 *    automatically and exposes it as res.data.
 * 2. Error handling: fetch only rejects when the network itself fails — a 404
 *    or 500 still resolves normally, so res.ok has to be checked by hand.
 *    Axios throws automatically for any non-2xx response.
 * 3. Extras: axios ships with request/response interceptors, timeout config,
 *    and request cancellation built in; fetch has none of that natively.
 */
