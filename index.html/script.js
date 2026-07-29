document.addEventListener('DOMContentLoaded', () => {

    // Elemento de audio global
    const bgMusic = document.getElementById('bg-music');

    // ==========================================
    // 1. INTRO CON PAUSAS DE TIEMPO Y MÚSICA
    // ==========================================
    const slides = [
        document.getElementById('slide-1'),
        document.getElementById('slide-2'),
        document.getElementById('slide-3'),
        document.getElementById('slide-4')
    ];
    let currentSlideIndex = 0;

    function showNextSlide() {
        if (currentSlideIndex < slides.length) {
            slides[currentSlideIndex].classList.add('active');

            setTimeout(() => {
                slides[currentSlideIndex].classList.remove('active');
                currentSlideIndex++;
                setTimeout(showNextSlide, 1200);
            }, 3500);

        } else {
            setTimeout(() => {
                const btnSky = document.getElementById('btn-sky-enter');
                if (btnSky) btnSky.classList.add('visible');
            }, 500);
        }
    }
    showNextSlide();

    // Iniciar la música "Golden Hour" en el primer clic del usuario
    document.getElementById('btn-sky-enter').addEventListener('click', () => {
        if (bgMusic) {
            bgMusic.volume = 0.4; // Volumen ambiental al iniciar el cielo
            bgMusic.play().then(() => {
                console.log("Reproduciendo Golden Hour...");
            }).catch(err => console.log("Error o bloqueo de audio:", err));
        }

        const introScreen = document.getElementById('intro-screen');
        introScreen.style.opacity = '0';
        setTimeout(() => { introScreen.style.display = 'none'; }, 1500);
    });

    // ==========================================
    // 2. CANVAS: ESTRELLAS DE FONDO
    // ==========================================
    const canvas = document.getElementById('starfield-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const bgStars = Array.from({ length: 250 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.8 + 0.2,
        alpha: Math.random()
    }));

    function animateBackgroundStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bgStars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();
            star.y += star.speed;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        });
        requestAnimationFrame(animateBackgroundStars);
    }
    animateBackgroundStars();

    // ==========================================
    // 3. LLUVIA CONTINUA Y FIJACIÓN DE INTERACCIÓN
    // ==========================================
    const fallingContainer = document.getElementById('falling-stars-container');

    // Mapeo de fotos con sus respectivas frases
    const photos = [
        { url: 'IMG2.jpg', text: 'Su sonrisa tiene una forma muy bonita de alegrar mis días. 🤎' },
        { url: 'IMG3.jpg', text: 'Me encanta como come su papita JAJA. ✨' },
        { url: 'IMG4.jpg', text: 'No existe estrella que brille tanto como sus ojitos, su belleza es unica. 🌟' },
        { url: 'IMG5.jpg', text: 'Mirada juzgadora de cabezukaaa' },
        { url: 'IMG6.jpg', text: 'Es lo más hermoso del mundo, amo sus fotitos. 📸🤎' },
        { url: 'IMG7.jpg', text: 'Happy Birthday Mi Bebeshitaaa!. 🌸' },
        { url: 'IMG8.jpg', text: 'No olvidemos a cabezukaaa viscaaa. ✨' },
        { url: 'IMG9.jpg', text: 'Me enamoro cada día más de usted de su hermoshaa caritaa. 🥰' },
        { url: 'IMG10.jpg', text: 'Cabezukaaa de metidaa JAJAJA. 🌷' },
        { url: 'IMG11.jpg', text: 'Mi única constelación favoritaaa. ✨' },
        { url: 'IMG12.jpg', text: 'Es lo mejor que ha pasado en mi vidaaa. 🤎' },
        { url: 'IMG13.jpg', text: 'Mi Bebeshitaaa hermoshaaa, divinaaa, preciosaaaa, me encantaaaa. 🥰' },
        { url: 'IMG14.jpg', text: 'Cabezukaaaa toda una cazadoraaaa JAJAJAJA. ⭐' },
        { url: 'IMG15.jpg', text: 'Mi vidaaa es mucho mejor desde que la conocí. ✨' },
        { url: 'IMG16.jpg', text: 'Cada día a su lado es único, como si estar a su lado fuera mágico. 💫' },
        { url: 'IMG17.jpg', text: 'Tiene que volverla a dibujar, para guardarla en mi albúm de fotos JAJA. 🫦' },
        { url: 'IMG18.jpg', text: 'Ojo que te cojooo. 🫦' },
        { url: 'IMG19.jpg', text: 'Me la imagine con nuestros tilincitosss, que licooo. 🌼' },
        { url: 'IMG20.jpg', text: 'Bien otaku, me alegra mi dia con sus fotitos otakus JAJAJA. ' },
        { url: 'IMG21.jpg', text: 'Vea a cabezukaaa esta bien lindotaaaa dormidotaaaaa JAJAJA. ✨' },
        { url: 'IMG22.jpg', text: 'La amooo y eso ni el tiempo, ni la distancia cambiara todo el amor q siento por usted. 🫂' },
        { url: 'IMG23.jpg', text: 'La definición de perfección es usted con una belleza unica en el mundo. es parte de las maravillas del mundo. 🤎' },
        { url: 'IMG24.jpg', text: 'Verla mimir es lo q más me encanta. 🫦' },
        { url: 'IMG25.jpg', text: 'Cabezukaa en modo pan. ✨' },
        { url: 'IMG26.jpg', text: 'Más fotitos otakus, por favor. 📷' },
        { url: 'IMG27.jpg', text: 'Cabezukaaaa cuando llego super pequeña. 😭' },
        { url: 'IMG28.jpg', text: 'Si pudiera pedir un deseo, sería verla siempre feliz y que estemos juntotess toda la vidaaa. 🥹🤎' },
        { url: 'IMG29.jpg', text: 'Mi fotito favoritaaa, cuando estaba super pequeñaa. ✨🤎' },
        { url: 'IMG30.jpg', text: 'La primera fotito que me enviooo. 😭🤎' }
    ];

    const starNodes = [];

    photos.forEach((photo, index) => {
        const star = document.createElement('div');
        star.className = 'falling-star-node';
        
        star.style.backgroundImage = `url(${photo.url})`;

        const badge = document.createElement('span');
        badge.className = 'star-month-badge';
        badge.innerText = `✨ ${index + 1}`;
        star.appendChild(badge);

        const nodeData = {
            element: star,
            x: Math.random() * (window.innerWidth - 60) + 10,
            y: - (Math.random() * (window.innerHeight * 1.2) + 80),
            speed: Math.random() * 0.5 + 0.3, 
            swaySpeed: Math.random() * 0.012 + 0.005,
            swayAmount: Math.random() * 15 + 5,
            angle: Math.random() * Math.PI * 2,
            photoUrl: photo.url,
            text: photo.text
        };

        const handleSelect = (e) => {
            e.preventDefault();
            e.stopPropagation();
            openPhotoModal(nodeData.photoUrl, nodeData.text);
        };

        star.addEventListener('pointerdown', handleSelect);

        fallingContainer.appendChild(star);
        starNodes.push(nodeData);
    });

    function animateFallingPhotos() {
        starNodes.forEach(node => {
            node.y += node.speed;
            node.angle += node.swaySpeed;
            const currentX = node.x + Math.sin(node.angle) * node.swayAmount;

            node.element.style.transform = `translate3d(${currentX}px, ${node.y}px, 0)`;

            if (node.y > window.innerHeight + 80) {
                node.y = -80;
                node.x = Math.random() * (window.innerWidth - 60) + 10;
            }
        });
        requestAnimationFrame(animateFallingPhotos);
    }
    animateFallingPhotos();

    // ==========================================
    // 4. MODAL DE FOTO
    // ==========================================
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-img');
    const photoCounter = document.getElementById('photo-counter');
    const btnCloseModal = document.getElementById('btn-close-modal');

    function openPhotoModal(url, text) {
        modalImg.src = url;
        photoCounter.textContent = text;
        modal.classList.add('active');
    }

    btnCloseModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // ==========================================
    // 5. PUZZLE DE LA FOTO Y VALIDACIÓN
    // ==========================================
    const puzzleBoard = document.getElementById('puzzle-board');
    const puzzleBank = document.getElementById('puzzle-pieces-bank');
    const puzzleStatusMsg = document.getElementById('puzzle-status-msg');
    const btnToLetter = document.getElementById('btn-to-letter');

    const mainPuzzlePhotoUrl = 'IMG1.jpg';
    let selectedPiece = null;

    function initPuzzle() {
        puzzleBoard.innerHTML = '';
        puzzleBank.innerHTML = '';
        puzzleBoard.className = '';
        puzzleStatusMsg.textContent = '';
        puzzleStatusMsg.className = '';
        btnToLetter.style.display = 'none';

        for (let i = 0; i < 9; i++) {
            const slot = document.createElement('div');
            slot.className = 'puzzle-slot';
            slot.dataset.index = i;

            slot.addEventListener('click', () => {
                if (selectedPiece && !slot.hasChildNodes()) {
                    slot.appendChild(selectedPiece);
                    selectedPiece.classList.remove('selected');
                    selectedPiece = null;
                    validatePuzzle();
                }
            });

            puzzleBoard.appendChild(slot);
        }

        const pieceIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5);

        pieceIndices.forEach(index => {
            const piece = document.createElement('div');
            piece.className = 'puzzle-piece';
            piece.dataset.correctIndex = index;
            piece.style.backgroundImage = `url(${mainPuzzlePhotoUrl})`;

            const row = Math.floor(index / 3);
            const col = index % 3;
            piece.style.backgroundPosition = `-${col * 96}px -${row * 72}px`;

            piece.addEventListener('click', (e) => {
                e.stopPropagation();

                if (selectedPiece) selectedPiece.classList.remove('selected');
                
                selectedPiece = piece;
                piece.classList.add('selected');
            });

            puzzleBank.appendChild(piece);
        });
    }

    function validatePuzzle() {
        const slots = document.querySelectorAll('.puzzle-slot');
        let filledSlots = 0;
        let correctCount = 0;

        slots.forEach((slot, index) => {
            const piece = slot.querySelector('.puzzle-piece');
            if (piece) {
                filledSlots++;
                if (parseInt(piece.dataset.correctIndex) === index) {
                    correctCount++;
                }
            }
        });

        if (filledSlots === 9) {
            if (correctCount === 9) {
                puzzleBoard.className = 'success';
                puzzleStatusMsg.textContent = '¡Perfecto mi amor! Recuerdo desbloqueado ❤️';
                puzzleStatusMsg.className = 'success-text';
                btnToLetter.style.display = 'inline-block';
                btnToLetter.classList.add('visible');

                // Aumentar el volumen para el momento emotivo de la carta
                if (bgMusic) {
                    bgMusic.volume = 0.7;
                    if (bgMusic.paused) {
                        bgMusic.play().catch(err => console.log("Audio activado:", err));
                    }
                }

            } else {
                puzzleBoard.className = 'error';
                puzzleStatusMsg.textContent = 'Aún hay piezas fuera de lugar... ¡Inténtalo de nuevo! ❌';
                puzzleStatusMsg.className = 'error-text';
                btnToLetter.style.display = 'none';

                setTimeout(() => {
                    puzzleBoard.classList.remove('error');
                }, 600);
            }
        }
    }

    document.getElementById('btn-to-puzzle').addEventListener('click', () => {
        document.getElementById('sky-view').style.display = 'none';
        document.getElementById('puzzle-screen').classList.add('active');
        initPuzzle();
    });

    document.getElementById('btn-to-letter').addEventListener('click', () => {
        document.getElementById('puzzle-screen').style.display = 'none';
        document.getElementById('letter-screen').classList.add('active');
    });

    document.getElementById('envelope').addEventListener('click', () => {
        document.getElementById('letter-paper').classList.add('open');
    });
});