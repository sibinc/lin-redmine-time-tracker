document.addEventListener('DOMContentLoaded', function() {
  const toggleSwitch = document.getElementById('toggleSwitch');
  const statusText = document.getElementById('statusText');

  // Load saved state
  chrome.storage.sync.get(['enabled'], function(result) {
    toggleSwitch.checked = result.enabled || false;
    statusText.textContent = toggleSwitch.checked ? 'Enabled' : 'Disabled';
  });

  // Save state when toggle changes
  toggleSwitch.addEventListener('change', function() {
    const isEnabled = toggleSwitch.checked;
    statusText.textContent = isEnabled ? 'Enabled' : 'Disabled';
    
    chrome.storage.sync.set({ enabled: isEnabled }, function() {
      // Notify the background script about the state change
      chrome.runtime.sendMessage({ action: 'toggleStateChanged', enabled: isEnabled });
    });
  });
});