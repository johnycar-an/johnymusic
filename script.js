function playSong(videoUrl, name) {
  // استخراج معرف الفيديو من رابط YouTube
  const videoIdMatch = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^&?/]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  if (!videoId) {
    alert("رابط YouTube غير صحيح. تأكد من الرابط.");
    return;
  }

  // إظهار مشغل الفيديو
  const videoPlayer = document.getElementById('video-player');
  const youtubeFrame = document.getElementById('youtube-frame');

  youtubeFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  videoPlayer.style.display = 'block';

  // تمرير اسم الأغنية كعنوان (اختياري)
  document.title = `تشغيل: ${name} - كاريوكي`;
}

// إغلاق الفيديو
function closeVideo() {
  const youtubeFrame = document.getElementById('youtube-frame');
  const videoPlayer = document.getElementById('video-player');
  
  youtubeFrame.src = ''; // إيقاف الفيديو
  videoPlayer.style.display = 'none';
}

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

// تحميل الأغاني عند التحميل
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
