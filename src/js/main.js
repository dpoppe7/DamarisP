// querySelector mount points and call function to render stuff
import { Hero } from './components/hero.js';
import { Project } from './components/projects.js';
import { Social } from './components/socials.js';

// render hero
const hero = new Hero("Damaris Poppe", "Software Developer", "There will be a friend description about me here.");
hero.render();


//array of projects
const projects = [
    new Project("Music Player", "Interactive music player", ["react"], "https://github.com/me/portfolio", "https://github.com/me/portfolio", "./src/assets/projectImage.png"),
    new Project("alarm", "productivity clockr", ["react", "twailwind"], "https://github.com/me/portfolio", "https://github.com/me/portfolio", "./src/assets/projectImage.png"),
    new Project("calculator", "calculator in the web", ["react", "vue"], "https://github.com/me/portfolio", "https://github.com/me/portfolio", "./src/assets/projectImage.png")
];

// Render projects, Call the static method once
Project.renderProjects(projects);

//Render social links array
const socials = [
    new Social("Github", "https://github.com/me/portfolio", "./src/assets/icon.svg"),
    new Social("Twitter", "https://github.com/me/portfolio", "./src/assets/icon.svg"),
    new Social("Linkedin", "https://github.com/me/portfolio", "./src/assets/icon.svg"),
];

Social.renderSocialLinks(socials);

