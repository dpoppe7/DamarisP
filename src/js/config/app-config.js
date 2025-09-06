// Client config (ES modules)
export const config = {

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
    }
};
