
const articlesJsonPath = 'acticles/post.json';


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
  postList.innerHTML = ''; 
  posts.forEach(file => {
    const listItem = document.createElement('li');
    listItem.textContent = file.replace('.md', '').replace(/-/g, ' '); // Định dạng tên bài viết
    listItem.className = 'post-item';
    listItem.onclick = () => loadPost(file); // Tải bài viết khi click
    postList.appendChild(listItem);
  });
}

function loadPost(file) {
  const absolutePath = `${window.location.origin}/acticles/${encodeURIComponent(file)}`;

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
      postContent.style.display = 'block'; // Hiển thị nội dung bài viết
      createBackButton(); // Tạo nút quay lại danh sách
    })
    .catch(error => console.error('Error loading post:', error));
}


// Hàm tạo nút "Quay lại danh sách bài viết"
function createBackButton() {
  const postContent = document.getElementById('post-content');
  const backButton = document.createElement('button');
  backButton.textContent = 'Back to Post List';
  backButton.className = 'back-button';
  backButton.onclick = () => {
    document.getElementById('post-list').style.display = 'block'; // Hiển thị danh sách bài viết
    postContent.style.display = 'none'; // Ẩn nội dung bài viết
    postContent.innerHTML = ''; // Xóa nội dung bài viết cũ
  };
  postContent.prepend(backButton); // Thêm nút quay lại lên trên cùng
}

// Hàm lọc bài viết dựa trên từ khóa tìm kiếm
function filterPosts() {
  const searchQuery = document.getElementById('search').value.toLowerCase();
  const filteredPosts = allPosts.filter(post =>
    post.replace('.md', '').toLowerCase().includes(searchQuery)
  );
  renderPostList(filteredPosts); // Cập nhật danh sách bài viết hiển thị
}

// Gọi hàm khởi tạo để tải danh sách bài viết khi trang được load
loadPostList();

// Thêm sự kiện cho ô tìm kiếm để lọc bài viết
document.getElementById('search').addEventListener('input', filterPosts);
