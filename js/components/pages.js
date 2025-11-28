// Page rendering functions
const pages = {
    // Home Page
    home: function() {
        return `
            <section class="hero">
                <div class="container">
                    <h1>Welcome to Your <span style="color: var(--accent);">Alumni Network</span></h1>
                    <p>Connect with your college community, discover opportunities, and build lasting relationships across generations.</p>
                    <div class="hero-buttons">
                        <a href="#register" class="btn btn-primary" onclick="router.navigate('register')">
                            Join Our Network
                        </a>
                        <a href="#directory" class="btn btn-outline" style="border-color: white; color: white;" onclick="router.navigate('directory')">
                            Find Alumni
                        </a>
                    </div>
                </div>
            </section>

            <section class="features">
                <div class="container">
                    <h2 class="section-title">Why Join Our Network?</h2>
                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-users"></i>
                            </div>
                            <h3>Network</h3>
                            <p>Connect with alumni across different batches and industries worldwide.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-briefcase"></i>
                            </div>
                            <h3>Career Opportunities</h3>
                            <p>Discover job opportunities and get career guidance from experienced alumni.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-graduation-cap"></i>
                            </div>
                            <h3>Mentorship</h3>
                            <p>Get valuable guidance and mentorship from seniors in your field.</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    // Directory Page
    directory: function() {
        return `
            <section class="search-section">
                <div class="container">
                    <div class="search-container">
                        <div class="search-box">
                            <input type="text" 
                                   class="search-input" 
                                   placeholder="Search alumni by name, company, or skills..."
                                   oninput="utils.debounce(searchAlumni, 300)(this.value)">
                            <button class="btn btn-primary" onclick="searchAlumni(document.querySelector('.search-input').value)">
                                <i class="fas fa-search"></i> Search
                            </button>
                        </div>
                        <div class="filters">
                            <select class="filter-select" onchange="filterByBatch(this.value)">
                                <option value="">All Batches</option>
                                <option value="2010">2010</option>
                                <option value="2012">2012</option>
                                <option value="2015">2015</option>
                                <option value="2016">2016</option>
                                <option value="2018">2018</option>
                            </select>
                            <select class="filter-select" onchange="filterByLocation(this.value)">
                                <option value="">All Locations</option>
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            <section class="container">
                <h2 class="section-title">Alumni Directory</h2>
                <div class="alumni-grid" id="alumniGrid">
                    ${this.renderAlumniCards(sampleData.alumni)}
                </div>
            </section>
        `;
    },

    // Events Page
    events: function() {
        return `
            <section class="container">
                <h2 class="section-title">Upcoming Events</h2>
                <div class="events-grid" id="eventsGrid">
                    ${this.renderEvents(sampleData.events)}
                </div>
            </section>
        `;
    },

    // Jobs Page
    jobs: function() {
        return `
            <section class="container">
                <h2 class="section-title">Job Opportunities</h2>
                <div class="jobs-grid" id="jobsGrid">
                    ${this.renderJobs(sampleData.jobs)}
                </div>
            </section>
        `;
    },

    // News Page
    news: function() {
        return `
            <section class="container">
                <h2 class="section-title">Latest News</h2>
                <div class="news-grid" id="newsGrid">
                    ${this.renderNews(sampleData.news)}
                </div>
            </section>
        `;
    },

    // Login Page
    login: function() {
        return `
            <section class="container">
                <div class="form-container">
                    <h2 style="text-align: center; margin-bottom: 2rem;">Login to Your Account</h2>
                    <form onsubmit="auth.login(event)">
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-input" placeholder="Enter your email" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-input" placeholder="Enter your password" required>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Login</button>
                    </form>
                    <p style="text-align: center; margin-top: 1rem;">
                        Don't have an account? 
                        <a href="#register" onclick="router.navigate('register')" style="color: var(--primary);">Register here</a>
                    </p>
                </div>
            </section>
        `;
    },

    // Register Page
    // Update the register function in pages.js
register: function() {
    return `
        <section class="container">
            <div class="form-container">
                <h2 style="text-align: center; margin-bottom: 2rem;">Complete Your Alumni Profile</h2>
                <form onsubmit="auth.register(event)" id="registrationForm">
                    <div class="form-group">
                        <label class="form-label">Full Name *</label>
                        <input type="text" class="form-input" name="fullName" placeholder="Enter your full name" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Email Address *</label>
                        <input type="email" class="form-input" name="email" placeholder="Enter your email" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Graduation Year *</label>
                        <select class="form-input" name="batch" required>
                            <option value="">Select Graduation Year</option>
                            ${this.generateYearOptions()}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Degree Program *</label>
                        <select class="form-input" name="degree" required>
                            <option value="">Select Your Degree</option>
                            <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                            <option value="B.Tech Mechanical Engineering">B.Tech Mechanical Engineering</option>
                            <option value="B.Tech Electrical Engineering">B.Tech Electrical Engineering</option>
                            <option value="B.Tech Civil Engineering">B.Tech Civil Engineering</option>
                            <option value="MBA">MBA</option>
                            <option value="BBA">BBA</option>
                            <option value="B.Sc Physics">B.Sc Physics</option>
                            <option value="B.Sc Chemistry">B.Sc Chemistry</option>
                            <option value="B.A Economics">B.A Economics</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Specialization</label>
                        <input type="text" class="form-input" name="specialization" placeholder="e.g., Artificial Intelligence, Finance">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Current Position</label>
                        <input type="text" class="form-input" name="currentJob" placeholder="e.g., Software Engineer at Google">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Company</label>
                        <input type="text" class="form-input" name="company" placeholder="Your current company">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Location</label>
                        <input type="text" class="form-input" name="location" placeholder="City, Country">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Skills (comma separated)</label>
                        <input type="text" class="form-input" name="skills" placeholder="e.g., JavaScript, React, Project Management">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">LinkedIn Profile</label>
                        <input type="url" class="form-input" name="linkedin" placeholder="https://linkedin.com/in/yourprofile">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Bio</label>
                        <textarea class="form-textarea" name="bio" placeholder="Tell us about yourself, your career journey, and interests..."></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Password *</label>
                        <input type="password" class="form-input" name="password" placeholder="Create a password" required minlength="6">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Confirm Password *</label>
                        <input type="password" class="form-input" name="confirmPassword" placeholder="Confirm your password" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">
                            <input type="checkbox" name="privacy" required>
                            I agree to the <a href="#" onclick="utils.showNotification('Privacy policy coming soon!')">Privacy Policy</a> and 
                            <a href="#" onclick="utils.showNotification('Terms of service coming soon!')">Terms of Service</a>
                        </label>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Create Alumni Profile</button>
                </form>
                <p style="text-align: center; margin-top: 1rem;">
                    Already have an account? 
                    <a href="#login" onclick="router.navigate('login')" style="color: var(--primary);">Login here</a>
                </p>
            </div>
        </section>
    `;
},

// Add helper function for year options
generateYearOptions: function() {
    const currentYear = new Date().getFullYear();
    let options = '';
    for (let year = currentYear; year >= 1970; year--) {
        options += `<option value="${year}">${year}</option>`;
    }
    return options;
},
    // Profile Page
   // Enhanced profile function
profile: function() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        setTimeout(() => router.navigate('login'), 100);
        return '<div class="container" style="text-align: center; padding: 2rem;">Please login to view profile.</div>';
    }

    return `
        <section class="profile-header">
            <div class="container">
                <div class="profile-avatar" style="position: relative;">
                    ${user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    <button class="btn btn-outline" 
                            style="position: absolute; bottom: -10px; right: -10px; background: white; border-radius: 50%; width: 40px; height: 40px; padding: 0;"
                            onclick="utils.showNotification('Photo upload coming soon!')">
                        <i class="fas fa-camera"></i>
                    </button>
                </div>
                <h1>${user.name || 'User'}</h1>
                <p>${user.batch ? 'Batch of ' + user.batch : ''} ${user.degree ? ' • ' + user.degree : ''}</p>
                <p>${user.currentJob || 'Alumni'}</p>
                
                <div style="margin-top: 1rem;">
                    <button class="btn btn-outline" style="border-color: white; color: white;" onclick="openEditProfile()">
                        <i class="fas fa-edit"></i> Edit Profile
                    </button>
                    <button class="btn btn-outline" style="border-color: white; color: white; margin-left: 0.5rem;" onclick="utils.showNotification('Share feature coming soon!')">
                        <i class="fas fa-share"></i> Share Profile
                    </button>
                </div>
            </div>
        </section>

        <section class="container">
            <div class="profile-info">
                <!-- Profile Stats -->
                <div class="profile-stats">
                    <div class="stat-card">
                        <span class="stat-number">${user.connections || 12}</span>
                        <span class="stat-label">Connections</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number">${user.eventsAttended || 5}</span>
                        <span class="stat-label">Events Attended</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number">${user.jobsPosted || 3}</span>
                        <span class="stat-label">Jobs Posted</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number">${user.batch ? new Date().getFullYear() - user.batch : 8}</span>
                        <span class="stat-label">Years Alumni</span>
                    </div>
                </div>

                <!-- Main Profile Content -->
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
                    <!-- Left Column -->
                    <div>
                        <!-- About Section -->
                        <div class="profile-section">
                            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 1rem;">
                                <h3>About</h3>
                                <button class="btn btn-outline btn-sm" onclick="openEditProfile()">
                                    <i class="fas fa-edit"></i> Edit
                                </button>
                            </div>
                            <p>${user.bio || 'No bio provided yet. Tell others about yourself!'}</p>
                        </div>

                        <!-- Experience Section -->
                        <div class="profile-section">
                            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 1rem;">
                                <h3>Experience</h3>
                                <button class="btn btn-outline btn-sm" onclick="openExperienceModal()">
                                    <i class="fas fa-plus"></i> Add
                                </button>
                            </div>
                            ${this.renderExperience(user.experience)}
                        </div>

                        <!-- Education Section -->
                        <div class="profile-section">
                            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 1rem;">
                                <h3>Education</h3>
                                <button class="btn btn-outline btn-sm" onclick="openEducationModal()">
                                    <i class="fas fa-plus"></i> Add
                                </button>
                            </div>
                            ${this.renderEducation(user)}
                        </div>

                        <!-- Skills Section -->
                        <div class="profile-section">
                            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 1rem;">
                                <h3>Skills</h3>
                                <button class="btn btn-outline btn-sm" onclick="openSkillsModal()">
                                    <i class="fas fa-plus"></i> Add
                                </button>
                            </div>
                            <div class="alumni-skills">
                                ${user.skills ? user.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('') : 'No skills added yet'}
                            </div>
                        </div>
                    </div>

                    <!-- Right Column -->
                    <div>
                        <!-- Contact Info -->
                        <div class="profile-section">
                            <h3>Contact Information</h3>
                            <div style="display: grid; gap: 1rem;">
                                ${user.email ? `
                                    <div>
                                        <strong><i class="fas fa-envelope"></i> Email:</strong><br>
                                        <a href="mailto:${user.email}">${user.email}</a>
                                    </div>
                                ` : ''}
                                
                                ${user.linkedin ? `
                                    <div>
                                        <strong><i class="fab fa-linkedin"></i> LinkedIn:</strong><br>
                                        <a href="${user.linkedin}" target="_blank">View Profile</a>
                                    </div>
                                ` : ''}
                                
                                ${user.location ? `
                                    <div>
                                        <strong><i class="fas fa-map-marker-alt"></i> Location:</strong><br>
                                        ${user.location}
                                    </div>
                                ` : ''}
                            </div>
                        </div>

                        <!-- Quick Actions -->
                        <div class="profile-section">
                            <h3>Quick Actions</h3>
                            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                <button class="btn btn-primary" onclick="utils.showNotification('Profile download coming soon!')">
                                    <i class="fas fa-download"></i> Download Profile
                                </button>
                                <button class="btn btn-outline" onclick="utils.showNotification('Network settings coming soon!')">
                                    <i class="fas fa-cog"></i> Privacy Settings
                                </button>
                                <button class="btn btn-outline" onclick="utils.showNotification('Export feature coming soon!')">
                                    <i class="fas fa-file-export"></i> Export Data
                                </button>
                            </div>
                        </div>

                        <!-- Profile Completion -->
                        <div class="profile-section">
                            <h3>Profile Strength</h3>
                            ${this.renderProfileCompletion(user)}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Edit Profile Modal -->
        ${this.renderEditProfileModal(user)}
        
        <!-- Experience Modal -->
        ${this.renderExperienceModal()}
        
        <!-- Education Modal -->
        ${this.renderEducationModal()}
        
        <!-- Skills Modal -->
        ${this.renderSkillsModal(user)}
    `;
},

// Add helper functions for profile rendering
renderExperience: function(experience) {
    if (!experience || experience.length === 0) {
        return `
            <div style="text-align: center; padding: 2rem; background: #f8f9fa; border-radius: 0.5rem;">
                <p style="color: var(--text-light); margin-bottom: 1rem;">No experience added yet</p>
                <button class="btn btn-primary" onclick="openExperienceModal()">
                    <i class="fas fa-plus"></i> Add Your First Experience
                </button>
            </div>
        `;
    }

    return experience.map(exp => `
        <div class="experience-item" style="padding: 1rem; border: 1px solid var(--border); border-radius: 0.5rem; margin-bottom: 1rem;">
            <div style="display: flex; justify-content: between; align-items: start;">
                <div style="flex: 1;">
                    <h4 style="margin: 0 0 0.25rem 0;">${exp.position}</h4>
                    <p style="margin: 0 0 0.25rem 0; color: var(--primary); font-weight: 600;">${exp.company}</p>
                    <p style="margin: 0 0 0.25rem 0; color: var(--text-light);">
                        ${utils.formatDate(exp.startDate)} - ${exp.current ? 'Present' : utils.formatDate(exp.endDate)}
                    </p>
                    <p style="margin: 0; color: var(--text-light);">${exp.location}</p>
                    ${exp.description ? `<p style="margin: 1rem 0 0 0;">${exp.description}</p>` : ''}
                </div>
                <button class="btn btn-outline btn-sm" onclick="editExperience('${exp.id}')">
                    <i class="fas fa-edit"></i>
                </button>
            </div>
        </div>
    `).join('');
},

renderEducation: function(user) {
    return `
        <div class="education-item" style="padding: 1rem; border: 1px solid var(--border); border-radius: 0.5rem;">
            <h4 style="margin: 0 0 0.25rem 0;">${user.degree || 'Degree not specified'}</h4>
            <p style="margin: 0 0 0.25rem 0; color: var(--primary); font-weight: 600;">Alma Mater University</p>
            <p style="margin: 0 0 0.25rem 0; color: var(--text-light);">
                ${user.batch ? 'Batch of ' + user.batch : 'Graduation year not specified'}
            </p>
            ${user.specialization ? `<p style="margin: 0; color: var(--text-light);">Specialization: ${user.specialization}</p>` : ''}
        </div>
    `;
},

renderProfileCompletion: function(user) {
    const completion = this.calculateProfileCompletion(user);
    return `
        <div>
            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                <span>${completion.percentage}% Complete</span>
                <span>${completion.completed}/${completion.total} sections</span>
            </div>
            <div style="background: #e5e7eb; border-radius: 1rem; height: 8px; overflow: hidden;">
                <div style="background: var(--primary); height: 100%; width: ${completion.percentage}%; transition: width 0.3s ease;"></div>
            </div>
            <div style="margin-top: 1rem;">
                ${completion.missing.map(item => `
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <i class="fas fa-exclamation-circle" style="color: var(--accent);"></i>
                        <span style="font-size: 0.875rem;">Add ${item}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
},

calculateProfileCompletion: function(user) {
    const sections = [
        { key: 'name', label: 'Full Name' },
        { key: 'email', label: 'Email' },
        { key: 'batch', label: 'Graduation Year' },
        { key: 'degree', label: 'Degree' },
        { key: 'currentJob', label: 'Current Position' },
        { key: 'company', label: 'Company' },
        { key: 'location', label: 'Location' },
        { key: 'skills', label: 'Skills' },
        { key: 'bio', label: 'Bio' }
    ];

    const completed = sections.filter(section => user[section.key]).length;
    const missing = sections.filter(section => !user[section.key]).map(section => section.label);

    return {
        completed,
        total: sections.length,
        percentage: Math.round((completed / sections.length) * 100),
        missing
    };
},

// Modal rendering functions
renderEditProfileModal: function(user) {
    return `
        <div id="editProfileModal" class="modal" style="display: none;">
            <div class="modal-content" style="max-width: 600px;">
                <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 2rem;">
                    <h2>Edit Profile</h2>
                    <button class="btn btn-outline" onclick="closeEditProfile()" style="border: none; font-size: 1.5rem;">&times;</button>
                </div>
                
                <form onsubmit="saveProfile(event)" id="editProfileForm">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label class="form-label">Full Name</label>
                            <input type="text" class="form-input" name="name" value="${user.name || ''}" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-input" name="email" value="${user.email || ''}" required>
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label class="form-label">Graduation Year</label>
                            <select class="form-input" name="batch" required>
                                <option value="">Select Year</option>
                                ${this.generateYearOptions()}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Degree</label>
                            <select class="form-input" name="degree" required>
                                <option value="">Select Degree</option>
                                <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                                <option value="B.Tech Mechanical Engineering">B.Tech Mechanical Engineering</option>
                                <option value="MBA">MBA</option>
                                <option value="BBA">BBA</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Specialization</label>
                        <input type="text" class="form-input" name="specialization" value="${user.specialization || ''}">
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label class="form-label">Current Position</label>
                            <input type="text" class="form-input" name="currentJob" value="${user.currentJob || ''}">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Company</label>
                            <input type="text" class="form-input" name="company" value="${user.company || ''}">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Location</label>
                        <input type="text" class="form-input" name="location" value="${user.location || ''}">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">LinkedIn Profile</label>
                        <input type="url" class="form-input" name="linkedin" value="${user.linkedin || ''}">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Bio</label>
                        <textarea class="form-textarea" name="bio" placeholder="Tell us about yourself...">${user.bio || ''}</textarea>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                        <button type="button" class="btn btn-outline" onclick="closeEditProfile()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    `;
},

renderExperienceModal: function() {
    return `
        <div id="experienceModal" class="modal" style="display: none;">
            <div class="modal-content" style="max-width: 500px;">
                <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 2rem;">
                    <h2>Add Experience</h2>
                    <button class="btn btn-outline" onclick="closeExperienceModal()" style="border: none; font-size: 1.5rem;">&times;</button>
                </div>
                
                <form onsubmit="saveExperience(event)" id="experienceForm">
                    <div class="form-group">
                        <label class="form-label">Position *</label>
                        <input type="text" class="form-input" name="position" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Company *</label>
                        <input type="text" class="form-input" name="company" required>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label class="form-label">Start Date *</label>
                            <input type="month" class="form-input" name="startDate" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">End Date</label>
                            <input type="month" class="form-input" name="endDate">
                            <label style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                                <input type="checkbox" name="current" onchange="toggleEndDate()"> I currently work here
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Location</label>
                        <input type="text" class="form-input" name="location">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Description</label>
                        <textarea class="form-textarea" name="description" placeholder="Describe your role and responsibilities..."></textarea>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                        <button type="button" class="btn btn-outline" onclick="closeExperienceModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save Experience</button>
                    </div>
                </form>
            </div>
        </div>
    `;
},

renderSkillsModal: function(user) {
    const popularSkills = ['JavaScript', 'Python', 'React', 'Node.js', 'Java', 'AWS', 'Docker', 'Kubernetes', 'Machine Learning', 'Data Analysis', 'Project Management', 'Leadership', 'Communication', 'Agile Methodology'];
    
    return `
        <div id="skillsModal" class="modal" style="display: none;">
            <div class="modal-content" style="max-width: 500px;">
                <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 2rem;">
                    <h2>Add Skills</h2>
                    <button class="btn btn-outline" onclick="closeSkillsModal()" style="border: none; font-size: 1.5rem;">&times;</button>
                </div>
                
                <form onsubmit="saveSkills(event)" id="skillsForm">
                    <div class="form-group">
                        <label class="form-label">Your Skills (comma separated)</label>
                        <input type="text" class="form-input" name="skills" value="${user.skills ? user.skills.join(', ') : ''}" placeholder="e.g., JavaScript, React, Project Management">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Popular Skills</label>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
                            ${popularSkills.map(skill => `
                                <button type="button" class="skill-tag" onclick="addSkill('${skill}')" style="cursor: pointer;">
                                    ${skill}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                        <button type="button" class="btn btn-outline" onclick="closeSkillsModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save Skills</button>
                    </div>
                </form>
            </div>
        </div>
    `;
},
    // Helper functions for rendering components
    renderAlumniCards: function(alumniList) {
        return alumniList.map(alumni => `
            <div class="alumni-card">
                <div class="alumni-header">
                    <div class="alumni-avatar">${alumni.name.charAt(0)}</div>
                    <div class="alumni-info">
                        <h3>${alumni.name}</h3>
                        <div class="batch">Batch of ${alumni.batch}</div>
                    </div>
                </div>
                <div class="alumni-details">
                    <div class="alumni-job">${alumni.currentJob}</div>
                    <div class="alumni-location">
                        <i class="fas fa-map-marker-alt"></i> ${alumni.location}
                    </div>
                </div>
                <div class="alumni-skills">
                    ${alumni.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        `).join('');
    },

    renderEvents: function(eventsList) {
        return eventsList.map(event => `
            <div class="event-card">
                <div class="event-date">${utils.formatDate(event.date)}</div>
                <h3>${event.title}</h3>
                <div class="event-details">
                    <div class="event-detail">
                        <i class="fas fa-clock"></i> ${event.time}
                    </div>
                    <div class="event-detail">
                        <i class="fas fa-map-marker-alt"></i> ${event.location}
                    </div>
                    <div class="event-detail">
                        <i class="fas fa-tag"></i> ${event.type}
                    </div>
                </div>
                <p>${event.description}</p>
                <button class="btn btn-primary" onclick="utils.showNotification('Registered for ${event.title}!')">
                    Register Now
                </button>
            </div>
        `).join('');
    },

    renderJobs: function(jobsList) {
        return jobsList.map(job => `
            <div class="job-card">
                <div class="job-header">
                    <div>
                        <div class="job-title">${job.title}</div>
                        <div class="job-company">${job.company}</div>
                    </div>
                    <span class="job-type">${job.type}</span>
                </div>
                <div class="job-details">
                    <div class="job-detail">
                        <i class="fas fa-map-marker-alt"></i> ${job.location}
                    </div>
                    <div class="job-detail">
                        <i class="fas fa-calendar"></i> Posted on ${utils.formatDate(job.postedDate)}
                    </div>
                </div>
                <p>${job.description}</p>
                <button class="btn btn-primary" onclick="utils.showNotification('Applied for ${job.title} at ${job.company}!')">
                    Apply Now
                </button>
            </div>
        `).join('');
    },

    renderNews: function(newsList) {
        return newsList.map(news => `
            <div class="news-card">
                <div class="news-image">
                    <i class="fas fa-newspaper"></i>
                </div>
                <div class="news-content">
                    <div class="news-date">${utils.formatDate(news.date)} • ${news.category}</div>
                    <h3>${news.title}</h3>
                    <p>${news.excerpt}</p>
                    <a href="#" class="btn btn-outline" onclick="utils.showNotification('Full article coming soon!')">
                        Read More
                    </a>
                </div>
            </div>
        `).join('');
    }
};