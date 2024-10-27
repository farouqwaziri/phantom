const taskUrls = [
  // Existing tasks
  'https://www.instagram.com/umarfarouqsaid/',
  'https://t.me/PhantomTokenCommunity',
  'https://x.com/PhantomTokenBot',
  'https://youtube.com/@phantomtokenbot?si=5IN6jmwdHFII_Gbw',
  'https://api.lootlabs.gg/link",
];

// Function to create a monetized link using Lootslab API
async function createLootslabLink() {
  try {
    const response = await fetch('https://api.lootlabs.gg/link', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eb8eb8eef9ecfaada63717eb11d30a1eea67199c4e452be0e51511e0b44c55b9',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Lootslab Monetized Task',
        destination: 'https://lootslab.gg', // Replace with the specific URL if needed
        tier: 'basic' // Adjust tier as needed
      })
    });
    const data = await response.json();
    return data.shortUrl; // Returns the generated Lootslab link
  } catch (error) {
    console.error('Error creating Lootslab link:', error);
  }
}

// Call createLootslabLink when loading tasks or completing the task
document.querySelector('.task button').addEventListener('click', async function () {
  const lootslabUrl = await createLootslabLink();
  if (lootslabUrl) {
    window.open(lootslabUrl, '_blank'); // Open the monetized link in a new tab
  }
  completeTask(button, 'lootslab-task');
});
// List of task URLs for each task






// Load user data from localStorage when the page loads

window.addEventListener('load', function () {

  loadUserData();

});



// Task buttons functionality

document.querySelectorAll('.task button').forEach((button, index) => {

  button.addEventListener('click', function () {

      const taskId = task-${index};

      if (!localStorage.getItem(taskId)) {

          // Open the task URL in a new tab

          window.open(taskUrls[index], '_blank');  // Opens the link in a new tab

          completeTask(button, taskId);  // Mark task as complete

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

  document.getElementById('phantom-balance').textContent = ${totalTokens} PHANTOM;



  // Mark the task as completed in localStorage

  localStorage.setItem(taskId, 'completed');

}



// Load stored data from localStorage and update the UI

function loadUserData() {

  // Load and update total tokens

  const totalTokens = localStorage.getItem('phantomTokens') || '0';

  document.getElementById('phantom-balance').textContent = ${totalTokens} PHANTOM;



  // Check which tasks are completed and disable their buttons

  document.querySelectorAll('.task button').forEach((button, index) => {

      const taskId = task-${index};

      if (localStorage.getItem(taskId)) {

          button.textContent = 'Completed';

          button.disabled = true;

      }

  });

}



// Bottom navigation functionality

document.getElementById('home-tab').addEventListener('click', function () {

  showScreen('home-screen');

  setActiveTab('home-tab');

});



document.getElementById('leaderboard-tab').addEventListener('click', function () {

  showScreen('leaderboard-screen');

  setActiveTab('leaderboard-tab');

});



document.getElementById('friends-tab').addEventListener('click', function () {

  showScreen('invite-screen');

  setActiveTab('friends-tab');

});



// Event listener for the 'Copy link' button

document.getElementById('copy-link').addEventListener('click', function() {

  // The URL you want to copy

  const inviteLink = "https://t.me/PhantomTokenBot";



  // Create a temporary textarea element to hold the text to be copied

  const tempInput = document.createElement('textarea');

  tempInput.value = inviteLink;

  document.body.appendChild(tempInput);

  tempInput.select();

  document.execCommand('copy');

  document.body.removeChild(tempInput);



  // Change button text to 'Copied' after copying

  const button = document.getElementById('copy-link');

  button.textContent = 'Copied';

  button.classList.add('completed-btn'); // Optional styling change

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



// Dummy variable to track connection status

let isConnected = false;



// Connect/Disconnect wallet button functionality

document.getElementById('connect-wallet').addEventListener('click', function () {

  if (!isConnected) {

    // Handle wallet connection logic here

    isConnected = true;

    this.textContent = 'Disconnect'; // Change to Disconnect

  } else {

    // Reset user data

    localStorage.removeItem('phantomTokens'); // Reset balance

    document.getElementById('phantom-balance').textContent = '0 PHANTOM'; // Update UI



    // Reset completed tasks

    document.querySelectorAll('.task button').forEach((button, index) => {

      const taskId = task-${index};

      localStorage.removeItem(taskId); // Remove task completion from localStorage

      button.textContent = 'Start'; // Change button text back to Start

      button.disabled = false; // Enable the button again

    });



    isConnected = false;

    this.textContent = 'Connect'; // Change back to Connect

  }

}); 
  
