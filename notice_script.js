// Sample data (replace this with dynamic content)
const notices = [
    { sn: 1, notice: 'Notice 1', date: '2024-08-01', category: 'advertisement', download: '#' },
    { sn: 2, notice: 'Notice 2', date: '2024-08-02', category: 'exam-center', download: '#' },
    // Add more sample notices...
];

let currentPage = 1;
let rowsPerPage = 10;

function displayNotices(page, rowsPerPage) {
    const tableBody = document.querySelector('#noticesTable tbody');
    tableBody.innerHTML = '';

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedNotices = notices.slice(start, end);

    paginatedNotices.forEach(notice => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${notice.sn}</td>
            <td>${notice.notice}</td>
            <td>${notice.date}</td>
            <td><a href="${notice.download}" download>🔽</a></td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById('currentPage').textContent = `Page ${currentPage}`;
}

function filterNotices() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categorySelect').value;
    const filteredNotices = notices.filter(notice => {
        const matchesSearch = notice.notice.toLowerCase().includes(searchInput);
        const matchesCategory = category === 'all' || notice.category === category;
        return matchesSearch && matchesCategory;
    });

    return filteredNotices;
}

function setupPagination() {
    document.getElementById('rowsPerPage').addEventListener('change', (e) => {
        rowsPerPage = parseInt(e.target.value);
        currentPage = 1;
        displayNotices(currentPage, rowsPerPage);
    });

    document.getElementById('prevPageBtn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayNotices(currentPage, rowsPerPage);
        }
    });

    document.getElementById('nextPageBtn').addEventListener('click', () => {
        if ((currentPage * rowsPerPage) < notices.length) {
            currentPage++;
            displayNotices(currentPage, rowsPerPage);
        }
    });

    document.getElementById('searchInput').addEventListener('input', () => {
        displayNotices(currentPage, rowsPerPage);
    });

    document.getElementById('categorySelect').addEventListener('change', () => {
        displayNotices(currentPage, rowsPerPage);
    });
}

function init() {
    displayNotices(currentPage, rowsPerPage);
    setupPagination();
}

document.addEventListener('DOMContentLoaded', init);

