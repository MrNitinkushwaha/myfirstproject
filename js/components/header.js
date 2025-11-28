// Header Component
class Header {
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    }

    render() {
        return `
            <header class="header">
                <nav class="navbar container">
                    <a href="#home" class="logo" onclick="router.navigate('home')">
                        <div class="logo-icon">A</div>
                        <div class="logo-text">
                            <h1>Alumni Network</h1>
                            <p>Connect • Grow • Succeed</p>
                        </div>
                    </a>

                    <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
                        <i class="fas fa-bars"></i>
                    </button>

                    <div class="nav-links" id="navLinks">
                        <a href="#directory" class="nav-link" onclick="router.navigate('directory')">Directory</a>
                        <a href="#events" class="nav-link" onclick="router.navigate('events')">Events</a>
                        <a href="#jobs" class="nav-link" onclick="router.navigate('jobs')">Jobs</a>
                        <a href="#news" class="nav-link" onclick="router.navigate('news')">News</a>
                        
                        ${this.renderUserSection()}
                    </div>
                </nav>
            </header>
        `;
    }

    renderUserSection() {
        if (this.currentUser) {
            return `
                <div class="user-section">
                    <a href="#profile" class="nav-link" onclick="router.navigate('profile')">
                        <i class="fas fa-user"></i> Profile
                    </a>
                    <button class="btn btn-outline" onclick="auth.logout()">Logout</button>
                </div>
            `;
        } else {
            return `
                <div class="user-section">
                    <a href="#login" class="nav-link" onclick="router.navigate('login')">Login</a>
                    <a href="#register" class="btn btn-primary" onclick="router.navigate('register')">Join Now</a>
                </div>
            `;
        }
    }

    updateUser(user) {
        this.currentUser = user;
        document.getElementById('header').innerHTML = this.render();
    }
}