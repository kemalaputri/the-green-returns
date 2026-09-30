document.addEventListener('DOMContentLoaded', () => {
	const riverScene = document.querySelector('.river-scene');
	const riverBgm = document.querySelector('#river-bgm');
	const riverScore = document.querySelector('#river-score');
	const riverTimer = document.querySelector('#river-timer');
	const riverPowerupStatus = document.querySelector('#river-powerup-status');
	const riverBoat = document.querySelector('#river-boat');
	const riverGameArea = document.querySelector('.river-game-area');
	const riverHitFlash = document.querySelector('.river-hit-flash');
	const riverBackgroundDirty = document.querySelector('.river-background-dirty');
	const riverBackgroundClean = document.querySelector('.river-background-clean');
	const riverIntro = document.querySelector('.river-intro');
	const riverIntroText = document.querySelector('#river-intro-text');
	const riverIntroNext = document.querySelector('#river-intro-next');
	const riverIntroBack = document.querySelector('#river-intro-back');
	const riverTutorialButton = document.querySelector('#river-tutorial-button');
	const riverTutorialPanel = document.querySelector('#river-tutorial-panel');
	const riverTutorialClose = document.querySelector('#river-tutorial-close');
	const riverTutorialStart = document.querySelector('#river-tutorial-start');
	const riverCollectionButton = document.querySelector('#river-collection-button');
	const riverCollectionPanel = document.querySelector('#river-collection-panel');
	const riverCollectionGrid = document.querySelector('#river-collection-grid');
	const riverCollectionProgress = document.querySelector('#river-collection-progress');
	const riverCollectionClose = document.querySelector('#river-collection-close');
	const riverEducationPanel = document.querySelector('#river-education-panel');
	const riverEducationImage = document.querySelector('#river-education-image');
	const riverEducationTitle = document.querySelector('#river-education-title');
	const riverEducationText = document.querySelector('#river-education-text');
	const riverEducationClose = document.querySelector('#river-education-close');
	const riverRestartConfirmation = document.querySelector('#river-restart-confirmation');
	const riverRestartYes = document.querySelector('#river-restart-yes');
	const riverRestartNo = document.querySelector('#river-restart-no');
	const riverHutanConfirmation = document.querySelector('#river-hutan-confirmation');
	const riverHutanMap = document.querySelector('#river-hutan-map');
	const riverHutanGo = document.querySelector('#river-hutan-go');
	const riverResultScreen = document.querySelector('.river-result-screen');
	const typingSound = document.querySelector('#typing-sound');
	const riverResultBg = document.querySelector('.river-result-bg');
	const riverResultRayna = document.querySelector('#river-result-rayna');
	const riverResultCharacter = document.querySelector('.river-result-character');
	const riverResultDialog = document.querySelector('#river-result-dialog');
	const riverNextButton = document.querySelector('#river-next-button');
	const riverBackButton = document.querySelector('#river-back-button');
	const riverResultBackButton = document.querySelector('#river-result-back-button');
	const riverSettingsButton = document.querySelector('#river-settings-button');
	const riverSettingsPanel = document.querySelector('#river-settings-panel');
	const riverSettingsClose = document.querySelector('#river-settings-close');
	const riverBgmVolume = document.querySelector('#river-bgm-volume');
	const riverSfxVolume = document.querySelector('#river-sfx-volume');
	const riverBgmVolumeValue = document.querySelector('#river-bgm-volume-value');
	const riverSfxVolumeValue = document.querySelector('#river-sfx-volume-value');
	const riverBgmToggle = document.querySelector('#river-bgm-toggle');
	const riverSfxToggle = document.querySelector('#river-sfx-toggle');
	const riverSfx = {
		obstacle: document.querySelector('#river-sfx-obstacle'),
		trash: document.querySelector('#river-sfx-trash'),
		shoe: document.querySelector('#river-sfx-shoe'),
		magnet: document.querySelector('#river-sfx-magnet'),
		success: document.querySelector('#river-sfx-success'),
		failure: document.querySelector('#river-sfx-failure')
	};
	const gameAudio = window.gameAudio;
	riverScene.appendChild(riverTutorialPanel);
	riverScene.appendChild(riverCollectionPanel);
	riverScene.appendChild(riverEducationPanel);
	riverScene.appendChild(riverRestartConfirmation);
	riverScene.appendChild(riverHutanConfirmation);
	let failureAudioContext;
	let failureAudioGain;
	let failureAudioSource;
	const pressedKeys = new Set();
	const trashAssets = ['botol', 'botol1', 'gelas', 'kaleng', 'plastikk'];
	const collectionStorageKey = 'green-returns-river-collection';
	const trashInfo = {
		botol: { name: 'Botol Plastik', image: 'botol.png', text: 'Botol plastik membutuhkan waktu sangat lama untuk terurai. Jika dibuang ke sungai, plastik dapat mencemari air dan membahayakan hewan air.' },
		botol1: { name: 'Botol Kaca', image: 'botol1.png', text: 'Botol kaca sulit terurai secara alami. Jika pecah dan dibuang ke sungai, pecahannya dapat melukai manusia maupun hewan.' },
		gelas: { name: 'Gelas Plastik', image: 'gelas.png', text: 'Gelas plastik sekali pakai dapat menjadi sampah dalam jumlah besar. Mengurangi penggunaannya dapat membantu mengurangi pencemaran lingkungan.' },
		kaleng: { name: 'Kaleng', image: 'kaleng.png', text: 'Kaleng yang dibuang sembarangan dapat mencemari lingkungan. Kaleng sebaiknya dikumpulkan dan didaur ulang.' },
		plastikk: { name: 'Kantong Plastik', image: 'plastikk.png', text: 'Kantong plastik yang masuk ke sungai dapat terbawa hingga laut dan membahayakan hewan yang mengira plastik sebagai makanan.' }
	};
	let discoveredTrash = (() => {
		try {
			const saved = JSON.parse(localStorage.getItem(collectionStorageKey) || '[]');
			return new Set(Array.isArray(saved) ? saved.filter((type) => trashInfo[type]) : []);
		} catch {
			return new Set();
		}
	})();
	const trashScores = {
		plastikk: 10,
		plastik: 10,
		gelas: 15,
		botol: 20,
		kaleng: 30,
		botol1: 40
	};
	const obstacleAssets = ['akar_mati', 'batu', 'duri_kayu', 'tumpahan_minyak'];
	const powerUpAssets = {
		magnet: 'assets/images/river/PowerUp/magnet.png',
		sepatu_super: 'assets/images/river/PowerUp/sepatu_super.png'
	};
	const introDialogues = [
		'Hai! Bantu Rayna membersihkan sungai dengan menggerakkan perahu ke kiri, kanan, depan, dan belakang.',
		'Capai 800 skor sebelum waktu habis. Ada sampah bernilai berbeda, rintangan yang harus dihindari, dan power-up yang bisa membantu. Buka TUTORIAL untuk melihat panduannya.'
	];
	const successEndingDialogues = [
		(score) => `Skormu ${score}! Rayna bangga, sungai berhasil dibersihkan.`,
		() => 'tapi sepertinya masih ada masalah lain.',
		() => 'Hmm ternyata benar, terlihat seperti ada masalah di hutan.',
		() => 'jangan-jangan ini juga memengaruhi lingkungan desa.',
		() => 'Aku harus melihat langsung ke area hutan untuk mencari penyebabnya.'
	];
	const state = {
		score: 100,
		target: 800,
		cleanThreshold: 500,
		maxScore: 800,
		timeLeft: 60,
		timerStarted: false,
		started: false,
		finished: false,
		boatX: 0,
		boatY: 0,
		boatSpeed: 360,
		idleReverseSpeed: 42,
		boatFrame: 0,
		boatAnimationTimer: 0,
		magnetUntil: 0,
		superShoeUntil: 0,
		spawnTimer: 0,
		items: [],
		lastFrame: 0,
		animationId: 0,
		resultSent: false,
		introTyping: false,
		introChars: 0,
		introTimer: null,
		introIndex: 0,
		introText: introDialogues[0],
		resultTimer: null,
		resultTyping: false,
		resultSuccess: false,
		successEndingStage: 0,
		paused: false,
		pausedAt: 0
	};

	const saveCollection = () => localStorage.setItem(collectionStorageKey, JSON.stringify([...discoveredTrash]));

	const updateCollection = () => {
		riverCollectionProgress.textContent = `Koleksi ${discoveredTrash.size}/${trashAssets.length}`;
		riverCollectionGrid.innerHTML = '';
		trashAssets.forEach((type) => {
			const info = trashInfo[type];
			const found = discoveredTrash.has(type);
			const card = document.createElement('button');
			card.type = 'button';
			card.className = `river-collection-item${found ? ' is-found' : ' is-locked'}`;
			card.disabled = !found;
			card.setAttribute('aria-label', found ? `Baca informasi ${info.name}` : 'Koleksi masih terkunci');
			card.innerHTML = `<img src="assets/images/river/trash/${info.image}" alt=""><strong>${found ? info.name : 'Terkunci'}</strong><span class="river-collection-points">${trashScores[type]} poin</span><span>${found ? 'Klik untuk info' : 'Belum ditemukan'}</span>`;
			if (found) card.addEventListener('click', () => openEducation(type));
			riverCollectionGrid.appendChild(card);
		});
	};

	const pauseGameplay = () => {
		if (state.started && !state.finished) {
			state.paused = true;
			state.pausedAt = performance.now();
			pressedKeys.clear();
		}
	};

	const resumeGameplay = () => {
		if (!riverCollectionPanel.hidden || !riverEducationPanel.hidden) return;
		if (state.pausedAt) {
			const pausedDuration = performance.now() - state.pausedAt;
			state.magnetUntil += pausedDuration;
			state.superShoeUntil += pausedDuration;
		}
		state.paused = false;
		state.pausedAt = 0;
		state.lastFrame = 0;
	};

	const openCollection = () => {
		updateCollection();
		pauseGameplay();
		riverCollectionPanel.hidden = false;
		riverCollectionClose.focus();
	};
	const closeCollection = () => {
		riverCollectionPanel.hidden = true;
		resumeGameplay();
	};
	const openEducation = (type) => {
		const info = trashInfo[type];
		if (!info) return;
		pauseGameplay();
		riverEducationImage.src = `assets/images/river/trash/${info.image}`;
		riverEducationImage.alt = info.name;
		riverEducationTitle.textContent = info.name;
		riverEducationText.textContent = info.text;
		riverEducationPanel.hidden = false;
		riverEducationClose.focus();
	};
	const closeEducation = () => {
		riverEducationPanel.hidden = true;
		resumeGameplay();
	};

	const showSuccessEndingDialogue = (stage) => {
		state.successEndingStage = stage;
		if (stage === 1) {
			riverResultRayna.src = 'assets/images/characters/rayna_sad.png';
			riverResultCharacter.hidden = false;
			riverResultScreen.classList.remove('is-hutan-dialogue');
		}
		if (stage === 2) {
			riverResultBg.src = 'assets/images/river/background/sungai_hutan.mp4';
			riverResultBg.load();
			playRiverVideo(riverResultBg);
			riverResultCharacter.hidden = true;
			riverResultScreen.classList.add('is-hutan-dialogue');
		}
		typeDialogue(riverResultDialog, successEndingDialogues[stage](state.score), 'resultTimer', 'resultTyping');
	};

	const formatTime = (value) => {
		const safe = Math.max(0, Math.ceil(value));
		const minutes = String(Math.floor(safe / 60)).padStart(2, '0');
		const seconds = String(safe % 60).padStart(2, '0');
		return `${minutes}:${seconds}`;
	};

	const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

	const updateHud = () => {
		riverScore.textContent = String(state.score);
		riverTimer.textContent = formatTime(state.timeLeft);
		const activePowerUps = [];
		if (state.magnetUntil > performance.now()) {
			activePowerUps.push(`MAGNET ${Math.ceil((state.magnetUntil - performance.now()) / 1000)}s`);
		}
		if (state.superShoeUntil > performance.now()) {
			activePowerUps.push(`SEPATU SUPER ${Math.ceil((state.superShoeUntil - performance.now()) / 1000)}s`);
		}
		riverPowerupStatus.textContent = activePowerUps.join('  |  ');
	};

	const updateRiverAudioControls = () => {
		const audioState = gameAudio.getState();
		riverBgmVolume.value = audioState.bgmVolume;
		riverSfxVolume.value = audioState.sfxVolume;
		riverBgmVolumeValue.textContent = `${Math.round(audioState.bgmVolume * 100)}%`;
		riverSfxVolumeValue.textContent = `${Math.round(audioState.sfxVolume * 100)}%`;
		riverBgmToggle.textContent = audioState.bgmMuted ? 'UNMUTE BGM' : 'MUTE BGM';
		riverSfxToggle.textContent = audioState.sfxMuted ? 'UNMUTE SFX' : 'MUTE SFX';
	};

	const triggerBoatShake = () => {
		riverBoat.classList.remove('is-shaking');
		void riverBoat.offsetWidth;
		riverBoat.classList.add('is-shaking');
		window.setTimeout(() => riverBoat.classList.remove('is-shaking'), 220);
	};

	const triggerHitFlash = () => {
		if (!riverHitFlash) {
			return;
		}
		riverHitFlash.classList.remove('is-visible');
		void riverHitFlash.offsetWidth;
		riverHitFlash.classList.add('is-visible');
		window.setTimeout(() => riverHitFlash.classList.remove('is-visible'), 260);
	};

	const getRiverBounds = () => {
		const minX = riverGameArea.clientWidth * 0.26;
		const maxX = riverGameArea.clientWidth * 0.74;
		const minY = 0;
		const maxY = riverGameArea.clientHeight;
		return { minX, maxX, minY, maxY };
	};

	const setBoatPosition = () => {
		const { minX, maxX, minY, maxY } = getRiverBounds();
		const boatHalfWidth = riverBoat.offsetWidth * 0.5;
		const leftBoundary = minX + boatHalfWidth * 0.7;
		const rightBoundary = maxX - boatHalfWidth * 0.7;
		const boatHalfHeight = riverBoat.offsetHeight * 0.5;
		const topBoundary = minY + boatHalfHeight;
		const bottomBoundary = maxY - boatHalfHeight;
		state.boatX = clamp(state.boatX, leftBoundary, rightBoundary);
		state.boatY = clamp(state.boatY, topBoundary, bottomBoundary);
		riverBoat.style.left = `${state.boatX}px`;
		riverBoat.style.top = `${state.boatY}px`;
	};

	const updateBoatFrame = (frame = state.boatFrame) => {
		state.boatFrame = frame % 3;
		riverBoat.src = `assets/images/river/boat/reyna_boat_0${state.boatFrame + 1}.png`;
	};

	const resetState = () => {
		state.score = 100;
		state.timeLeft = 60;
		state.timerStarted = false;
		state.started = false;
		state.finished = false;
		state.resultSent = false;
		state.resultSuccess = false;
		state.successEndingStage = 0;
		state.boatFrame = 0;
		state.boatAnimationTimer = 0;
		state.magnetUntil = 0;
		state.superShoeUntil = 0;
		riverBackgroundClean.classList.remove('is-visible');
		state.spawnTimer = 0;
		state.items.forEach((item) => item.remove());
		state.items = [];
		state.boatX = riverGameArea.clientWidth * 0.5;
		state.boatY = riverGameArea.clientHeight * 0.72;
		updateHud();
		setBoatPosition();
		updateBoatFrame();
	};

	const playTypingSound = () => {
		if (!typingSound || typingSound.muted || gameAudio.getState().sfxMuted) {
			return Promise.resolve();
		}
		typingSound.currentTime = 0;
		return typingSound.play().catch(() => {});
	};

	const pauseTypingSound = () => {
		if (!typingSound) {
			return;
		}
		typingSound.pause();
		typingSound.currentTime = 0;
	};

	const playRiverVideo = (video) => {
		if (video) {
			video.play().catch(() => {});
		}
	};

	const playRiverSfx = (effect) => {
		if (!effect || gameAudio.getState().sfxMuted) {
			return;
		}
		if (effect === riverSfx.failure && window.AudioContext) {
			if (!failureAudioContext) {
				failureAudioContext = new AudioContext();
				failureAudioSource = failureAudioContext.createMediaElementSource(effect);
				failureAudioGain = failureAudioContext.createGain();
				failureAudioGain.gain.value = 2.2;
				failureAudioSource.connect(failureAudioGain);
				failureAudioGain.connect(failureAudioContext.destination);
			}
			failureAudioContext.resume().catch(() => {});
		}
		effect.currentTime = 0;
		effect.play().catch(() => {});
	};

	const typeDialogue = (element, text, timerKey, typingKey) => {
		clearInterval(state[timerKey]);
		pauseTypingSound();
		state[typingKey] = true;
		let characterIndex = 0;
		element.textContent = '';
		state[timerKey] = setInterval(() => {
			if (characterIndex === 0) {
				playTypingSound();
			}
			element.textContent = text.slice(0, characterIndex + 1);
			characterIndex += 1;
			if (characterIndex >= text.length) {
				clearInterval(state[timerKey]);
				pauseTypingSound();
				state[typingKey] = false;
				if (element === riverIntroText && state.introIndex === introDialogues.length - 1) {
					riverBackButton.hidden = false;
				}
			}
		}, 35);
	};

	const showRiverIntroText = () => {
		state.introText = introDialogues[state.introIndex];
		riverBackButton.hidden = true;
		riverIntroBack.disabled = state.introIndex === 0;
		typeDialogue(riverIntroText, state.introText, 'introTimer', 'introTyping');
	};

	const closeRiverTutorial = () => {
		riverTutorialPanel.classList.add('is-closing');
		window.setTimeout(() => {
			riverTutorialPanel.hidden = true;
			riverTutorialPanel.classList.remove('is-visible');
			riverTutorialPanel.classList.remove('is-closing');
		}, 320);
	};

	const openRiverTutorial = () => {
		riverTutorialPanel.classList.remove('is-closing');
		riverTutorialPanel.classList.add('is-visible');
		riverTutorialPanel.hidden = false;
		riverTutorialPanel.removeAttribute('hidden');
	};

	const toggleRiverTutorial = () => {
		if (riverTutorialPanel.classList.contains('is-visible') && !riverTutorialPanel.classList.contains('is-closing')) {
			closeRiverTutorial();
			return;
		}
		openRiverTutorial();
	};

	const finishRiverGame = (finishReason = 'time') => {
		if (state.finished) {
			return;
		}
		state.finished = true;
		state.started = false;
		state.paused = false;
		state.pausedAt = 0;
		if (!state.resultSent) {
			state.resultSent = true;
			window.dispatchEvent(new CustomEvent('green-returns:area-complete', {
				detail: { area: 'sungai', score: state.score }
			}));
		}
		const success = state.score >= state.cleanThreshold;
		state.resultSuccess = success;
		state.successEndingStage = 0;
		playRiverSfx(success ? riverSfx.success : riverSfx.failure);
		riverResultScreen.hidden = false;
		riverRestartConfirmation.hidden = true;
		riverHutanConfirmation.hidden = true;
		riverBackgroundClean.classList.toggle('is-visible', success);
		riverBackgroundDirty.pause();
		riverBackgroundClean.pause();
		riverResultBg.src = success
			? 'assets/images/river/background/sungai_bersih_video.mp4'
			: 'assets/images/river/background/sungai_kotor_video.mp4';
		riverResultBg.load();
		playRiverVideo(riverResultBg);
		riverResultCharacter.hidden = false;
		riverResultScreen.classList.remove('is-hutan-dialogue');
		if (success) {
			playRiverVideo(riverBackgroundClean);
		}
		riverResultRayna.src = success ? 'assets/images/characters/rayna_happy.png' : 'assets/images/characters/rayna_sad.png';
		const resultText = success
			? successEndingDialogues[0](state.score)
			: finishReason === 'zero'
				? 'Skormu sudah 0. Permainan berhenti karena terlalu banyak menabrak rintangan. Silakan mulai ulang untuk mencoba lagi.'
				: `Skormu ${state.score}. Rayna tetap semangat karena usahamu sudah membantu, tetapi sungai belum cukup bersih. Coba ulangi untuk meningkatkan skor dan grade akhir.`;
		typeDialogue(riverResultDialog, resultText, 'resultTimer', 'resultTyping');
		gameAudio.playBgm(riverBgm);
	};

	const startTimer = () => {
		if (state.timerStarted) {
			return;
		}
		state.timerStarted = true;
		state.timeLeft = 60;
		updateHud();
	};

	const createItem = (kind) => {
		const item = document.createElement('div');
		const image = document.createElement('img');
		const isObstacle = kind === 'obstacle';
		const isPowerUp = kind === 'powerup';
		const assetList = isObstacle ? obstacleAssets : trashAssets;
		const powerUpTypes = Object.keys(powerUpAssets);
		const assetName = isPowerUp
			? powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)]
			: assetList[Math.floor(Math.random() * assetList.length)];
		const { minX, maxX } = getRiverBounds();
		const x = minX + Math.random() * (maxX - minX);
		const y = -80;
		const speed = 2.7 + Math.random() * (isObstacle ? 2.5 : 1.8);

		item.className = `river-item ${isObstacle ? 'river-obstacle' : isPowerUp ? 'river-powerup' : 'river-trash'}`;
		image.src = isPowerUp
			? powerUpAssets[assetName]
			: isObstacle
				? `assets/images/river/obstacles/${assetName}.png`
				: `assets/images/river/trash/${assetName}.png`;
		image.alt = isPowerUp ? assetName : isObstacle ? 'Rintangan sungai' : 'Sampah sungai';
		item.appendChild(image);
		item.dataset.kind = kind;
		item.dataset.assetName = assetName;
		item.dataset.powerUpType = isPowerUp ? assetName : '';
		item.dataset.score = isPowerUp ? '0' : String(trashScores[assetName] || 0);
		item.dataset.x = String(x);
		item.dataset.y = String(y);
		item.dataset.speed = String(speed);
		item.style.left = `${x}px`;
		item.style.top = `${y}px`;
		riverGameArea.appendChild(item);
		state.items.push(item);
	};

	const activatePowerUp = (type) => {
		const expiresAt = performance.now() + 10000;
		if (type === 'magnet') {
			state.magnetUntil = expiresAt;
		}
		if (type === 'sepatu_super') {
			state.superShoeUntil = expiresAt;
		}
		updateHud();
	};

	const handlePickup = (item) => {
		const itemKind = item.dataset.kind;
		const previousScore = state.score;
		item.remove();

		if (itemKind === 'trash') {
			playRiverSfx(riverSfx.trash);
			state.score = Math.min(state.maxScore, state.score + Number(item.dataset.score));
			const type = item.dataset.assetName;
			if (!discoveredTrash.has(type)) {
				discoveredTrash.add(type);
				saveCollection();
				openEducation(type);
			}
		} else if (itemKind === 'powerup') {
			activatePowerUp(item.dataset.powerUpType);
			playRiverSfx(item.dataset.powerUpType === 'magnet' ? riverSfx.magnet : riverSfx.shoe);
		} else {
			playRiverSfx(riverSfx.obstacle);
			state.score = Math.max(0, state.score - 10);
			triggerBoatShake();
			triggerHitFlash();
		}
		if (itemKind === 'trash' && !state.timerStarted) {
			startTimer();
		}
		riverBackgroundClean.classList.toggle('is-visible', state.score >= state.cleanThreshold);
		if (previousScore < state.cleanThreshold && state.score >= state.cleanThreshold) {
			riverBackgroundClean.currentTime = 0;
			playRiverVideo(riverBackgroundClean);
		}
		updateHud();
		if (state.score >= state.target) {
			finishRiverGame('score');
			return;
		}
		if (state.score <= 0) {
			finishRiverGame('zero');
		}
	};

	const pullTrashWithMagnet = (item, boatRect) => {
		if (state.magnetUntil <= performance.now() || item.dataset.kind !== 'trash') {
			return;
		}
		const itemRect = item.getBoundingClientRect();
		const itemCenterX = itemRect.left + itemRect.width / 2;
		const itemCenterY = itemRect.top + itemRect.height / 2;
		const boatCenterX = boatRect.left + boatRect.width / 2;
		const boatCenterY = boatRect.top + boatRect.height / 2;
		if (Math.hypot(itemCenterX - boatCenterX, itemCenterY - boatCenterY) > 300) {
			return;
		}
		const itemX = Number(item.dataset.x);
		const itemY = Number(item.dataset.y);
		const targetX = state.boatX - item.offsetWidth * 0.5;
		const targetY = state.boatY - item.offsetHeight * 0.5;
		item.dataset.x = String(itemX + (targetX - itemX) * 0.28);
		item.dataset.y = String(itemY + (targetY - itemY) * 0.28);
	};

	const updateItems = (deltaMs) => {
		const boatRect = riverBoat.getBoundingClientRect();

		state.items = state.items.filter((item) => {
			pullTrashWithMagnet(item, boatRect);
			const currentY = Number(item.dataset.y) + Number(item.dataset.speed) * (deltaMs / 16.66);
			const itemX = Number(item.dataset.x);
			const itemBottom = currentY + item.offsetHeight;

			item.dataset.y = String(currentY);
			item.style.top = `${currentY}px`;
			item.style.left = `${itemX}px`;

			const itemRect = item.getBoundingClientRect();
			const touchesBoat = itemRect.right > boatRect.left
				&& itemRect.left < boatRect.right
				&& itemRect.bottom > boatRect.top
				&& itemRect.top < boatRect.bottom;
			if (touchesBoat) {
				handlePickup(item);
				return false;
			}

			if (itemBottom > riverGameArea.clientHeight + 60) {
				item.remove();
				return false;
			}

			return true;
		});
	};

	const tickGame = (timestamp) => {
		if (!state.started || state.finished) {
			return;
		}
		if (state.paused) {
			state.animationId = window.requestAnimationFrame(tickGame);
			return;
		}
		if (!state.lastFrame) {
			state.lastFrame = timestamp;
		}
		const deltaMs = Math.min(timestamp - state.lastFrame, 50);
		state.lastFrame = timestamp;

		const horizontalDirection = (pressedKeys.has('ArrowLeft') ? -1 : 0) + (pressedKeys.has('ArrowRight') ? 1 : 0);
		const verticalDirection = (pressedKeys.has('ArrowUp') ? -1 : 0) + (pressedKeys.has('ArrowDown') ? 1 : 0);
		const isMoving = horizontalDirection !== 0 || verticalDirection !== 0;
		if (isMoving) {
			const speedMultiplier = state.superShoeUntil > performance.now() ? 1.8 : 1;
			state.boatX += horizontalDirection * state.boatSpeed * speedMultiplier * (deltaMs / 1000);
			state.boatY += verticalDirection * state.boatSpeed * speedMultiplier * (deltaMs / 1000);
			setBoatPosition();
			state.boatAnimationTimer += deltaMs;
			if (state.boatAnimationTimer >= 260) {
				state.boatAnimationTimer = 0;
				updateBoatFrame(state.boatFrame + 1);
			}
		} else {
			state.boatY += state.idleReverseSpeed * (deltaMs / 1000);
			setBoatPosition();
			state.boatAnimationTimer = 0;
			updateBoatFrame(0);
		}
		if (state.timerStarted) {
			state.timeLeft = Math.max(0, state.timeLeft - deltaMs / 1000);
			if (state.timeLeft <= 0) {
				finishRiverGame();
				return;
			}
		}
		updateHud();

		state.spawnTimer += deltaMs;
		if (state.spawnTimer >= 820) {
			const spawnRoll = Math.random();
			createItem(spawnRoll < 0.06 ? 'powerup' : spawnRoll < 0.41 ? 'obstacle' : 'trash');
			state.spawnTimer = 0;
		}
		updateItems(deltaMs);
		state.animationId = window.requestAnimationFrame(tickGame);
	};

	const startRiverGame = () => {
		window.cancelAnimationFrame(state.animationId);
		pressedKeys.clear();
		clearInterval(state.introTimer);
		clearInterval(state.resultTimer);
		pauseTypingSound();
		riverIntro.classList.add('is-hidden');
		riverTutorialPanel.hidden = true;
		riverTutorialPanel.classList.remove('is-visible', 'is-closing');
		riverCollectionPanel.hidden = true;
		riverEducationPanel.hidden = true;
		riverRestartConfirmation.hidden = true;
		riverHutanConfirmation.hidden = true;
		riverResultScreen.hidden = true;
		state.started = true;
		state.finished = false;
		// Setiap replay adalah percobaan baru, sehingga skor akhirnya harus kembali dikirim ke indikator peta.
		state.resultSent = false;
		state.resultSuccess = false;
		state.successEndingStage = 0;
		state.paused = false;
		state.pausedAt = 0;
		state.lastFrame = 0;
		state.score = 100;
		state.timeLeft = 60;
		state.timerStarted = false;
		state.boatFrame = 0;
		state.boatAnimationTimer = 0;
		state.magnetUntil = 0;
		state.superShoeUntil = 0;
		state.spawnTimer = 0;
		riverBackgroundClean.classList.remove('is-visible');
		riverBackgroundDirty.currentTime = 0;
		riverBackgroundClean.currentTime = 0;
		playRiverVideo(riverBackgroundDirty);
		riverBackgroundClean.pause();
		state.items.forEach((item) => item.remove());
		state.items = [];
		updateHud();
		gameAudio.playBgm(riverBgm);
		state.animationId = window.requestAnimationFrame(tickGame);
	};

	const showRiverScene = () => {
		riverScene.hidden = false;
		riverScene.setAttribute('aria-hidden', 'false');
		riverIntro.classList.remove('is-hidden');
		riverTutorialPanel.hidden = true;
	riverTutorialPanel.classList.remove('is-visible', 'is-closing');
		riverBackButton.hidden = true;
		riverResultScreen.hidden = true;
		state.introIndex = 0;
		riverScene.classList.remove('is-hidden');
		riverSettingsPanel.hidden = true;
		riverCollectionPanel.hidden = true;
		riverEducationPanel.hidden = true;
		riverRestartConfirmation.hidden = true;
		riverHutanConfirmation.hidden = true;
		updateRiverAudioControls();
		resetState();
		showRiverIntroText();
		playRiverVideo(riverBackgroundDirty);
		riverBackgroundClean.pause();
		gameAudio.playBgm(riverBgm);
	};

	const hideRiverScene = () => {
		window.cancelAnimationFrame(state.animationId);
		clearInterval(state.introTimer);
		clearInterval(state.resultTimer);
		pauseTypingSound();
		state.started = false;
		state.finished = true;
		state.paused = false;
		state.pausedAt = 0;
		state.items.forEach((item) => item.remove());
		state.items = [];
		riverScene.hidden = true;
		riverScene.setAttribute('aria-hidden', 'true');
		riverSettingsPanel.hidden = true;
		riverCollectionPanel.hidden = true;
		riverEducationPanel.hidden = true;
		riverRestartConfirmation.hidden = true;
		riverHutanConfirmation.hidden = true;
		riverResultScreen.hidden = true;
		riverIntro.classList.remove('is-hidden');
		riverBackgroundDirty.pause();
		riverBackgroundClean.pause();
		riverResultBg.pause();
		riverBgm.pause();
		riverBgm.currentTime = 0;
	};

	window.addEventListener('green-returns:enter-area', (event) => {
		if (event.detail.area === 'sungai') {
			showRiverScene();
		}
	});
	window.addEventListener('green-returns:show-main-menu', hideRiverScene);
	window.addEventListener('green-returns:show-map', hideRiverScene);
	window.addEventListener('green-returns:show-opening', hideRiverScene);
	window.addEventListener('green-returns:reset-achievements', (event) => {
		const area = event.detail?.area;
		if (area !== 'all' && area !== 'sungai') {
			return;
		}
		discoveredTrash.clear();
		localStorage.removeItem(collectionStorageKey);
		updateCollection();
	});

	riverIntroNext.addEventListener('click', () => {
		if (state.introTyping) {
			clearInterval(state.introTimer);
			pauseTypingSound();
			riverIntroText.textContent = state.introText;
			state.introTyping = false;
			if (state.introIndex === introDialogues.length - 1) {
				riverBackButton.hidden = false;
			}
			return;
		}
		if (state.introIndex < introDialogues.length - 1) {
			state.introIndex += 1;
			showRiverIntroText();
			return;
		}
		startRiverGame();
	});
	riverIntroBack.addEventListener('click', () => {
		if (state.introTyping) {
			clearInterval(state.introTimer);
			pauseTypingSound();
			state.introTyping = false;
		}
		if (state.introIndex > 0) {
			state.introIndex -= 1;
			showRiverIntroText();
		}
	});
	riverTutorialButton.addEventListener('click', toggleRiverTutorial);
	riverCollectionButton.addEventListener('click', openCollection);
	riverCollectionClose.addEventListener('click', closeCollection);
	riverEducationClose.addEventListener('click', closeEducation);
	riverTutorialClose.addEventListener('click', closeRiverTutorial);
	riverTutorialStart.addEventListener('click', () => {
		closeRiverTutorial();
		startRiverGame();
	});
	riverRestartNo.addEventListener('click', () => {
		riverRestartConfirmation.hidden = true;
		riverSettingsButton.focus();
	});
	riverRestartYes.addEventListener('click', () => {
		discoveredTrash.clear();
		localStorage.removeItem(collectionStorageKey);
		riverRestartConfirmation.hidden = true;
		riverResultScreen.hidden = true;
		startRiverGame();
	});
	riverNextButton.addEventListener('click', () => {
		if (state.resultSuccess && state.successEndingStage < successEndingDialogues.length - 1) {
			showSuccessEndingDialogue(state.successEndingStage + 1);
			return;
		}
		if (state.resultSuccess) {
			riverHutanConfirmation.hidden = false;
			riverHutanMap.focus();
			return;
		}
		hideRiverScene();
		window.dispatchEvent(new Event('green-returns:show-map'));
	});
	riverHutanMap.addEventListener('click', () => {
		riverHutanConfirmation.hidden = true;
		hideRiverScene();
		window.dispatchEvent(new Event('green-returns:show-map'));
	});
	riverHutanGo.addEventListener('click', () => {
		riverHutanConfirmation.hidden = true;
		hideRiverScene();
		window.dispatchEvent(new CustomEvent('green-returns:enter-area', { detail: { area: 'hutan' } }));
	});
	riverBackButton.addEventListener('click', () => {
		hideRiverScene();
		window.dispatchEvent(new Event('green-returns:show-map'));
	});
	riverResultBackButton.addEventListener('click', () => {
		hideRiverScene();
		window.dispatchEvent(new Event('green-returns:show-map'));
	});
	riverSettingsButton.addEventListener('click', () => {
		updateRiverAudioControls();
		riverSettingsPanel.hidden = false;
	});
	riverSettingsClose.addEventListener('click', () => {
		riverSettingsPanel.hidden = true;
	});
	riverBgmVolume.addEventListener('input', () => {
		gameAudio.setBgmVolume(riverBgmVolume.value);
		updateRiverAudioControls();
	});
	riverSfxVolume.addEventListener('input', () => {
		gameAudio.setSfxVolume(riverSfxVolume.value);
		updateRiverAudioControls();
	});
	riverBgmToggle.addEventListener('click', () => {
		gameAudio.toggleBgm();
		updateRiverAudioControls();
	});
	riverSfxToggle.addEventListener('click', () => {
		gameAudio.toggleSfx();
		updateRiverAudioControls();
	});

	document.addEventListener('keydown', (event) => {
		if (!riverScene.hidden && !state.finished && !state.paused && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
			event.preventDefault();
			pressedKeys.add(event.key);
		}
	});
	document.addEventListener('keyup', (event) => {
		if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
			pressedKeys.delete(event.key);
		}
	});

	resetState();
	gameAudio.registerBgm(riverBgm);
	gameAudio.registerSfx(typingSound);
	Object.values(riverSfx).forEach((effect) => gameAudio.registerSfx(effect));
	showRiverIntroText();
	hideRiverScene();
});
