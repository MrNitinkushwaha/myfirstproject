// Utility functions
const utils = {
    // Format date
    formatDate: (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    },

    // Debounce function for search
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Show notification
    showNotification: (message, type = 'info') => {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Set background color based on type
        const bgColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
        notification.style.backgroundColor = bgColor;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    },

    // Generate random ID
    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
};

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const navLinks = document.getElementById('navLinks');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (navLinks && mobileBtn && !navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Sample data
const sampleData = {
    alumni: [
        {
            id: 1,
            name: 'John Doe',
            batch: 2015,
            degree: 'B.Tech Computer Science',
            currentJob: 'Software Engineer at Google',
            company: 'Google',
            location: 'Bangalore, India',
            skills: ['JavaScript', 'React', 'Node.js', 'Python'],
            email: 'john.doe@example.com'
        },
        {
            id: 2,
            name: 'Jane Smith',
            batch: 2018,
            degree: 'MBA Finance',
            currentJob: 'Product Manager at Microsoft',
            company: 'Microsoft',
            location: 'Hyderabad, India',
            skills: ['Product Management', 'Strategy', 'Leadership', 'Analytics'],
            email: 'jane.smith@example.com'
        },
        {
            id: 3,
            name: 'Mike Johnson',
            batch: 2012,
            degree: 'B.Tech Mechanical Engineering',
            currentJob: 'Senior Engineer at Tesla',
            company: 'Tesla',
            location: 'California, USA',
            skills: ['Mechanical Design', 'CAD', 'Project Management', 'Innovation'],
            email: 'mike.johnson@example.com'
        },
        {
            id: 4,
            name: 'Sarah Wilson',
            batch: 2016,
            degree: 'B.Sc Physics',
            currentJob: 'Data Scientist at Amazon',
            company: 'Amazon',
            location: 'Seattle, USA',
            skills: ['Python', 'Machine Learning', 'Data Analysis', 'Statistics'],
            email: 'sarah.wilson@example.com'
        }
    ],
    events: [
        {
            id: 1,
            title: 'Annual Alumni Meet 2024',
            date: '2024-03-15',
            time: '6:00 PM',
            location: 'College Campus Auditorium',
            type: 'Networking',
            description: 'Join us for the annual alumni meet and reconnect with your batchmates and professors.'
        },
        {
            id: 2,
            title: 'Tech Career Workshop',
            date: '2024-03-22',
            time: '2:00 PM',
            location: 'Online - Zoom',
            type: 'Workshop',
            description: 'Learn about the latest trends in technology and career opportunities from industry experts.'
        },
        {
            id: 3,
            title: 'Leadership Summit',
            date: '2024-04-05',
            time: '9:00 AM',
            location: 'City Convention Center',
            type: 'Conference',
            description: 'A one-day summit focusing on leadership development and management skills.'
        }
    ],
    jobs: [
        {
            id: 1,
            title: 'Senior Software Engineer',
            company: 'Google',
            location: 'Bangalore, India',
            type: 'Full-time',
            postedDate: '2024-02-20',
            description: 'We are looking for a skilled Software Engineer to join our team...',
            requirements: ['5+ years experience', 'JavaScript', 'React', 'Node.js']
        },
        {
            id: 2,
            title: 'Product Manager',
            company: 'Microsoft',
            location: 'Hyderabad, India',
            type: 'Full-time',
            postedDate: '2024-02-18',
            description: 'Join our product team to drive innovation and product strategy...',
            requirements: ['3+ years PM experience', 'Agile methodology', 'Analytical skills']
        },
        {
            id: 3,
            title: 'Data Scientist',
            company: 'Amazon',
            location: 'Seattle, USA',
            type: 'Full-time',
            postedDate: '2024-02-15',
            description: 'Work with large datasets to derive insights and build ML models...',
            requirements: ['Python', 'Machine Learning', 'SQL', 'Statistics']
        }
    ],
    news: [
        {
            id: 1,
            title: 'College Ranked Among Top 10 Engineering Institutes',
            date: '2024-02-20',
            excerpt: 'Our college has been ranked among the top 10 engineering institutes in the country...',
            category: 'Achievements'
        },
        {
            id: 2,
            title: 'New Research Center Inaugurated',
            date: '2024-02-15',
            excerpt: 'The new Center for Artificial Intelligence was inaugurated by the Honorable Minister...',
            category: 'Infrastructure'
        },
        {
            id: 3,
            title: 'Alumni Donates $1M for Scholarship Program',
            date: '2024-02-10',
            excerpt: 'Successful alumnus Mr. Rajesh Kumar has donated $1 million to support underprivileged students...',
            category: 'Donations'
        }
    ]
};