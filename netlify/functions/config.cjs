// Server config (CommonJS)
const config = {
    // github configuration
    github: {
        username: 'dpoppe7',
        // image Paths: imagePaths are locations in a github repo containing the image that will be the "display" for such project. 
        // These are the names supported when retrieving an image file that display on carrousel (project.js).
        // if desider change the location buth the image for a project should exist there (currently 'images' folder is in root).
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
