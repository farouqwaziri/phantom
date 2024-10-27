// Task URLs for basic tasks
const taskUrls = [
  'https://www.instagram.com/umarfarouqsaid/',
  'https://t.me/PhantomTokenCommunity',
  'https://x.com/PhantomTokenBot',
  'https://youtube.com/@phantomtokenbot?si=5IN6jmwdHFII_Gbw',
  'https://x.com/muhammad3369_?s=21'
];

// API Key for Lootslab
const lootLabApiKey = 'eb8eb8eef9ecfaada63717eb11d30a1eea67199c4e452be0e51511e0b44c55b9';

// Function to create a Lootslab monetized task link
async function createLootslabLink() {
  try {
    const response = await fetch('https://api.lootlabs.gg/link', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lootLabApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Lootslab Monetized Task',
        destination: 'https://lootslab.gg',
        tier: 'basic'
      })
    });

    const data = await response.json();
    if (data && data.shortUrl) {
      return data.shortUrl;
    } else {
      console.error('Failed to generate Lootslab link');
      return null;
    }
  } catch (error) {
    console.error('Error creating Lootslab link:', error);
    return null;
  }
}

// Function to load tasks and add them to the page
async function loadTasks() {
  // Load basic tasks
  taskUrls.forEach((url, index) => {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task');
    taskContainer.innerHTML = `
      <p>Task ${index + 1}</p>
      <button onclick="openTask('${url}', this)">Complete Task</button>
    `;
    document.body.appendChild(taskContainer);
  });

  // Add Lootslab monetization task
  const lootslabLink = await createLootslabLink();
  if (lootslabLink) {
    const lootTask = document.createElement('div');
    lootTask.classList.add('task');
    lootTask.innerHTML = `
      <p>Lootslab Monetization Task</p>
      <button onclick="openTask('${lootslabLink}', this)">Complete Task</button>
    `;
    document.body.appendChild(lootTask);
  }
}

// Function to open a task link and mark it as completed
function openTask(url, button) {
  window.open(url, '_blank');
  completeTask(button);
}

// Function to disable the button after completing a task
function completeTask(button) {
  button.disabled = true;
  button.innerText = 'Task Completed';
}

// Initialize by loading tasks
loadTasks();
