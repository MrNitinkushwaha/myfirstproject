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
    register: function() {
        return `
            <section class="container">
                <div class="form-container">
                    <h2 style="text-align: center; margin-bottom: 2rem;">Join Alumni Network</h2>
                    <form onsubmit="auth.register(event)">
                        <div class="form-group">
                            <label class="form-label">Full Name</label>
                            <input type="text" class="form-input" placeholder="Enter your full name" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-input" placeholder="Enter your email" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Graduation Year</label>
                            <input type="number" class="form-input" placeholder="e.g., 2015" min="1950" max="2030" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Degree</label>
                            <input type="text" class="form-input" placeholder="e.g., B.Tech Computer Science" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-input" placeholder="Create a password" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Confirm Password</label>
                            <input type="password" class="form-input" placeholder="Confirm your password" required>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Create Account</button>
                    </form>
                    <p style="text-align: center; margin-top: 1rem;">
                        Already have an account? 
                        <a href="#login" onclick="router.navigate('login')" style="color: var(--primary);">Login here</a>
                    </p>
                </div>
            </section>
        `;
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