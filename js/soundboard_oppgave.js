let currentAudio = null;

async function loadSounds() {
  try {
    const response = await fetch("./data/Sound-file.json");
    const sounds = await response.json();
    sounds.forEach(createSoundButton);
  } catch (error) {
    console.error("Error fetching sounds:", error);
  }
}

loadSounds();

const drumkit = document.getElementById("drumkit");

function createSoundButton(sound) {
  const button = document.createElement("button");
  button.textContent = `${sound.label} (${sound.key})`;
  const randomColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
  button.style.backgroundColor = randomColor;
  const audio = document.createElement("audio");
  audio.src = sound.sound;
  audio.id = sound.key;

  document.addEventListener('keypress', (e) => {
    if (e.key === sound.key){ 
      if (currentAudio && currentAudio !== audio) 
        {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }
        audio.play();
        currentAudio = audio;
    }
  })

  button.addEventListener("click", () => {
    console.log("Trying to play:", audio.src);
    
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    audio.play().catch(error => {
        console.error("Playback error:", error);
    });

    currentAudio = audio;
});

  drumkit.appendChild(button);
  drumkit.appendChild(audio);
}
