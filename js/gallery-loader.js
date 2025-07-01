document.addEventListener('DOMContentLoaded', function () {
    const galleryConfig = [
        // {
        //     folder: 'images/distance-',
        //     count: 9, // number of images in this category
        //     extension: 'jpg'
        // },
        // {
        //     folder: 'images/co3-',
        //     count: 9, // number of images in this category
        //     extension: 'jpg'
        // }
        // {
        //     id: 2,
        //     folder: 'images/gallery3/00',
        //     start: 1,
        //     count: 17,
        //     extension: 'JPG'
        // },
        {
            id: 2,
            folder: 'images/gallery4/00',
            start: 1,
            count: 35,
            extension: 'JPG'
        },
        {
            id: 1,
            folder: 'images/animated/gametro',
            start: 0,
            count: 0,
            extension: 'webp'
        },
        {
            id: 2,
            folder: 'images/animated/hanoimoi',
            start: 0,
            count: 0,
            extension: 'webp'
        }
    ];

    const moveTileConfig = [
        // {
        //     sourceId: 1,
        //     targetId: 2,
        //     after: 46
        // }
    ]

    const galleryContainer = document.getElementById('gallery-container');
    if (!galleryContainer) {
        console.error('Gallery container not found');
        return;
    }

    const imagePaths = [];

    galleryConfig.forEach(category => {
        if (category.count === 0) {
            const imagePath = `${category.folder}.${category.extension}`;
            imagePaths.push(imagePath);
        } else {
            const start = category.start || 1;
            const padLength = category.count.toString().length;

            for (let i = start; i <= category.count; i++) {
                const stt = i.toString().padStart(padLength, "0");
                const imagePath = `${category.folder}${stt}.${category.extension}`;
                imagePaths.push(imagePath);
            }
        }
    });

    // moveTileConfig.forEach(move => {
    //     const sourceCategory = galleryConfig.find(cat => cat.id === move.sourceId);
    //     const targetCategory = galleryConfig.find(cat => cat.id === move.targetId);

    //     if (sourceCategory && targetCategory) {
    //         const sourceStartIndex = imagePaths.findIndex(path => path.includes(sourceCategory.folder + (sourceCategory.count == 0 ? "" : sourceCategory.start.toString().padStart(sourceCategory.count.toString().length))));
    //         const sourceEndIndex = sourceStartIndex + (sourceCategory.count == 0 ? 1 : sourceCategory.count);
    //         const startIndex = imagePaths.findIndex(path => path.includes(targetCategory.folder + move.after.toString().padStart(targetCategory.count.toString().length)));
    //         const endIndex = startIndex + (sourceCategory.count == 0 ? 1 : sourceCategory.count);
    //         const movedImages = imagePaths.splice(sourceStartIndex, sourceEndIndex - sourceStartIndex);
    //         imagePaths.splice(startIndex, 0, ...movedImages);
    //     }
    // });

    // shuffle the imagePaths array
    for (let i = imagePaths.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imagePaths[i], imagePaths[j]] = [imagePaths[j], imagePaths[i]];
    }

    let galleryHTML = '';
    imagePaths.forEach(imagePath => {
        galleryHTML += `
        <div class="col-sm-4 wed_portfolio_item grid-item">
            <a href="${imagePath}" class="gallery-item wed_portfolio_item_cont">
                <img loading="lazy" alt="" src="${(imagePath.endsWith('JPG') ? imagePath + ".resized.JPG" : imagePath)}" style="min-height: 100%; width: 100%; height: auto; object-fit: contain;" />
                <span class="wed_port_titles">
                    <span class="wed_port_title"></span>
                    <span class="wed_port_icons">
                        <i class="ti ti-search"></i>
                    </span>
                </span>
            </a>
        </div>
`;
    });

    galleryContainer.innerHTML = galleryHTML;

    // Initialize SimpleLightbox after adding images to the DOM
    new SimpleLightbox('.gallery-item', {
        captionPosition: 'bottom',
        closeText: '×',
        navText: ['←', '→'],
        showCounter: true,
        enableKeyboard: true,
        loop: true,
        docClose: true,
        swipeClose: true,
        animationSpeed: 250
    });
});