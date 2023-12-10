document.addEventListener('DOMContentLoaded', function () {
    const editPostForm = document.getElementById('edit-post-form');
    const successMessage = document.getElementById('success-message');
    const backButton = document.getElementById('back-button');

    const postId = new URLSearchParams(window.location.search).get('postId');

    fetch(`/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
            // Pre-fill form fields with post data
            const imageInput = editPostForm.querySelector('#img');
            const imagePreview = editPostForm.querySelector('#image-preview');
            editPostForm.querySelector('#title').value = post.title;
            editPostForm.querySelector('#description').value = post.description;
            editPostForm.querySelector('#author').value = post.author;

            // Display image file name or placeholder
            if (post.img) {
                imagePreview.src = post.img;
            }

            // Add event listener for file input change
            imageInput.addEventListener('change', function () {
                const file = imageInput.files[0];
                if (file) {
                    // Update preview with the selected image
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        imagePreview.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                } else {
                    // No file chosen, reset preview and display
                    imagePreview.src = post.img;
                }
            });

            // Add event listener for form submission
            editPostForm.addEventListener('submit', function (event) {
                event.preventDefault();

                const formData = new FormData(editPostForm);

                // Read the selected image file and convert it to Base64
                let imgInput = document.getElementById('img');
                let imgFile = imgInput.files[0];

                if (imgFile) {
                    formData.set('img', imgFile);
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        formData.set('img', e.target.result);
                        sendPostData(formData);
                    };
                    reader.readAsDataURL(imgFile);
                } else {
                    formData.set('img', imagePreview.src);
                    sendPostData(formData);
                }
            });
        })
        .catch(error => console.error('Error fetching post details:', error));

    function sendPostData(formData) {

        fetch(`/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        })
            .then(response => response.json())
            .then(() => {
                successMessage.style.display = 'block';
            })
            .catch(error => console.error('Error updating post:', error));
    }

    backButton.addEventListener('click', function () {
        window.location.href = '/';
    });
});
