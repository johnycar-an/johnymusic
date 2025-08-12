// عرض الأغاني
function displaySongs(songs) {
  const container = document.getElementById('songs-container');
  container.innerHTML = '';

  songs.forEach(song => {
    const div = document.createElement('div');
    div.className = 'singer-card';
    div.innerHTML = `
      <img src="${song.image}" alt="${song.name}">
      <div class="badge">${song.difficulty}</div>
      <p>${song.name}</p>
    `;
    div.onclick = () => playSong(song.audio, song.name);
    container.appendChild(div);
  });
}

// تشغيل الأغنية (يدعم YouTube والملفات الصوتية)
function playSong(src, name) {
  const videoPlayer = document.getElementById('video-player');
  const youtubeFrame = document.getElementById('youtube-frame');

  // تنظيف المشغل السابق
  if (youtubeFrame) youtubeFrame.src = '';
  videoPlayer.style.display = 'none';
  document.getElementById('audio-player')?.remove();

  // إذا كان رابط يوتيوب
  if (src.includes('youtube.com') || src.includes('youtu.be')) {
    // استخراج معرف الفيديو
    const videoIdMatch = src.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?/]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (!videoId) {
      alert('رابط YouTube غير صحيح');
      return;
    }

    // تضمين الفيديو مع التشغيل التلقائي
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    youtubeFrame.src = embedUrl;
    videoPlayer.style.display = 'block';

  } 
  // إذا كان ملف صوتي محلي
  else if (src.endsWith('.mp3') || src.includes('audio/')) {
    const audioPlayer = document.createElement('div');
    audioPlayer.id = 'audio-player';
    audioPlayer.style = 'margin: 30px auto; padding: 20px; background: #121212; border: 1px solid #333; border-radius: 10px; max-width: 500px; text-align: center;';
    audioPlayer.innerHTML = `
      <h3>🎵 ${name}</h3>
      <audio controls autoplay style="width: 90%;">
        <source src="${src}" type="audio/mpeg">
        لم يُدعم تنسيق الصوت.
      </audio>
      <br>
      <button onclick="this.closest('#audio-player').remove()" style="margin-top: 15px; background: #d32f2f; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">
        إغلاق
      </button>
    `;
    document.getElementById('songs-container').before(audioPlayer);

  } else {
    alert('نوع الملف غير مدعوم');
  }
}

// إغلاق فيديو اليوتيوب
function closeVideo() {
  const youtubeFrame = document.getElementById('youtube-frame');
  if (youtubeFrame) youtubeFrame.src = '';
  document.getElementById('video-player').style.display = 'none';
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
      if (lang === 'turkish') filtered = songs.filter(s => s.language === 'turkish');
      if (lang === 'music') filtered = songs.filter(s => s.language === 'music');
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
    alert('فشل تحميل قائمة الأغاني. تحقق من ملف songs.json');
    console.error('خطأ:', err);
  });
