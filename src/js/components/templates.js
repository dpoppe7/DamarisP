export const styles = {
  // Navigation styles
  nav: {
    container: 'flex items-center justify-between px-6 py-4 bg-dark-bg border-b border-border-color max-w-6xl mx-auto',
    logo: 'w-10 h-10 text-light-gray hover:text-pink-accent hover:scale-110 transition-transform duration-300',
    links: 'hidden md:flex space-x-8 list-none',
    link: 'font-roboto text-light-gray hover:text-pink-accent font-medium text-lg transition-colors duration-300 cursor-pointer',
    mobileBtn: 'md:hidden text-light-gray hover:text-pink-accent',
    mobileMenu: 'hidden md:hidden absolute top-full left-0 w-full bg-dark-bg border-t border-border-color z-50'
  },
}