let currentAudio = null;

fetch('songs.json')
  .then(res => res.json())
  .then(songs => {
    window.allSongs = songs;
    displaySongs(songs);
  })
  .catch(err => console.error('خطأ في تحميل الأغاني:', err));

function displaySongs(songs) {
  const container = document.getElementById('songs-container');
  container.innerHTML = '';

  songs.forEach(song => {
    const div = document.createElement('div');
    div.className = 'singer-card';
    div.innerHTML = `
      <img src="${song.image}" alt="${song.name}">
      <p>${song.name}</p>
    `;
    div.onclick = () => playSong(song.audio, song.name);
    container.appendChild(div);
  });
}

function playSong(audioSrc, name) {
  if (currentAudio) {
    currentAudio.pause();
  }
  const audio = new Audio(audioSrc);
  audio.play().catch(e => alert("فشل التشغيل. تحقق من اسم الملف أو المسار."));
  currentAudio = audio;
}

function filter(lang) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  fetch('songs.json')
    .then(res => res.json())
    .then(songs => {
      let filtered = songs;
      if (lang === 'arabic') filtered = songs.filter(s => s.language === 'arabic');
      if (lang === 'english') filtered = songs.filter(s => s.language === 'english');
      displaySongs(filtered);
    });
}
