'use client';

import { useEffect } from 'react';

export default function ScrollAnimations() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          
          // Handle animation delays
          const delayClass = Array.from(element.classList).find(cls => cls.startsWith('animate-delay-'));
          let delay = 0;
          if (delayClass) {
            delay = parseInt(delayClass.replace('animate-delay-', ''));
          }
          
          // Apply animation after delay
          setTimeout(() => {
            element.classList.add('in-view');
          }, delay);
          
          // Stop observing this element once animated
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    // Wait for DOM to be ready, then observe elements
    const observeElements = () => {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      console.log('Found elements to animate:', animatedElements.length); // Debug log
      
      animatedElements.forEach((el) => {
        // Ensure elements start in hidden state
        const element = el as HTMLElement;
        element.classList.remove('in-view'); // Remove any existing in-view class
        observer.observe(element);
      });
    };

    // Run immediately and also after a small delay to catch any dynamically added elements
    observeElements();
    const timeoutId = setTimeout(observeElements, 100);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return null;
}