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
  console.log("Loading post from URL:", downloadUrl);

  fetch(downloadUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load post from ${downloadUrl}. Status: ${response.status}`);
      }
      return response.text();
    })
    .then(markdown => {
      const postContent = document.getElementById('post-content');
      postContent.innerHTML = marked.parse(markdown);

      // Ensure images fit the container
      const images = postContent.querySelectorAll('img');
      images.forEach(img => {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
      });

      document.getElementById('post-list').style.display = 'none';
      postContent.style.display = 'block';
      createBackButton();
    })
    .catch(error => console.error('Error loading post:', error));
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
