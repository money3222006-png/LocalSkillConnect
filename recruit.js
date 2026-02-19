// Sample worker data
const workersData = [
    {
        id: 1,
        name: 'Sarah Johnson',
        title: 'Frontend Developer',
        description: 'Expert in React, Vue.js, and modern web technologies',
        city: 'New York',
        state: 'NY',
        rating: 4.9,
        reviews: 127,
        hourlyRate: 85,
        experience: 'expert',
        employmentType: ['full-time', 'freelance'],
        skills: ['React', 'Vue.js', 'JavaScript', 'CSS', 'TypeScript'],
        image: 'https://via.placeholder.com/150?text=Sarah'
    },
    {
        id: 2,
        name: 'Michael Chen',
        title: 'Full Stack Developer',
        description: 'Building scalable web applications with Node.js and React',
        city: 'San Francisco',
        state: 'CA',
        rating: 4.8,
        reviews: 98,
        hourlyRate: 95,
        experience: 'expert',
        employmentType: ['full-time', 'contract'],
        skills: ['Node.js', 'React', 'MongoDB', 'AWS', 'Docker'],
        image: 'https://via.placeholder.com/150?text=Michael'
    },
    {
        id: 3,
        name: 'Emma Martinez',
        title: 'UI/UX Designer',
        description: 'Creating beautiful and intuitive user experiences',
        city: 'Los Angeles',
        state: 'CA',
        rating: 4.7,
        reviews: 85,
        hourlyRate: 75,
        experience: 'intermediate',
        employmentType: ['freelance', 'part-time'],
        skills: ['Figma', 'Adobe XD', 'Prototyping', 'Wireframing', 'User Research'],
        image: 'https://via.placeholder.com/150?text=Emma'
    },
    {
        id: 4,
        name: 'David Wilson',
        title: 'Backend Developer',
        description: 'Specialist in Python, Django, and database design',
        city: 'Boston',
        state: 'MA',
        rating: 4.6,
        reviews: 76,
        hourlyRate: 80,
        experience: 'expert',
        employmentType: ['full-time', 'contract'],
        skills: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Kubernetes'],
        image: 'https://via.placeholder.com/150?text=David'
    },
    {
        id: 5,
        name: 'Jessica Lee',
        title: 'Data Analyst',
        description: 'Turning data into actionable insights with Python and SQL',
        city: 'Seattle',
        state: 'WA',
        rating: 4.5,
        reviews: 62,
        hourlyRate: 70,
        experience: 'intermediate',
        employmentType: ['full-time', 'part-time'],
        skills: ['Python', 'SQL', 'Tableau', 'Excel', 'Statistics'],
        image: 'https://via.placeholder.com/150?text=Jessica'
    },
    {
        id: 6,
        name: 'Alex Rodriguez',
        title: 'Digital Marketing Specialist',
        description: 'SEO, SEM, and social media marketing expert',
        city: 'Miami',
        state: 'FL',
        rating: 4.4,
        reviews: 55,
        hourlyRate: 65,
        experience: 'intermediate',
        employmentType: ['freelance', 'part-time'],
        skills: ['SEO', 'SEM', 'Google Ads', 'Social Media', 'Content Marketing'],
        image: 'https://via.placeholder.com/150?text=Alex'
    },
    {
        id: 7,
        name: 'Patricia Brown',
        title: 'Virtual Assistant',
        description: 'Helping businesses with administrative tasks and organization',
        city: 'Chicago',
        state: 'IL',
        rating: 4.8,
        reviews: 142,
        hourlyRate: 45,
        experience: 'intermediate',
        employmentType: ['part-time', 'full-time'],
        skills: ['Organization', 'Communication', 'Scheduling', 'Data Entry', 'Customer Service'],
        image: 'https://via.placeholder.com/150?text=Patricia'
    },
    {
        id: 8,
        name: 'James Taylor',
        title: 'Home Repair Specialist',
        description: 'Expert plumber and general home repair contractor',
        city: 'Denver',
        state: 'CO',
        rating: 4.9,
        reviews: 168,
        hourlyRate: 60,
        experience: 'expert',
        employmentType: ['freelance', 'contract'],
        skills: ['Plumbing', 'Electrical', 'Carpentry', 'General Repairs', 'Maintenance'],
        image: 'https://via.placeholder.com/150?text=James'
    },
    {
        id: 9,
        name: 'Lisa Wang',
        title: 'English Tutor',
        description: 'Online English lessons for students of all levels',
        city: 'Austin',
        state: 'TX',
        rating: 4.7,
        reviews: 93,
        hourlyRate: 50,
        experience: 'intermediate',
        employmentType: ['part-time', 'freelance'],
        skills: ['Teaching', 'English', 'Grammar', 'Conversation', 'Test Prep'],
        image: 'https://via.placeholder.com/150?text=Lisa'
    },
    {
        id: 10,
        name: 'Robert King',
        title: 'Accountant',
        description: 'Tax preparation and accounting services for small businesses',
        city: 'Houston',
        state: 'TX',
        rating: 4.6,
        reviews: 87,
        hourlyRate: 100,
        experience: 'expert',
        employmentType: ['part-time', 'contract'],
        skills: ['Accounting', 'Tax Preparation', 'Bookkeeping', 'QuickBooks', 'Financial Planning'],
        image: 'https://via.placeholder.com/150?text=Robert'
    }
];

