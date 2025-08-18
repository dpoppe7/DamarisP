// ============================
// Blog Component
// ============================

// Class: Blog
// Purpose: Display blog posts dynamically
// Inputs: 
//   - array of blog post objects {title, description, datePublished, category}
// Outputs: 
//   - HTML list of blog post cards
// Methods:
//   - renderPosts(): create and insert blog posts into DOM
// Dependencies: Dark Mode toggle class

// TODO:
// - Create Blog class
// - Constructor accepts array of blog post objects
// - renderPosts() loops through posts and adds them to DOM
// - Optional: add sorting by date or category

export class Post{
    constructor(title, description, datePublished, category){
        // this inside a class or object method refers to the specific instance of that class you are creating
        // This.title creates a property called title on the instance object
        this.title = title;
        this.description = description;
        this.datePublished = datePublished;
        this.category;
    }

    CreateElement(){
        const div = document.createElement("div");
        div.classList.add("blog-post");
        div.innerHTML = `
            <h3>${this.title}</h3>
            <p>${this.description}</p>
            <p>${this.datePublished}</p>
            <p>${this.category}</p>
        `;

        return div;
    }

    static renderBlogPosts(posts){
        // 1. Grab the mount point in index.html
        const mount = document.querySelector("#blog");
        const fragment = document.createDocumentFragment();
        posts.forEach(p => {
            const post = p.CreateElement();
            fragment.appendChild(post);
        });
        mount.appendChild(fragment);
    }
}