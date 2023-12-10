document.addEventListener('DOMContentLoaded', function () {
    const createPostForm = document.getElementById('create-post-form');
    const successMessage = document.getElementById('success-message');

    createPostForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(createPostForm);

        // Read the selected image file and convert it to Base64
        const imgInput = document.getElementById('img');
        const imgFile = imgInput.files[0];

        if (imgFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                formData.set('img', e.target.result);
                sendPostData(formData);
            };
            reader.readAsDataURL(imgFile);
        } else {
            sendPostData(formData);
        }
    });
    function sendPostData(formData) {
        fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        })
            .then(response => response.json())
            .then( () => {
                successMessage.style.display = 'block';
            })
            .catch(error => console.error('Error creating post:', error));
    }
});

document.addEventListener('click', handleButtonClick);

function handleButtonClick(event) {
    if (event.target.id === 'back-button') {
        event.preventDefault();
        window.location.href = '/';
    }
}
