// DOM Elements
const navToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const skillBars = document.querySelectorAll('.skill-progress');
const contactForm = document.querySelector('#contactForm');
const navbar = document.querySelector('.navbar');

// File Upload Elements
const fileDropZone = document.getElementById('fileDropZone');
const fileInput = document.getElementById('fileInput');
const browseFilesBtn = document.getElementById('browseFiles');
const fileList = document.getElementById('fileList');
let uploadedFiles = [];

// Mobile Menu Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    const bars = navToggle.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
});

// Close Mobile Menu on Link Click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    });
});

// Smooth Scrolling
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Indicator
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });

    // Navbar background on scroll
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
});

// Project Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Skill Bars Animation
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && bar.style.width === '0px') {
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, 200);
        }
    });
};

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // Animate sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Animate project cards
    projectCards.forEach((card, index) => {
        card.classList.add('scale-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.classList.add('scale-in');
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Initialize skill bars
    skillBars.forEach(bar => {
        bar.style.width = '0px';
        bar.style.transition = 'width 1.5s ease';
    });

    // Initial check for skill bars
    animateSkillBars();
});

// ===== FILE UPLOAD FUNCTIONALITY =====

// File type icons mapping
const fileIcons = {
    'pdf': 'fa-file-pdf',
    'doc': 'fa-file-word',
    'docx': 'fa-file-word',
    'xls': 'fa-file-excel',
    'xlsx': 'fa-file-excel',
    'ppt': 'fa-file-powerpoint',
    'pptx': 'fa-file-powerpoint',
    'txt': 'fa-file-alt',
    'jpg': 'fa-file-image',
    'jpeg': 'fa-file-image',
    'png': 'fa-file-image',
    'gif': 'fa-file-image',
    'zip': 'fa-file-archive',
    'rar': 'fa-file-archive',
    '7z': 'fa-file-archive',
    'default': 'fa-file'
};

// Get file icon based on extension
function getFileIcon(filename) {
    const extension = filename.split('.').pop().toLowerCase();
    return fileIcons[extension] || fileIcons['default'];
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Create file item element
function createFileItem(file) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.dataset.fileId = file.id;
    
    const fileIcon = getFileIcon(file.name);
    const fileSize = formatFileSize(file.size);
    
    fileItem.innerHTML = `
        <div class="file-info">
            <div class="file-icon">
                <i class="fas ${fileIcon}"></i>
            </div>
            <div class="file-details">
                <span class="file-name">${file.name}</span>
                <span class="file-size">${fileSize}</span>
            </div>
        </div>
        <button type="button" class="file-remove" data-file-id="${file.id}">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    return fileItem;
}

// Handle file selection
function handleFileSelection(files) {
    Array.from(files).forEach(file => {
        const fileId = Date.now() + Math.random();
        const fileObj = {
            id: fileId,
            name: file.name,
            size: file.size,
            type: file.type,
            file: file
        };
        
        uploadedFiles.push(fileObj);
        const fileItem = createFileItem(fileObj);
        fileList.appendChild(fileItem);
    });
    
    updateFileListVisibility();
}

// Update file list visibility
function updateFileListVisibility() {
    if (uploadedFiles.length > 0) {
        fileList.style.display = 'flex';
    } else {
        fileList.style.display = 'none';
    }
}

// Remove file from list
function removeFile(fileId) {
    uploadedFiles = uploadedFiles.filter(file => file.id !== fileId);
    const fileItem = document.querySelector(`[data-file-id="${fileId}"]`);
    if (fileItem) {
        fileItem.remove();
    }
    updateFileListVisibility();
}

// Browse files button click
browseFilesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    fileInput.click();
});

// File input change
fileInput.addEventListener('change', (e) => {
    handleFileSelection(e.target.files);
    fileInput.value = ''; // Reset input to allow selecting same file again
});

// Drag and drop events
fileDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileDropZone.classList.add('drag-over');
});

fileDropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    fileDropZone.classList.remove('drag-over');
});

fileDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    fileDropZone.classList.remove('drag-over');
    handleFileSelection(e.dataTransfer.files);
});

// Click on drop zone to open file dialog
fileDropZone.addEventListener('click', (e) => {
    if (e.target !== browseFilesBtn && !browseFilesBtn.contains(e.target)) {
        fileInput.click();
    }
});

// Remove file button click
fileList.addEventListener('click', (e) => {
    if (e.target.closest('.file-remove')) {
        const fileId = parseFloat(e.target.closest('.file-remove').dataset.fileId);
        removeFile(fileId);
    }
});

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Veuillez entrer une adresse email valide', 'error');
            return;
        }
        
        // Simulate form submission with files
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Create email content
            const emailContent = `Nouveau message de votre portfolio\n\n` +
                `De: ${name} (${email})\n` +
                `Sujet: ${subject}\n\n` +
                `Message:\n${message}\n\n` +
                `---\n` +
                `Envoyé depuis: ${window.location.href}`;
            
            // Add files information if any
            if (uploadedFiles.length > 0) {
                emailContent += `\n\nFichiers joints (${uploadedFiles.length}):\n`;
                uploadedFiles.forEach(file => {
                    emailContent += `- ${file.name} (${formatFileSize(file.size)})\n`;
                });
            }
            
            // Create mailto link
            const mailtoLink = `mailto:diabysankoumba871@gmail.com` +
                `?subject=${encodeURIComponent(`Portfolio: ${subject}`)}` +
                `&body=${encodeURIComponent(emailContent)}`;
            
            // Create a temporary link element to trigger the mailto
            const tempLink = document.createElement('a');
            tempLink.href = mailtoLink;
            tempLink.target = '_blank';
            tempLink.rel = 'noopener noreferrer';
            
            // Try to open email client
            try {
                tempLink.click();
                
                // Show notification and reset form
                setTimeout(() => {
                    showNotification('Votre client email s\'ouvre avec le message pré-rempli!', 'success');
                    contactForm.reset();
                    fileList.innerHTML = '';
                    uploadedFiles = [];
                    updateFileListVisibility();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            } catch (error) {
                // Fallback: show email content in a modal for manual copy
                showEmailModal(emailContent, subject);
                
                // Reset form anyway
                setTimeout(() => {
                    contactForm.reset();
                    fileList.innerHTML = '';
                    uploadedFiles = [];
                    updateFileListVisibility();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            }
        }, 1500);
    });
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#4299e1'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Email Modal Fallback
function showEmailModal(content, subject) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
    `;
    
    modalContent.innerHTML = `
        <h3 style="margin-bottom: 15px; color: #2c3e50;">Email à envoyer manuellement</h3>
        <p style="margin-bottom: 15px; color: #666;">
            <strong>Destinataire:</strong> diabysankoumba871@gmail.com<br>
            <strong>Sujet:</strong> Portfolio: ${subject}
        </p>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
            <pre style="white-space: pre-wrap; font-family: monospace; font-size: 14px; color: #333;">${content}</pre>
        </div>
        <div style="display: flex; gap: 10px; justify-content: flex-end;">
            <button id="copyEmailBtn" style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Copier le contenu
            </button>
            <button id="closeModalBtn" style="padding: 10px 20px; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Fermer
            </button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Copy button functionality
    document.getElementById('copyEmailBtn').addEventListener('click', () => {
        const fullEmail = `Destinataire: diabysankoumba871@gmail.com\nSujet: Portfolio: ${subject}\n\n${content}`;
        navigator.clipboard.writeText(fullEmail).then(() => {
            showNotification('Contenu copié dans le presse-papiers!', 'success');
        });
    });
    
    // Close button functionality
    document.getElementById('closeModalBtn').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Typing Effect for Hero Title
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// Initialize typing effect on load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});
