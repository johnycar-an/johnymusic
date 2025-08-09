function playSong(videoUrl, name) {
  // استخرج معرف الفيديو من الرابط
  const videoIdMatch = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^&?/]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  if (!videoId) {
    alert("رابط YouTube غير صحيح");
    return;
  }

  // افتح الفيديو في نافذة جديدة أو داخل الموقع
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  // نافذة منبثقة (Popup)
  window.open(embedUrl, 'YouTube Karaoke', 'width=800,height=600');
}