let filteredWorkers = [...workersData];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    displayWorkers(filteredWorkers);
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('ratingFilter')?.addEventListener('input', (e) => {
        const value = e.target.value;
        document.getElementById('ratingValue').textContent = value == 0 ? 'Any' : `${value}★+`;
    });
}

function filterWorkers() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const location = document.getElementById('locationFilter')?.value.toLowerCase() || '';
    const rating = parseFloat(document.getElementById('ratingFilter')?.value || 0);
    const sortBy = document.getElementById('sortBy')?.value || 'recent';
    
    const checkedFilters = {
        employmentType: Array.from(document.querySelectorAll('.filter-checkbox:checked'))
            .filter(cb => ['full-time', 'part-time', 'freelance', 'contract'].includes(cb.value))
            .map(cb => cb.value),
        experience: Array.from(document.querySelectorAll('.filter-checkbox:checked'))
            .filter(cb => ['entry', 'intermediate', 'expert'].includes(cb.value))
            .map(cb => cb.value)
    };
    
    filteredWorkers = workersData.filter(worker => {
        const matchesSearch = searchTerm === '' || 
            worker.name.toLowerCase().includes(searchTerm) ||
            worker.title.toLowerCase().includes(searchTerm) ||
            worker.skills.some(skill => skill.toLowerCase().includes(searchTerm));
        
        const matchesLocation = location === '' ||
            worker.city.toLowerCase().includes(location) ||
            worker.state.toLowerCase().includes(location);
        
        const matchesRating = rating === 0 || worker.rating >= rating;
        
        const matchesEmploymentType = checkedFilters.employmentType.length === 0 ||
            checkedFilters.employmentType.some(type => worker.employmentType.includes(type));
        
        const matchesExperience = checkedFilters.experience.length === 0 ||
            checkedFilters.experience.includes(worker.experience);
        
        return matchesSearch && matchesLocation && matchesRating && 
               matchesEmploymentType && matchesExperience;
    });
    
    // Sort results
    switch(sortBy) {
        case 'rating':
            filteredWorkers.sort((a, b) => b.rating - a.rating);
            break;
        case 'experience':
            const expOrder = { 'expert': 3, 'intermediate': 2, 'entry': 1 };
            filteredWorkers.sort((a, b) => expOrder[b.experience] - expOrder[a.experience]);
            break;
        case 'price-low':
            filteredWorkers.sort((a, b) => a.hourlyRate - b.hourlyRate);
            break;
        case 'price-high':
            filteredWorkers.sort((a, b) => b.hourlyRate - a.hourlyRate);
            break;
        default:
            // recent (default)
            break;
    }
    
    displayWorkers(filteredWorkers);
    updateResultCount();
}

