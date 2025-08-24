
import { Repository } from './repository.js'; 


export class FunProject extends Repository {
    constructor(name, description, topics, html_url){
        super(name, description, topics, html_url);
    }

    createElement(){
        const div = document.createElement("div");

        div.classList.add("fun-cards");

        div.innerHTML = `
            <div class="fun-card">
                <h3>${this.name}</h3>
                <p>${this.description}</p>
                <p>Topics:${this.getTopicsDisplay()}</p>
                <a href="${this.html_url}" target="_blank">Open Repo</a>
            </div>
        `;

        return div;
    }

    static renderFunProjects(funProjects){
        const mount = document.querySelector("#fun-projects");

        if(!mount) return

        mount.innerHTML = "";
        const fragment = document.createDocumentFragment();
        funProjects.forEach(funProject => {
            const card = funProject.createElement();
            fragment.appendChild(card);
        });

        mount.appendChild(fragment);
    }
}