// Router for navigation
const router = {
    routes: {
        'home': pages.home,
        'directory': pages.directory,
        'events': pages.events,
        'jobs': pages.jobs,
        'news': pages.news,
        'login': pages.login,
        'register': pages.register,
        'profile': pages.profile
    },

    navigate: function(route) {
        window.location.hash = route;
        this.loadPage(route);
    },

    loadPage: function(route) {
        const mainContent = document.getElementById('main-content');
        const renderFunction = this.routes[route] || pages.home;
        
        mainContent.innerHTML = renderFunction.call(pages);
        
        // Update active nav link
        this.updateActiveNavLink(route);
        
        // Close mobile menu
        const navLinks = document.getElementById('navLinks');
        if (navLinks) {
            navLinks.classList.remove('active');
        }
    },

    updateActiveNavLink: function(route) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[href="#${route}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
};

// Authentication functions
const auth = {
    login: function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = event.target.querySelector('input[type="email"]').value;
        const password = event.target.querySelector('input[type="password"]').value;
        
        // Simulate login - in real app, this would be an API call
        const user = {
            id: utils.generateId(),
            name: 'Demo User',
            email: email,
            batch: 2015,
            degree: 'B.Tech Computer Science',
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        utils.showNotification('Login successful! Welcome back!', 'success');
        
        // Update header with user info
        if (window.header) {
            window.header.updateUser(user);
        }
        
        setTimeout(() => {
            router.navigate('profile');
        }, 1000);
    },

    register: function(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const password = form.querySelector('input[type="password"]').value;
        const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;
        
        if (password !== confirmPassword) {
            utils.showNotification('Passwords do not match!', 'error');
            return;
        }
        
        // Simulate registration
        const user = {
            id: utils.generateId(),
            name: form.querySelector('input[type="text"]').value,
            email: form.querySelector('input[type="email"]').value,
            batch: parseInt(form.querySelector('input[type="number"]').value),
            degree: form.querySelectorAll('input[type="text"]')[1].value,
            registrationTime: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        utils.showNotification('Registration successful! Welcome to Alumni Network!', 'success');
        
        // Update header with user info
        if (window.header) {
            window.header.updateUser(user);
        }
        
        setTimeout(() => {
            router.navigate('profile');
        }, 1000);
    },

    logout: function() {
        localStorage.removeItem('currentUser');
        utils.showNotification('Logged out successfully', 'success');
        
        // Update header
        if (window.header) {
            window.header.updateUser(null);
        }
        
        setTimeout(() => {
            router.navigate('home');
        }, 1000);
    }
};

// Search and filter functions
function searchAlumni(query) {
    const filtered = sampleData.alumni.filter(alumni => 
        alumni.name.toLowerCase().includes(query.toLowerCase()) ||
        alumni.company.toLowerCase().includes(query.toLowerCase()) ||
        alumni.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase())) ||
        alumni.degree.toLowerCase().includes(query.toLowerCase())
    );
    
    document.getElementById('alumniGrid').innerHTML = pages.renderAlumniCards(filtered);
}

function filterByBatch(batch) {
    if (!batch) {
        document.getElementById('alumniGrid').innerHTML = pages.renderAlumniCards(sampleData.alumni);
        return;
    }
    
    const filtered = sampleData.alumni.filter(alumni => alumni.batch == batch);
    document.getElementById('alumniGrid').innerHTML = pages.renderAlumniCards(filtered);
}

function filterByLocation(location) {
    if (!location) {
        document.getElementById('alumniGrid').innerHTML = pages.renderAlumniCards(sampleData.alumni);
        return;
    }
    
    const filtered = sampleData.alumni.filter(alumni => 
        alumni.location.toLowerCase().includes(location.toLowerCase())
    );
    document.getElementById('alumniGrid').innerHTML = pages.renderAlumniCards(filtered);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    window.header = new Header();
    const footer = new Footer();
    
    // Render header and footer
    document.getElementById('header').innerHTML = header.render();
    document.getElementById('footer').innerHTML = footer.render();

    // Handle hash change for routing
    window.addEventListener('hashchange', function() {
        const route = window.location.hash.substring(1) || 'home';
        router.loadPage(route);
    });

    // Load initial page
    const initialRoute = window.location.hash.substring(1) || 'home';
    router.loadPage(initialRoute);
    
    // Make functions globally available
    window.router = router;
    window.auth = auth;
    window.searchAlumni = searchAlumni;
    window.filterByBatch = filterByBatch;
    window.filterByLocation = filterByLocation;
    window.toggleMobileMenu = toggleMobileMenu;
});