 // Document Ready Function
        $(document).ready(function() {
            // Mobile Menu Toggle
            $('#mobileMenuBtn').click(function() {
                $('#navLinks').toggleClass('active');
                $(this).find('i').toggleClass('fa-bars fa-times');
            });
            
            // Close mobile menu when clicking on a link
            $('.nav-links a').click(function() {
                $('#navLinks').removeClass('active');
                $('#mobileMenuBtn').find('i').removeClass('fa-times').addClass('fa-bars');
            });
            
            // Scroll to Top Button Functionality
            const scrollTopBtn = $('#scrollTopBtn');
            
            // Show/hide scroll to top button
            $(window).scroll(function() {
                // Sticky Header
                if ($(this).scrollTop() > 100) {
                    $('#header').addClass('header-scrolled');
                } else {
                    $('#header').removeClass('header-scrolled');
                }
                
                // Scroll to top button
                if ($(this).scrollTop() > 300) {
                    scrollTopBtn.addClass('show');
                } else {
                    scrollTopBtn.removeClass('show');
                }
            });
            
            // Scroll to top when button is clicked
            scrollTopBtn.click(function() {
                $('html, body').animate({
                    scrollTop: 0
                }, 800);
                return false;
            });
            
            // Active Navigation Link Based on Scroll Position
            $(window).on('scroll', function() {
                var scrollPos = $(document).scrollTop() + 100;
                
                $('.nav-links a').each(function() {
                    var currLink = $(this);
                    var refElement = $(currLink.attr('href'));
                    
                    if (refElement.length && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                        $('.nav-links a').removeClass('active');
                        currLink.addClass('active');
                    }
                });
            });
            
            // Typing Animation for Hero Text
            const texts = ["Expert Legal Representation", "Justice With Integrity", "Your Trusted Legal Partner"];
            let speed = 100;
            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            
            function typeText() {
                const currentText = texts[textIndex];
                
                if (isDeleting) {
                    // Deleting text
                    document.getElementById("typingText").textContent = currentText.substring(0, charIndex - 1);
                    charIndex--;
                    speed = 50;
                } else {
                    // Writing text
                    document.getElementById("typingText").textContent = currentText.substring(0, charIndex + 1);
                    charIndex++;
                    speed = 100;
                }
                
                // If text is fully written
                if (!isDeleting && charIndex === currentText.length) {
                    isDeleting = true;
                    speed = 1000; // Pause at end
                }
                // If text is fully deleted
                else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    speed = 500; // Pause before typing next text
                }
                
                setTimeout(typeText, speed);
            }
            
            // Start typing animation after page loads
            setTimeout(typeText, 1000);
            
            // Animated Counters
            function animateCounter() {
                $('.stat-number').each(function() {
                    var $this = $(this);
                    var countTo = $this.attr('data-count');
                    var duration = 2000;
                    
                    $({ countNum: 0 }).animate(
                        { countNum: countTo },
                        {
                            duration: duration,
                            easing: 'swing',
                            step: function() {
                                $this.text(Math.floor(this.countNum));
                            },
                            complete: function() {
                                $this.text(this.countNum);
                            }
                        }
                    );
                });
            }
            
            // Trigger counter animation when in viewport
            function checkCounterVisibility() {
                var $statsSection = $('.stats');
                var windowHeight = $(window).height();
                var scrollTop = $(window).scrollTop();
                var statsTop = $statsSection.offset().top;
                
                if (scrollTop + windowHeight > statsTop + 100) {
                    animateCounter();
                    $(window).off('scroll', checkCounterVisibility);
                }
            }
            
            $(window).on('scroll', checkCounterVisibility);
            checkCounterVisibility(); // Check on page load
            
            // Animate Service Cards on Scroll
            function animateOnScroll() {
                $('.service-card').each(function(index) {
                    var elementTop = $(this).offset().top;
                    var elementBottom = elementTop + $(this).outerHeight();
                    var viewportTop = $(window).scrollTop();
                    var viewportBottom = viewportTop + $(window).height();
                    
                    if (elementBottom > viewportTop && elementTop < viewportBottom - 100) {
                        $(this).css({
                            'opacity': '1',
                            'transform': 'translateY(0)',
                            'transition': 'all 0.8s ease ' + (index * 0.1) + 's'
                        });
                    }
                });
            }
            
            // Initial check for service cards
            animateOnScroll();
            $(window).on('scroll', animateOnScroll);
            
            // Contact Form Submission
            $('#contactForm').submit(function(e) {
                e.preventDefault();
                
                // Get form values
                var name = $('#name').val();
                var email = $('#email').val();
                var phone = $('#phone').val();
                var message = $('#message').val();
                
                // Basic validation
                if (name && email && message) {
                    // In a real application, you would send this data to a server
                    // For demonstration, we'll just show an alert
                    alert('Thank you, ' + name + '! Your message has been sent. We will contact you soon.');
                    
                    // Reset form
                    $('#contactForm')[0].reset();
                    
                    // Focus back on name field
                    $('#name').focus();
                } else {
                    alert('Please fill in all required fields.');
                }
            });
            
            // Smooth Scrolling for Navigation Links
            $('a[href^="#"]').on('click', function(e) {
                e.preventDefault();
                
                var target = this.hash;
                var $target = $(target);
                
                $('html, body').animate({
                    'scrollTop': $target.offset().top - 80
                }, 800, 'swing');
            });
            
            // Form Input Animation
            $('.form-control').focus(function() {
                $(this).parent().addClass('focused');
            }).blur(function() {
                if ($(this).val() === '') {
                    $(this).parent().removeClass('focused');
                }
            });
            
            // Initialize some animations on page load
            $('.hero h1, .hero p, .hero-btns').addClass('fade-in');
        });