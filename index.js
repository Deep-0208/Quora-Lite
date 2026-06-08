const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public")));

let posts = [
    { id: uuidv4(), username: "arya", content: "i love gameing" },
    { id: uuidv4(), username: "deep", content: "i love coding" },
    { id: uuidv4(), username: "komal", content: "i love draw" },
    { id: uuidv4(), username: "yug", content: "i love eat" }
];

const findPostById = (id) => posts.find((post) => post.id === id);


app.get("/posts", (req, res) => {
    res.render("index", { posts });
});

app.get("/post/new", (req, res) => {
    res.render("new");
});

app.post("/post", (req, res) => {
    const { username, content } = req.body;
    posts.push({ id: uuidv4(), username, content });
    res.redirect("/posts");
});

app.get("/post/:id", (req, res) => {
    const { id } = req.params;
    const post = findPostById(id);

    if (!post) return res.status(404).send("Post not found");
    res.render("show", { post });
});

app.patch("/post/:id", (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const post = findPostById(id);

    if (!post) return res.status(404).send("Post not found");
    post.content = content;
    res.redirect("/posts");
});

app.get("/post/:id/edit", (req, res) => {
    const { id } = req.params;
    const post = findPostById(id);

    if (!post) return res.status(404).send("Post not found");
    res.render("edit" , {post});
});

app.delete("/post/:id", (req, res) => {
    const { id } = req.params;
    posts = posts.filter((post) => post.id !== id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});