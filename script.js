const articlesJsonPath = 'articles/post.json'; // Update the path if necessary

let allPosts = [];

function loadPostList() {
  fetch(articlesJsonPath)
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch articles JSON');
      return response.json();
    })
    .then(files => {
      allPosts = files;
      renderPostList(allPosts);
    })
    .catch(error => console.error('Error loading post list:', error));
}

function renderPostList(posts) {
  const postList = document.getElementById('post-list');
  postList.innerHTML = ''; // Clear previous list
  posts.forEach(file => {
    const listItem = document.createElement('li');
    listItem.textContent = file.replace('.md', '').replace(/-/g, ' '); // Format post name
    listItem.className = 'post-item';
    listItem.onclick = () => loadPost(file); // Load post on click
    postList.appendChild(listItem);
  });
}

function loadPost(file) {
  const absolutePath = `./articles/${encodeURIComponent(file)}`; // Adjust path for GitHub Pages

  console.log("Loading post from path:", absolutePath); // Log the path to debug

  fetch(absolutePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load post from ${absolutePath}. Status: ${response.status}`);
      }
      return response.text();
    })
    .then(markdown => {
      const postContent = document.getElementById('post-content');
      postContent.innerHTML = marked.parse(markdown); 
      document.getElementById('post-list').style.display = 'none'; 
      postContent.style.display = 'block'; // Show post content
      createBackButton(); // Create back button
    })
    .catch(error => console.error('Error loading post:', error));
}

// Function to create "Back to Post List" button
function createBackButton() {
  const postContent = document.getElementById('post-content');
  const backButton = document.createElement('button');
  backButton.textContent = 'Back to Post List';
  backButton.className = 'back-button';
  backButton.onclick = () => {
    document.getElementById('post-list').style.display = 'block'; // Show post list
    postContent.style.display = 'none'; // Hide post content
    postContent.innerHTML = ''; // Clear post content
  };
  postContent.prepend(backButton); // Add back button to top
}

// Function to filter posts based on search
function filterPosts() {
  const searchQuery = document.getElementById('search').value.toLowerCase();
  const filteredPosts = allPosts.filter(post =>
    post.replace('.md', '').toLowerCase().includes(searchQuery)
  );
  renderPostList(filteredPosts); // Update post list
}

// Initialize and load post list on page load
loadPostList();

// Add search input event to filter posts
document.getElementById('search').addEventListener('input', filterPosts);
