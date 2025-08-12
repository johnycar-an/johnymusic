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
