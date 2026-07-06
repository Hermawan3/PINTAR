// ===== Fungsi Tanggal & Waktu =====
function updateDateTime() {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    const now = new Date();
    const dateString = now.toLocaleDateString('id-ID', options);
    
    document.getElementById('current-date').textContent = dateString;
}

// Update tanggal saat halaman dimuat
updateDateTime();

// Update tanggal setiap menit
setInterval(updateDateTime, 60000);

// ===== Navigation Active State =====
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class dari semua item
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Tambah active class ke item yang diklik
            this.classList.add('active');
            
            // Simulasi navigasi
            const pageName = this.querySelector('span').textContent;
            console.log('Navigasi ke:', pageName);
        });
    });
});

// ===== Action Buttons Handler =====
document.addEventListener('DOMContentLoaded', function() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const actionText = this.querySelector('span').textContent;
            
            switch(actionText) {
                case 'Catat Kehadiran':
                    handleCatatKehadiran();
                    break;
                case 'Beri Nilai':
                    handleBeriNilai();
                    break;
                case 'Lihat Laporan':
                    handleLihatLaporan();
                    break;
                case 'Tambah Murid':
                    handleTambahMurid();
                    break;
            }
        });
    });
});

// ===== Handler Functions =====
function handleCatatKehadiran() {
    showNotification('Membuka halaman pencatatan kehadiran...', 'info');
    console.log('Navigate to: Catat Kehadiran');
    // window.location.href = '/attendance';
}

function handleBeriNilai() {
    showNotification('Membuka halaman pemberian nilai...', 'info');
    console.log('Navigate to: Beri Nilai');
    // window.location.href = '/grades';
}

function handleLihatLaporan() {
    showNotification('Membuka halaman laporan...', 'info');
    console.log('Navigate to: Laporan');
    // window.location.href = '/reports';
}

function handleTambahMurid() {
    showNotification('Membuka form tambah murid...', 'info');
    console.log('Navigate to: Tambah Murid');
    // window.location.href = '/students/new';
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification-toast notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getIconForType(type)}"></i>
        <p>${message}</p>
        <button class="close-btn">&times;</button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        border-left: 4px solid;
        max-width: 400px;
    `;
    
    // Set border color based on type
    const borderColors = {
        'success': '#48bb78',
        'error': '#f56565',
        'warning': '#ed8936',
        'info': '#4299e1'
    };
    
    notification.style.borderLeftColor = borderColors[type] || borderColors['info'];
    notification.querySelector('i').style.color = borderColors[type] || borderColors['info'];
    
    // Close button handler
    notification.querySelector('.close-btn').addEventListener('click', function() {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function getIconForType(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || icons['info'];
}

// ===== Smooth Scroll for Links =====
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// ===== Animation for Cards =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .kpi-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease-out';
    observer.observe(el);
});

// ===== Responsive Menu Toggle =====
function setupResponsiveMenu() {
    if (window.innerWidth <= 768) {
        // Untuk mobile, tambahkan event listener untuk hamburger menu jika ada
        console.log('Mobile view activated');
    }
}

window.addEventListener('resize', setupResponsiveMenu);
setupResponsiveMenu();

// ===== Add CSS Animation Keyframes =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }

    .notification-toast {
        animation: slideInRight 0.3s ease-out;
    }

    .notification-toast.removing {
        animation: slideOutRight 0.3s ease-out;
    }
`;
document.head.appendChild(style);

// ===== Console Log for Development =====
console.log('🎉 PINTAR Dashboard Beranda Loaded Successfully!');
console.log('Siap untuk mengelola kelas dan murid Anda 📚');

// ===== Dummy Data for Simulation =====
const dashboardData = {
    teacher: {
        name: 'Ibu Siti Nurhaliza',
        email: 'siti.nurhaliza@sekolah.sch.id',
        phone: '+62 812-3456-7890'
    },
    classes: [
        { id: 1, name: 'TK A (Pagi)', students: 15, status: 'active' },
        { id: 2, name: 'TK B (Sore)', students: 13, status: 'active' },
        { id: 3, name: 'KB (Khusus)', students: 8, status: 'inactive' },
        { id: 4, name: 'TPA (Program Khusus)', students: 20, status: 'active' }
    ],
    stats: {
        totalClasses: 4,
        totalStudents: 56,
        presentToday: 52,
        absentToday: 4
    }
};

// ===== Export for Testing =====
window.PINTAR_Dashboard = {
    data: dashboardData,
    showNotification: showNotification,
    handleCatatKehadiran: handleCatatKehadiran,
    handleBeriNilai: handleBeriNilai,
    handleLihatLaporan: handleLihatLaporan,
    handleTambahMurid: handleTambahMurid
};
