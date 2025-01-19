const apiURL = 'https://api.github.com/repos/chuongmep/blog-dev.to/contents/acticles?ref=main';

let allPosts = [];
let currentChunk = 0;
const postsPerPage = 10;

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
      renderPostList(allPosts, currentChunk);
      renderNavigationButtons();
    })
    .catch(error => console.error('Error loading post list:', error));
}

function renderPostList(posts, chunkIndex) {
  const postList = document.getElementById('post-list');
  postList.innerHTML = '';

  // Calculate the start and end index for the current chunk
  const startIndex = chunkIndex * postsPerPage;
  const endIndex = Math.min(startIndex + postsPerPage, posts.length);
  
  // Slice the posts to show only the current chunk
  const postsToDisplay = posts.slice(startIndex, endIndex);
  
  // Render the posts
  postsToDisplay.forEach(post => {
    const listItem = document.createElement('li');
    listItem.textContent = post.name.replace('.md', '').replace(/-/g, ' ');
    listItem.className = 'post-item';
    listItem.onclick = () => loadPost(post.download_url);
    postList.appendChild(listItem);
  });
}

function renderNavigationButtons() {
  const nextButton = document.getElementById('next-button');
  const backButton = document.getElementById('back-button');
  
  // Show or hide the Back and Next buttons based on the current chunk
  if (currentChunk > 0) {
    backButton.style.display = 'inline-block';
    backButton.onclick = () => loadPreviousChunk();
  } else {
    backButton.style.display = 'none';
  }
  
  if ((currentChunk + 1) * postsPerPage < allPosts.length) {
    nextButton.style.display = 'inline-block';
    nextButton.onclick = () => loadNextChunk();
  } else {
    nextButton.style.display = 'none';
  }
}

function loadNextChunk() {
  currentChunk++;
  renderPostList(allPosts, currentChunk);
  renderNavigationButtons();
}

function loadPreviousChunk() {
  currentChunk--;
  renderPostList(allPosts, currentChunk);
  renderNavigationButtons();
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
      file_name = downloadUrl.split('/').pop();
      // regex split date and title, and then replace %20 with space
      var title = file_name.split('-')[3];
      title = title.replace(/%20/g, ' ');
      title = title.replace('.md', '');
      // get date with format yyyy-mm-dd
      var date = file_name.split('-')[0] + '-' + file_name.split('-')[1] + '-' + file_name.split('-')[2];
      createDate(date);
      createTitle(title);
      removeNextAndBackButton();
      removeSearchBar();

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
  backButton.className = 'back-button-content';
  backButton.onclick = () => {
    document.getElementById('post-list').style.display = 'block';
    postContent.style.display = 'none';
    postContent.innerHTML = '';
    // add search bar back 
    const searchBar = document.getElementById('search');
    searchBar.style.display = 'block';
    // add next and back button back
    renderNavigationButtons();
  };
  postContent.prepend(backButton);
}
// create a title of post clicked 
function createTitle(title) {
  const postContent = document.getElementById('post-content');
  const titlePost = document.createElement('h1');
  titlePost.textContent = title;
  postContent.prepend(titlePost);
}

function createDate(date) {
  const postContent = document.getElementById('post-content');
  const datePost = document.createElement('h3');
  datePost.textContent = date;
  postContent.prepend(datePost);
}

function removeSearchBar() {
  const searchBar = document.getElementById('search');
  searchBar.style.display = 'none';
}
function removeNextAndBackButton() {
  const nextButton = document.getElementById('next-button');
  const backButton = document.getElementById('back-button');
  nextButton.style.display = 'none';
  backButton.style.display = 'none';
}

function filterPosts() {
  const searchQuery = document.getElementById('search').value.toLowerCase();

  // Filter posts based on the search query
  const filteredPosts = allPosts.filter(post =>
    post.name.replace('.md', '').toLowerCase().includes(searchQuery)
  );

  // Reset chunk index and render filtered posts
  currentChunk = 0;
  renderPostList(filteredPosts, currentChunk);

  // Update navigation buttons for filtered results
  const nextButton = document.getElementById('next-button');
  const backButton = document.getElementById('back-button');

  // If there are filtered posts, adjust navigation buttons
  if (filteredPosts.length > 0) {
    renderNavigationButtons();
  } else {
    // Hide navigation buttons if no results match the search
    nextButton.style.display = 'none';
    backButton.style.display = 'none';
  }
}


loadPostList();
document.getElementById('search').addEventListener('input', filterPosts);
