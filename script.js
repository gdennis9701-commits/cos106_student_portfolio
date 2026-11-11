// Shared navigation and small page enhancements.
document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.textContent = isOpen ? '×' : '☰';
    });
  }
  initializePlanner();
  initializeContactForm();
});

// Academic planner: array-based task management with localStorage persistence.
function initializePlanner() {
  const form = document.getElementById('task-form');
  if (!form) return;
  const input = document.getElementById('task-input');
  const list = document.getElementById('task-list');
  const feedback = document.getElementById('task-feedback');
  const count = document.getElementById('task-count');
  const completedCount = document.getElementById('completed-count');
  const pendingCount = document.getElementById('pending-count');
  const progressBar = document.getElementById('progress-bar');
  const progressLabel = document.getElementById('progress-label');
  const filterButtons = document.querySelectorAll('.filter-btn');
  let tasks = [];
  let currentFilter = 'all';
  try { tasks = JSON.parse(localStorage.getItem('godwinAcademicTasks') || '[]'); }
  catch (error) { tasks = []; }

  function saveTasks() {
    try { localStorage.setItem('godwinAcademicTasks', JSON.stringify(tasks)); }
    catch (error) { feedback.textContent = 'Tasks are available for this session, but could not be saved on this device.'; }
  }
  function renderTasks() {
    list.innerHTML = '';
    const visibleTasks = tasks.filter(task => currentFilter === 'all' || (currentFilter === 'active' && !task.completed) || (currentFilter === 'completed' && task.completed));
    if (visibleTasks.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'empty-state';
      empty.textContent = tasks.length === 0 ? 'Your study list is clear. Add your first task above.' : 'No tasks match this filter.';
      list.appendChild(empty);
    }
    visibleTasks.forEach(task => {
      const item = document.createElement('li');
      item.className = `task-item${task.completed ? ' completed' : ''}`;
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox'; checkbox.checked = task.completed;
      checkbox.setAttribute('aria-label', `Mark ${task.text} as ${task.completed ? 'pending' : 'completed'}`);
      checkbox.addEventListener('change', () => {
        tasks = tasks.map(entry => entry.id === task.id ? {...entry, completed: checkbox.checked} : entry);
        saveTasks(); renderTasks();
      });
      const text = document.createElement('span'); text.className = 'task-text'; text.textContent = task.text;
      const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'delete-task'; remove.textContent = 'Delete';
      remove.setAttribute('aria-label', `Delete ${task.text}`);
      remove.addEventListener('click', () => { tasks = tasks.filter(entry => entry.id !== task.id); saveTasks(); renderTasks(); });
      item.append(checkbox, text, remove); list.appendChild(item);
    });
    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.length - completed;
    const percentage = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
    count.textContent = `${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'}`;
    completedCount.textContent = completed; pendingCount.textContent = pending;
    progressBar.style.width = `${percentage}%`; progressLabel.textContent = `${percentage}% completed`;
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) { feedback.textContent = 'Please enter a task before adding it.'; feedback.classList.add('error'); return; }
    tasks.unshift({id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, text, completed: false});
    saveTasks(); input.value = ''; feedback.textContent = 'Task added successfully.'; feedback.classList.remove('error');
    currentFilter = 'all'; filterButtons.forEach(button => button.classList.toggle('active', button.dataset.filter === 'all'));
    renderTasks(); input.focus();
  });
  filterButtons.forEach(button => button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle('active', item === button));
    renderTasks();
  }));
  renderTasks();
}

// Contact form validation. This demo validates locally; it does not send email.
function initializeContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const feedback = document.getElementById('contact-feedback');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d+$/;
    let error = '';
    if (!name || !email || !phone || !message) error = 'Please complete every field.';
    else if (!emailPattern.test(email)) error = 'Please enter a valid email address.';
    else if (!phonePattern.test(phone)) error = 'Phone number must contain digits only (no spaces or symbols).';
    feedback.classList.toggle('error', Boolean(error));
    if (error) { feedback.textContent = error; return; }
    feedback.textContent = 'All fields are valid. This demonstration form does not send messages; connect a backend or form service to receive submissions.';
  });
}
