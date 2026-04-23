// DOM Elements
const navToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const skillBars = document.querySelectorAll('.skill-progress');
const contactForm = document.querySelector('#contactForm');
const navbar = document.querySelector('.navbar');

// File Upload Elements - Check if they exist before using them
let fileDropZone, fileInput, browseFilesBtn, fileList;
let uploadedFiles = [];

// Initialize file upload elements
function initializeFileElements() {
    fileDropZone = document.getElementById('fileDropZone');
    fileInput = document.getElementById('fileInput');
    browseFilesBtn = document.getElementById('browseFiles');
    fileList = document.getElementById('fileList');
}

// Initialize file upload functionality only if elements exist
function initializeFileUpload() {
    initializeFileElements();
    
    if (!fileDropZone || !fileInput || !browseFilesBtn || !fileList) {
        console.log('File upload elements not found, skipping initialization');
        return;
    }
    
    console.log('File upload elements found, initializing...');
    
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
}

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
    if (!fileList) return; // Check if fileList exists
    
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
    if (!fileList) return; // Check if fileList exists
    
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

// Contact Form Handling - Direct submission via Formspree with fallback
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
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
        
        // Add file list information to the form
        let fileListInfo = '';
        if (uploadedFiles.length > 0) {
            fileListInfo = `\n\nFichiers joints (${uploadedFiles.length}):\n`;
            uploadedFiles.forEach(file => {
                fileListInfo += `- ${file.name} (${formatFileSize(file.size)})\n`;
            });
        }
        
        // Update the message with file information
        const updatedMessage = message + fileListInfo;
        formData.set('message', updatedMessage);
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        try {
            // Try Formspree first
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showNotification('Message envoyé avec succès! Je vous répondrai dans les plus brefs délais.', 'success');
                contactForm.reset();
                fileList.innerHTML = '';
                uploadedFiles = [];
                updateFileListVisibility();
            } else {
                throw new Error('Formspree not configured');
            }
        } catch (error) {
            console.log('Formspree failed, using email fallback:', error);
            
            // Fallback to email client
            const emailContent = `Nouveau message de votre portfolio\n\n` +
                `De: ${name} (${email})\n` +
                `Sujet: ${subject}\n\n` +
                `Message:\n${updatedMessage}\n\n` +
                `---\n` +
                `Envoyé depuis: ${window.location.href}`;
            
            const mailtoLink = `mailto:diabysankoumba871@gmail.com` +
                `?subject=${encodeURIComponent(`Portfolio: ${subject}`)}` +
                `&body=${encodeURIComponent(emailContent)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            showNotification('Votre client email s\'ouvre avec le message pré-rempli!', 'success');
            contactForm.reset();
            fileList.innerHTML = '';
            uploadedFiles = [];
            updateFileListVisibility();
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
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
    
    // Initialize file upload functionality
    setTimeout(() => {
        initializeFileUpload();
    }, 100); // Small delay to ensure DOM is ready
});

// Also initialize on DOM content loaded (backup)
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initializeFileUpload();
    }, 50);
});
