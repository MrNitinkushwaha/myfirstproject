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
// Profile management functions
function openEditProfile() {
    const modal = document.getElementById('editProfileModal');
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (modal && user) {
        // Pre-fill form
        const form = document.getElementById('editProfileForm');
        form.name.value = user.name || '';
        form.email.value = user.email || '';
        form.batch.value = user.batch || '';
        form.degree.value = user.degree || '';
        form.specialization.value = user.specialization || '';
        form.currentJob.value = user.currentJob || '';
        form.company.value = user.company || '';
        form.location.value = user.location || '';
        form.linkedin.value = user.linkedin || '';
        form.bio.value = user.bio || '';
        
        modal.style.display = 'block';
    }
}

function closeEditProfile() {
    const modal = document.getElementById('editProfileModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function saveProfile(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    // Update user data
    user.name = formData.get('name');
    user.email = formData.get('email');
    user.batch = parseInt(formData.get('batch'));
    user.degree = formData.get('degree');
    user.specialization = formData.get('specialization');
    user.currentJob = formData.get('currentJob');
    user.company = formData.get('company');
    user.location = formData.get('location');
    user.linkedin = formData.get('linkedin');
    user.bio = formData.get('bio');
    
    // Save updated user
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Update users list
    const users = JSON.parse(localStorage.getItem('alumniUsers')) || [];
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem('alumniUsers', JSON.stringify(users));
    }
    
    utils.showNotification('Profile updated successfully!', 'success');
    closeEditProfile();
    
    // Refresh profile page
    setTimeout(() => {
        router.loadPage('profile');
    }, 500);
}

function openExperienceModal() {
    const modal = document.getElementById('experienceModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeExperienceModal() {
    const modal = document.getElementById('experienceModal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('experienceForm').reset();
    }
}

function toggleEndDate() {
    const endDateInput = document.querySelector('input[name="endDate"]');
    const currentCheckbox = document.querySelector('input[name="current"]');
    
    if (currentCheckbox.checked) {
        endDateInput.disabled = true;
        endDateInput.value = '';
    } else {
        endDateInput.disabled = false;
    }
}

function saveExperience(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    const experience = {
        id: utils.generateId(),
        position: formData.get('position'),
        company: formData.get('company'),
        startDate: formData.get('startDate'),
        endDate: formData.get('current') ? null : formData.get('endDate'),
        current: formData.get('current') === 'on',
        location: formData.get('location'),
        description: formData.get('description')
    };
    
    // Save to user profile
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user.experience) {
        user.experience = [];
    }
    user.experience.push(experience);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    utils.showNotification('Experience added successfully!', 'success');
    closeExperienceModal();
    
    // Refresh profile page
    setTimeout(() => {
        router.loadPage('profile');
    }, 500);
}

function openSkillsModal() {
    const modal = document.getElementById('skillsModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeSkillsModal() {
    const modal = document.getElementById('skillsModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function addSkill(skill) {
    const skillsInput = document.querySelector('input[name="skills"]');
    const currentSkills = skillsInput.value ? skillsInput.value.split(',').map(s => s.trim()) : [];
    
    if (!currentSkills.includes(skill)) {
        currentSkills.push(skill);
        skillsInput.value = currentSkills.join(', ');
    }
}

function saveSkills(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    const skills = formData.get('skills') ? 
        formData.get('skills').split(',').map(skill => skill.trim()).filter(skill => skill) : [];
    
    // Save to user profile
    const user = JSON.parse(localStorage.getItem('currentUser'));
    user.skills = skills;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    utils.showNotification('Skills updated successfully!', 'success');
    closeSkillsModal();
    
    // Refresh profile page
    setTimeout(() => {
        router.loadPage('profile');
    }, 500);
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
// Enhanced authentication functions
const auth = {
    register: function(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        
        // Basic validation
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        
        if (password !== confirmPassword) {
            utils.showNotification('Passwords do not match!', 'error');
            return;
        }
        
        if (password.length < 6) {
            utils.showNotification('Password must be at least 6 characters long!', 'error');
            return;
        }
        
        // Create user profile
        const user = {
            id: utils.generateId(),
            name: formData.get('fullName'),
            email: formData.get('email'),
            batch: parseInt(formData.get('batch')),
            degree: formData.get('degree'),
            specialization: formData.get('specialization'),
            currentJob: formData.get('currentJob'),
            company: formData.get('company'),
            location: formData.get('location'),
            skills: formData.get('skills') ? formData.get('skills').split(',').map(skill => skill.trim()).filter(skill => skill) : [],
            linkedin: formData.get('linkedin'),
            bio: formData.get('bio'),
            registrationTime: new Date().toISOString(),
            profileCompleted: false,
            connections: 0,
            eventsAttended: 0,
            jobsPosted: 0
        };
        
        // Save user to localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Update users list
        const users = JSON.parse(localStorage.getItem('alumniUsers')) || [];
        users.push(user);
        localStorage.setItem('alumniUsers', JSON.stringify(users));
        
        utils.showNotification('Profile created successfully! Welcome to Alumni Network!', 'success');
        
        // Update header with user info
        if (window.header) {
            window.header.updateUser(user);
        }
        
        setTimeout(() => {
            router.navigate('profile');
        }, 1000);
    },

    login: function(event) {
        event.preventDefault();
        const email = event.target.querySelector('input[type="email"]').value;
        const password = event.target.querySelector('input[type="password"]').value;
        
        // Simulate login - in real app, this would verify against stored users
        const users = JSON.parse(localStorage.getItem('alumniUsers')) || [];
        const user = users.find(u => u.email === email) || {
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