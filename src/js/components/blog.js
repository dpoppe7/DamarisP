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
        this.category = this.category;
    }

    // - Optional: add sorting by date or category
    static SortbyCategory(posts){
        return posts.sort((a,b) => {
            // should lowercase because example 'T' have other lower Unicode value than 't'
            const categoryA = a.category.toLowerCase();
            const categoryB = b.category.toLowerCase();
            if (categoryA < categoryB)
                return -1
            if (categoryB > categoryB)
                return 1
            return 0
        });
    }

    static SortbyDate(posts){
        return posts.sort((a, b) => {
            // converting date strings to Date objects
            const dateA = new Date(a.datePublished);
            const dateB = new Date(b.datePublished);
            //descending alphabetical
            return dateA - dateB;
        });
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