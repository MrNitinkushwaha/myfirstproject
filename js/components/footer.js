// Footer Component
class Footer {
    render() {
        return `
            <footer class="footer">
                <div class="container">
                    <div class="footer-grid">
                        <div class="footer-section">
                            <div class="logo" style="color: white; margin-bottom: 1rem;">
                                <div class="logo-icon">A</div>
                                <div>
                                    <h3>Alumni Network</h3>
                                    <p style="color: #d1d5db;">Connect • Grow • Succeed</p>
                                </div>
                            </div>
                            <p style="color: #d1d5db;">
                                Connecting alumni across generations. Building a stronger community together.
                            </p>
                        </div>

                        <div class="footer-section">
                            <h3>Quick Links</h3>
                            <ul class="footer-links">
                                <li><a href="#directory" onclick="router.navigate('directory')">Directory</a></li>
                                <li><a href="#events" onclick="router.navigate('events')">Events</a></li>
                                <li><a href="#jobs" onclick="router.navigate('jobs')">Jobs</a></li>
                                <li><a href="#news" onclick="router.navigate('news')">News</a></li>
                            </ul>
                        </div>

                        <div class="footer-section">
                            <h3>Support</h3>
                            <ul class="footer-links">
                                <li><a href="#" onclick="utils.showNotification('Help center coming soon!')">Help Center</a></li>
                                <li><a href="#" onclick="utils.showNotification('Contact form coming soon!')">Contact Us</a></li>
                                <li><a href="#" onclick="utils.showNotification('Privacy policy page coming soon!')">Privacy Policy</a></li>
                                <li><a href="#" onclick="utils.showNotification('Terms of service page coming soon!')">Terms of Service</a></li>
                            </ul>
                        </div>

                        <div class="footer-section">
                            <h3>Contact Info</h3>
                            <div style="color: #d1d5db;">
                                <p><i class="fas fa-envelope"></i> alumni@college.edu</p>
                                <p><i class="fas fa-phone"></i> +1 (555) 123-4567</p>
                                <p><i class="fas fa-map-marker-alt"></i> 123 College Street<br>City, State 12345</p>
                            </div>
                        </div>
                    </div>

                    <div class="footer-bottom">
                        <p>&copy; ${new Date().getFullYear()} Alumni Network. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
    }
}