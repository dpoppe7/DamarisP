// querySelector mount points and call function to render stuff
import { Hero } from './components/hero.js';
import { Project } from './components/project.js';
import { Nav } from './components/nav.js';
import { FunProject } from './components/fun.js';
import { Sparkles } from './components/sparkles.js';
import { config } from './config/app-config.js';

// render the sparkles background
const sparkles = new Sparkles();
sparkles.render();

// Navigation items
const socialData = config.social.links; // social data
const navLinks = config.navigation.links; // nav links

const nav = new Nav(navLinks, socialData);
nav.render();

// Hero Section
const hero = new Hero(
    config.personal.profileImage,
    config.personal.name, 
    config.personal.tagline
);
hero.render();


// Running this first in broswer to verify :
//      the endpoin, insperct the data array (promise), later to be used in Projects Class
// fetch is bilt-in broswer API for making network request. GET is the default HTTP mehtod for fetch
// ==================================================================
// fetch('https://api.github.com/users/dpoppe7/repos')
//     .then(res => res.json())
//     .then(data => console.log(data));

async function loadPinnedProjects() {
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
            repo.topics || [],
            repo.url || repo.github_url || "#",
            repo.image || null
        )); 

        // Render Pinned projects: Carousel with projects (spotlight projects)
        Project.renderSpotlightProjects(projects);

    } catch (error){
        console.error("Error fetching projects", error);
      
    }
}

// Load fun projects (new function following your pattern)
async function loadFunProjects() {
    try{
        // Get all repos to filter for fun ones
        const response = await fetch('/.netlify/functions/get-all-repos');

        if (!response.ok){
            throw new Error(`Error getting response, HTTP status:${response.status}`);
        }

        const repos = await response.json();

        // Debug: Check raw data from API
        // console.log("First repo structure:", repos[0]);
        // console.log("First repo URL:", repos[0]?.url);

        // Filter repos that have "fun" topic
        const funRepos = repos.filter(repo => 
            repo.topics && repo.topics.some(topic => 
                topic.toLowerCase().includes(config.filters.funProjectTag)
            )
        );

        // Array of FunProject objects
        const funProjects = funRepos.map(repo => new FunProject(
            repo.name,
            repo.description || "No description available",
            repo.updated_at,
            repo.topics || [],
            repo.url || repo.github_url || "#"
        )); 

        // console.log("All repo URLs:", funProjects.map(repo => repo.url));

        // Render fun projects: Cards containing project name and description
        FunProject.renderFunProjects(funProjects);

    } catch (error){
        console.error("Error fetching fun projects", error);
    }
}


// Load projects 
async function initializeProjects() {
    // Will Render: pinned projects (spotlight carousel)
    await loadPinnedProjects();

    // Will Render: other projects in cards (all projects that contain 'fun' tag) 
    await loadFunProjects();
}

initializeProjects();
