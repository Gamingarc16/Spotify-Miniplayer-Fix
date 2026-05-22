(function() {
    'use strict';

    // Spoof sizing metrics to bypass the resize listeners
    const spoofMetrics = () => {
        Object.defineProperty(window, 'innerWidth', { get: () => 1920, configurable: true });
        Object.defineProperty(window, 'innerHeight', { get: () => 1080, configurable: true });
    };
    spoofMetrics();

    // Target and eliminate the overlay safely based on text content
    const lookForBlocker = () => {
        const textElements = document.querySelectorAll('span[data-encore-id="text"]');
        textElements.forEach(el => {
            if (el.textContent.includes("You discovered a Premium feature")) {
                // Find the parent wrapper and target it safely without affecting the main site
                const premiumContainer = el.closest('div[class*="gDrPbJQiN4Ij2XGL"]') || el.parentElement?.parentElement;
                if (premiumContainer) {
                    premiumContainer.remove();
                }
            }
        });
    };

    const uiObserver = new MutationObserver(lookForBlocker);

    if (document.body) {
        uiObserver.observe(document.body, { childList: true, subtree: true });
    } else {
        document.addEventListener("DOMContentLoaded", () => {
            spoofMetrics();
            uiObserver.observe(document.body, { childList: true, subtree: true });
        });
    }
})();