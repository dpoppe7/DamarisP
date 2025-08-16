// ============================
// Social Links Component
// ============================

// Class: SocialLinks
// Purpose: Display clickable social media icons
// Inputs: 
//   - array of social links {platform, url}
// Outputs: 
//   - HTML icons linking to each platform
// Methods:
//   - renderLinks(): insert social links into DOM
// Dependencies: Dark Mode toggle class

export class Social{
    constructor(platform, link, assetPath){
        this.platform = platform;
        this.link = link;
        this.assetPath = assetPath;
    }

    createElement(){
        const div = document.createElement("div");
        div.classList.add("social-item");
        div.innerHTML = `
            <h3>${this.platform}</h3>
            <a href="${this.link}" target="_blank">
                <img src="${this.assetPath}" alt="${this.platform} icon"/>
            </a>
        `;
        return div
    }

    static renderSocialLinks(socials){
        const mount = document.querySelector("#socials");

        const fragment = document.createDocumentFragment();
        socials.forEach(element => {
            const social = element.createElement();
            fragment.appendChild(social);
        });

        mount.appendChild(fragment);
    }
}