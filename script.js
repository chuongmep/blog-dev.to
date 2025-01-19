const apiURL = 'https://api.github.com/repos/chuongmep/blog-dev.to/contents/acticles?ref=main';

let allPosts = [];
let currentChunk = 0;
const postsPerPage = 10;
var currentPostIndex = 0;

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
      // remove files not end with .md
      allPosts = allPosts.filter(post => post.name.endsWith('.md'));
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
      // Set current post index
      currentPostIndex = allPosts.findIndex(post => post.download_url === downloadUrl);
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
        // Change the text of the button to "Copied!" when clicked
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

      // Update the URL to make it shareable
      const postName = downloadUrl.split('/').pop(); // Extract the post name
      const newURL = `${window.location.origin}${window.location.pathname}?post=${encodeURIComponent(postName)}`;
      history.pushState({ post: postName }, '', newURL);

      // Display post content and update UI
      document.getElementById('post-list').style.display = 'none';
      postContent.style.display = 'block';
      createBackButton();
      const file_name = postName;
      let title = file_name.split('-')[3];
      title = title.replace(/%20/g, ' ');
      title = title.replace('.md', '');
      const date = file_name.split('-')[0] + '-' + file_name.split('-')[1] + '-' + file_name.split('-')[2];
      createDate(date);
      createTitle(title);
      removeNextAndBackButton();
      removeSearchBar();
      displayLinkPreAndNext();
    })
    .catch(error => console.error('Error loading post:', error));
}


function displayLinkPreAndNext() {
  const postContent = document.getElementById('post-content');
  // create previous button
  const previousButton = document.createElement('button');
  title = allPosts[currentPostIndex].name.replace('.md', '');
  title = title.split('-')[3];
  previousButton.textContent = 'Previous Post: ' + title;
  previousButton.className = 'previous-button-content';
  previousButton.onclick = generatePreviousPost;
  postContent.appendChild(previousButton);
  // create next button
  const nextButton = document.createElement('button');
  nextTitle = allPosts[currentPostIndex].name.replace('.md', '')
  nextTitle = nextTitle.split('-')[3];
  nextButton.textContent = 'Next Post: ' + nextTitle;
  nextButton.className = 'next-button-content';
  nextButton.onclick = generateNextPost;
  postContent.appendChild(nextButton);
  
  // scroll to top of the page
  window.scrollTo(0, 0);

}

function generateNextPost() {
  if (currentPostIndex < allPosts.length - 1) {
    currentPostIndex++;
    loadPost(allPosts[currentPostIndex].download_url);
  }
  // if same alert max 
  else {
    alert('This is the last post!');
  }
}
function generatePreviousPost() {
  if (currentPostIndex > 0) {
    currentPostIndex--;
    loadPost(allPosts[currentPostIndex].download_url);
  }
  // if same alert max 
  else {
    alert('This is the first post!');
  }
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


// loadPostList();
document.getElementById('search').addEventListener('input', filterPosts);


// Select all anchor tags inside the navigation menu
const navLinks = document.querySelectorAll('.navigation a');
// Add a click event listener to each link
navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    const targetSection = link.getAttribute('href'); // Get the href value (e.g., #posts)

    switch (targetSection) {
      case '#posts':
        document.getElementById('post-list').style.display = 'block';
        document.getElementById('post-content').style.display = 'none';
        // Show the search bar
        var searchBar = document.getElementById('search');
        searchBar.style.display = 'block';
        // Show the next and back buttons
        renderNavigationButtons();

        break;

      case '#about':
        document.getElementById('post-list').style.display = 'none';
        document.getElementById('post-content').style.display = 'block';
        document.getElementById('post-content').innerHTML = `
          <h1>About</h1>
          <p>This is a simple blog application that fetches articles from a GitHub repository and displays them on the page.</p>
          <p>Click on an article to view its content. You can also search for articles by name using the search bar above.</p>
          <p>Created by <a href="https://chuongmep.github.io/" target="_blank">Chuongmep</a></p>
        `;
        // remove search bar
        var searchBar = document.getElementById('search');
        searchBar.style.display = 'none';
        // remove next and back button
        var nextButton = document.getElementById('next-button');
        var backButton = document.getElementById('back-button');
        nextButton.style.display = 'none';
        backButton.style.display = 'none';
        break;

      case '#contact':
        document.getElementById('post-list').style.display = 'none';
        document.getElementById('post-content').style.display = 'block';
        document.getElementById('post-content').innerHTML = `
          <h1>Contact</h1>
          <p>You can contact me via email at <a href="mailto:chuongpqvn@gmail.com">chuongpqvn@gmail.com</a></p>
        `;
        // remove search bar
        var searchBar = document.getElementById('search');
        searchBar.style.display = 'none';
        // remove next and back button
        var nextButton = document.getElementById('next-button');
        var backButton = document.getElementById('back-button');
        nextButton.style.display = 'none';
        break;

      default:
        console.error('Unknown section:', targetSection);
        break;
    }
  });
});


// scroll to top button
window.onscroll = function () {
  const scrollToTopButton = document.getElementById('scroll-to-top');
  if (document.documentElement.scrollTop > 200 || document.body.scrollTop > 200) {
    scrollToTopButton.style.display = 'flex'; // Show button when scrolled down
  } else {
    scrollToTopButton.style.display = 'none'; // Hide button at the top
  }
};

// Scroll smoothly to the top of the page
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// windows on load to check url and load post
// Check for the 'post' parameter in the URL and load the corresponding post
window.onload = function () {
  // load all post from url
  loadPostList();
  // delay 100ms to get all post
  setTimeout(() => {
    loadPostFromUrl();
  }, 1000);
};
function loadPostFromUrl() {
  // Get the 'post' parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  var postName = urlParams.get('post');
  if (postName) {
    // Decode the post name and find the corresponding post
    postName = decodeURIComponent(postName);
    const post = allPosts.find(p => p.name === postName);
    if (post) {
      loadPost(post.download_url);
    }
  }
}
