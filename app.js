// Enhanced Uruk Health Application JavaScript
class UrukHealthApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.userData = {
            name: "Dr. Rajesh Kumar", 
            age: 45,
            medicalId: "URK-2024-1001",
            phone: "+91 9876543210",
            email: "rajesh.kumar@email.com",
            emergencyContact: "Sunita Kumar - +91 9876543211",
            role: "patient",
            blockchainId: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
            healthScore: 85,
            aiInsights: ["Blood pressure trending upward", "Exercise routine needs improvement", "Medication adherence excellent"]
        };
        this.vitalsData = [
            {
                date: "2024-10-07",
                heartRate: 72,
                bloodPressure: "120/80",
                temperature: 98.6,
                oxygenSat: 98,
                aiAnalysis: "Vitals are within normal range. Consider monitoring blood pressure trend.",
                blockchainHash: "0xabc123def456",
                riskLevel: "low"
            },
            {
                date: "2024-10-06", 
                heartRate: 75,
                bloodPressure: "118/78",
                temperature: 98.4,
                oxygenSat: 97,
                aiAnalysis: "Slight improvement in heart rate. Continue current exercise routine.",
                blockchainHash: "0xdef456ghi789",
                riskLevel: "low"
            }
        ];
        this.doctorData = {
            monthlyEarnings: 125000,
            weeklyEarnings: 28500,
            totalPatients: 342,
            consultationFee: 800,
            platformCommission: 15,
            averageRating: 4.8,
            consultationsThisMonth: 156,
            upcomingAppointments: 8
        };
        this.emergencyContacts = [
            {name: "Uruk Emergency", number: "1800-URUK-911", type: "primary"},
            {name: "Local Ambulance", number: "102", type: "emergency"},
            {name: "Family Contact", number: "+91 9876543211", type: "personal"}
        ];
        this.notifications = [
            {
                id: 1,
                type: "ai_insight",
                message: "AI detected potential health improvement opportunity",
                priority: "medium",
                time: "2 hours ago"
            },
            {
                id: 2,
                type: "blockchain_verification",
                message: "Medical record successfully secured on blockchain",
                priority: "info",
                time: "4 hours ago"
            }
        ];
        this.charts = {};
        this.init();
    }

    init() {
        this.showLoadingScreen();
        setTimeout(() => {
            this.hideLoadingScreen();
            this.setupEventListeners();
            this.initializeDashboard();
            this.setupCharts();
            this.renderVitalsHistory();
            this.renderEmergencyContacts();
            this.renderNotifications();
            this.updateActivityFeed();
        }, 2000);
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.remove('hidden');
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const app = document.getElementById('app');
        
        loadingScreen.classList.add('hidden');
        app.classList.add('loaded');
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const page = e.currentTarget.getAttribute('data-page');
                this.navigateToPage(page);
            });
        });

        // Quick actions
        document.getElementById('emergencyBtn')?.addEventListener('click', () => {
            this.navigateToPage('emergency');
        });

        document.getElementById('addVitalsBtn')?.addEventListener('click', () => {
            this.navigateToPage('vitals');
        });

        document.getElementById('bookAppointmentBtn')?.addEventListener('click', () => {
            this.navigateToPage('appointments');
        });

        document.getElementById('aiChatBtn')?.addEventListener('click', () => {
            this.navigateToPage('ai-assistant');
        });

        // Floating emergency button
        document.getElementById('floatingEmergency')?.addEventListener('click', () => {
            this.navigateToPage('emergency');
        });

        // Vitals form
        document.getElementById('vitalsForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveVitals();
        });

        // Emergency buttons
        document.getElementById('callEmergencyBtn')?.addEventListener('click', () => {
            this.callEmergency();
        });

        document.getElementById('shareLocationBtn')?.addEventListener('click', () => {
            this.shareLocation();
        });

        // AI features
        document.querySelectorAll('.feature-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const feature = e.currentTarget.getAttribute('data-feature');
                this.activateAIFeature(feature);
            });
        });

        // Chat functionality
        document.getElementById('sendChatBtn')?.addEventListener('click', () => {
            this.sendChatMessage();
        });

        document.getElementById('chatInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendChatMessage();
            }
        });

        // Modal controls
        document.getElementById('closeVitalsModal')?.addEventListener('click', () => {
            this.hideModal('vitalsModal');
        });

        document.getElementById('closeNotificationModal')?.addEventListener('click', () => {
            this.hideModal('notificationModal');
        });

        // Notifications
        document.getElementById('notificationBtn')?.addEventListener('click', () => {
            this.showModal('notificationModal');
        });

        // Theme toggle
        document.getElementById('themeToggle')?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Sidebar toggle
        document.getElementById('sidebarToggle')?.addEventListener('click', () => {
            this.toggleSidebar();
        });
    }

    navigateToPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show selected page
        const selectedPage = document.getElementById(pageName);
        if (selectedPage) {
            selectedPage.classList.add('active');
        }

        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        const navItem = document.querySelector(`[data-page="${pageName}"]`);
        if (navItem) {
            navItem.classList.add('active');
        }

        // Update page title and breadcrumb
        const titles = {
            'dashboard': 'Health Dashboard',
            'vitals': 'Health Vitals',
            'ai-assistant': 'AI Assistant',
            'medical-records': 'Medical Records',
            'appointments': 'Appointments',
            'pharmacy': 'Pharmacy',
            'doctor-portal': 'Doctor Portal',
            'blockchain': 'Blockchain Security',
            'emergency': 'Emergency Services'
        };

        document.getElementById('pageTitle').textContent = titles[pageName] || 'Uruk Health';
        document.getElementById('currentPage').textContent = titles[pageName] || 'Dashboard';

        this.currentPage = pageName;

        // Initialize page-specific functionality
        if (pageName === 'doctor-portal') {
            this.initializeDoctorPortal();
        }
    }

    initializeDashboard() {
        // Animate health score
        this.animateHealthScore();
        
        // Update AI insights
        this.updateAIInsights();
        
        // Update quick actions with real functionality
        this.setupQuickActions();
    }

    animateHealthScore() {
        const circle = document.querySelector('.progress-ring-circle');
        const scoreNumber = document.querySelector('.score-number');
        
        if (circle && scoreNumber) {
            // Add gradient definition to SVG
            const svg = document.querySelector('.progress-ring');
            if (svg && !svg.querySelector('defs')) {
                const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
                gradient.setAttribute('id', 'healthGradient');
                
                const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                stop1.setAttribute('offset', '0%');
                stop1.setAttribute('stop-color', '#dc2626');
                
                const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                stop2.setAttribute('offset', '100%');
                stop2.setAttribute('stop-color', '#16a34a');
                
                gradient.appendChild(stop1);
                gradient.appendChild(stop2);
                defs.appendChild(gradient);
                svg.appendChild(defs);
            }

            // Animate the circle
            setTimeout(() => {
                circle.classList.add('animate');
                // Animate the number counting up
                let currentScore = 0;
                const targetScore = this.userData.healthScore;
                const increment = targetScore / 50;
                
                const countUp = setInterval(() => {
                    currentScore += increment;
                    if (currentScore >= targetScore) {
                        currentScore = targetScore;
                        clearInterval(countUp);
                    }
                    scoreNumber.textContent = Math.round(currentScore);
                }, 30);
            }, 500);
        }
    }

    updateAIInsights() {
        const insightsList = document.getElementById('aiInsightsList');
        if (insightsList) {
            insightsList.innerHTML = '';
            this.userData.aiInsights.forEach((insight, index) => {
                const li = document.createElement('li');
                li.textContent = insight;
                li.style.animationDelay = `${index * 0.2}s`;
                li.style.animation = 'fadeInUp 0.5s ease forwards';
                li.style.opacity = '0';
                insightsList.appendChild(li);
            });
        }
    }

    setupQuickActions() {
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach((btn, index) => {
            btn.style.animationDelay = `${index * 0.1}s`;
            btn.style.animation = 'fadeInUp 0.5s ease forwards';
        });
    }

    setupCharts() {
        this.createVitalsChart();
        this.createEarningsChart();
    }

    createVitalsChart() {
        const ctx = document.getElementById('vitalsChart');
        if (!ctx) return;

        const dates = this.vitalsData.map(v => new Date(v.date).toLocaleDateString());
        const heartRates = this.vitalsData.map(v => v.heartRate);
        const temperatures = this.vitalsData.map(v => v.temperature);

        this.charts.vitals = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates.reverse(),
                datasets: [{
                    label: 'Heart Rate (bpm)',
                    data: heartRates.reverse(),
                    borderColor: '#dc2626',
                    backgroundColor: 'rgba(220, 38, 38, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Temperature (°F)',
                    data: temperatures.reverse(),
                    borderColor: '#16a34a',
                    backgroundColor: 'rgba(22, 163, 74, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y1'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Heart Rate (bpm)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Temperature (°F)'
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                    }
                }
            }
        });
    }

    createEarningsChart() {
        const ctx = document.getElementById('earningsChart');
        if (!ctx) return;

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
        const earnings = [85000, 92000, 88000, 105000, 112000, 98000, 115000, 108000, 118000, 125000];

        this.charts.earnings = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                    label: 'Monthly Earnings (₹)',
                    data: earnings,
                    backgroundColor: [
                        '#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', 
                        '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'
                    ],
                    borderRadius: 8,
                    borderSkipped: false
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
                        title: {
                            display: true,
                            text: 'Earnings (₹)'
                        }
                    }
                }
            }
        });
    }

    saveVitals() {
        const heartRate = document.getElementById('heartRate').value;
        const bloodPressure = document.getElementById('bloodPressure').value;
        const temperature = document.getElementById('temperature').value;
        const oxygenSat = document.getElementById('oxygenSat').value;

        if (!heartRate || !bloodPressure || !temperature || !oxygenSat) {
            this.showToast('Please fill in all vital signs', 'error');
            return;
        }

        // Simulate API call
        this.showToast('Saving vitals...', 'info');
        
        setTimeout(() => {
            const newVital = {
                date: new Date().toISOString().split('T')[0],
                heartRate: parseInt(heartRate),
                bloodPressure: bloodPressure,
                temperature: parseFloat(temperature),
                oxygenSat: parseInt(oxygenSat),
                aiAnalysis: this.generateAIAnalysis(heartRate, bloodPressure, temperature, oxygenSat),
                blockchainHash: this.generateBlockchainHash(),
                riskLevel: this.assessRiskLevel(heartRate, bloodPressure, temperature, oxygenSat)
            };

            this.vitalsData.unshift(newVital);
            this.renderVitalsHistory();
            this.updateVitalsChart();
            
            // Show AI analysis modal
            this.showAIAnalysis(newVital.aiAnalysis);
            
            // Reset form
            document.getElementById('vitalsForm').reset();
            
            this.showToast('Vitals saved successfully!', 'success');
        }, 1500);
    }

    generateAIAnalysis(heartRate, bloodPressure, temperature, oxygenSat) {
        const analyses = [
            "Vitals are within normal range. Great job maintaining your health!",
            "Consider consulting with your doctor about the blood pressure trend.",
            "Excellent oxygen saturation levels. Keep up the good work!",
            "Temperature is normal. Continue monitoring for any changes.",
            "Heart rate shows improvement. Your exercise routine is working!"
        ];
        
        // Simple AI logic based on vitals
        if (heartRate > 100 || heartRate < 60) {
            return "Heart rate is outside normal range. Consider consulting your physician.";
        }
        if (temperature > 100.4) {
            return "Elevated temperature detected. Please monitor closely and consult if needed.";
        }
        if (oxygenSat < 95) {
            return "Oxygen saturation is low. Please seek medical attention immediately.";
        }
        
        return analyses[Math.floor(Math.random() * analyses.length)];
    }

    generateBlockchainHash() {
        const chars = '0123456789abcdef';
        let hash = '0x';
        for (let i = 0; i < 12; i++) {
            hash += chars[Math.floor(Math.random() * chars.length)];
        }
        return hash;
    }

    assessRiskLevel(heartRate, bloodPressure, temperature, oxygenSat) {
        if (heartRate > 120 || temperature > 101 || oxygenSat < 95) {
            return 'high';
        }
        if (heartRate > 100 || temperature > 99.5 || oxygenSat < 97) {
            return 'medium';
        }
        return 'low';
    }

    renderVitalsHistory() {
        const historyContainer = document.getElementById('vitalsHistory');
        if (!historyContainer) return;

        historyContainer.innerHTML = '';
        
        this.vitalsData.forEach((vital, index) => {
            const vitalElement = document.createElement('div');
            vitalElement.className = 'vital-record';
            vitalElement.style.animationDelay = `${index * 0.1}s`;
            vitalElement.style.animation = 'fadeInUp 0.5s ease forwards';
            vitalElement.style.opacity = '0';
            
            vitalElement.innerHTML = `
                <div class="vital-date">${new Date(vital.date).toLocaleDateString()}</div>
                <div class="vital-metrics">
                    <div class="vital-metric">
                        <span class="metric-label">Heart Rate:</span>
                        <span class="metric-value">${vital.heartRate} bpm</span>
                    </div>
                    <div class="vital-metric">
                        <span class="metric-label">Blood Pressure:</span>
                        <span class="metric-value">${vital.bloodPressure} mmHg</span>
                    </div>
                    <div class="vital-metric">
                        <span class="metric-label">Temperature:</span>
                        <span class="metric-value">${vital.temperature}°F</span>
                    </div>
                    <div class="vital-metric">
                        <span class="metric-label">Oxygen Sat:</span>
                        <span class="metric-value">${vital.oxygenSat}%</span>
                    </div>
                </div>
                <div class="ai-analysis-text">
                    <i class="fas fa-brain"></i> AI Analysis: ${vital.aiAnalysis}
                </div>
                <div class="blockchain-badge verified">
                    <i class="fas fa-cube"></i>
                    Secured: ${vital.blockchainHash}
                </div>
            `;
            
            historyContainer.appendChild(vitalElement);
        });
    }

    updateVitalsChart() {
        if (this.charts.vitals) {
            const dates = this.vitalsData.slice(0, 7).map(v => new Date(v.date).toLocaleDateString());
            const heartRates = this.vitalsData.slice(0, 7).map(v => v.heartRate);
            const temperatures = this.vitalsData.slice(0, 7).map(v => v.temperature);
            
            this.charts.vitals.data.labels = dates.reverse();
            this.charts.vitals.data.datasets[0].data = heartRates.reverse();
            this.charts.vitals.data.datasets[1].data = temperatures.reverse();
            this.charts.vitals.update();
        }
    }

    showAIAnalysis(analysis) {
        const analysisResult = document.getElementById('aiAnalysisResult');
        if (analysisResult) {
            analysisResult.innerHTML = `
                <div class="ai-analysis-content">
                    <div class="ai-icon">
                        <i class="fas fa-brain"></i>
                    </div>
                    <h4>AI Health Analysis</h4>
                    <p>${analysis}</p>
                    <div class="ai-recommendations">
                        <h5>Recommendations:</h5>
                        <ul>
                            <li>Continue monitoring your vitals regularly</li>
                            <li>Maintain a balanced diet and exercise routine</li>
                            <li>Consult with your doctor if you notice any concerning trends</li>
                        </ul>
                    </div>
                </div>
            `;
        }
        this.showModal('vitalsModal');
    }

    initializeDoctorPortal() {
        // Animate stat cards
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.style.animation = 'fadeInUp 0.5s ease forwards';
        });

        // Update earnings chart when portal is opened
        setTimeout(() => {
            if (this.charts.earnings) {
                this.charts.earnings.update();
            }
        }, 500);
    }

    activateAIFeature(feature) {
        const responses = {
            'symptom-checker': "I'm here to help assess your symptoms. Please describe what you're experiencing.",
            'health-recommendations': "Based on your recent vitals, I recommend maintaining your current exercise routine and monitoring blood pressure trends.",
            'medication-reminders': "You have no upcoming medication reminders. Great adherence record!",
            'risk-assessment': "Your current health risk level is LOW based on recent vitals and medical history."
        };

        this.addChatMessage('ai', responses[feature] || "Feature activated. How can I help you?");
    }

    sendChatMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        
        if (!message) return;

        this.addChatMessage('user', message);
        chatInput.value = '';

        // Simulate AI response
        setTimeout(() => {
            const aiResponse = this.generateAIResponse(message);
            this.addChatMessage('ai', aiResponse);
        }, 1000);
    }

    addChatMessage(sender, message) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${sender}`;
        messageElement.innerHTML = `
            <div class="message-content">
                <div class="message-avatar">
                    <i class="fas fa-${sender === 'ai' ? 'robot' : 'user'}"></i>
                </div>
                <div class="message-text">${message}</div>
            </div>
            <div class="message-time">${new Date().toLocaleTimeString()}</div>
        `;

        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    generateAIResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('blood pressure') || lowerMessage.includes('bp')) {
            return "Your recent blood pressure readings show a slight upward trend. I recommend monitoring it daily and consulting with your cardiologist if the trend continues.";
        }
        if (lowerMessage.includes('heart rate') || lowerMessage.includes('pulse')) {
            return "Your heart rate is within normal range. The recent readings show good cardiovascular health.";
        }
        if (lowerMessage.includes('temperature') || lowerMessage.includes('fever')) {
            return "Your temperature readings are normal. Continue monitoring if you feel unwell.";
        }
        if (lowerMessage.includes('appointment') || lowerMessage.includes('doctor')) {
            return "Based on your health profile, I recommend scheduling a cardiology follow-up in the next 2 months.";
        }
        
        return "I understand your concern. Based on your recent health data, I recommend continuing your current health routine and consulting with your healthcare provider for personalized advice.";
    }

    callEmergency() {
        this.showToast('Connecting to emergency services...', 'info');
        
        setTimeout(() => {
            this.showToast('Emergency call initiated. Help is on the way!', 'success');
            // In a real app, this would initiate an actual emergency call
        }, 2000);
    }

    shareLocation() {
        this.showToast('Sharing location with Uruk emergency team...', 'info');
        
        // Simulate location sharing
        setTimeout(() => {
            this.showToast('Location shared successfully. Emergency team has been notified.', 'success');
        }, 1500);
    }

    renderEmergencyContacts() {
        const contactsList = document.getElementById('emergencyContactsList');
        if (!contactsList) return;

        contactsList.innerHTML = '';
        
        this.emergencyContacts.forEach((contact, index) => {
            const contactElement = document.createElement('div');
            contactElement.className = 'contact-item';
            contactElement.style.animationDelay = `${index * 0.1}s`;
            contactElement.style.animation = 'fadeInUp 0.5s ease forwards';
            contactElement.style.opacity = '0';
            
            contactElement.innerHTML = `
                <div class="contact-info">
                    <div class="contact-name">${contact.name}</div>
                    <div class="contact-number">${contact.number}</div>
                </div>
                <span class="contact-type ${contact.type}">${contact.type}</span>
                <button class="btn btn--sm btn--primary" onclick="app.callContact('${contact.number}')">
                    <i class="fas fa-phone"></i>
                    Call
                </button>
            `;
            
            contactsList.appendChild(contactElement);
        });
    }

    callContact(number) {
        this.showToast(`Calling ${number}...`, 'info');
        // In a real app, this would initiate a phone call
    }

    renderNotifications() {
        const notificationsList = document.getElementById('notificationsList');
        if (!notificationsList) return;

        notificationsList.innerHTML = '';
        
        this.notifications.forEach((notification, index) => {
            const notificationElement = document.createElement('div');
            notificationElement.className = `notification-item ${notification.type}`;
            notificationElement.style.animationDelay = `${index * 0.1}s`;
            notificationElement.style.animation = 'fadeInUp 0.5s ease forwards';
            notificationElement.style.opacity = '0';
            
            notificationElement.innerHTML = `
                <div class="notification-title">${notification.message}</div>
                <div class="notification-time">${notification.time}</div>
            `;
            
            notificationsList.appendChild(notificationElement);
        });
    }

    updateActivityFeed() {
        const activityList = document.getElementById('activityList');
        if (!activityList) return;

        const activities = [
            {
                icon: 'vitals',
                title: 'Vitals recorded',
                time: '2 hours ago',
                type: 'vitals'
            },
            {
                icon: 'ai',
                title: 'AI health insight generated',
                time: '4 hours ago',
                type: 'ai'
            },
            {
                icon: 'blockchain',
                title: 'Medical record secured on blockchain',
                time: '6 hours ago',
                type: 'blockchain'
            }
        ];

        activityList.innerHTML = '';
        
        activities.forEach((activity, index) => {
            const activityElement = document.createElement('div');
            activityElement.className = 'activity-item';
            activityElement.style.animationDelay = `${index * 0.1}s`;
            activityElement.style.animation = 'fadeInUp 0.5s ease forwards';
            activityElement.style.opacity = '0';
            
            activityElement.innerHTML = `
                <div class="activity-icon ${activity.type}">
                    <i class="fas fa-${activity.icon === 'vitals' ? 'heartbeat' : activity.icon === 'ai' ? 'brain' : 'cube'}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-title">${activity.title}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            `;
            
            activityList.appendChild(activityElement);
        });
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    toggleTheme() {
        const body = document.body;
        const themeToggle = document.getElementById('themeToggle');
        
        if (body.hasAttribute('data-color-scheme')) {
            const currentTheme = body.getAttribute('data-color-scheme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-color-scheme', newTheme);
            
            themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        } else {
            body.setAttribute('data-color-scheme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        this.showToast('Theme updated!', 'success');
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
    }

    showToast(message, type = 'info') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add toast styles if not already present
        if (!document.querySelector('.toast-styles')) {
            const style = document.createElement('style');
            style.className = 'toast-styles';
            style.textContent = `
                .toast {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 8px;
                    padding: 16px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                    z-index: 3000;
                    transform: translateX(400px);
                    transition: transform 0.3s ease;
                    border-left: 4px solid;
                }
                .toast-success { border-left-color: #16a34a; }
                .toast-error { border-left-color: #dc2626; }
                .toast-info { border-left-color: #0ea5e9; }
                .toast.show { transform: translateX(0); }
                .toast-content {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .toast-success i { color: #16a34a; }
                .toast-error i { color: #dc2626; }
                .toast-info i { color: #0ea5e9; }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Initialize the application
const app = new UrukHealthApp();

// Add CSS for chat messages
const chatStyles = document.createElement('style');
chatStyles.textContent = `
    .chat-message {
        margin-bottom: 16px;
        animation: fadeInUp 0.3s ease;
    }
    .message-content {
        display: flex;
        gap: 12px;
        align-items: flex-start;
    }
    .message-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: white;
    }
    .chat-message.ai .message-avatar {
        background: linear-gradient(135deg, #8b5cf6, #a855f7);
    }
    .chat-message.user .message-avatar {
        background: linear-gradient(135deg, #0ea5e9, #3b82f6);
    }
    .message-text {
        flex: 1;
        padding: 12px 16px;
        border-radius: 12px;
        background: var(--color-bg-1);
        font-size: 14px;
        line-height: 1.5;
    }
    .message-time {
        font-size: 11px;
        color: var(--color-text-secondary);
        margin-left: 44px;
        margin-top: 4px;
    }
`;
document.head.appendChild(chatStyles);