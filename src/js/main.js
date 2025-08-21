// querySelector mount points and call function to render stuff
import { Hero } from './components/hero.js';
import { Project } from './components/projects.js';
import { Social } from './components/socials.js';
import { Post } from './components/blog.js';


// render hero
const hero = new Hero("Damaris Poppe", "Software Developer", "There will be a friend description about me here.");
hero.render();


//array of projects
// const projects = [
//     new Project("Music Player", "Interactive music player", ["react"], "https://github.com/me/portfolio", "https://github.com/me/portfolio", "./src/assets/projectImage.png"),
//     new Project("alarm", "productivity clockr", ["react", "twailwind"], "https://github.com/me/portfolio", "https://github.com/me/portfolio", "./src/assets/projectImage.png"),
//     new Project("calculator", "calculator in the web", ["react", "vue"], "https://github.com/me/portfolio", "https://github.com/me/portfolio", "./src/assets/projectImage.png")
// ];

// Running this first in broswer to verify :
//      the endpoin, insperct the data array (promise), later to be used in Projects Class
// fetch is bilt-in broswer API for making network request. GET is the default HTTP mehtod for fetch
// ==================================================================
// fetch('https://api.github.com/users/dpoppe7/repos')
//     .then(res => res.json())
//     .then(data => console.log(data));

async function loadProjects() {
    try{
        // Calling github API
        const response = await fetch('/.netlify/functions/get-pinned-repos');

        if (!response.ok){
            throw new Error(`Error getting response, HTTP status:${response.status}`);
        }

        // Raw data .json() asynchronous method. 
        // Await pauses the exeution of the funtion until the parsing is complete 
        // JS object repos
        const repos = await response.json(); // array of objecys [{}, {}, {}....]

        // Array of Project objects
        const projects = repos.map(repo => new Project(
            repo.name,
            repo.description || "No description available",
            repo.updated_at,
            repo.topics || "No topics",
            repo.url || "No url"
        ));
            
        //console.log(projects); 

        // Render projects
        // Calls the Render static method in Project Class, constructs it with params
        Project.renderProjects(projects);

    } catch (error){
        console.error("Error fetching projects", error);
    }
}
loadProjects();


//Render social links array
const socials = [
    new Social("Github", "https://github.com/me/portfolio", "./src/assets/icon.svg"),
    new Social("Twitter", "https://github.com/me/portfolio", "./src/assets/icon.svg"),
    new Social("Linkedin", "https://github.com/me/portfolio", "./src/assets/icon.svg"),
]; 

Social.renderSocialLinks(socials);

//Render blog posts  array
// Consider this syntax for now
// const blogPosts = [
//     {
//         title: "Understanding Big O Notation",
//         description: "A beginner-friendly explanation of time and space complexity...",
//         date: "2025-08-16",
//         category: "DSA"
//     }
// ];

const posts = [
    new Post("My first blog post", "This is a description of a blog post.","2025-08-15", "Tech"),
    new Post("Learning DSA", "This is a description of a blog post.", "2025-08-18", "Fun"),
    new Post("Takeaway of System Design", "This is a description of a blog post.", "2025-08-16", "Art"),
];

Post.renderBlogPosts(posts);

const sortButton_date = document.getElementById("sort-date");
sortButton_date.addEventListener('click', () => {
    const sortedPosts_date = Post.SortbyDate(posts);
    const blogDOM = document.querySelector("#blog");
    blogDOM.innerHTML = '';
    Post.renderBlogPosts(sortedPosts_date);
});

const sortButton_category = document.getElementById("sort-category");
sortButton_category.addEventListener('click', () => {
    const sortedPosts_category = Post.SortbyCategory(posts);
    const blogDOM = document.querySelector("#blog");
    blogDOM.innerHTML = '';
    Post.renderBlogPosts(sortedPosts_category);
});