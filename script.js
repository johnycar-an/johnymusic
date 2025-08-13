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
      alert('رابط YouTube غير
