/* ===== Countdown ===== */
const WEDDING_DATE = new Date('2026-08-15T15:00:00');

function updateCountdown() {
  const now = new Date();
  const diff = WEDDING_DATE - now;
  if (diff <= 0) return;

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  document.getElementById('cd-days').textContent = days;
  document.getElementById('cd-hours').textContent = hours;
  document.getElementById('cd-minutes').textContent = minutes;
  document.getElementById('cd-seconds').textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ===== Calendar Widget (August 2026) ===== */
function renderCalendar() {
  const widget = document.getElementById('calendar-widget');
  const highlightDay = 15;
  const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const firstDay = new Date(2026, 7, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = 31;

  let html = '<div class="cal-header">Август 2026</div><div class="cal-grid">';
  dayNames.forEach(d => { html += '<div class="cal-day-name">' + d + '</div>'; });
  for (let i = 0; i < startOffset; i++) html += '<div class="cal-day empty"></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const cls = d === highlightDay ? 'cal-day highlight' : 'cal-day';
    html += '<div class="' + cls + '">' + d + '</div>';
  }
  html += '</div>';
  widget.innerHTML = html;
}

renderCalendar();

/* ===== RSVP Form ===== */
const rsvpOverlay = document.getElementById('rsvp-overlay');
const rsvpForm = document.getElementById('rsvp-form');
const rsvpSuccess = document.getElementById('rsvp-success');

document.getElementById('rsvp-open-btn').addEventListener('click', function () {
  rsvpOverlay.classList.remove('hidden');
});

document.getElementById('rsvp-close').addEventListener('click', function () {
  rsvpOverlay.classList.add('hidden');
});

rsvpOverlay.addEventListener('click', function (e) {
  if (e.target === rsvpOverlay) rsvpOverlay.classList.add('hidden');
});

rsvpForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const data = new FormData(rsvpForm);
  const name = data.get('fullname');
  const phone = data.get('phone');

  /* Google Forms integration placeholder — replace ACTION_URL and entry IDs */
  /*
  fetch('https://docs.google.com/forms/d/e/FORM_ID/formResponse', {
    method: 'POST',
    mode: 'no-cors',
    body: new URLSearchParams({ 'entry.NAME_ID': name, 'entry.PHONE_ID': phone })
  });
  */

  rsvpForm.classList.add('hidden');
  rsvpSuccess.classList.remove('hidden');
  console.log('RSVP:', name, phone);
});

/* ===== Music Toggle ===== */
const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');
const iconOn = document.getElementById('music-icon-on');
const iconOff = document.getElementById('music-icon-off');
let musicPlaying = false;

musicBtn.addEventListener('click', function () {
  if (musicPlaying) {
    audio.pause();
    iconOn.classList.add('hidden');
    iconOff.classList.remove('hidden');
  } else {
    audio.play().catch(function () {});
    iconOn.classList.remove('hidden');
    iconOff.classList.add('hidden');
  }
  musicPlaying = !musicPlaying;
});

/* Auto-prompt music on first interaction */
document.addEventListener('click', function startMusic() {
  if (!musicPlaying) {
    audio.play().then(function () {
      musicPlaying = true;
      iconOn.classList.remove('hidden');
      iconOff.classList.add('hidden');
    }).catch(function () {});
  }
  document.removeEventListener('click', startMusic);
}, { once: true });

/* ===== Scroll Reveal ===== */
function initReveal() {
  document.querySelectorAll('.section:not(.hero)').forEach(function (el) {
    el.classList.add('reveal');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
}

initReveal();
