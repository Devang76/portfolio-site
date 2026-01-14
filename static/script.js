document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Fade-in animation setup
    document.querySelectorAll('.glass-card, .section-title, .hero-content').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Custom cursor follower (optional, simple logic)
    const cursor = document.querySelector('.cursor-follower');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }

    // Dynamic Greeting based on time
    const greetingElement = document.querySelector('.greeting');
    if (greetingElement) {
        const hour = new Date().getHours();
        let greetingText = "Hello, I'm";
        if (hour < 12) greetingText = "Good Morning, I'm";
        else if (hour < 18) greetingText = "Good Afternoon, I'm";
        else greetingText = "Good Evening, I'm";
        // greetingElement.textContent = greetingText; // Keeping 'Hello' simple for now
    }


    // Enhanced Image Modal Logic
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const extraContent = document.getElementById('extraContent');
    const closeBtn = document.querySelector('.close-modal');

    if (modal && modalImg) {
        document.querySelectorAll('.project-image-placeholder img').forEach(img => {
            img.addEventListener('click', () => {
                const audioSrc = img.getAttribute('data-audio');
                const mindmapSrc = img.getAttribute('data-mindmap');

                modal.classList.add('active');
                modalImg.src = img.src;
                document.body.style.overflow = 'hidden';

                // Reset extra content
                extraContent.innerHTML = '';

                if (audioSrc || mindmapSrc) {
                    let html = '';

                    if (mindmapSrc) {
                        html += `
                            <div class="extra-resource-card">
                                <h4><i class="fas fa-project-diagram"></i> Project Mind Map</h4>
                                <img src="${mindmapSrc}" class="mindmap-img" alt="Project Mind Map">
                            </div>
                        `;
                    }

                    if (audioSrc) {
                        html += `
                            <div class="extra-resource-card">
                                <h4><i class="fas fa-microphone-alt"></i> Audio Explanation</h4>
                                <audio controls style="width: 100%; filter: invert(0.8) hue-rotate(180deg);">
                                    <source src="${audioSrc}" type="audio/mpeg">
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        `;
                    }

                    extraContent.innerHTML = html;
                }
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                // Pause any playing audio in modal
                const modalAudio = extraContent.querySelector('audio');
                if (modalAudio) modalAudio.pause();
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-wrapper')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                const modalAudio = extraContent.querySelector('audio');
                if (modalAudio) modalAudio.pause();
            }
        });
    }

    const bioAudio = document.getElementById('bioAudio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.querySelector('.progress-container');
    const timeDisplay = document.getElementById('timeDisplay');
    const speedBtn = document.getElementById('speedBtn');

    if (bioAudio && playPauseBtn) {
        const icon = playPauseBtn.querySelector('i');

        const formatTime = (time) => {
            if (!time || isNaN(time) || time === Infinity) return '0:00';
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        };

        const updateDuration = () => {
            const duration = bioAudio.duration;
            const current = bioAudio.currentTime;

            // Debugging log (can be removed later)
            // console.log('Audio State:', { duration, current, readyState: bioAudio.readyState });

            let durationText = '0:00';
            let currentText = formatTime(current);

            // Ensure we have a valid duration before displaying
            if (duration && !isNaN(duration) && duration !== Infinity) {
                durationText = formatTime(duration);
            }

            if (timeDisplay) {
                timeDisplay.textContent = `${currentText} / ${durationText}`;
            }
        };

        // Initial check and event listeners
        if (bioAudio.readyState >= 1) {
            updateDuration();
        }

        // Force check duration periodically on load to handle race conditions
        const checkDurationInterval = setInterval(() => {
            if (bioAudio.duration && !isNaN(bioAudio.duration) && bioAudio.duration !== Infinity) {
                updateDuration();
                clearInterval(checkDurationInterval);
            }
        }, 500);

        // Clear interval after 5 seconds to prevent memory leaks if it never loads
        setTimeout(() => clearInterval(checkDurationInterval), 5000);

        bioAudio.addEventListener('loadedmetadata', updateDuration);
        bioAudio.addEventListener('loadeddata', updateDuration);
        bioAudio.addEventListener('durationchange', updateDuration);
        bioAudio.addEventListener('canplay', updateDuration);

        playPauseBtn.addEventListener('click', () => {
            if (bioAudio.paused) {
                bioAudio.play();
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            } else {
                bioAudio.pause();
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            }
        });

        bioAudio.addEventListener('timeupdate', () => {
            const duration = bioAudio.duration;
            if (duration && !isNaN(duration) && duration !== Infinity) {
                const percent = (bioAudio.currentTime / duration) * 100;
                progressBar.style.width = `${percent}%`;
            }
            updateDuration();
        });

        if (progressContainer) {
            progressContainer.addEventListener('click', (e) => {
                const width = progressContainer.clientWidth;
                const clickX = e.offsetX;
                const duration = bioAudio.duration;
                if (duration && !isNaN(duration) && duration !== Infinity) {
                    bioAudio.currentTime = (clickX / width) * duration;
                }
            });
        }

        bioAudio.addEventListener('ended', () => {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            progressBar.style.width = '0%';
            updateDuration();
        });

        // Speed Toggle Logic
        if (speedBtn) {
            speedBtn.addEventListener('click', () => {
                let currentRate = bioAudio.playbackRate;
                let newRate;
                if (currentRate === 1) newRate = 1.5;
                else if (currentRate === 1.5) newRate = 2;
                else newRate = 1;

                bioAudio.playbackRate = newRate;
                speedBtn.textContent = `${newRate}x`;
            });
        }
    }

    // Tree Roadmap Toggle Logic
    const treeToggles = document.querySelectorAll('.toggle-btn');

    if (treeToggles.length > 0) {
        treeToggles.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const card = btn.closest('.node-card');
                const parentLi = card.parentElement; // The LI containing card and UL
                const childrenUl = parentLi.querySelector('ul');

                if (childrenUl) {
                    childrenUl.classList.toggle('hidden');
                    btn.classList.toggle('collapsed');
                }
            });
        });
    }

    // Project Details Modal Logic
    const projectModal = document.getElementById('projectModal');
    const modalBody = projectModal ? projectModal.querySelector('.modal-container') : null;
    const closeProjectBtn = projectModal ? projectModal.querySelector('.close-project-modal') : null;

    if (projectModal && modalBody && closeProjectBtn) {
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const projectCard = btn.closest('.project-card');
                const projectTitle = projectCard.querySelector('h3').textContent;
                const detailContent = projectCard.querySelector('.project-detail-content-hidden');

                if (detailContent) {
                    // Populate Modal
                    modalBody.innerHTML = `
                        <div class="modal-header">
                            <h2>${projectTitle}</h2>
                        </div>
                        <div class="modal-inner-content">
                            ${detailContent.innerHTML}
                        </div>
                    `;

                    // Initialize tree toggles inside modal
                    const modalToggles = modalBody.querySelectorAll('.toggle-btn');
                    modalToggles.forEach(tBtn => {
                        tBtn.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const card = tBtn.closest('.node-card');
                            const parentLi = card.parentElement;
                            const childrenUl = parentLi.querySelector('ul');
                            if (childrenUl) {
                                childrenUl.classList.toggle('hidden');
                                tBtn.classList.toggle('collapsed');
                            }
                        });
                    });

                    // Show Modal
                    projectModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        closeProjectBtn.addEventListener('click', () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
            // Stop any playing video
            const video = modalBody.querySelector('video');
            if (video) video.pause();
        });

        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeProjectBtn.click();
            }
        });
    }

    // More Skills Toggle Logic
    document.querySelectorAll('.more-skills-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = btn.closest('.skill-category');
            card.classList.toggle('expanded');

            const isExpanded = card.classList.contains('expanded');
            btn.innerHTML = isExpanded ?
                `Less <i class="fas fa-chevron-up"></i>` :
                `More <i class="fas fa-chevron-down"></i>`;
        });
    });
});
