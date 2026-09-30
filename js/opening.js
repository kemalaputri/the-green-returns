document.addEventListener('DOMContentLoaded', () => {
	const dialogueText = document.querySelector('#dialogue-text');
	const openingScene = document.querySelector('.opening-scene');
	const rayna = document.querySelector('.rayna');
	const backButton = document.querySelector('#back-button');
	const nextButton = document.querySelector('#next-button');
	const sceneBgm = document.querySelector('#scene-bgm');
	const typingSound = document.querySelector('#typing-sound');
	const clickSound = document.querySelector('#click-sound');
	const soundButton = document.querySelector('#sound-button');
	const soundState = document.querySelector('#sound-state');
	const skipOpeningButton = document.querySelector('#skip-opening-button');
	const gameAudio = window.gameAudio;
	const dialogues = [
		'Setelah sekian lama, akhirnya aku kembali ke desa ini. Tapi.. kenapa semuanya terlihat berbeda?',
		'Dulu, desa ini terasa begitu hijau dan asri. Sekarang tanahnya kering, pepohonan banyak yang rusak... semuanya terasa berbeda.',
		'Kalau saja desa ini bisa kembali seperti dulu...',
		'Pepohonannya kembali hijau...',
		'Sungainya kembali bersih....',
		'Dan desa ini kembali dipenuhi kehidupan.',
		'Andai aku bisa membuatnya kembali seperti ini.',
		'Mungkin.. aku memang harus mencoba.',
		'Aku harus mulai dari sesuatu',
		'Kalau bukan aku yang memulainya, lalu siapa?',
		'Ayo teman-teman, bantu rayna untuk mengembalikan keindahan alam!'
	];
	const thoughtStartIndex = 2;
	const sceneThreeStartIndex = 8;
	let dialogueIndex = 0;
	let characterIndex = 0;
	let typingTimer;
	let isTyping = false;
	let audioUnlocked = false;
	let sceneSoundMuted = false;

	gameAudio.registerBgm(sceneBgm);
	gameAudio.registerSfx(typingSound);
	gameAudio.registerSfx(clickSound);

	const syncSceneAudio = () => {
		const state = gameAudio.getState();
		sceneBgm.muted = sceneSoundMuted || state.bgmMuted;
		typingSound.muted = sceneSoundMuted || state.sfxMuted;
	};

	const playSceneBgm = () => gameAudio.playBgm(sceneBgm);

	const playTypingSound = () => {
		if (typingSound.muted) {
			return Promise.resolve();
		}
		typingSound.currentTime = 0;
		return typingSound.play().catch(() => {});
	};

	const pauseTypingSound = () => {
		typingSound.pause();
		typingSound.currentTime = 0;
	};

	const skipOpening = () => {
		clearInterval(typingTimer);
		pauseTypingSound();
		sceneBgm.pause();
		sceneBgm.currentTime = 0;
		openingScene.classList.remove('scene-ending');
		openingScene.hidden = true;
		nextButton.disabled = false;
		backButton.disabled = false;
		window.dispatchEvent(new Event('green-returns:show-main-menu'));
	};

	const updateBackButton = () => {
		backButton.disabled = dialogueIndex === 0;
	};

	const updateSceneMode = () => {
		const isThoughtMode = dialogueIndex >= thoughtStartIndex && dialogueIndex < sceneThreeStartIndex;
		openingScene.classList.toggle('thought-mode', isThoughtMode);
	};

	const updateRaynaExpression = () => {
		const isHappy = dialogueIndex >= dialogues.length - 2;
		rayna.src = isHappy
			? 'assets/images/characters/rayna_happy.png'
			: 'assets/images/characters/rayna_sad.png';
		rayna.alt = isHappy ? 'Rayna bahagia' : 'Rayna sedih';
	};

	const showDialogue = () => {
		clearInterval(typingTimer);
		pauseTypingSound();
		characterIndex = 0;
		isTyping = true;
		nextButton.disabled = false;
		dialogueText.textContent = '';
		updateBackButton();
		updateSceneMode();
		updateRaynaExpression();
		typingTimer = setInterval(() => {
			if (characterIndex === 0) {
				playTypingSound();
			}
			dialogueText.textContent = dialogues[dialogueIndex].slice(0, characterIndex + 1);
			characterIndex += 1;
			if (characterIndex >= dialogues[dialogueIndex].length) {
				clearInterval(typingTimer);
				pauseTypingSound();
				isTyping = false;
			}
		}, 35);
	};

	const showOpening = () => {
		dialogueIndex = dialogues.length - 1;
		openingScene.hidden = false;
		openingScene.classList.remove('scene-ending');
		showDialogue();
		playSceneBgm();
	};

	playSceneBgm();
	const resumeAudioAfterInteraction = () => {
		if (audioUnlocked) {
			return;
		}
		audioUnlocked = true;
		playSceneBgm();
		playTypingSound().then(() => {
			if (!isTyping) {
				pauseTypingSound();
			}
		});
	};
	document.addEventListener('pointerdown', resumeAudioAfterInteraction, { capture: true, once: true });
	document.addEventListener('keydown', resumeAudioAfterInteraction, { capture: true, once: true });

	soundButton.addEventListener('click', () => {
		sceneSoundMuted = !sceneSoundMuted;
		syncSceneAudio();
		soundState.textContent = sceneSoundMuted ? 'OFF' : 'ON';
		soundButton.setAttribute('aria-pressed', String(sceneSoundMuted));
		if (!sceneSoundMuted) {
			playSceneBgm();
			if (isTyping) {
				playTypingSound();
			}
		}
	});

	skipOpeningButton.addEventListener('click', skipOpening);

	backButton.addEventListener('click', () => {
		playSceneBgm();
		if (dialogueIndex > 0) {
			dialogueIndex -= 1;
			showDialogue();
		}
	});

	nextButton.addEventListener('click', () => {
		playSceneBgm();
		if (isTyping) {
			clearInterval(typingTimer);
			pauseTypingSound();
			dialogueText.textContent = dialogues[dialogueIndex];
			characterIndex = dialogues[dialogueIndex].length;
			isTyping = false;
			return;
		}
		if (dialogueIndex < dialogues.length - 1) {
			dialogueIndex += 1;
			showDialogue();
			return;
		}
		pauseTypingSound();
		sceneBgm.pause();
		sceneBgm.currentTime = 0;
		openingScene.classList.add('scene-ending');
		nextButton.disabled = true;
		backButton.disabled = true;
	});

	openingScene.addEventListener('animationend', (event) => {
		if (event.animationName !== 'scene-fade-out') {
			return;
		}
		openingScene.hidden = true;
		window.dispatchEvent(new Event('green-returns:show-main-menu'));
	});
	window.addEventListener('green-returns:show-opening', showOpening);
	showDialogue();
});