function displayWorkers(workers) {
    const resultsGrid = document.getElementById('resultsGrid');
    const noResults = document.getElementById('noResults');
    
    if (workers.length === 0) {
        resultsGrid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    resultsGrid.innerHTML = workers.map((worker, index) => `
        <div class="col-lg-6 mb-4">
            <div class="card border-0 shadow-sm h-100 result-card" 
                 onclick="showWorkerDetails(${worker.id})" style="cursor: pointer;">
                <div class="card-body">
                    <div class="d-flex align-items-start mb-3">
                        <img src="${worker.image}" alt="${worker.name}" 
                             class="rounded-circle me-3" width="60" height="60">
                        <div class="flex-grow-1">
                            <h5 class="card-title fw-bold mb-1">${worker.name}</h5>
                            <p class="card-text text-muted small mb-2">${worker.title}</p>
                            <div class="result-card-rating">
                                ${'⭐'.repeat(Math.floor(worker.rating))} ${worker.rating.toFixed(1)} (${worker.reviews} reviews)
                            </div>
                        </div>
                    </div>
                    <p class="card-text small mb-3">${worker.description}</p>
                    <div class="result-card-price mb-3">
                        $${worker.hourlyRate}/hour
                    </div>
                    <div class="mb-3">
                        ${worker.skills.slice(0, 3).map(skill => 
                            `<span class="badge bg-light text-dark me-2 mb-2">${skill}</span>`
                        ).join('')}
                        ${worker.skills.length > 3 ? `<span class="badge bg-light text-dark">+${worker.skills.length - 3}</span>` : ''}
                    </div>
                    <div class="d-flex gap-2">
                        <span class="badge bg-info text-dark">📍 ${worker.city}, ${worker.state}</span>
                        <span class="badge bg-success text-white">Available</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function showWorkerDetails(workerId) {
    const worker = workersData.find(w => w.id === workerId);
    if (!worker) return;
    
    document.getElementById('workerName').textContent = worker.name;
    document.getElementById('workerDetails').innerHTML = `
        <div class="text-center mb-4">
            <img src="${worker.image}" alt="${worker.name}" class="rounded-circle mb-3" width="100" height="100">
            <h4 class="fw-bold">${worker.name}</h4>
            <p class="text-muted mb-2">${worker.title}</p>
            <div class="mb-3">
                ${'⭐'.repeat(Math.floor(worker.rating))} ${worker.rating.toFixed(1)} (${worker.reviews} reviews)
            </div>
        </div>
        
        <div class="row mb-4">
            <div class="col-6">
                <h6 class="fw-bold">Hourly Rate</h6>
                <p class="text-primary fw-bold">$${worker.hourlyRate}/hour</p>
            </div>
            <div class="col-6">
                <h6 class="fw-bold">Location</h6>
                <p>${worker.city}, ${worker.state}</p>
            </div>
            <div class="col-6">
                <h6 class="fw-bold">Experience Level</h6>
                <p class="text-capitalize">${worker.experience}</p>
            </div>
            <div class="col-6">
                <h6 class="fw-bold">Employment Type</h6>
                <p>${worker.employmentType.map(t => t.replace('-', ' ')).join(', ')}</p>
            </div>
        </div>
        
        <h6 class="fw-bold mb-3">About</h6>
        <p class="text-muted mb-4">${worker.description}</p>
        
        <h6 class="fw-bold mb-3">Skills</h6>
        <div class="mb-4">
            ${worker.skills.map(skill => 
                `<span class="badge bg-primary me-2 mb-2">${skill}</span>`
            ).join('')}
        </div>
        
        <h6 class="fw-bold mb-3">Reviews</h6>
        <div class="review-sample mb-3">
            <div class="d-flex justify-content-between align-items-start mb-2">
                <h6 class="mb-0">Great work!</h6>
                <small class="text-muted">2 weeks ago</small>
            </div>
            <p class="text-muted small">Excellent communication and professional service. Highly recommended!</p>
            <small class="text-muted">- John D.</small>
        </div>
    `;
    
    const workerModal = new bootstrap.Modal(document.getElementById('workerModal'));
    workerModal.show();
}

function contactWorker() {
    showNotification('Contact form will open in email client', 'info');
}

function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('locationFilter').value = '';
    document.getElementById('ratingFilter').value = '0';
    document.getElementById('ratingValue').textContent = 'Any';
    document.getElementById('sortBy').value = 'recent';
    document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);
    filteredWorkers = [...workersData];
    displayWorkers(filteredWorkers);
    updateResultCount();
}

function updateResultCount() {
    const count = filteredWorkers.length;
    document.getElementById('resultCount').textContent = 
        count === 0 ? 'No workers found' : `Showing ${count} worker${count !== 1 ? 's' : ''}`;
}