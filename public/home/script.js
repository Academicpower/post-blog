// Function to render posts
function renderPosts() {
    fetch('/posts')
        .then(response => response.json())
        .then(posts => {
            const postsList = document.getElementById('posts-list');
            postsList.innerHTML = '';

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <div class="post-innerbox">
                        <img class="post-img" src="${post.img}" alt="post-image"/>   
                        <div class="post-textbox">
                            <div class="post-title">${post.title}</div>
                            <div class="post-subtitle">${post.author}</div>
                            <div class="post-bar"></div>
                            <div class="post-description">${post.description}</div>
                            
                            <div class="post-options">
                                <button class="btn post-options-btn p-1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-three-dots-vertical"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li><a class="dropdown-item" href="#" data-action="edit">Edit</a></li>
                                    <li><a class="dropdown-item" href="#" data-action="delete">Delete</a></li>
                                </ul>
                            </div>
                            
                            <button class="btn btn-secondary post-details-btn" data-action="details">Details</button>

                        </div>
                    </div>`;

                postsList.appendChild(postElement);

                const editButton = postElement.querySelector('[data-action="edit"]');
                const deleteButton = postElement.querySelector('[data-action="delete"]');
                const detailsButton = postElement.querySelector('[data-action="details"]');

                editButton.addEventListener('click', () => handleEditPost(post.id));
                deleteButton.addEventListener('click', () => handleDeletePost(post.id));
                detailsButton.addEventListener('click', () => handleDetails(post.id));

            });

        })
        .catch(error => console.error('Error fetching posts:', error));
}

// Fetch and display posts on page load
renderPosts();

// Function to handle deleting a post
function handleDeletePost(postId) {
    fetch(`/posts/${postId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                console.error('Error deleting post:', response.statusText);
                throw new Error('Error deleting post');
            }
        })
        .then(() => {
            renderPosts();
        })
        .catch(error => console.error('Error deleting post:', error));
}

// Function to handle editing a post
function handleEditPost(postId) {
    window.location.href = `/edit-post.html?postId=${postId}`;
}

// Function to handle details of a post
function handleDetails(postId) {
    // Redirect to the detailed information page
    window.location.href = `/post-details.html?postId=${postId}`;
}

document.getElementById('createPostButton').addEventListener('click', function () {
    window.location.href = '/create-post.html';
});


