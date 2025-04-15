document.addEventListener('DOMContentLoaded', function() {
    // Gallery configuration
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
        // You can add more categories here as needed
        {
            folder: 'images/gallery/00',
            count: 9,
            extension: 'webp'
        }
    ];
    
    const galleryContainer = document.getElementById('gallery-container');
    if (!galleryContainer) {
        console.error('Gallery container not found');
        return;
    }
    
    let galleryHTML = '';
    
    // Generate HTML for each gallery item
    galleryConfig.forEach(category => {
        for (let i = 1; i <= category.count; i++) {
            const imagePath = `${category.folder}${i}.${category.extension}`;
            galleryHTML += `
                <div class="col-sm-4 wed_portfolio_item grid-item">
                    <a href="${imagePath}" class="lightbox wed_portfolio_item_cont">
                        <img alt="" src="${imagePath}" />
                        <span class="wed_port_titles">
                            <span class="wed_port_title"></span>
                            <span class="wed_port_icons">
                                <i class="ti ti-search"></i>
                            </span>
                        </span>
                    </a>
                </div>
            `;
        }
    });
    
    // Insert the generated HTML into the gallery container
    galleryContainer.innerHTML = galleryHTML;
});