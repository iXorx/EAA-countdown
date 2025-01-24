function calculateCountdown(dueDateString) {
  const eadDueDate = new Date(dueDateString).getTime();
  const now = new Date().getTime();
  let distance = eadDueDate - now;

  if (distance < 0) {
    distance = 0;
  }

  const days = Math.floor(distance / (1000 * 3600 * 24));
  const d0 = Math.floor(days / 100);
  const d1 = Math.floor((days % 100) / 10);
  const d2 = days % 10;

  return { days, d0, d1, d2 };
}
