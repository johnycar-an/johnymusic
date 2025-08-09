let currentAudio = null;

// تحميل قائمة الأغاني
fetch('songs.json')
  .then(res => res.json())
  .then(songs => {
    window.allSongs = songs;
    displaySongs(songs);
  })
  .catch(err => console.error('خطأ في تحميل الأغاني:', err));

// عرض الأغاني
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

// تشغيل الأغنية
function playSong(audioSrc, name) {
  if (currentAudio) {
    currentAudio.pause();
  }
  const audio = new Audio(audioSrc);
  audio.play().catch(e => alert("فشل التشغيل. تأكد من اسم الملف."));
  currentAudio = audio;
  document.getElementById('songs-container').style.opacity = '0.8';
  setTimeout(() => {
    document.getElementById('songs-container').style.opacity = '1';
  }, 200);
}

// تصفية حسب اللغة
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
