class FlyingPlane extends HTMLDivElement {
    constructor() {
      super();
      this.position = { x: 0, y: window.innerHeight * 0.7 };
      this.isAnimating = false;
      this.bindedAnimate = this.animate.bind(this);
      this.returning = false;
    }
  
    connectedCallback() {
      this.addEventListener('click', this.showReward.bind(this));
      this.startFlying();
    }
  
    startFlying() {
      if (this.isAnimating) return;
      this.isAnimating = true;
      this.animate();
    }
  
    animate() {
      if (this.returning) {
        this.position.x = this.position.x - 1;
      } else {
        this.position.x = this.position.x + 1;
      }
      this.position.y = Math.sin(this.position.x / 50) * 50 + window.innerHeight / 2;
      this.style.left = `${this.position.x}px`;
      this.style.top = `${this.position.y}px`;
  
      if (this.isAnimating) {
        requestAnimationFrame(this.bindedAnimate);
      }
      
      if (this.position.x > window.innerWidth) {
        this.returning = true;
        this.style.rotate = '-135deg';
      }

      if (this.position.x < -80) {
        this.returning = false;
        this.style.rotate = '45deg';
      }

    }
  
    showReward() {
      const rewardModal = document.querySelector('.reward-modal');
      rewardModal.style.display = 'block';
  
      const closeButton = rewardModal.querySelector('.close-button');
      closeButton.addEventListener('click', () => {
        rewardModal.style.display = 'none';
      }, { once: true });
    }
  }
  
  customElements.define('flying-plane', FlyingPlane, { extends: 'div' });