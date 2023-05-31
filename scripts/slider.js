class Slider {
    constructor(id) {
        this.slider = document.getElementById(id);
        this.slides = Array.from(this.slider.getElementsByTagName('img'));
        this.totalSlides = this.slides.length;
        this.currentSlide = 0;
        this.intervalId = null;
        this.showSlide(this.currentSlide);
        this.addEventListeners();
        this.autoSlide();
    }

    //Mostrar y ocultar imgs
    showSlide(i) {
        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });
        this.slides[i].style.display = 'block';
    }

    nextSlide() {
        this.currentSlide++;
        if (this.currentSlide === this.totalSlides) {
            this.currentSlide = 0;
        }
        this.showSlide(this.currentSlide);
        this.activePoints();
    }

    prevSlide() {
        this.currentSlide--;
        if (this.currentSlide < 0) {
        this.currentSlide = this.totalSlides - 1;
        }
        this.showSlide(this.currentSlide);
        this.activePoints();
    }

    //Puntos
        activePoints() {
            const points = Array.from(this.slider.querySelectorAll('.points'));

            points.forEach((points, i) => {
            if (i === this.currentSlide) {
                points.classList.add('active');
            } else {
            points.classList.remove('active');
            }
        });
    }

    //Eventos y reacciones
    addEventListeners() {
        const prevBtn = this.slider.querySelector('.prev-btn');
        prevBtn.addEventListener('click', () => this.prevSlide());

        const nextBtn = this.slider.querySelector('.next-btn');
        nextBtn.addEventListener('click', () => this.nextSlide());

        const points = Array.from(this.slider.getElementsByClassName('points'));
        points.forEach((point, i) => {
        point.addEventListener('click', () => {
            this.currentSlide = i;
            this.showSlide(this.currentSlide);
            this.activePoints();
        });
    });
    }

    //Auto
    autoSlide() {
        setInterval(() => {
            this.nextSlide();            
        }, 5000);
    }
}

const slider = new Slider('slider');