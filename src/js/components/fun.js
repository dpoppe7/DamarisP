import { Repository } from './repository.js'; 

export class FunProject extends Repository {
    constructor(name, description, topics, html_url){
        super(name, description, topics, html_url);
    }

    createElement(){
        const div = document.createElement("div");
        div.classList.add("group", "fun-project-card");
        
        div.innerHTML = `
            <div class="relative cursor-default flex flex-col h-full p-8 bg-card-bg bg-opacity-50 rounded-2xl border border-pastel-yellow border-opacity-60 transition-all duration-300 hover:-translate-y-2 hover:bg-card-bg hover:bg-opacity-75 hover:border-opacity-100">
                <!-- Card Header -->
                <div class="flex justify-between items-start mb-6 -mt-5 pt-5 border-b-0">
                    <div class="folder-icon">
                        <svg class="w-9 h-9 text-pink-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z"></path>
                        </svg>
                    </div>
                    <!-- GitHub Icon -->
                        <div>
                            <a href="${this.link}" target="_blank" class="text-light-gray hover:text-pink-accent transition-colors duration-300">
                                <i class="fab fa-github text-2xl"></i>
                            </a>
                    </div>
                </div>
                
                <!-- Card Content -->
                <h3 class="text-white text-2xl font-bold mb-4 font-roboto">
                    ${this.name}
                </h3>
                <p class="mb-10 flex-grow leading-relaxed">
                    ${this.description}
                </p>
                
                <!-- Topics/Tech Stack -->
                ${this.topics && this.topics.length > 0 ? `
                    <div class="text-light-gray text-base font-roboto">
                        ${this.topics.join(', ')}
                    </div>
                ` : ''}
            </div>
        `;

        return div;
    }

    static renderFunProjects(funProjects){
        const mount = document.querySelector("#fun-projects");
        if(!mount) return;

        // Create the container structure
        mount.innerHTML = `
            <div class="mx-auto pt-16 max-w-[1000px] min-h-[50vh] px-4">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <!-- Fun projects will be inserted here -->
                </div>
            </div>
        `;

        const container = mount.querySelector('.grid');
        const fragment = document.createDocumentFragment();
        
        funProjects.forEach(funProject => {
            const card = funProject.createElement();
            fragment.appendChild(card);
        });

        container.appendChild(fragment);
    }
}