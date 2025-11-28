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
    profile: function() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) {
            setTimeout(() => router.navigate('login'), 100);
            return '<div class="container" style="text-align: center; padding: 2rem;">Please login to view profile.</div>';
        }

        return `
            <section class="profile-header">
                <div class="container">
                    <div class="profile-avatar">
                        ${user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <h1>${user.name || 'User'}</h1>
                    <p>${user.batch ? 'Batch of ' + user.batch : ''} ${user.degree ? ' • ' + user.degree : ''}</p>
                </div>
            </section>

            <section class="container">
                <div class="profile-info">
                    <div class="profile-stats">
                        <div class="stat-card">
                            <span class="stat-number">12</span>
                            <span class="stat-label">Connections</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-number">5</span>
                            <span class="stat-label">Events Attended</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-number">3</span>
                            <span class="stat-label">Jobs Posted</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-number">8</span>
                            <span class="stat-label">Years Alumni</span>
                        </div>
                    </div>

                    <div class="profile-section">
                        <h3>Personal Information</h3>
                        <div style="display: grid; gap: 1rem;">
                            <div>
                                <strong>Email:</strong> ${user.email || 'Not provided'}
                            </div>
                            <div>
                                <strong>Batch:</strong> ${user.batch || 'Not provided'}
                            </div>
                            <div>
                                <strong>Degree:</strong> ${user.degree || 'Not provided'}
                            </div>
                            <div>
                                <strong>Member Since:</strong> ${new Date().getFullYear()}
                            </div>
                        </div>
                    </div>

                    <div class="profile-section">
                        <h3>Quick Actions</h3>
                        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                            <button class="btn btn-primary" onclick="utils.showNotification('Edit profile feature coming soon!')">
                                Edit Profile
                            </button>
                            <button class="btn btn-outline" onclick="utils.showNotification('Network settings coming soon!')">
                                Network Settings
                            </button>
                            <button class="btn btn-outline" onclick="utils.showNotification('Privacy settings coming soon!')">
                                Privacy Settings
                            </button>
                        </div>
                    </div>
                </div>
            </section>
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