const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from multiple subdirectories
const subdirectories = ['', 'home', 'create-post', 'edit-post', 'post-details'];
subdirectories.forEach(subdir => {
    app.use(express.static(path.join(__dirname, 'public', subdir)));
});

// in-memory posts saving
let posts = [
    { id: 1, title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non ipsum purus. Ut vel nulla vel libero eleifend consequat ut id sapien. Praesent eros ipsum, molestie quis orci et, ultrices dignissim purus. Nullam euismod libero massa, vitae dignissim lorem sagittis at. Phasellus sit amet hendrerit velit, ut vestibulum nisi. Quisque id euismod ex, vitae lacinia justo. Sed tristique ipsum sit amet porttitor sodales. Cras ac erat in est dapibus consectetur quis vel leo.Sed tristique ipsum sit amet porttitor sodales. Cras ac erat in est dapibus consectetur quis vel leo.Sed tristique ipsum sit amet porttitor sodales. Cras ac erat in est dapibus consectetur quis vel leo.Sed tristique ipsum sit amet porttitor sodales. Cras ac erat in est dapibus consectetur quis vel leo.Sed tristique ipsum sit amet porttitor sodales. Cras ac erat in est dapibus consectetur quis vel leo.', author: 'Maksymliuk Khrystyna 1', img: 'https://picsum.photos/800/600?image=1' },
    { id: 2, title: 'Etiam mollis sagittis turpis, eget ultricies urna accumsan.', description: 'Aliquam mattis pretium nisl, vel sagittis est luctus nec. Curabitur ut mauris eu nunc vestibulum elementum ut in sapien. Duis ultrices nunc accumsan nunc molestie, vitae tempor mauris pretium. Suspendisse tristique bibendum ex ut malesuada. Aenean sollicitudin nulla eget lacus euismod fringilla. Maecenas vehicula orci at sem sagittis accumsan. Cras eu euismod quam.Sed tristique ipsum sit amet porttitor sodales. Cras ac erat in est dapibus consectetur quis vel leo.Sed tristique ipsum sit amet porttitor sodales. Cras ac erat in est dapibus consectetur quis vel leo.Sed tristique ipsum sit amet porttitor sodales. Cras ac erat in est dapibus consectetur quis vel leo.Sed tristique ipsum sit amet porttitor sodales. Cras ac erat in est dapibus consectetur quis vel leo.Sed tristique ipsum sit amet porttitor sodales. Cras ac erat in est dapibus consectetur quis vel leo.Sed tristique ipsum sit amet porttitor sodales. Cras ac erat in est dapibus consectetur quis vel leo.Sed tristique ipsum sit amet porttitor sodales. Cras ac erat in est dapibus consectetur quis vel leo.', author: 'Maksymliuk Khrystyna 2', img: 'https://picsum.photos/800/600?image=2' },
    { id: 3, title: 'Cras libero lectus, laoreet et ante sed, molestie.', description: 'Integer lacinia nunc at ipsum tristique, et tempor lacus pretium. Donec commodo finibus turpis, ut accumsan lacus bibendum non. Nulla suscipit sed libero ut interdum. Phasellus posuere neque in ipsum finibus dictum. Phasellus imperdiet ornare dui at molestie. Donec ut dictum dolor. Ut vehicula rhoncus lacus a tempus.', author: 'Maksymliuk Khrystyna 3', img: 'https://picsum.photos/800/600?image=3' },
];

// Get all posts
app.get('/posts', (req, res) => {
    res.json(posts);
});

// Get post by ID
app.get('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);

    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

const fs = require('fs');

// Create a new post
app.post('/posts', (req, res) => {
    const { title, description, author, img } = req.body;
    const newPost = { id: posts.length + 1, title, description, author, img };
    posts.push(newPost);
    res.json(newPost);
});

// Update a post
app.put('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, description, author, img } = req.body;
    const updatedPost = { id: postId, title, description, author, img };
    posts = posts.map(post => (post.id === postId ? updatedPost : post));
    res.json(updatedPost);
});

// Delete a post
app.delete('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(post => post.id !== postId);
    res.json({ message: 'Post deleted successfully' });
});
