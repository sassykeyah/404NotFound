document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin);
  // Wait for fonts to load before initialising SplitText
  document.fonts.ready.then(function() {
    console.log("Fonts loaded, initialising animations...");
    
    
    const scenes = document.querySelectorAll('.scene2, .scene3, .scene4, .scene5, .scene6');
    
    scenes.forEach(section => {
      const opacityReveal = section; 
      
      if (opacityReveal) {
        
        const paragraphs = section.querySelectorAll('p');
        let allChars = [];
        
        paragraphs.forEach(paragraph => {
          try {
            const split = SplitText.create(paragraph, { type: "chars" });
            if (split.chars) {
              allChars = allChars.concat(split.chars);
            }
          } catch (error) {
            console.error('SplitText error:', error);
          }
        });
        
        if (allChars.length > 0) {
          
          gsap.set(allChars, { opacity: 0.2 });
          
          
          gsap.to(allChars, {
            opacity: 1,
            duration: 1,
            stagger: 0.05,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: '+=400',
              scrub: true,
              pin: true,
              pinSpacing: true
            }
          });
        }
      }
    });
    
    let hasScrolled = false;
    function autoScrollToScene2() {
      if (!hasScrolled) {
        hasScrolled = true;
        gsap.to(window, {
          duration: 0.8,
          scrollTo: { y: document.querySelector('.scene2'), offsetY: 0 },
          ease: "power2.inOut"
        });
      }
    }
    
    window.addEventListener('scroll', autoScrollToScene2, { once: true });
    
    const buttons = document.querySelectorAll('.button');
    let correctButtonClicked = false;
    
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        if (this.textContent === '302') {
          
          correctButtonClicked = true;
          this.style.backgroundColor = '#4CAF50'; 
          this.style.color = '#fff';
          
          
          setTimeout(() => {
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: document.querySelector('.scene5'), offsetY: 0 },
              ease: "power2.inOut"
            });
          }, 500);
        } else {
          
          this.style.backgroundColor = '#f44336'; 
          this.style.color = '#fff';
          
          
          setTimeout(() => {
            this.style.backgroundColor = '#f7f1e5';
            this.style.color = '#1a1a19';
          }, 1000);
        }
      });
    });
    
    ScrollTrigger.batch('.scene5, .scene6', {
      onEnter: (elements) => {
        if (!correctButtonClicked) {
          
          gsap.to(window, {
            duration: 0.5,
            scrollTo: { y: document.querySelector('.scene4'), offsetY: 0 },
            ease: "power2.inOut"
          });
        }
      }
    });
    
    gsap.to("#main-title", {
      scrollTrigger: {
        trigger: "#main-title",
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      opacity: 0,
      y: -100,
      duration: 1
    });
  });
});
