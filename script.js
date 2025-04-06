
const riddles = [
  {
    text: `In a world of pixels, bullets, and pride,
We met not in person, but side by side.
A battleground sparked what fate had planned,
Not just teammates, but hearts hand in hand.
From loot and zones to hearts that blend,
Guess what began with a game—but will never end?

A love story born in`,
    input: true,
    answer: 'pubg'
  },
  {
    text: `Two moments captured, frozen in time,
Both hold memories, both truly divine.
But one of them makes your heart glow bright,
It’s the one you cherish, your favorite sight.
Look with your heart, not just your eyes—
Which photo wins the sweetest prize?`,
    images: ['media/riddle2-img1.jpg', 'media/riddle2-img2.jpg'],
    correctPhotos: ['1', '2']
  },
  {
    text: `A memory in motion, laughter and light,
A day we remember, hearts feeling right.
We caught it on camera, that magical space,
Now tell me, my love—what was that place?`,
    video: 'media/riddle3-video.mp4',
    input: true,
    answer: 'monkey'
  },
  {
    text: `Soft as a whisper, sweet as a tune,
I think of you beneath the moon.
A song that plays, and time stands still,
With dandelions and a heart to fill.
It’s your favorite melody, a dreamy song,
Can you name the tune where your heart belongs?`,
    audio: 'media/dandelions.mp3',
    input: true,
    answer: 'dandelions'
  },
  {
    text: `A name that makes you grin from ear to ear.
It’s soft and sweet and just for you—`,
    input: true,
    answer: 'mikki'
  },
  {
    text: `I’m made of words, but from the heart,
Each line a feeling, a work of art.
No envelope, but sealed with care,
A piece of me is waiting there.`,
    final: true
  }
];

let currentRiddle = 0;
const container = document.getElementById('riddle-container');

function typeText(text, callback) {
  container.innerHTML = '';
  let i = 0;
  const span = document.createElement('div');
  container.appendChild(span);

  const interval = setInterval(() => {
    if (i < text.length) {
      span.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
      callback();
    }
  }, 30);
}

function showRiddle(index) {
  const riddle = riddles[index];

  if (riddle.audio) {
    const audio = new Audio(riddle.audio);
    audio.play();
  }

  typeText(riddle.text + '\n\n', () => {
    if (riddle.images) {
      riddle.images.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.onclick = () => checkPhotoAnswer(String(i + 1));
        container.appendChild(img);
      });
    }

    if (riddle.video) {
      const video = document.createElement('video');
      video.src = riddle.video;
      video.controls = true;
      container.appendChild(video);
    }

    if (riddle.input) {
      const input = document.createElement('input');
      input.id = 'answer';
      input.placeholder = 'Your answer...';

      const button = document.createElement('button');
      button.innerText = 'Submit';
      button.onclick = () => checkAnswer(riddle.answer);

      container.appendChild(input);
      container.appendChild(button);
    }

    if (riddle.final) {
      setTimeout(() => {
        window.location.href = 'love-letter.html';
      }, 4000);
    }
  });
}

function checkAnswer(expected) {
  const input = document.getElementById('answer');
  const value = input?.value?.trim().toLowerCase();

  if (value === expected.toLowerCase()) {
    currentRiddle++;
    showRiddle(currentRiddle);
  } else {
    alert('Oops! Try again, love ❤️');
  }
}

function checkPhotoAnswer(selected) {
  const riddle = riddles[currentRiddle];
  if (riddle.correctPhotos.includes(selected)) {
    currentRiddle++;
    showRiddle(currentRiddle);
  } else {
    alert('Nope! Try the other one 🥺');
  }
}

window.onload = () => showRiddle(currentRiddle);
