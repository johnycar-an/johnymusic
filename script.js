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

// تشغيل
