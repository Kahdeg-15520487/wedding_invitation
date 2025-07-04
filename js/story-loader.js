document.addEventListener('DOMContentLoaded', function() {
    // Get the container where stories will be placed
    const storyContainer = document.getElementById('story-container');
    if (!storyContainer) return;

    // Fetch the stories data
    fetch('js/stories.json')
        .then(response => response.json())
        .then(stories => {
            // Clear existing content
            storyContainer.innerHTML = '';
            
            // Create and append each story
            stories.forEach(story => {
                const storyElement = createStoryElement(story);
                storyContainer.appendChild(storyElement);
            });
            
            // Re-initialize any scripts that need to run after content is loaded
            if (typeof initializeAnimations === 'function') {
                initializeAnimations();
            }
        })
        .catch(error => {
            console.error('Error loading stories:', error);
            storyContainer.innerHTML = '<div class="text-center">Failed to load stories. Please refresh the page.</div>';
        });
});

function createStoryElement(story) {
    // Create the wrapper div with animation attributes
    const wrapper = document.createElement('div');
    wrapper.setAttribute('data-animation', 'animation_blocks');
    wrapper.setAttribute('data-bottom', '@class:noactive');
    wrapper.setAttribute('data--10-bottom', '@class:active');

    // Determine if story is left-aligned or right-aligned
    const isRight = story.position === 'right';
    
    // Create the HTML for the story using template literals
    wrapper.innerHTML = `
        <div class="row wed_story_row" style="font-family: 'Miama-Nueva', cursive;">
            <div class="col-sm-12 col-md-5 text-center wed_bd ${isRight ? 'col-md-push-7' : ''}">
                <div class="wed_second_border wed_image_bck" data-border="#edc082"></div>
                <div class="wed_portfolio_item wed_story_img">
                        <img class="wed_img_heigh" src="${story.image}" style="${story.imageStyle}; max-width: 500px; max-height: 500px; border-radius: 25px; width: 100%; height: 100%; object-fit: cover;" alt="">
                        <span class="wed_port_titles">
                            <span class="wed_port_title">${story.imageTitle}</span>
                            <span class="wed_port_subtitle">${story.imageSubtitle}</span>
                            <span class="wed_port_icons">
                                <a href="${story.image}" class="lightbox"><i class="ti ti-search"></i></a>
                            </span>
                        </span>
                </div>
            </div>
            <div class="col-md-2 hidden-sm hidden-xs text-center">
                <div class="wed_story_center">
                    <div class="wed_story_content wed_image_bck" data-color="#edc082">
                        <div class="wed_heart_container_row_2">
                            <img class="wed_second_heart_1" src="images/heart_3.png" alt="">
                            <img class="wed_second_heart_2" src="images/heart_1.png" alt="">
                            <img class="wed_second_heart_3" src="images/heart_2.png" alt="">
                        </div>
                        <div class="">
                            <img src="${story.icon}" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-5 ${isRight ? 'col-md-pull-7' : ''}">
                <div class="wed_story_txt" style="margin-top: 20px;">
                    <div class="wed_month_year" style="font-family: wonderful-script;">${story.date}</div>
                    <h3 style="font-family: gochi-hand;">${story.title}</h3>
                    <h5 style="font-family: leo-xiv;">${story.subtitle}</h5>
                    <p>${story.content}</p>
                </div>
            </div>
            <div class="wed_vertical_line wed_line_top hidden-sm hidden-xs wed_image_bck" data-border="#edc082">
                <div class="wed_circle wed_image_bck" data-color="#edc082"></div>
            </div>
        </div>
    `;
    
    return wrapper;
}

// Optional: Helper function to initialize animations if needed
function initializeAnimations() {
    // This function would re-initialize any scripts that need to be run 
    // after dynamically adding content
    console.log('Re-initializing animations');
    // Example: if you have any custom animation code that needs to run
}