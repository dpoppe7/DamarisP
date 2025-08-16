// ============================
// Projects Component
// ============================

// Class: Projects
// Purpose: Display a list of project cards dynamically
// Inputs: 
//   - array of project objects {title, description, techStack, repoLink, liveDemo, image}
// Outputs: 
//   - HTML cards for each project
//   - Optional: animated entrance on scroll
// Methods:
//   - renderProjects(): create and insert project cards
//   - filterProjects(): filter by tech stack or tag (DSA-lite practice)
// Dependencies: Dark Mode toggle class

export class Project{
    // - Constructor accepts array of project objects
    constructor(title, description, techStack, repoLink, liveDemoLink, imagePath){
        this.title = title;
        this.description = description;
        this.techStack = techStack;
        this.repoLink = repoLink;
        this.liveDemoLink = liveDemoLink;
        this.imagePath = imagePath;
    }

    // Not static because it needs access to the individual project's data (this.title, this.description, etc.)
    createElement(){
        // Creating a div element
        const div = document.createElement("div");
        div.classList.add("project-card");
        div.innerHTML = `
            <div class="card">
                <h3>${this.title}</h3>
                <p>${this.description}</p>
                <p>${this.techStack.join(', ')}</p>
                <a href="${this.repoLink} target="_blank">Link to ${this.title}</a>
                ${this.demoLink ? `<a href="${this.liveDemoLink}">Live Demo</a>` : ''}
                <img src="${this.imagePath}" alt="Project Image" width="200"/>
            </div>
        `;

        return div;
    }
 
    // static: It belongs to the class as a utility for handling multiple projects at once. 
    //    static because it works with an array of project instances and does not need to access any one project's properties directly.       
    static renderProjects(projects) {
        // 1. Grab the mount point: #projects
        const mount = document.querySelector("#projects");
        
        if (!mount) return;  
        mount.innerHTML = "";
        const fragment = document.createDocumentFragment();
        //a project card
        projects.forEach(p => {
            const card = p.createElement();
            fragment.appendChild(card);
        });

        mount.appendChild(fragment);


        // 3. Optionally animate

        //fragment: lightweight container that can hold DOM nodes.
           // - renderProjects() loops through data and inserts cards into DOM
    }

    // - Practice: add sorting/filtering methods for practice
}