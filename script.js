// RULES: No alert()/confirm()/prompt() — use DaisyUI modals/toasts instead
// RULES: No .toISOString().split('T')[0] — use playful.today() for local dates
// RULES: No new Date('YYYY-MM-DD') without 'T00:00:00' — parses as UTC

// State
let currentFactId = null;
let factCount = 0;
const state = {
  isLoading: false,
  lastError: null
};

// DOM elements
const factWrapper = document.getElementById('fact-wrapper');
const factContent = document.getElementById('fact-content');
const skeletonState = document.getElementById('skeleton-state');
const errorState = document.getElementById('error-state');
const factText = document.getElementById('fact-text');
const factSource = document.getElementById('fact-source');
const factCounter = document.getElementById('fact-counter');
const counterNum = document.getElementById('counter-num');
const newFactBtn = document.getElementById('new-fact-btn');
const btnIcon = document.getElementById('btn-icon');
const toastContainer = document.getElementById('toast-container');

// Initialize icons
lucide.createIcons();

/**
 * Fetch a new random fact from the API
 */
async function fetchNewFact() {
  if (state.isLoading) return;

  state.isLoading = true;
  newFactBtn.disabled = true;
  btnIcon.classList.add('spin-icon');

  // Show skeleton loading state
  showLoadingState();

  try {
    const result = await playful.callIntegration({
      serviceId: 'useless-facts',
      method: 'GET',
      path: '/random.json',
      query: { language: 'en' }
    });

    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch fact');
    }

    const data = result.body;
    currentFactId = data.id;
    factCount++;

    // Update DOM with new fact
    displayFact(data.text, data.source_url);
    state.lastError = null;

    // Clear error state if it was shown
    errorState.classList.add('hidden');
  } catch (error) {
    console.error('Error fetching fact:', error);
    state.lastError = error.message;
    showErrorState();
  } finally {
    state.isLoading = false;
    newFactBtn.disabled = false;
    btnIcon.classList.remove('spin-icon');
  }
}

/**
 * Display the fact in the card with animation
 */
function displayFact(text, sourceUrl) {
  // Animate out the current state
  factWrapper.classList.remove('visible');
  factWrapper.classList.add('loading');

  setTimeout(() => {
    // Replace content
    factText.textContent = text;
    if (sourceUrl) {
      factSource.href = sourceUrl;
    }

    // Update counter
    if (factCount > 1) {
      factCounter.classList.remove('hidden');
      counterNum.textContent = factCount;
    }

    // Show fact content, hide skeleton
    skeletonState.classList.add('hidden');
    errorState.classList.add('hidden');
    factContent.classList.remove('hidden');

    // Animate in the new fact
    factWrapper.classList.remove('loading');
    factWrapper.classList.add('visible');

    // Re-create icons for any new lucide elements
    lucide.createIcons();
  }, 150);
}

/**
 * Show loading skeleton state
 */
function showLoadingState() {
  factWrapper.classList.remove('visible');
  factWrapper.classList.add('loading');

  setTimeout(() => {
    skeletonState.classList.remove('hidden');
    errorState.classList.add('hidden');
    factContent.classList.add('hidden');

    // Don't animate in skeleton, it stays
    factWrapper.classList.add('visible');
  }, 50);
}

/**
 * Show error state
 */
function showErrorState() {
  factWrapper.classList.remove('visible');
  factWrapper.classList.add('loading');

  setTimeout(() => {
    skeletonState.classList.add('hidden');
    factContent.classList.add('hidden');
    errorState.classList.remove('hidden');

    factWrapper.classList.add('visible');
  }, 50);
}

/**
 * Show a toast notification
 */
function showToast(message, type = 'info') {
  const alertClass = {
    success: 'alert-success',
    error: 'alert-error',
    info: 'alert-info',
    warning: 'alert-warning'
  }[type] || 'alert-info';

  const toast = document.createElement('div');
  toast.className = `alert ${alertClass} shadow-xl animate-fade-in`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `<span>${message}</span>`;

  toastContainer.appendChild(toast);

  // Auto-remove after 4 seconds
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

/**
 * Event listener for the "New Fact" button
 */
newFactBtn.addEventListener('click', () => {
  fetchNewFact();
});

/**
 * Initialize app — fetch first fact on load
 */
(async () => {
  // Add entrance animation to container
  await Motion.animate('.app-container', {
    opacity: [0, 1],
    y: [20, 0]
  }, {
    duration: 0.6,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
  });

  // Fetch the first fact after entrance animation
  await new Promise(resolve => setTimeout(resolve, 300));
  fetchNewFact();
})();