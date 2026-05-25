// omg näitten js juttuje tekoon meni liikaa aikaa sekosin enkä nukkunu en muista mitään ääähhhh

(function () {
    'use strict';

    const MEMES = [
        { id: 'm1', title: 'queen', src: '../characters/mrburns/meme1.jpg' },
        { id: 'm2', title: 'marilyn', src: '../characters/mrburns/meme2.gif' },
        { id: 'm3', title: 'aahhh', src: '../characters/mrburns/meme3.jpg' },
        { id: 'm4', title: 'food order', src: '../characters/mrburns/meme4.jpg' },
        { id: 'm5', title: 'alien', src: '../characters/mrburns/meme5.jpg' },
        { id: 'm6', title: 'gay jumpscare', src: '../characters/mrburns/meme6.gif' }
    ];

    // DOM References 
    const tabInfo = document.getElementById('tabInfo');
    const tabMemes = document.getElementById('tabMemes');

    const viewInfo = document.getElementById('infoView');
    const viewMemes = document.getElementById('memesView');
    const viewSingle = document.getElementById('singleView');

    const memesGrid = document.getElementById('memesGrid');
    const singleMemeContainer = document.getElementById('singleMemeContainer');
    const memeBackBtn = document.getElementById('memeBackBtn');

    // Show & Hide views
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
        // Build Single Meme Content
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

    // Render Memes
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

    // Event Handlers
    tabInfo.addEventListener('click', function () {
        showInfoView();
    });

    tabMemes.addEventListener('click', function () {
        showMemesGrid();
    });

    // Clicks Inside Mmes -> Open Single Meme :3
    memesGrid.addEventListener('click', function (e) {
        // Find closest memeTile button
        const tile = e.target.closest('.memeTile');
        if (!tile) return;
        const id = tile.getAttribute('memeId');
        if (!id) return;
        showSingleMeme(id);
    });

    // Back Button
    memeBackBtn.addEventListener('click', function () {
        showMemesGrid();
        // Move Focus To First Meme Tile 4 Keyboard Users
        const firstTile = memesGrid.querySelector('.memeTile');
        if (firstTile) firstTile.focus();
    });

    // Allow Enter/Space To Open Tiles When In Focus
    memesGrid.addEventListener('keydown', function (e) {
        const tile = e.target.closest('.memeTile');
        if (!tile) return;
        if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = tile.getAttribute('memeId');
        if (id) showSingleMeme(id);
        }
    });

    // Initialize On DOMContentLoaded (script loaded with defer recommended)
    function init() {
        // Render Initial Content If Needed
        renderMemesGrid();
        // Show Info View By Default
        showInfoView();
    }

    // If DOM Already Loaded (defer), Initialize Immediately (otherwise wait :D)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
