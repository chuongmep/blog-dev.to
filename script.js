const apiURL = 'https://api.github.com/repos/chuongmep/blog-dev.to/contents/acticles?ref=main';

let allPosts = [];

function loadPostList() {
  fetch(apiURL)
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch articles list from GitHub API');
      return response.json();
    })
    .then(files => {
      allPosts = files.map(file => ({
        name: file.name,
        download_url: file.download_url,
      }));
      renderPostList(allPosts);
    })
    .catch(error => console.error('Error loading post list:', error));
}

function renderPostList(posts) {
  const postList = document.getElementById('post-list');
  postList.innerHTML = '';
  posts.forEach(post => {
    const listItem = document.createElement('li');
    listItem.textContent = post.name.replace('.md', '').replace(/-/g, ' ');
    listItem.className = 'post-item';
    listItem.onclick = () => loadPost(post.download_url);
    postList.appendChild(listItem);
  });
}

function loadPost(downloadUrl) {
  fetch(downloadUrl)
    .then(response => response.text())
    .then(markdown => {
      const postContent = document.getElementById('post-content');
      postContent.innerHTML = marked.parse(markdown);

      // Highlight code blocks and add "Copy Code" buttons
      postContent.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);

        // Create "Copy Code" button
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy Code';
        copyButton.className = 'copy-button';
        copyButton.onclick = () => copyToClipboard(block.innerText);
        // change the text of the button to "Copied!" when clicked
        copyButton.addEventListener('click', () => {
          copyButton.textContent = 'Copied!';
          setTimeout(() => {
            copyButton.textContent = 'Copy Code';
          }, 2000);
        });

        // Insert the button before the code block
        block.parentElement.style.position = 'relative'; // Ensure positioning for button
        block.parentElement.prepend(copyButton);
      });

      document.getElementById('post-list').style.display = 'none';
      postContent.style.display = 'block';
      createBackButton();
    })
    .catch(error => console.error('Error loading post:', error));
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    // .then(() => alert('Code copied to clipboard!'))
    .catch(err => console.error('Failed to copy code:', err));
}



function createBackButton() {
  const postContent = document.getElementById('post-content');
  const backButton = document.createElement('button');
  backButton.textContent = 'Back to Post List';
  backButton.className = 'back-button';
  backButton.onclick = () => {
    document.getElementById('post-list').style.display = 'block';
    postContent.style.display = 'none';
    postContent.innerHTML = '';
  };
  postContent.prepend(backButton);
}

function filterPosts() {
  const searchQuery = document.getElementById('search').value.toLowerCase();
  const filteredPosts = allPosts.filter(post =>
    post.name.replace('.md', '').toLowerCase().includes(searchQuery)
  );
  renderPostList(filteredPosts);
}

loadPostList();
document.getElementById('search').addEventListener('input', filterPosts);
