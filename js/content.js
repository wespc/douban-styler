class DoubanSimplified {
  constructor() {
    this.init();
  }

  init() {
    this.hideElements();
    this.enhancePosts();
    this.setupInfiniteScroll();
  }

  hideElements() {
    // Remove all elements except posts
    const selectorsToHide = [
      '#db-nav-movie',
      '#db-nav-book',
      '#db-nav-music',
      '.extra',
      '.aside',
      '#dale_anonymous_homepage_right_bottom',
      '#dale_anonymous_homepage_right_middle',
      '#dale_anonymous_homepage_right_top',
      '.notify-mod',
      '.bn-link'
    ];

    selectorsToHide.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.remove());
    });
  }

  enhancePosts() {
    // Enhance posts appearance
    document.querySelectorAll('.status-item').forEach(post => {
      // Add hover effect
      post.addEventListener('mouseenter', () => {
        post.style.background = '#1d1f23';
      });
      
      post.addEventListener('mouseleave', () => {
        post.style.background = 'var(--card-bg)';
      });

      // Optimize images
      post.querySelectorAll('img').forEach(img => {
        img.loading = 'lazy';
        img.decoding = 'async';
      });
    });
  }

  setupInfiniteScroll() {
    // Simple infinite scroll implementation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // If last post is visible, try to load more
          const loadMoreBtn = document.querySelector('.more');
          if (loadMoreBtn) {
            loadMoreBtn.click();
          }
        }
      });
    });

    // Observe the last post
    const posts = document.querySelectorAll('.status-item');
    if (posts.length > 0) {
      observer.observe(posts[posts.length - 1]);
    }
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  new DoubanSimplified();
});

// Handle dynamically loaded content
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      new DoubanSimplified();
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});