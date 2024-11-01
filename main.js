document.addEventListener("DOMContentLoaded", function() {
    // Slideshow functionality
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");
    let slideIndex = 0;
    let timer;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("show");
            dots[i].classList.remove("active");
        });
        slides[index].classList.add("show");
        dots[index].classList.add("active");
    }

    function plusSlides(n) {
        slideIndex = (slideIndex + n + slides.length) % slides.length;
        showSlide(slideIndex);
        resetTimer();
    }

    function currentSlide(n) {
        slideIndex = n;
        showSlide(slideIndex);
        resetTimer();
    }

    function startTimer() {
        timer = setInterval(() => {
            slideIndex = (slideIndex + 1) % slides.length;
            showSlide(slideIndex);
        }, 5000);
    }

    function resetTimer() {
        clearInterval(timer);
        startTimer();
    }

    document.querySelector(".prev").addEventListener("click", function() {
        plusSlides(-1);
    });

    document.querySelector(".next").addEventListener("click", function() {
        plusSlides(1);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", function() {
            currentSlide(index);
        });
    });

    showSlide(slideIndex);
    startTimer();

    // Floating CV button functionality
    function hideCvButton() {
        document.querySelector('.floating-cv-container').style.display = 'none';
    }

    // Websites section functionality
    function showImage(imageId) {
        document.querySelectorAll('.website-image').forEach(img => img.style.opacity = '0');
        document.getElementById(imageId).style.opacity = '1';
    }

    // Mouse-following dot functionality
    const mouseDot = document.querySelector('.mouse-dot');
    document.addEventListener('mousemove', function(e) {
        setTimeout(() => {
            mouseDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }, 50); // Adjust delay as needed
    });

    // Card 

    const cards = document.querySelectorAll('.card');
        
		const toggleExpansion = (element, to, duration = 350) => {
		  return new Promise((res) => {
		    element.animate([
		      {
			top: to.top,
			left: to.left,
			width: to.width,
			height: to.height
		      }
		    ], {duration, fill: 'forwards', ease: 'ease-in'})
		    setTimeout(res, duration);
		  })
		}

		const fadeContent = (element, opacity, duration = 300) => {
			return new Promise(res => {
				[...element.children].forEach((child) => {
					requestAnimationFrame(() => {
						child.style.transition = `opacity ${duration}ms linear`;
						child.style.opacity = opacity;
					});
				})
				setTimeout(res, duration);
			})
		}

		const getCardContent = (card) => {
			const title = card.getAttribute('data-title');
			const image = card.getAttribute('data-image');
			const description = card.getAttribute('data-description');
			return `
				<div class="card-content">
					<h2>${title}</h2>
					<img src="${image}" alt="${title}">
					<p>${description}</p>
				</div>
			`;
		}

		const onCardClick = async (e) => {
			const card = e.currentTarget;
			// clone the card
			const cardClone = card.cloneNode(true);
			// get the location of the card in the view
			const {top, left, width, height} = card.getBoundingClientRect();
			// position the clone on top of the original
			cardClone.style.position = 'fixed';
			cardClone.style.top = top + 'px';
			cardClone.style.left = left + 'px';
			cardClone.style.width = width + 'px';
			cardClone.style.height = height + 'px';
			// hide the original card with opacity
			card.style.opacity = '0';
			// bring card to top layer
			cardClone.style.zIndex = '8';
			// add card to the same container
			card.parentNode.appendChild(cardClone);
			// create a close button to handle the undo
			const closeButton = document.createElement('button');
			// position the close button top corner
			closeButton.style = `
				position: fixed;
				z-index: 10000;
				top: 35px;
				right: 35px;
				width: 35px;
				height: 35px;
				border-radius: 50%;
				background-color: #e25656;
			`;
			// attach click event to the close button
			closeButton.addEventListener('click', async () => {
				// remove the button on close
				closeButton.remove();
				// remove the display style so the original content is displayed right
				cardClone.style.removeProperty('display');
				cardClone.style.removeProperty('padding');
				// show original card content
				[...cardClone.children].forEach(child => child.style.removeProperty('display'));
				fadeContent(cardClone, '0');
				// shrink the card back to the original position and size
				await toggleExpansion(cardClone, {top: `${top}px`, left: `${left}px`, width: `${width}px`, height: `${height}px`}, 300)
				// show the original card again
				card.style.removeProperty('opacity');
				// reset zindex
				cardClone.style.zIndex = '3';
				// remove the clone card
				cardClone.remove();
			});
			// fade the content away
			fadeContent(cardClone, '0')
				.then(() => {
					[...cardClone.children].forEach(child => child.style.display = 'none');
				});
			// expand the clone card
			await toggleExpansion(cardClone, {top: 0, left: 0, width: '100vw', height: '100vh'});
			const content = getCardContent(card);
			// set the display block so the content will follow the normal flow in case the original card is not display block
			cardClone.style.display = 'block';
			cardClone.style.padding = '0';
			// append the close button after the expansion is done
			cardClone.appendChild(closeButton);
			cardClone.insertAdjacentHTML('afterbegin', content);
		};

		cards.forEach(card => card.addEventListener('click', onCardClick));

    window.hideCvButton = hideCvButton;
    window.showImage = showImage;
    window.scrollToContact = function() {
        // Add your scroll to contact section functionality here
    };
});
