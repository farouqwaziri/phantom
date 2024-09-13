// Navigation between tabs
document.getElementById('home-tab').addEventListener('click', function() {
    showScreen('home-screen');
    setActiveTab('home-tab');
  });
  
  document.getElementById('leaderboard-tab').addEventListener('click', function() {
    showScreen('leaderboard-screen');
    setActiveTab('leaderboard-tab');
  });
  
  document.getElementById('friends-tab').addEventListener('click', function() {
    showScreen('invite-screen');
    setActiveTab('friends-tab');
  });
  
  // Function to show specific screen
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
  
  // Connect wallet (dummy function for now)
  document.getElementById('connect-wallet').addEventListener('click', function() {
    alert('Connecting wallet...');
    // Here you could integrate Web3.js or similar to connect a real wallet
  });
  