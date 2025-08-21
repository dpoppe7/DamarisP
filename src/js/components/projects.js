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
//      - Upadted: loadProjects() fetches GitHub repos for my username
//   - filterProjects(): filter by tech stack or tag (DSA-lite practice)
// Dependencies: Dark Mode toggle class

export class Project{
    // - Constructor accepts array of project objects
    constructor(name, description, updated_at, topics, url){
        // from github JSON response (API contract): name, description, updated_at ("2025-08-19T18:19:51Z"), language, topics[], url.
        this.name = name;
        this.description = description;
        this.updated_at = updated_at;
        this.topics = topics;
        this.url = url;
    }

    // Not static because it needs access to the individual project's data (this.title, this.description, etc.)
    createElement(){
        // Creating a div element
        const div = document.createElement("div");
        div.classList.add("project-card");

        // Format the date
        const formattedDate = new Date(this.updated_at).toLocaleDateString();
        
        // Handle topics array
        const topicsDisplay = Array.isArray(this.topics) && this.topics.length > 0 
            ? this.topics.join(', ') 
            : 'No topics';

        div.innerHTML = `
            <div class="card">
                <h3>${this.name}</h3>
                <p>${this.description}</p>
                <p>${formattedDate}</p>
                <p>${topicsDisplay}</p>
                <a href="${this.url} target="_blank">Link to Project</a>
            </div>
        `;

        return div;
    }

    //static loadProjects
 
    // static: It belongs to the class as a utility for handling multiple projects at once. 
    //    static because it works with an array of project instances and does not need to access any one project's properties directly.       
    static renderProjects(projects) {
        // 1. Grab the mount point: #projects
        const mount = document.querySelector("#projects");
        
        if (!mount) return;  

        mount.innerHTML = "";
        const fragment = document.createDocumentFragment();
        
        // a project card
        projects.forEach(p => {
            const card = p.createElement();
            fragment.appendChild(card);
        });

        mount.appendChild(fragment);


        // 3. Optionally animate

        //fragment: lightweight container that can hold DOM nodes.
           // - renderProjects() loops through data and inserts cards into DOM
    }
}