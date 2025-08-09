function playSong(videoUrl, name) {
  // استخراج معرف الفيديو من رابط YouTube
  const videoIdMatch = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^&?/]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  if (!videoId) {
    alert("رابط YouTube غير صحيح للـ: " + name);
    return;
  }

  // إنشاء رابط تشغيل تلقائي (Autoplay)
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0`;

  // فتح فيديو في نافذة منبثقة صغيرة
  const popup = window.open(
    embedUrl,
    'YouTube Karaoke',
    'width=800,height=600,top=100,left=100,scrollbars=no,toolbar=no,menubar=no'
  );

  if (!popup || popup.closed || typeof popup.closed === 'undefined') {
    alert('يرجى إيقاف منع النوافذ المنبثقة في المتصفح.');
  }
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
      
      const container = document.getElementById('songs-container');
      container.innerHTML = '';

      filtered.forEach(song => {
        const div = document.createElement('div');
        div.className = 'singer-card';
        div.innerHTML = `
          <img src="${song.image}" alt="${song.name}">
          <p>${song.name}</p>
        `;
        div.onclick = () => playSong(song.audio, song.name);
        container.appendChild(div);
      });
    });
}

// تحميل الأغاني عند التحميل
window.onload = () => {
  fetch('songs.json')
    .then(res => res.json())
    .then(songs => {
      window.allSongs = songs;
      displaySongs(songs);
    })
    .catch(err => {
      console.error('خطأ في تحميل songs.json:', err);
      alert('فشل تحميل قائمة الأغاني.');
    });
};

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
