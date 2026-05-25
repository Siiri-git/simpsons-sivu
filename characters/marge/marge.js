// omg näitten js juttuje tekoon meni liikaa aikaa sekosin enkä nukkunu en muista mitään ääähhhh
// kunnon kommentointi mrburns.js tiedostossa!!
(function () {
    'use strict';

    const MEMES = [
        { id: 'm1', title: 'cornfield', src: '../characters/marge/meme1.jpg' },
        { id: 'm2', title: 'dance', src: '../characters/marge/meme2.jpg' },
        { id: 'm3', title: 'dance gif', src: '../characters/marge/meme3.gif' },
        { id: 'm4', title: 'mob wife', src: '../characters/marge/meme4.jpg' },
        { id: 'm5', title: 'neat potatoes', src: '../characters/marge/meme5.jpg' },
        { id: 'm6', title: 'side eye', src: '../characters/marge/meme6.jpg' }
    ];

    const tabInfo = document.getElementById('tabInfo');
    const tabMemes = document.getElementById('tabMemes');

    const viewInfo = document.getElementById('infoView');
    const viewMemes = document.getElementById('memesView');
    const viewSingle = document.getElementById('singleView');

    const memesGrid = document.getElementById('memesGrid');
    const singleMemeContainer = document.getElementById('singleMemeContainer');
    const memeBackBtn = document.getElementById('memeBackBtn');

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

        singleMemeContainer.innerHTML = '';
    }

    function showMemesGrid() {
        hideAllViews();
        viewMemes.style.display = 'block';
        tabMemes.classList.add('active');

        if (!memesGrid.hasChildNodes()) renderMemesGrid();
    }

    function showSingleMeme(memeId) {
        const meme = MEMES.find(m => m.id === memeId);
        if (!meme) return;
        hideAllViews();
        viewSingle.style.display = 'block';

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

    tabInfo.addEventListener('click', function () {
        showInfoView();
    });

    tabMemes.addEventListener('click', function () {
        showMemesGrid();
    });

    memesGrid.addEventListener('click', function (e) {
        // Find closest memeTile button
        const tile = e.target.closest('.memeTile');
        if (!tile) return;
        const id = tile.getAttribute('memeId');
        if (!id) return;
        showSingleMeme(id);
    });

    memeBackBtn.addEventListener('click', function () {
        showMemesGrid();

        const firstTile = memesGrid.querySelector('.memeTile');
        if (firstTile) firstTile.focus();
    });

    memesGrid.addEventListener('keydown', function (e) {
        const tile = e.target.closest('.memeTile');
        if (!tile) return;
        if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = tile.getAttribute('memeId');
        if (id) showSingleMeme(id);
        }
    });

    function init() {
        renderMemesGrid();
        showInfoView();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
