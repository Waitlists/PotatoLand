export function showAchievementToast(title: string, icon: string) {
  const container = document.getElementById('achievement-container');
  if (!container) return;

  const notification = document.createElement('div');
  notification.className = 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-3 rounded-lg shadow-lg border border-yellow-300 transform translate-x-full transition-transform duration-300 flex items-center gap-3 min-w-64';
  
  notification.innerHTML = `
    <span class="text-2xl">${icon}</span>
    <div>
      <div class="font-bold text-sm">Achievement Unlocked!</div>
      <div class="text-xs text-yellow-100">${title}</div>
    </div>
  `;

  container.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.classList.remove('translate-x-full');
  }, 100);

  // Animate out and remove
  setTimeout(() => {
    notification.classList.add('translate-x-full');
    setTimeout(() => {
      if (container.contains(notification)) {
        container.removeChild(notification);
      }
    }, 300);
  }, 4000);
}