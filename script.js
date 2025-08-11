function playSong(src, name) {
  const container = document.getElementById('video-player');
  const frame = document.getElementById('youtube-frame');
  const audio = document.getElementById('local-audio');

  // إخفاء كل شيء أولًا
  if (frame) frame.src = '';
  if (audio) audio.pause();
  container.style.display = 'none';
  document.getElementById('audio-player')?.remove();

  // إذا كان الرابط يحتوي على youtube أو youtu.be
  if (src.includes('youtube.com') || src.includes('youtu.be')) {
    // استخراج معرف الفيديو
    const videoIdMatch = src.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?/]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (!videoId) {
      alert('رابط YouTube غير صحيح');
      return;
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    document.getElementById('youtube-frame').src = embedUrl;
    document.getElementById('video-player').style.display = 'block';

  } 
  // إذا كان ملف صوتي محلي (mp3)
  else if (src.endsWith('.mp3') || src.endsWith('.wav') || src.includes('audio/')) {
    const audioPlayer = document.createElement('div');
    audioPlayer.id = 'audio-player';
    audioPlayer.style = 'margin: 30px auto; text-align: center; padding: 20px; background: #121212; border: 1px solid #333; border-radius: 10px; max-width: 400px;';
    audioPlayer.innerHTML = `
      <h3>تشغيل: ${name}</h3>
      <audio controls autoplay style="width: 100%;">
        <source src="${src}" type="audio/mpeg">
        لم يُدعم تنسيق الصوت في متصفحك.
      </audio>
      <br>
      <button onclick
