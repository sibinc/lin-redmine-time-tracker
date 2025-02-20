// Flag to track if the script is already injected
window.redmineEnhancerInjected = true;

function enhanceRedminePage() {
    console.log('Linways Redmine Time Tracker is active!');
    
    // Define the tracking function
    function triggerTracking(action) {
        const link = document.querySelector(`a.stopwatch_issue_timer[href*="/timer/${action}"]`);
        if (link) {
            link.click(); // Simulate a real click
            // console.log(`${action.charAt(0).toUpperCase() + action.slice(1)} tracking triggered via simulated click.`);
        } else {
            console.error(`${action.charAt(0).toUpperCase() + action.slice(1)} tracking link not found.`);
        }
    }

    // Set up the status change listener
    const statusSelect = document.getElementById('issue_status_id');
    
    if (statusSelect) {
        // Remove existing listener if any (to prevent duplicates)
        const newStatusSelect = statusSelect.cloneNode(true);
        statusSelect.parentNode.replaceChild(newStatusSelect, statusSelect);
        
        // Add new listener
        newStatusSelect.addEventListener('change', function () {
            if (this.value === '2') {
                triggerTracking('start');
            }
            else if (this.value === '39' || this.value === '3' || this.value === '25' || this.value === '7' || this.value === '5' || this.value === '36') {
                triggerTracking('stop'); // Stop tracking when "Development Completed"
            }
        });
        
        // console.log('Time tracking listeners initialized successfully');
    } else {
        console.error('Issue status select element not found.');
    }
}

// Cleanup function to restore original state
window.redmineEnhancerCleanup = function() {
    // console.log('Cleaning up Redmine Time Tracker modifications...');
    
    // Remove event listeners by cloning and replacing the select element
    const statusSelect = document.getElementById('issue_status_id');
    if (statusSelect) {
        const cleanSelect = statusSelect.cloneNode(true);
        statusSelect.parentNode.replaceChild(cleanSelect, statusSelect);
    }
    
    // Reset injection flag
    window.redmineEnhancerInjected = false;
};

// Run the enhancement function
enhanceRedminePage();