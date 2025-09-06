// Server config (CommonJS)
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

     // Default Values
    defaults: {
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