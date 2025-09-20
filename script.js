document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin, ScrambleTextPlugin);
  // Wait for fonts to load before initialising SplitText
  document.fonts.ready.then(function() {
    console.log("Fonts loaded, initialising animations...");
    
    
    const scenes = document.querySelectorAll('.scene2');
    
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
    
    
    const scene4 = document.querySelector('.scene4');
    if (scene4) {
      const paragraphs = scene4.querySelectorAll('p');
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
        console.log('Scene4 characters found:', allChars.length);
        gsap.set(allChars, { opacity: 0.2 });
        
        gsap.to(allChars, {
          opacity: 1,
          duration: 0.1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: scene4,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          onComplete: () => {
            console.log('Scene4 animation complete');
          }
        });
      }
    }
    
    
    const autoScrollScenes = document.querySelectorAll('.scene3, .scene5');
    
    autoScrollScenes.forEach(section => {
      const paragraphs = section.querySelectorAll('p');
      let allChars = [];
      let textCompleted = false;
      let scrollListener = null;
      
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
            pinSpacing: true,
            onUpdate: (self) => {
              
              if (self.progress > 0.95 && !textCompleted) {
                textCompleted = true;
                
                
                scrollListener = () => {
                  if (textCompleted) {
                    const nextScene = section.classList.contains('scene3') ? '.scene4' : '.scene6';
                    gsap.to(window, {
                      duration: 1,
                      scrollTo: { y: document.querySelector(nextScene), offsetY: 0 },
                      ease: "power2.inOut"
                    });
                    
                    
                    window.removeEventListener('scroll', scrollListener);
                    scrollListener = null;
                  }
                };
                
                window.addEventListener('scroll', scrollListener, { once: true });
              }
            }
          }
        });
      }
    });
    
    
    const scene6 = document.querySelector('.scene6');
    if (scene6) {
      const scene6Text = scene6.querySelector('p');
      if (scene6Text) {
       
        gsap.set(scene6Text, { opacity: 0 });
        
       
        gsap.to(scene6Text, {
          opacity: 1,
          duration: 3,
          scrambleText: {
            text: "> 302 found!",
            chars: "upperCase",
            revealDelay: 1.5,
            speed: 0.3
          },
          scrollTrigger: {
            trigger: scene6,
            start: 'top top',
            end: '+=400',
            pin: true,
            pinSpacing: true
          },
          onComplete: () => {
            
            gsap.to(scene6Text, {
              color: '#4CAF50',
              duration: 0.3,
              repeat: -1,
              yoyo: true,
              repeatDelay: 0.2
            });
          }
        });
      }
    }
    
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
          
          
          const flashOverlay = document.createElement('div');
          flashOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(76, 175, 80, 0.3);
            z-index: 10000;
            pointer-events: none;
            opacity: 1;
            transition: opacity 0.3s ease;
          `;
          document.body.appendChild(flashOverlay);
          
          
          setTimeout(() => {
            flashOverlay.style.opacity = '0';
            setTimeout(() => {
              document.body.removeChild(flashOverlay);
            }, 300);
          }, 200);
          
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
          
          
          const flashOverlay = document.createElement('div');
          flashOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(244, 67, 54, 0.3);
            z-index: 10000;
            pointer-events: none;
            opacity: 1;
            transition: opacity 0.3s ease;
          `;
          document.body.appendChild(flashOverlay);
          
          
          setTimeout(() => {
            flashOverlay.style.opacity = '0';
            setTimeout(() => {
              document.body.removeChild(flashOverlay);
            }, 300);
          }, 200);
          
          
          setTimeout(() => {
            this.style.backgroundColor = '#f7f1e5';
            this.style.color = '#1a1a19';
          }, 1000);
        }
      });
    });
    
   
    const yResponse = document.getElementById('y-response');
    let yClicked = false;
    
    if (yResponse) {
      yResponse.style.cursor = 'pointer';
      
     
      setInterval(() => {
        if (!yClicked) {
          yResponse.style.color = '#4CAF50';
          yResponse.style.transition = 'color 0.3s ease';
          
          setTimeout(() => {
            if (!yClicked) {
              yResponse.style.color = '#f7f1e5';
            }
          }, 500);
        }
      }, 1000);
      
      
      yResponse.addEventListener('click', function() {
        if (!yClicked) {
          yClicked = true;
          this.style.color = '#4CAF50';
          
          // Create green screen flash overlay
          const flashOverlay = document.createElement('div');
          flashOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(76, 175, 80, 0.3);
            z-index: 10000;
            pointer-events: none;
            opacity: 1;
            transition: opacity 0.3s ease;
          `;
          document.body.appendChild(flashOverlay);
          
          // Remove flash overlay after brief moment
          setTimeout(() => {
            flashOverlay.style.opacity = '0';
            setTimeout(() => {
              document.body.removeChild(flashOverlay);
            }, 300);
          }, 200);
          
          setTimeout(() => {
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: document.querySelector('.scene3'), offsetY: 0 },
              ease: "power2.inOut"
            });
          }, 500);
        }
      });
    }
    
    
    ScrollTrigger.batch('.scene3', {
      onEnter: (elements) => {
        if (!yClicked) {
          gsap.to(window, {
            duration: 0.5,
            scrollTo: { y: document.querySelector('.scene2'), offsetY: 0 },
            ease: "power2.inOut"
          });
        }
      }
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
    
    
    gsap.to("header h1", {
      opacity: 0,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      repeatDelay: 1
    });
  });
});
