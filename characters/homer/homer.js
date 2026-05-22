(function () {
    'use strict';

    // Meme Data
    const MEMES = [
        { id: 'm1', title: 'Homer Facepalm', src: '/images/characters/homer/memes/himoläskihomer.jpg' },
        { id: 'm2', title: 'Bart Skate', src: '/images/characters/homer/memes/bush.jpg' },
        { id: 'm3', title: 'Marge Smile', src: '/images/characters/homer/memes/monke.jpg' },
        { id: 'm4', title: 'Lisa Sax', src: '/images/characters/homer/memes/ringdoorcam.jpg' },
        { id: 'm5', title: 'Mr Burns', src: '/images/characters/homer/memes/sugoii.jpg' },
        { id: 'm6', title: 'Krusty Laugh', src: '/images/characters/homer/memes/tuff.jpg' }
    ];

    /*** DOM references ***/
    const tabInfo = document.getElementById('tabInfo');
    const tabMemes = document.getElementById('tabMemes');

    const viewInfo = document.getElementById('infoView');
    const viewMemes = document.getElementById('memesView');
    const viewSingle = document.getElementById('singleView');

    const memesGrid = document.getElementById('memesGrid');
    const singleMemeContainer = document.getElementById('singleMemeContainer');
    const memeBackBtn = document.getElementById('memeBackBtn');

    /*** Utility: show/hide views ***/
    function hideAllViews() {
        viewInfo.style.display = 'none';
        viewMemes.style.display = 'none';
        viewSingle.style.display = 'none';
        tabInfo.classList.remove('active');
        tabMemes.classList.remove('active');
    }

    function showInfoView() {
        hideAllViews();
        viewInfo.style.display = 'block';
        tabInfo.classList.add('active');
        // Clear single meme container
        singleMemeContainer.innerHTML = '';
    }

    function showMemesGrid() {
        hideAllViews();
        viewMemes.style.display = 'block';
        tabMemes.classList.add('active');
        // Render Grid If It's Empty
        if (!memesGrid.hasChildNodes()) renderMemesGrid();
    }

    function showSingleMeme(memeId) {
        const meme = MEMES.find(m => m.id === memeId);
        if (!meme) return;
        hideAllViews();
        viewSingle.style.display = 'block';
        // Build single meme content
        singleMemeContainer.innerHTML = '';
        const wrapper = document.createElement('div');
        wrapper.className = 'singleMeme';

        const img = document.createElement('img');
        img.src = meme.src;
        img.alt = meme.title;
        img.className = 'singleMemeImg';

        wrapper.appendChild(img);
        singleMemeContainer.appendChild(wrapper);

        memeBackBtn.focus();
    }

    /*** Render memes grid ***/
    function renderMemesGrid() {
        memesGrid.innerHTML = '';
        const grid = document.createElement('div');
        grid.className = 'grid';

        MEMES.forEach(meme => {
        const tile = document.createElement('button');
        tile.className = 'memeTile';
        tile.setAttribute('memeId', meme.id);
        tile.setAttribute('aria-label', `Open meme ${meme.title}`);

        const img = document.createElement('img');
        img.src = meme.src;
        img.className = 'memeThumb';

        tile.appendChild(img);
        grid.appendChild(tile);
        });

        memesGrid.appendChild(grid);
    }

    /*** Event Handlers ***/
    tabInfo.addEventListener('click', function () {
        showInfoView();
    });

    tabMemes.addEventListener('click', function () {
        showMemesGrid();
    });

    // Delegate clicks inside memesGrid to open single meme
    memesGrid.addEventListener('click', function (e) {
        // Find closest memeTile button
        const tile = e.target.closest('.memeTile');
        if (!tile) return;
        const id = tile.getAttribute('memeId');
        if (!id) return;
        showSingleMeme(id);
    });

    // Back button from single meme to memes grid
    memeBackBtn.addEventListener('click', function () {
        showMemesGrid();
        // Move focus to first meme tile for keyboard users
        const firstTile = memesGrid.querySelector('.memeTile');
        if (firstTile) firstTile.focus();
    });

    /*** Keyboard accessibility: allow Enter/Space to open tiles when focused ***/
    memesGrid.addEventListener('keydown', function (e) {
        const tile = e.target.closest('.memeTile');
        if (!tile) return;
        if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = tile.getAttribute('memeId');
        if (id) showSingleMeme(id);
        }
    });

    /*** Initialize on DOMContentLoaded (script loaded with defer recommended) ***/
    function init() {
        // Render initial content if needed
        renderMemesGrid();
        // Show info view by default
        showInfoView();
    }

    // If DOM already loaded (defer), init immediately; otherwise wait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
