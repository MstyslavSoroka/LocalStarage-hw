const task = document.getElementById('task_name');
const list = document.getElementById('to_do_list');
const btn = document.getElementById('btn');
const clear = document.getElementById('clear');
const form = document.getElementById('form');

let tasks = JSON.parse(localStorage.getItem('task'));
if (!tasks) {
  tasks = [];
}

function showTasks() {
  list.innerHTML = '';
  tasks.forEach((t, index) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <h2>${t.taskName}</h2>
      <input type="checkbox" ${
        t.completed ? 'checked' : ''
      } data-index="${index}">
    `;
    list.appendChild(taskItem);
  });
}

btn.addEventListener('click', (e) => {
  e.preventDefault();
  const taskName = task.value;
  tasks.push({ taskName, completed: false });
  localStorage.setItem('task', JSON.stringify(tasks));
  form.reset();
  showTasks();
});

clear.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.clear();
  tasks = [];
  showTasks();
});

list.addEventListener('change', (e) => {
  const index = e.target.dataset.index;
  tasks[index].completed = e.target.checked;
  localStorage.setItem('task', JSON.stringify(tasks));
});

showTasks();

// ==============================================1====================================================

const form1 = document.querySelector('.js-feedback-form');
const email = document.getElementById('email');
const age = document.getElementById('age');
const name = document.getElementById('name');

name.addEventListener('input', (e) => {
  const userName = e.currentTarget.value;
  localStorage.setItem('name', userName);
});
age.addEventListener('input', (e) => {
  const userAge = e.currentTarget.value;
  localStorage.setItem('age', userAge);
});
email.addEventListener('input', (e) => {
  const userEmail = e.currentTarget.value;
  localStorage.setItem('email', userEmail);
});

window.addEventListener('load', (e) => {
  const localStorageName = localStorage.getItem('name');
  const localStorageAge = localStorage.getItem('age');
  const localStorageEmail = localStorage.getItem('email');
  if (localStorageName) {
    name.value = localStorageName;
  }
  if (localStorageAge) {
    age.value = localStorageAge;
  }
  if (localStorageEmail) {
    email.value = localStorageEmail;
  }
});

form1.addEventListener('submit', (e) => {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.clear();
});

// =============================2=========================================

function loadBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  const list = document.getElementById('bookmark-list');
  list.innerHTML = '';
  bookmarks.forEach((bookmark, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
            <a href="${bookmark.url}" target="_blank">${bookmark.title}</a>
            <button onclick="deleteBookmark(${index})">Видалити</button>
        `;
    list.appendChild(listItem);
  });
}

function addBookmark() {
  const url = document.getElementById('url').value;
  if (!url) return alert('Будь ласка, введіть URL.');

  const title = new URL(url).hostname;

  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarks.push({ url, title });
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  loadBookmarks();
}

function deleteBookmark(index) {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarks.splice(index, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  loadBookmarks();
}

window.addEventListener('load', loadBookmarks());

// ================================3=======================================

function loadContacts() {
  const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  const list = document.getElementById('contact-list');
  list.innerHTML = '';
  contacts.forEach((contact, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
            ${contact.firstName} ${contact.lastName} - ${contact.phone} - ${contact.email}
            <button onclick="deleteContact(${index})">Видалити</button>
        `;
    list.appendChild(listItem);
  });
}

function addContact() {
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;

  const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  contacts.push({ firstName, lastName, phone, email });
  localStorage.setItem('contacts', JSON.stringify(contacts));
  loadContacts();
}
function deleteContact(index) {
  const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  contacts.splice(index, 1);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  loadContacts();
}

window.onload = loadContacts;
