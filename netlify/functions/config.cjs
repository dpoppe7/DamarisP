// Server config (CommonJS)
const config = {
    // github configuration
    github: {
        username: 'dpoppe7',
        // image Paths: location in a github repo contwining the "display" image for such project, image that shows on carrousel (project.js)
        imagePaths: ['images/display1.png', 'images/preview.png'], 
        defaultBranch: 'main'
    },

    // API
    api: {
        limits: {
            pinnedRepos: 6,
            allRepos: 20,
            topicsPerRepo: 8
        }
    },
};

module.exports = { config };
