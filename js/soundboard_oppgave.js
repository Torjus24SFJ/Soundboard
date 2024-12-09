//*1. Create an external JSON or js file containing information about the sounds you want to use. Import the file in here:  */

let currentAudio = null; // Makes sure only one audio clip plays at a time

async function loadSounds() {
  try {
    const response = await fetch("./data/Sound-file.json");
    const sounds = await response.json();
    //*1.3. Write a console log for the fetched sounds so you know how the structure is and how you can use it */
    console.log(sounds);
    //*3. Create a function that loops over the sounds (from the data file you created). Use that function created in 2. to use the logic there to create the buttons. I prefer that you use .forEach or .map */
    sounds.forEach(createSoundButton);
  } catch (error) {
    console.error("Error fetching sounds:", error);
  }
}

loadSounds();

//*1.1. Catch the html element with id drumkit: */
const drumkit = document.getElementById("drumkit");
//*4. Call on the function that loops over the sounds and creates the buttons */
function createSoundButton(sound) {
  //*2. Create the function with a parameter that is refering to the sound used that does the following: */
  //2.1. make a variable that creates a button element with .createElement
  const button = document.createElement("button");
  // add textContent to the created buttonElement. Textcontent should be either the file name and/or key needed to be pressed
  button.textContent = `${sound.label} (${sound.key})`;
  //! Make each button random different color
  const randomColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
  button.style.backgroundColor = randomColor;
  //2.2. make a variables that create an audio element with .createElement
  const audio = document.createElement("audio");
  //the audio element that is created should have the src equal to the file source
  audio.src = sound.sound;
  //the audio element that is created should have the id equal to the textcontent created in 2.1.
  audio.id = sound.key;
  //2.3. add an eventlistner to the whole page that:
  //actives when pressing a keyboard key (first parameter of the eventlistener)
  //runs a nameless function with parameter event (refering to the key pressed)
  document.addEventListener("keydown", (event) => {
    if (event.key === sound.key) {
      if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      audio.play();
      currentAudio = audio; // Update currently playing audio
    }
  });
  //2.4. OPTIONAL. If you used keydown as the first parameter in the previous eventlistener, add another eventlistner to the whole page that:
  //actives when releasing a keyboard key (first parameter of the eventlistener)
  document.addEventListener("keyup", (event) => {
    if (event.key === sound.key && currentAudio === audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null; // Clear currentAudio when stopped
    }
  });
  //2.5. OPTIONAL. Create an eventlistener for clicking. Also create a logic for preventing more sounds to be played at the same time
  button.addEventListener("click", () => {
    if(currentAudio){
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
        audio.play();
        currentAudio = audio; // Update currently playing audio
  });
  //2.6. append the created button and audio element to the html element you refered in 1.
  drumkit.appendChild(button);
  drumkit.appendChild(audio);
}
