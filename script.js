// Sample task data with URLs and completion status
const tasks = [
  { id: 1, description: "Follow Phantom CEO", reward: 2000, completed: false, url: "https://example.com/ton-transaction" },
  { id: 2, description: "Join Telegram community", reward: 100, completed: false, url: "https://t.me/phantomcommunity" },
  { id: 3, description: "Follow us on X", reward: 50, completed: false, url: "https://twitter.com/phantom" },
  { id: 4, description: "Subscribe YouTube", reward: 50, completed: false, url: "https://youtube.com/phantomchannel" }
];

// Placeholder for Phantom token balance
let phantomBalance = 0;

// Function to render tasks
function renderTasks() {
  const taskListElement = document.getElementById('task-list');
  taskListElement.innerHTML = ''; // Clear existing tasks

  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.innerHTML = `
      <p>${task.description}</p>
      <span>+${task.reward} P</span>
      <a href="${task.completed ? '#' : task.url}" class="btn" id="task-btn-${task.id}" target="_blank" 
        onclick="completeTask(${task.id}); return false;">
        ${task.completed ? 'Complete' : 'Start'}
      </a>
    `;
    taskListElement.appendChild(taskElement);
  });
}

// Function to complete a task and update balance
function completeTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task && !task.completed) {
    phantomBalance += task.reward;
    document.getElementById('phantom-balance').innerText = `${phantomBalance} PHANTOM`;
    task.completed = true;

    // Update the button text to "Complete" and prevent further clicks
    const taskButton = document.getElementById(`task-btn-${taskId}`);
    taskButton.innerText = 'Complete';
    taskButton.href = '#';  // Disable the link after task is completed
    taskButton.classList.add('completed-btn');
  }
}

// Navigation between screens
document.getElementById('home-tab').addEventListener('click', function() {
  showScreen('home-screen');
  setActiveTab('home-tab');
});

document.getElementById('leaderboard-tab').addEventListener('click', function() {
  showScreen('leaderboard-screen');
  setActiveTab('leaderboard-tab');
  loadLeaderboard();
});

document.getElementById('friends-tab').addEventListener('click', function() {
  showScreen('invite-screen');
  setActiveTab('friends-tab');
});

// Function to switch screens
function showScreen(screenId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    screen.classList.add('hidden');
  });
  document.getElementById(screenId).classList.remove('hidden');
}

// Function to set active tab
function setActiveTab(tabId) {
  const tabs = document.querySelectorAll('.nav-btn');
  tabs.forEach(tab => {
    tab.classList.remove('active');
  });
  document.getElementById(tabId).classList.add('active');
}

// Dummy wallet connection without alert
document.getElementById('connect-wallet').addEventListener('click', function() {
  document.getElementById('connect-wallet').innerText = 'Connected';
});

// Sample leaderboard data
const leaderboardData = [
  { rank: 1, name: "AbuMen", points: 17181 },
  { rank: 2, name: "YarAdua", points: 5176 },
  { rank: 3, name: "Umaru", points: 3243 },
  { rank: 4, name: "LEGEND", points: 1181 },
  { rank: 5, name: "MSack", points: 1176 },
  { rank: 6, name: "Mustapha Dambo", points: 1043 },
  { rank: 7, name: "Kevin_DDR", points: 1001 },
  { rank: 8, name: "Crypto001", points: 576 },
  { rank: 9, name: "Doom", points: 243 },
  { rank: 10, name: "Zhen", points: 203 }
];

// Function to load leaderboard
function loadLeaderboard() {
  const leaderboardList = document.getElementById('leaderboard-list');
  leaderboardList.innerHTML = ''; // Clear previous data

  leaderboardData.forEach(user => {
    const item = document.createElement('div');
    item.className = 'leaderboard-item';
    item.innerHTML = `<span>#${user.rank}</span> ${user.name} <span>${user.points} P</span>`;
    leaderboardList.appendChild(item);
  });

  document.getElementById('total-holders').innerText = `${leaderboardData.length} holders`;
}

// Invitation handler (placeholder)
document.getElementById('invite-btn').addEventListener('click', function() {
  // Implement referral system logic here
  alert('Invite your friends via the referral system!');
});

// Invite button functionality
document.getElementById('invite-btn').addEventListener('click', function() {
  // Replace the '#' with the actual invite/referral link generation logic
  const referralLink = 'https://example.com/referral?user=12345'; // Example referral link
  this.href = referralLink;
});

// Load user data from localStorage when the page loads
window.addEventListener('load', function () {
  loadUserData();
});

// Task buttons functionality
document.querySelectorAll('.task button').forEach((button, index) => {
  button.addEventListener('click', function () {
      const taskId = `task-${index}`;
      if (!localStorage.getItem(taskId)) {
          // Task not completed yet
          completeTask(button, taskId);
      }
  });
});

// Complete the task and update the UI + localStorage
function completeTask(button, taskId) {
  // Update button text to 'Completed'
  button.textContent = 'Completed';
  button.disabled = true;

  // Add tokens based on task
  const tokensEarned = parseInt(button.previousElementSibling.textContent.replace(/[^\d]/g, ''));
  let totalTokens = parseInt(localStorage.getItem('phantomTokens') || '0');
  totalTokens += tokensEarned;
  localStorage.setItem('phantomTokens', totalTokens);
  
  // Update the total token balance in UI
  document.getElementById('phantom-balance').textContent = `${totalTokens} PHANTOM`;

  // Mark the task as completed in localStorage
  localStorage.setItem(taskId, 'completed');
}

// Load stored data from localStorage and update the UI
function loadUserData() {
  // Load and update total tokens
  const totalTokens = localStorage.getItem('phantomTokens') || '0';
  document.getElementById('phantom-balance').textContent = `${totalTokens} PHANTOM`;

  // Check which tasks are completed and disable their buttons
  document.querySelectorAll('.task button').forEach((button, index) => {
      const taskId = `task-${index}`;
      if (localStorage.getItem(taskId)) {
          button.textContent = 'Completed';
          button.disabled = true;
      }
  });
}

// Connect wallet button functionality (no alerts)
document.getElementById('connect-wallet').addEventListener('click', function() {
  // Handle wallet connection here
  // This is where you'd add your actual wallet integration logic
});

// Initial render
renderTasks();
