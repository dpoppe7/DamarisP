// config.js: 
export const config = {
    // github configuration
    github: {
        username: 'dpoppe7',
        // image Paths: location in a github repo contwining the "display" image for such project, image that shows on carrousel (project.js)
        imagePaths: ['images/display1.png', 'images/preview.png'], 
        defaultBranch: 'main'
    },

    // API
    api: {
        endpoints: {
            pinnedRepos: '/.netlify/functions/get-pinned-repos',
            allRepos: '/.netlify/functions/get-all-repos'
        },
        limits: {
            pinnedRepos: 6,
            allRepos: 20,
            topicsPerRepo: 8
        }
    },

    // Personal Information
    personal: {
        name: 'Damaris Poppe',
        tagline: 'Software Developer | Front-end/Back-end',
        profileImage: './src/assets/images/main_profile.JPG',
        footerGif: 'src/assets/girl.gif'
    },

    // Social Media Links
    social: {
        github: 'https://github.com/dpoppe7',
        linkedin: 'https://www.linkedin.com/in/devpopd',
        codepen: 'https://codepen.io/DamarisP'
    },

    // Navigation
    navigation: {
        links: [
            { text: 'Projects', page: '#projects' }
            // { text: 'Fun', page: '#fun' } // might add more sections/content on page
        ]
    },

    // UI Configuration
    ui: {
        // Usage: Projects.js
        carousel: {
            autoSlide: true,
            slideInterval: 5000,
            transitionDuration: 500
        },

        breakpoints: {
            mobile: 768,
            tablet: 1024,
            desktop: 1200
        }
    },

    // Content Filtering
    // Usage: fun.js
    filters: {
        funProjectTag: 'fun'
    },

    // Default Values
    defaults: {
        description: 'No description available',
        fallbackUrl: '#',
        imageAlt: 'Project preview',
        repoTopicsLimit: 8 // matching the API response 'topicsPerRepo: 8'
    }
};

// Utility functions to get the configuration
export const getConfig = {

    // Get API URL
    apiUrl: (endpoint) => config.api.endpoints[endpoint],

};