let currentAudio = null;

async function loadSounds() {
  try {
    const response = await fetch("../data/Sound-file.json/");
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
  const randomColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
  const audio = document.createElement("audio");
  
  button.textContent = `${sound.label} (${sound.key})`;
  button.style.backgroundColor = randomColor;
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
    if(currentAudio){
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
        audio.play();
        currentAudio = audio;
  });
  drumkit.appendChild(button);
  drumkit.appendChild(audio);
}
