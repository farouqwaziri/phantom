// Sample task data
const tasks = [
  { id: 1, description: "Make a TON transaction", reward: 2000 },
  { id: 2, description: "Join Telegram community", reward: 100 },
  { id: 3, description: "Follow us on X", reward: 50 },
  { id: 4, description: "Subscribe YouTube", reward: 50 }
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
      <button class="btn" onclick="completeTask(${task.id})">Open</button>
    `;
    taskListElement.appendChild(taskElement);
  });
}

// Function to complete a task and update balance
function completeTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    phantomBalance += task.reward;
    document.getElementById('phantom-balance').innerText = `${phantomBalance} PHANTOM`;
    alert(`Task completed! You've earned ${task.reward} Phantom tokens.`);
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

// Dummy wallet connection
document.getElementById('connect-wallet').addEventListener('click', function() {
  alert('Connecting wallet...');
  // Implement real wallet connection logic here (e.g., using Web3.js)
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
  alert('Invite your friends via the referral system!');
  // Implement referral system logic here
});

// Initial render
renderTasks();
