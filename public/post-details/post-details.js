document.addEventListener('DOMContentLoaded', function () {
    const postId = new URLSearchParams(window.location.search).get('postId');

    fetch(`/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
            // Update post details in the HTML
            const postTitle = document.getElementById('post-title');
            const postAuthor = document.getElementById('post-author');
            const postImg = document.getElementById('post-img');
            const postDescription = document.getElementById('post-description');

            postTitle.textContent = post.title;
            postAuthor.textContent = `Author: ${post.author}`;
            postImg.src = post.img;
            postDescription.textContent = post.description;
        })
        .catch(error => console.error('Error fetching post details:', error));
});
