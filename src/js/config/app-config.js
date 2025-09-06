// Client config (ES modules)
export const config = {
    // Social Media Links
    social: {
        links: [
            { platform: "Github", link: "https://github.com/dpoppe7" },
            { platform: "Linkedin", link: "https://www.linkedin.com/in/devpopd"} ,
            { platform: "Codepen", link: "https://codepen.io/DamarisP"}
        ]
    },

    // Navigation
    navigation: {
        links: [
            { text: 'Projects', page: '#projects' }
            // { text: 'Fun', page: '#fun' } // might add more sections/content on page
        ]
    },

    // Personal Information
    personal: {
        name: 'Damaris Poppe',
        tagline: 'Software Developer | Front-end/Back-end',
        profileImage: './src/assets/images/main_profile.JPG',
        footerGif: 'src/assets/girl.gif'
    },

    // Content Filtering: display only the repos that have 'fun' as a topic
    // Usage: fun.js
    filters: {
        funProjectTag: 'fun'
    }
};
