// Admin dashboard initialization
document.addEventListener('DOMContentLoaded', () => {
    setupAdminDashboard();
    initializeCharts();
    populateTables();
    setupNavigation();
});

function setupAdminDashboard() {
    // Check if admin is logged in
    if (!StorageManager.getItem('adminLoggedIn')) {
        window.location.href = 'admin-login.html';
    }
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Hide all sections
            document.querySelectorAll('.content-section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show selected section
            const sectionId = link.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.display = 'block';
            }
        });
    });
}

function initializeCharts() {
    // User Growth Chart
    const userGrowthCtx = document.getElementById('userGrowthChart')?.getContext('2d');
    if (userGrowthCtx) {
        new Chart(userGrowthCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Active Users',
                    data: [2100, 2800, 3500, 4200, 5100, 6234],
                    borderColor: '#0d6efd',
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointBackgroundColor: '#0d6efd',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f0f0f0'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Category Chart
    const categoryCtx = document.getElementById('categoryChart')?.getContext('2d');
    if (categoryCtx) {
        new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['Development', 'Design', 'Marketing', 'Support', 'Other'],
                datasets: [{
                    data: [2500, 1800, 1200, 800, 934],
                    backgroundColor: [
                        '#0d6efd',
                        '#198754',
                        '#ffc107',
                        '#0dcaf0',
                        '#6c757d'
                    ],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

function populateTables() {
    populateUsersTable();
    populateWorkersTable();
    populateApplicationsTable();
    populateFeedbackTable();
    populateActivityTable();
}

function populateUsersTable() {
    const usersTable = document.getElementById('usersTable');
    if (!usersTable) return;
    
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', type: 'Client', status: 'Active', joinDate: '2026-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', type: 'Worker', status: 'Active', joinDate: '2026-01-20' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com', type: 'Client', status: 'Inactive', joinDate: '2025-12-10' },
        { id: 4, name: 'Alice Johnson', email: 'alice@example.com', type: 'Worker', status: 'Active', joinDate: '2026-02-01' },
        { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', type: 'Client', status: 'Active', joinDate: '2026-01-25' }
    ];
    
    usersTable.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td><strong>${user.name}</strong></td>
            <td>${user.email}</td>
            <td><span class="badge bg-info">${user.type}</span></td>
            <td><span class="status-${user.status.toLowerCase()}">${user.status}</span></td>
            <td>${formatDate(user.joinDate)}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="editUser(${user.id})">Edit</button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function populateWorkersTable() {
    const workersTable = document.getElementById('workersTable');
    if (!workersTable) return;
    
    const workers = [
        { name: 'Sarah Johnson', title: 'Frontend Developer', city: 'New York', rating: 4.9, jobs: 127, status: 'Verified' },
        { name: 'Michael Chen', title: 'Full Stack Developer', city: 'San Francisco', rating: 4.8, jobs: 98, status: 'Verified' },
        { name: 'Emma Martinez', title: 'UI/UX Designer', city: 'Los Angeles', rating: 4.7, jobs: 85, status: 'Verified' },
        { name: 'David Wilson', title: 'Backend Developer', city: 'Boston', rating: 4.6, jobs: 76, status: 'Verified' },
        { name: 'Jessica Lee', title: 'Data Analyst', city: 'Seattle', rating: 4.5, jobs: 62, status: 'Pending' }
    ];
    
    workersTable.innerHTML = workers.map((worker, idx) => `
        <tr>
            <td><strong>${worker.name}</strong></td>
            <td>${worker.title}</td>
            <td>${worker.city}</td>
            <td>${'⭐'.repeat(Math.floor(worker.rating))} ${worker.rating}</td>
            <td>${worker.jobs}</td>
            <td><span class="status-${worker.status.toLowerCase()}">${worker.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewWorker(${idx})">View</button>
                <button class="btn btn-sm btn-outline-danger" onclick="suspendWorker(${idx})">Suspend</button>
            </td>
        </tr>
    `).join('');
}

function populateApplicationsTable() {
    const applicationsTable = document.getElementById('applicationsTable');
    if (!applicationsTable) return;
    
    const applications = [
        { name: 'Tom Harris', position: 'Web Developer', city: 'New York', submitted: '2026-02-15', status: 'Pending' },
        { name: 'Linda Davis', position: 'Designer', city: 'Los Angeles', submitted: '2026-02-10', status: 'Approved' },
        { name: 'Mark Rodriguez', position: 'Data Analyst', city: 'Seattle', submitted: '2026-02-05', status: 'Rejected' },
        { name: 'Karen White', position: 'Project Manager', city: 'Chicago', submitted: '2026-02-12', status: 'Pending' }
    ];
    
    applicationsTable.innerHTML = applications.map((app, idx) => `
        <tr>
            <td><strong>${app.name}</strong></td>
            <td>${app.position}</td>
            <td>${app.city}</td>
            <td>${formatDate(app.submitted)}</td>
            <td><span class="status-${app.status.toLowerCase()}">${app.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-success" onclick="approveApplication(${idx})">Approve</button>
                <button class="btn btn-sm btn-outline-danger" onclick="rejectApplication(${idx})">Reject</button>
            </td>
        </tr>
    `).join('');
}

function populateFeedbackTable() {
    const feedbackTable = document.getElementById('feedbackTable');
    if (!feedbackTable) return;
    
    const feedbacks = [
        { type: '💡 Suggestion', from: 'user@example.com', subject: 'Add mobile app', date: '2026-02-10', status: 'Pending' },
        { type: '🐛 Bug Report', from: 'dev@example.com', subject: 'Login issue', date: '2026-02-08', status: 'Resolved' },
        { type: '⭐ Feature Request', from: 'client@example.com', subject: 'Video calls', date: '2026-02-12', status: 'Pending' },
        { type: '👍 Praise', from: 'happy@example.com', subject: 'Great platform!', date: '2026-02-11', status: 'Resolved' }
    ];
    
    feedbackTable.innerHTML = feedbacks.map((fb, idx) => `
        <tr>
            <td>${fb.type}</td>
            <td>${fb.from}</td>
            <td>${fb.subject}</td>
            <td>${formatDate(fb.date)}</td>
            <td><span class="status-${fb.status.toLowerCase()}">${fb.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewFeedback(${idx})">View</button>
                <button class="btn btn-sm btn-outline-success" onclick="markResolved(${idx})">Resolve</button>
            </td>
        </tr>
    `).join('');
}

function populateActivityTable() {
    const activityTable = document.getElementById('activityTable');
    if (!activityTable) return;
    
    const activities = [
        { user: 'Sarah Johnson', action: 'Posted new job', date: '2026-02-15', status: 'Success' },
        { user: 'Michael Chen', action: 'Applied for position', date: '2026-02-14', status: 'Success' },
        { user: 'Emma Martinez', action: 'Updated profile', date: '2026-02-13', status: 'Success' },
        { user: 'John Doe', action: 'Sent message', date: '2026-02-12', status: 'Success' },
        { user: 'Jane Smith', action: 'Completed job', date: '2026-02-11', status: 'Success' }
    ];
    
    activityTable.innerHTML = activities.map(activity => `
        <tr>
            <td><strong>${activity.user}</strong></td>
            <td>${activity.action}</td>
            <td>${formatDate(activity.date)}</td>
            <td><span class="badge bg-success">${activity.status}</span></td>
        </tr>
    `).join('');
}

function filterApplications() {
    showNotification('Applications filtered', 'info');
}

function editUser(userId) {
    showNotification(`Editing user ${userId}`, 'info');
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        showNotification('User deleted successfully', 'success');
    }
}

function viewWorker(workerId) {
    showNotification('Opening worker profile', 'info');
}

function suspendWorker(workerId) {
    if (confirm('Are you sure you want to suspend this worker?')) {
        showNotification('Worker suspended', 'success');
    }
}

function approveApplication(appId) {
    showNotification('Application approved', 'success');
}

function rejectApplication(appId) {
    if (confirm('Are you sure you want to reject this application?')) {
        showNotification('Application rejected', 'success');
    }
}

function viewFeedback(feedbackId) {
    showNotification('Opening feedback details', 'info');
}

function markResolved(feedbackId) {
    showNotification('Feedback marked as resolved', 'success');
}

function logoutAdmin() {
    if (confirm('Are you sure you want to logout?')) {
        StorageManager.removeItem('adminLoggedIn');
        window.location.href = 'index.html';
    }
}