document.addEventListener('DOMContentLoaded', () => {
	const scene = document.querySelector('.village-scene');
	const shell = document.querySelector('.village-shell');
	const video = document.querySelector('#village-opening-video');
	const skipVideo = document.querySelector('#village-skip-video');
	const dialogue = document.querySelector('#village-dialogue');
	const dialogueText = document.querySelector('#village-dialogue-text');
	const dialogueBack = document.querySelector('#village-dialogue-back');
	const dialogueNext = document.querySelector('#village-dialogue-next');
	const replayPanel = document.querySelector('#village-replay-panel');
	const replayClose = document.querySelector('#village-replay-close');
	const replayReset = document.querySelector('#village-replay-reset');
	const exploration = document.querySelector('#village-exploration');
	const rayna = document.querySelector('#village-rayna');
	const explorationHint = document.querySelector('#village-exploration-hint');
	const explorationContinue = document.querySelector('#village-exploration-continue');
	const npcButtons = [...document.querySelectorAll('.village-npc[data-npc]')];
	const npcDialogue = document.querySelector('#village-npc-dialogue');
	const npcDialogueImage = document.querySelector('#village-npc-dialogue-image');
	const npcDialogueSpeaker = document.querySelector('#village-npc-dialogue-speaker');
	const npcDialogueText = document.querySelector('#village-npc-dialogue-text');
	const npcDialogueBack = document.querySelector('#village-npc-dialogue-back');
	const npcDialogueNext = document.querySelector('#village-npc-dialogue-next');
	const quiz = document.querySelector('#village-quiz');
	const quizFeedback = document.querySelector('#village-quiz-feedback');
	const quizOptions = [...document.querySelectorAll('#village-quiz [data-answer]')];
	const guide = document.querySelector('#village-guide');
	const game = document.querySelector('#village-game');
	const startButton = document.querySelector('#village-start-button');
	const guideButton = document.querySelector('#village-guide-button');
	const backButton = document.querySelector('#village-back-button');
	const settingsButton = document.querySelector('#village-settings-button');
	const settingsPanel = document.querySelector('#village-settings-panel');
	const settingsClose = document.querySelector('#village-settings-close');
	const bgmVolume = document.querySelector('#village-bgm-volume');
	const sfxVolume = document.querySelector('#village-sfx-volume');
	const bgmVolumeValue = document.querySelector('#village-bgm-volume-value');
	const sfxVolumeValue = document.querySelector('#village-sfx-volume-value');
	const bgmToggle = document.querySelector('#village-bgm-toggle');
	const sfxToggle = document.querySelector('#village-sfx-toggle');
	const puzzle = document.querySelector('#village-puzzle');
	const puzzleTitle = document.querySelector('#village-puzzle-title');
	const puzzleTimer = document.querySelector('#village-puzzle-timer');
	const puzzleGrid = document.querySelector('#village-puzzle-grid');
	const puzzlePoints = document.querySelector('#village-puzzle-points');
	const puzzleClose = document.querySelector('#village-puzzle-close');
	const result = document.querySelector('#village-result');
	const resultText = document.querySelector('#village-result-text');
	const resultRayna = document.querySelector('#village-result-rayna');
	const resultBack = document.querySelector('#village-result-back');
	const resultNext = document.querySelector('#village-result-next');
	const areaIntro = document.querySelector('#village-area-intro');
	const areaIntroText = document.querySelector('#village-area-intro-text');
	const areaIntroBack = document.querySelector('#village-area-intro-back');
	const areaIntroNext = document.querySelector('#village-area-intro-next');
	const status = document.querySelector('#village-status');
	const scoreElement = document.querySelector('#village-score');
	const placeList = document.querySelector('.village-place-list');
	const placeButtons = [...document.querySelectorAll('.village-place')];
	const villageBgm = document.querySelector('#village-bgm');
	const typingSound = document.querySelector('#typing-sound');
	const successSound = document.querySelector('#forest-sfx-success');
	const failureSound = document.querySelector('#forest-sfx-failure');
	const gameAudio = window.gameAudio;
	const storageKey = 'the-green-returns-village-progress';
	const npcDialogues = {
		gina: { name: 'BU GINA', image: 'assets/images/characters/bu_gina_depan.png', lines: [['RAYNA', 'Bu, aku baru pulang ke desa. Kenapa suasananya terasa lebih sepi?'], ['BU GINA', 'Memang sekarang lebih sepi.'], ['BU GINA', 'Tempat-tempat yang dulu sering digunakan warga sudah kurang terawat.'], ['RAYNA', 'Oh, jadi kondisi tempatnya juga berpengaruh?'], ['BU GINA', 'Iya, warga jadi lebih jarang menggunakannya.']] },
		budi: { name: 'PAK BUDI', image: 'assets/images/characters/pak_budi_depan.png', lines: [['RAYNA', 'Pak, sekarang warga masih sering melakukan kegiatan bersama?'], ['PAK BUDI', 'Tidak sesering dulu.'], ['PAK BUDI', 'Dulu kami sering melakukan gotong royong dan berkegiatan bersama.'], ['RAYNA', 'Kenapa sekarang jarang dilakukan?'], ['PAK BUDI', 'Beberapa tempat yang biasa digunakan sudah kurang nyaman.']] },
		dina: { name: 'DINA', image: 'assets/images/characters/dina_depan.png', lines: [['RAYNA', 'Hai, Dina. Kamu masih sering bermain bersama teman-teman?'], ['DINA', 'Sekarang jarang, Kak.'], ['RAYNA', 'Kenapa?'], ['DINA', 'Tempat bermainnya sudah kurang nyaman dan kurang terawat.']] },
		rafi: { name: 'RAFI', image: 'assets/images/characters/rafi_depan.png', lines: [['RAYNA', 'Rafi, menurutmu kenapa desa sekarang terasa sepi?'], ['RAFI', 'Karena tempat-tempat yang dulu ramai sekarang jarang digunakan.'], ['RAYNA', 'Memangnya kenapa?'], ['RAFI', 'Tempatnya sudah tidak senyaman dulu.']] }
	};
	const npcFrameSources = {
		gina: ['assets/images/characters/bu_gina_walk_left_1.png', 'assets/images/characters/bu_gina_walk_left_2.png', 'assets/images/characters/bu_gina_walk_right_1.png', 'assets/images/characters/bu_gina_walk_right_2.png'],
		budi: ['assets/images/characters/pak_budi_walk_left_1.png', 'assets/images/characters/pak_budi_walk_left_2.png', 'assets/images/characters/pak_budi_walk_right_1.png', 'assets/images/characters/pak_budi_walk_right_2.png'],
		dina: ['assets/images/characters/dina_walk_left_1.png', 'assets/images/characters/dina_walk_left_2.png', 'assets/images/characters/dina_walk_right_1.png', 'assets/images/characters/dina_walk_right_2.png'],
		rafi: ['assets/images/characters/rafi_walk_left_1.png', 'assets/images/characters/rafi_walk_left_2.png', 'assets/images/characters/rafi_walk_right_1.png', 'assets/images/characters/rafi_walk_right_2.png']
	};
	const places = {
		taman: { label: 'TAMAN DESA', time: 45, size: 3, dirty: 'assets/images/village/background/taman_desa_kotor.png', clean: 'assets/images/village/background/taman_desa_bersih.png', thresholds: [[3, 100], [6, 150], [9, 200]] },
		berkumpul: { label: 'TEMPAT BERKUMPUL', time: 60, size: 4, dirty: 'assets/images/village/background/tempat_berkumpul_kotor.png', clean: 'assets/images/village/background/tempat_berkumpul_bersih.png', thresholds: [[6, 100], [11, 200], [16, 350]] },
		bermain: { label: 'TEMPAT BERMAIN', time: 90, size: 5, dirty: 'assets/images/village/background/tempat_bermain_kotor.png', clean: 'assets/images/village/background/tempat_bermain_bersih.png', thresholds: [[10, 100], [20, 200], [25, 350]] }
	};
	const dialogues = [
		'Dulu, tempat ini selalu ramai…',
		'Warga sering berkumpul, dan anak-anak bermain bersama di sini.',
		'Tapi sekarang, tempat ini hampir tidak digunakan.',
		'Apa yang membuat desa berubah seperti ini?'
	];
	const goodResultDialogues = [
		'Yeay, kita berhasil menyelesaikan puzzle ini!',
		'Lihat, tempat ini sekarang terlihat lebih bersih dan nyaman.',
		'Usaha kita ternyata bisa membawa perubahan.',
		'Semoga tempat ini bisa kembali digunakan dan dinikmati bersama.'
	];
	const badResultDialogues = [
		'Kita sudah berusaha menyelesaikan puzzle ini.',
		'Sayangnya, tempat ini masih belum banyak berubah.',
		'Tidak apa-apa, setiap usaha tetap berarti.',
		'Semoga tempat ini bisa kita pulihkan dengan lebih baik di kesempatan berikutnya.'
	];
	const endingDialogues = [
		'Kita sudah melakukan yang terbaik untuk memperbaiki desa ini.',
		'Mungkin belum semuanya sempurna, tapi setiap perubahan kecil tetap berarti.',
		'Kalau kita terus menjaga dan merawatnya bersama, desa ini bisa menjadi tempat yang lebih baik.'
	];
	const areaIntroDialogues = {
		taman: 'Ayo kita mulai dari taman desa. Dengan sedikit usaha, tempat ini bisa kembali indah.',
		berkumpul: 'Tempat berkumpul ini masih bisa kita pulihkan. Ayo, kita susun kembali gambarnya bersama.',
		bermain: 'Anak-anak pasti ingin bermain lagi di sini. Mari kita buat tempat bermain ini nyaman kembali.'
	};
	const raynaConclusionDialogues = [
		'Sekarang aku mulai memahami apa yang terjadi.',
		'Tempat-tempat yang dulu digunakan bersama ternyata sudah kurang terawat.',
		'Karena itu, warga dan anak-anak semakin jarang menggunakannya.',
		'Mungkin kalau tempat-tempat ini kembali nyaman, suasana desa juga bisa kembali seperti dulu.'
	];
	let saved = {};
	try { saved = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch { saved = {}; }
	const state = { dialogueIndex: 0, typingTimer: null, typing: false, activePlace: null, areaIntroPlace: null, tiles: [], selectedTile: null, timer: null, remaining: 0, resultDialogues: [], resultIndex: 0, resultType: 'bad', completed: new Set(Array.isArray(saved.completed) ? saved.completed : []), score: Number(saved.score) || 0, placeScores: saved.placeScores && typeof saved.placeScores === 'object' ? saved.placeScores : {}, previewed: new Set(Array.isArray(saved.previewed) ? saved.previewed : []), explorationX: 0.5, nearbyNpc: null, npcDialogueId: null, npcDialogueIndex: 0, talkedNpcs: new Set(), npcAnimationTimer: null, npcAnimationFrame: 0, pressedKeys: new Set(), openingDialogueShown: false, puzzleScore: 0, finishTimer: null };

	gameAudio.registerBgm(villageBgm);
	gameAudio.registerSfx(typingSound);
	gameAudio.registerSfx(successSound);
	gameAudio.registerSfx(failureSound);
	const save = () => localStorage.setItem(storageKey, JSON.stringify({ completed: [...state.completed], score: state.score, placeScores: state.placeScores, previewed: [...state.previewed] }));
	const updateScore = () => { scoreElement.textContent = String(state.score); };
	const playSfx = (sound) => { if (!sound || gameAudio.getState().sfxMuted) return; sound.currentTime = 0; sound.play().catch(() => {}); };
	const updateAudioControls = () => {
		const audioState = gameAudio.getState();
		bgmVolume.value = audioState.bgmVolume; sfxVolume.value = audioState.sfxVolume;
		bgmVolumeValue.textContent = `${Math.round(audioState.bgmVolume * 100)}%`; sfxVolumeValue.textContent = `${Math.round(audioState.sfxVolume * 100)}%`;
		bgmToggle.textContent = audioState.bgmMuted ? 'NYALAKAN MUSIK LATAR' : 'MUTE MUSIK LATAR';
		sfxToggle.textContent = audioState.sfxMuted ? 'NYALAKAN EFEK SUARA' : 'MUTE EFEK SUARA';
	};
	const pauseTyping = () => { clearInterval(state.typingTimer); state.typing = false; if (typingSound) { typingSound.pause(); typingSound.currentTime = 0; } };
	const typeResult = () => {
		pauseTyping(); resultText.textContent = ''; state.typing = true;
		let index = 0;
		state.typingTimer = setInterval(() => {
			if (index === 0) playSfx(typingSound);
			resultText.textContent = state.resultDialogues[state.resultIndex].slice(0, index + 1); index += 1;
			if (index >= state.resultDialogues[state.resultIndex].length) pauseTyping();
		}, 35);
	};
	const typeDialogue = () => {
		pauseTyping(); dialogueText.textContent = '';
		state.typing = true;
		let index = 0;
		state.typingTimer = setInterval(() => {
			if (index === 0) playSfx(typingSound);
			dialogueText.textContent = dialogues[state.dialogueIndex].slice(0, index + 1); index += 1;
			if (index >= dialogues[state.dialogueIndex].length) { pauseTyping(); }
		}, 35);
	};
	const typeAreaIntro = () => {
		pauseTyping(); areaIntroText.textContent = ''; state.typing = true;
		let index = 0;
		state.typingTimer = setInterval(() => {
			if (index === 0) playSfx(typingSound);
			const text = areaIntroDialogues[state.areaIntroPlace];
			areaIntroText.textContent = text.slice(0, index + 1); index += 1;
			if (index >= text.length) pauseTyping();
		}, 35);
	};
	const typeNpcDialogue = () => {
		pauseTyping();
		if (state.npcDialogueId === '__summary__') {
			npcDialogueSpeaker.textContent = 'RAYNA';
			npcDialogueImage.src = 'assets/images/characters/rayna_depan.png';
			npcDialogueImage.alt = 'Rayna';
			npcDialogueText.textContent = '';
			state.typing = true;
			let index = 0;
			const text = raynaConclusionDialogues[state.npcDialogueIndex];
			state.typingTimer = setInterval(() => {
				if (index === 0) playSfx(typingSound);
				npcDialogueText.textContent = text.slice(0, index + 1); index += 1;
				if (index >= text.length) pauseTyping();
			}, 35);
			return;
		}
		const conversation = npcDialogues[state.npcDialogueId];
		const [speaker, text] = conversation.lines[state.npcDialogueIndex];
		npcDialogueSpeaker.textContent = speaker;
		const isRaynaSpeaking = speaker === 'RAYNA';
		npcDialogueImage.src = isRaynaSpeaking ? 'assets/images/characters/rayna_idle_01.png' : conversation.image;
		npcDialogueImage.alt = isRaynaSpeaking ? 'Rayna' : conversation.name;
		npcDialogueText.textContent = '';
		state.typing = true;
		let index = 0;
		state.typingTimer = setInterval(() => {
			if (index === 0) playSfx(typingSound);
			npcDialogueText.textContent = text.slice(0, index + 1); index += 1;
			if (index >= text.length) pauseTyping();
		}, 35);
	};
	const getNpcPosition = (npc) => Number.parseFloat(npc.style.left) / 100;
	const updateExplorationHint = () => {
		let closest = null;
		let closestDistance = Infinity;
		npcButtons.forEach((npc) => {
			const distance = Math.abs(state.explorationX - getNpcPosition(npc));
			if (distance < closestDistance) { closest = npc; closestDistance = distance; }
			npc.classList.toggle('is-nearby', distance < 0.12);
		});
		state.nearbyNpc = closestDistance < 0.12 ? closest?.dataset.npc : null;
		explorationHint.textContent = state.nearbyNpc ? `Tekan E atau ENTER untuk berbicara dengan ${npcDialogues[state.nearbyNpc].name}.` : 'Gunakan tombol kiri/kanan. Dekati warga lalu tekan E atau ENTER.';
	};
	const renderRayna = () => { rayna.style.left = `${state.explorationX * 100}%`; };
	const openNpcDialogue = (npcId) => {
		if (!npcDialogues[npcId] || state.npcDialogueId) return;
		state.npcDialogueId = npcId; state.npcDialogueIndex = 0; npcDialogueBack.disabled = true; npcDialogue.hidden = false; npcDialogueImage.src = npcDialogues[npcId].image; typeNpcDialogue();
	};
	const showRaynaConclusion = () => {
		pauseTyping();
		state.npcDialogueId = '__summary__';
		state.npcDialogueIndex = 0;
		npcDialogueBack.disabled = true;
		npcDialogue.hidden = false;
		npcDialogueImage.src = 'assets/images/characters/rayna_idle_01.png';
		typeNpcDialogue();
	};
	const showQuiz = () => { pauseTyping(); npcDialogue.hidden = true; quiz.hidden = false; quizFeedback.textContent = ''; quizOptions.forEach((option) => { option.disabled = false; option.classList.remove('is-wrong'); }); };
	const showReplayQuiz = () => { video.pause(); video.hidden = true; skipVideo.hidden = true; dialogue.hidden = true; exploration.hidden = false; game.hidden = true; replayPanel.hidden = true; showQuiz(); };
	const openReplayPanel = () => { video.pause(); video.hidden = true; skipVideo.hidden = true; dialogue.hidden = true; npcDialogue.hidden = true; game.hidden = true; quiz.hidden = true; stopNpcs(); replayPanel.hidden = false; replayClose.focus(); };
	const resetVillageProgress = () => { state.completed.clear(); state.score = 0; state.placeScores = {}; resetPuzzlePreview(); save(); updateScore(); updatePlaces(); updateStatus(); showReplayQuiz(); };
	const showExploration = () => { updateAreaBackground({ dirty: 'assets/images/village/background/bg_desa.png' }, false); dialogue.hidden = true; exploration.hidden = false; guide.hidden = true; game.hidden = true; state.explorationX = 0.5; state.nearbyNpc = null; state.talkedNpcs.clear(); npcDialogue.hidden = true; quiz.hidden = true; renderRayna(); npcButtons.forEach((npc, index) => { npc.style.left = `${[0.18, 0.39, 0.62, 0.8][index] * 100}%`; }); stopNpcs(); animateNpcs(); updateExplorationHint(); };
	const showDialogue = () => { if (state.openingDialogueShown) return; state.openingDialogueShown = true; video.pause(); updateAreaBackground({ dirty: 'assets/images/village/background/bg_desa.png' }, false); video.hidden = true; skipVideo.hidden = true; dialogue.hidden = false; state.dialogueIndex = 0; dialogueBack.disabled = true; typeDialogue(); };
	const showGuide = () => { pauseTyping(); updateAreaBackground({ dirty: 'assets/images/village/background/bg_desa.png' }, false); dialogue.hidden = true; exploration.hidden = true; quiz.hidden = true; guide.hidden = false; };
	const updatePlaces = () => placeButtons.forEach((button) => {
		const complete = state.completed.has(button.dataset.place);
		button.disabled = complete;
		button.classList.toggle('is-complete', complete);
		button.style.backgroundImage = complete ? `url("${places[button.dataset.place].clean}")` : '';
		button.style.backgroundSize = complete ? 'cover' : '';
		button.style.backgroundPosition = complete ? 'center' : '';
	});
	const updateStatus = () => { const count = state.completed.size; status.textContent = count === 3 ? 'Semua tempat di desa sudah selesai.' : `${count}/3 tempat sudah dimainkan.`; };
	const setAreaSelectionVisible = (visible) => { placeList.hidden = !visible; status.hidden = !visible; };
	const updateAreaBackground = (place, clean) => { shell.style.backgroundImage = `url("${clean ? place.clean : place.dirty}")`; };
	const showAreaIntro = (placeId) => {
		if (state.completed.has(placeId)) return;
		state.activePlace = placeId;
		state.areaIntroPlace = placeId;
		setAreaSelectionVisible(false);
		updateAreaBackground(places[placeId], false);
		typeAreaIntro();
		areaIntro.hidden = false;
		puzzle.hidden = true;
		result.hidden = true;
	};
	const getCorrectCount = () => state.tiles.reduce((total, tile, index) => total + (tile === index ? 1 : 0), 0);
	const getScoreForCount = (place, count) => place.thresholds.reduce((score, threshold) => count >= threshold[0] ? threshold[1] : score, 0);
	const showPuzzlePoints = (points) => {
		const pointsLabel = document.createElement('span');
		pointsLabel.className = 'village-puzzle-points-label';
		pointsLabel.textContent = `+${points}`;
		puzzlePoints.appendChild(pointsLabel);
		pointsLabel.addEventListener('animationend', () => pointsLabel.remove(), { once: true });
	};
	const resetPuzzlePreview = () => {
		state.previewed.clear();
		puzzle.querySelector('.village-puzzle-preview-panel')?.remove();
		const previewButton = puzzle.querySelector('.village-puzzle-preview');
		if (previewButton) {
			previewButton.disabled = false;
			previewButton.textContent = 'LIHAT CONTOH';
		}
	};
	const ensurePuzzlePreview = () => {
		let previewButton = puzzle.querySelector('.village-puzzle-preview');
		if (previewButton) return previewButton;
		previewButton = document.createElement('button');
		previewButton.type = 'button';
		previewButton.className = 'village-puzzle-preview';
		previewButton.addEventListener('click', () => {
			if (state.previewed.has(state.activePlace)) return;
			const place = places[state.activePlace];
			state.previewed.add(state.activePlace);
			previewButton.disabled = true;
			previewButton.textContent = 'CONTOH SUDAH DILIHAT';
			const panel = document.createElement('section');
			panel.className = 'village-puzzle-preview-panel';
			panel.innerHTML = `<div class="village-puzzle-preview-card"><span class="village-puzzle-kicker">REFERENSI SEKALI LIHAT</span><h3>Contoh akhir ${place.label.toLowerCase()}</h3><img src="${place.clean}" alt="Contoh gambar akhir ${place.label.toLowerCase()}"><p>Amati baik-baik. Contoh ini hanya bisa dibuka satu kali.</p><button type="button">TUTUP CONTOH</button></div>`;
			panel.querySelector('button').addEventListener('click', () => panel.remove());
			puzzle.appendChild(panel);
			save();
		});
		puzzle.querySelector('.village-puzzle-heading').appendChild(previewButton);
		return previewButton;
	};
	const finishPuzzle = () => {
		const place = places[state.activePlace];
		clearInterval(state.timer); state.timer = null;
		const finalScore = getScoreForCount(place, getCorrectCount());
		const good = finalScore >= Math.ceil(place.thresholds[place.thresholds.length - 1][1] * .5);
		state.score += finalScore;
		state.placeScores[state.activePlace] = finalScore;
		state.completed.add(state.activePlace);
		state.resultType = good ? 'good' : 'bad';
		state.resultDialogues = good ? goodResultDialogues : badResultDialogues;
		state.resultIndex = 0;
		resultRayna.src = good ? 'assets/images/characters/rayna_happy.png' : 'assets/images/characters/rayna_sad.png';
		resultRayna.alt = good ? 'Rayna bahagia' : 'Rayna sedih';
		resultBack.disabled = true;
		updateScore(); save(); updateAreaBackground(place, good); updatePlaces();
		puzzle.hidden = true; result.hidden = false; typeResult();
		playSfx(good ? successSound : failureSound);
		if (state.completed.size === 3) window.dispatchEvent(new CustomEvent('green-returns:area-complete', { detail: { area: 'desa', score: state.score } }));
	};
	const renderTimer = () => { const minutes = Math.floor(state.remaining / 60); const seconds = state.remaining % 60; puzzleTimer.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; };
	const failPuzzle = () => { clearInterval(state.timer); state.timer = null; playSfx(failureSound); puzzleGrid.classList.add('is-failed'); setTimeout(() => puzzleGrid.classList.remove('is-failed'), 420); state.remaining = 0; renderTimer(); finishPuzzle(); };
	const isSolved = () => state.tiles.every((tile, index) => tile === index);
	const renderTiles = () => {
		puzzleGrid.innerHTML = '';
		const place = places[state.activePlace];
		state.tiles.forEach((tile, index) => {
			const button = document.createElement('button'); button.type = 'button'; button.className = 'village-puzzle-tile'; button.dataset.index = String(index); button.style.backgroundImage = `url("${place.clean}")`; button.style.backgroundPosition = `${(tile % place.size) * (100 / Math.max(1, place.size - 1))}% ${Math.floor(tile / place.size) * (100 / Math.max(1, place.size - 1))}%`; button.style.backgroundSize = `${place.size * 100}% ${place.size * 100}%`; button.setAttribute('aria-label', `Potongan gambar ${tile + 1}`);
			button.addEventListener('click', () => {
				if (state.selectedTile === null) { state.selectedTile = index; button.classList.add('is-selected'); return; }
				if (state.selectedTile === index) { state.selectedTile = null; button.classList.remove('is-selected'); return; }
				const previousCorrectCount = getCorrectCount();
				[state.tiles[state.selectedTile], state.tiles[index]] = [state.tiles[index], state.tiles[state.selectedTile]]; state.selectedTile = null; renderTiles();
				const correctCount = getCorrectCount();
				const currentScore = getScoreForCount(places[state.activePlace], correctCount);
				if (currentScore > state.puzzleScore) { state.puzzleScore = currentScore; showPuzzlePoints(currentScore); }
				if (isSolved()) { puzzleGrid.classList.add('is-complete'); state.finishTimer = setTimeout(() => { puzzleGrid.classList.remove('is-complete'); finishPuzzle(); }, 550); } else playSfx(correctCount > previousCorrectCount ? successSound : failureSound);
			});
			puzzleGrid.appendChild(button);
		});
	};
	const openPuzzle = (placeId) => {
		if (state.completed.has(placeId)) return;
		const place = places[placeId];
		clearTimeout(state.finishTimer); state.activePlace = placeId; state.remaining = place.time; state.selectedTile = null; state.puzzleScore = 0; puzzlePoints.innerHTML = ''; state.tiles = Array.from({ length: place.size * place.size }, (_, index) => index).sort(() => Math.random() - .5);
		if (isSolved()) [state.tiles[0], state.tiles[1]] = [state.tiles[1], state.tiles[0]];
		areaIntro.hidden = true; setAreaSelectionVisible(false); updateAreaBackground(place, false); puzzleTitle.textContent = place.label; const previewButton = ensurePuzzlePreview(); previewButton.disabled = state.previewed.has(placeId); previewButton.textContent = previewButton.disabled ? 'CONTOH SUDAH DILIHAT' : 'LIHAT CONTOH'; puzzleGrid.style.gridTemplateColumns = `repeat(${place.size}, minmax(0, 1fr))`; puzzleGrid.style.gridTemplateRows = `repeat(${place.size}, minmax(0, 1fr))`; renderTimer(); renderTiles(); puzzle.hidden = false;
		clearInterval(state.timer); state.timer = setInterval(() => { state.remaining -= 1; renderTimer(); if (state.remaining <= 0) failPuzzle(); }, 1000);
	};
	const animateNpcs = () => {
		state.npcAnimationTimer = setInterval(() => {
			npcButtons.forEach((npc) => {
				const npcId = npc.dataset.npc;
				const direction = npc.classList.contains('walk-left') ? 'left' : 'right';
				const frames = npcFrameSources[npcId];
				const frame = frames[state.npcAnimationFrame % 2 + (direction === 'right' ? 2 : 0)];
				npc.querySelector('img').src = frame;
				const current = getNpcPosition(npc); const next = current + (direction === 'right' ? 0.008 : -0.008);
				if (next > 0.9) npc.classList.replace('walk-right', 'walk-left');
				else if (next < 0.08) npc.classList.replace('walk-left', 'walk-right');
				else npc.style.left = `${next * 100}%`;
			});
			state.npcAnimationFrame += 1; updateExplorationHint();
		}, 180);
	};
	const stopNpcs = () => { clearInterval(state.npcAnimationTimer); state.npcAnimationTimer = null; };
	const hideScene = () => { pauseTyping(); stopNpcs(); clearInterval(state.timer); scene.hidden = true; scene.setAttribute('aria-hidden', 'true'); video.pause(); video.currentTime = 0; villageBgm.pause(); villageBgm.currentTime = 0; dialogue.hidden = true; exploration.hidden = true; npcDialogue.hidden = true; quiz.hidden = true; guide.hidden = true; game.hidden = true; areaIntro.hidden = true; puzzle.hidden = true; result.hidden = true; replayPanel.hidden = true; settingsPanel.hidden = true; };
	const showScene = () => { scene.hidden = false; scene.setAttribute('aria-hidden', 'false'); state.openingDialogueShown = false; updateAreaBackground({ dirty: 'assets/images/village/background/bg_desa.png' }, false); game.hidden = true; guide.hidden = true; dialogue.hidden = true; exploration.hidden = true; npcDialogue.hidden = true; quiz.hidden = true; areaIntro.hidden = true; puzzle.hidden = true; result.hidden = true; replayPanel.hidden = true; settingsPanel.hidden = true; video.hidden = false; skipVideo.hidden = false; video.currentTime = 0; video.play().catch(() => {}); gameAudio.playBgm(villageBgm); updateAudioControls(); updateScore(); };

	window.addEventListener('green-returns:enter-area', (event) => { if (event.detail.area === 'desa') showScene(); });
	window.addEventListener('green-returns:show-map', hideScene);
	window.addEventListener('green-returns:show-main-menu', hideScene);
	video.addEventListener('ended', showDialogue);
	video.addEventListener('timeupdate', () => { if (Number.isFinite(video.duration) && video.duration > 0 && video.currentTime >= video.duration - 0.15) showDialogue(); });
	skipVideo.addEventListener('click', showDialogue);
	explorationContinue.addEventListener('click', () => { if (state.completed.size === 3) openReplayPanel(); else showQuiz(); });
	replayClose.addEventListener('click', showReplayQuiz);
	replayReset.addEventListener('click', resetVillageProgress);
	dialogueNext.addEventListener('click', () => { if (state.typing) { pauseTyping(); dialogueText.textContent = dialogues[state.dialogueIndex]; return; } if (state.dialogueIndex < dialogues.length - 1) { state.dialogueIndex += 1; dialogueBack.disabled = false; typeDialogue(); } else showExploration(); });
	dialogueBack.addEventListener('click', () => { if (state.dialogueIndex > 0) { state.dialogueIndex -= 1; dialogueBack.disabled = state.dialogueIndex === 0; typeDialogue(); } });
	npcButtons.forEach((npc) => npc.addEventListener('click', () => openNpcDialogue(npc.dataset.npc)));
	npcDialogueNext.addEventListener('click', () => {
		if (state.npcDialogueId === '__summary__') {
			if (state.typing) { pauseTyping(); npcDialogueText.textContent = raynaConclusionDialogues[state.npcDialogueIndex]; return; }
			if (state.npcDialogueIndex < raynaConclusionDialogues.length - 1) {
				state.npcDialogueIndex += 1;
				npcDialogueBack.disabled = false;
				typeNpcDialogue();
				return;
			}
			state.npcDialogueId = null;
			npcDialogue.hidden = true;
			showQuiz();
			return;
		}
		const conversation = npcDialogues[state.npcDialogueId];
		if (state.typing) { pauseTyping(); npcDialogueText.textContent = conversation.lines[state.npcDialogueIndex][1]; return; }
		if (state.npcDialogueIndex < conversation.lines.length - 1) { state.npcDialogueIndex += 1; npcDialogueBack.disabled = false; typeNpcDialogue(); return; }
		state.talkedNpcs.add(state.npcDialogueId); state.npcDialogueId = null; npcDialogue.hidden = true; updateExplorationHint(); if (state.talkedNpcs.size === Object.keys(npcDialogues).length) showRaynaConclusion();
	});
	npcDialogueBack.addEventListener('click', () => {
		if (state.npcDialogueId === '__summary__') {
			if (state.npcDialogueIndex > 0) {
				state.npcDialogueIndex -= 1;
				npcDialogueBack.disabled = state.npcDialogueIndex === 0;
				typeNpcDialogue();
			}
			return;
		}
		if (state.npcDialogueIndex > 0) { state.npcDialogueIndex -= 1; npcDialogueBack.disabled = state.npcDialogueIndex === 0; typeNpcDialogue(); }
	});
	quizOptions.forEach((option) => option.addEventListener('click', () => {
		const isCorrect = option.dataset.answer === 'C';
		quizOptions.forEach((item) => { item.disabled = true; item.classList.remove('is-wrong'); });
		if (isCorrect) {
			quizFeedback.textContent = 'Benar! Tempat yang kurang terawat dan tidak nyaman membuat warga jarang menggunakannya.';
			setTimeout(() => {
				quiz.hidden = true;
				showGuide();
			}, 900);
			return;
		}
		quizFeedback.textContent = 'Belum tepat. Coba ingat kembali percakapan dengan para warga.';
		option.classList.add('is-wrong');
		setTimeout(() => {
			quizOptions.forEach((item) => { item.disabled = false; });
			option.classList.remove('is-wrong');
		}, 700);
	}));
	document.addEventListener('keydown', (event) => { if (exploration.hidden) return; if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { state.pressedKeys.add(event.key); event.preventDefault(); } if ((event.key === 'Enter' || event.key.toLowerCase() === 'e') && state.nearbyNpc) { event.preventDefault(); openNpcDialogue(state.nearbyNpc); } });
	document.addEventListener('keyup', (event) => state.pressedKeys.delete(event.key));
	setInterval(() => { if (exploration.hidden || state.npcDialogueId || !state.pressedKeys.size) return; const direction = state.pressedKeys.has('ArrowLeft') ? -1 : 1; state.explorationX = Math.min(0.94, Math.max(0.06, state.explorationX + direction * 0.008)); rayna.src = `assets/images/characters/rayna_walk_${direction < 0 ? 'left' : 'right'}_${state.npcAnimationFrame % 4 + 1}.png`; renderRayna(); updateExplorationHint(); }, 45);
	startButton.addEventListener('click', () => { updateAreaBackground({ dirty: 'assets/images/village/background/bg_desa.png' }, false); guide.hidden = true; game.hidden = false; setAreaSelectionVisible(true); shell.classList.add('is-playing'); updatePlaces(); updateStatus(); });
	guideButton.addEventListener('click', () => { guide.hidden = false; });
	placeButtons.forEach((button) => button.addEventListener('click', () => showAreaIntro(button.dataset.place)));
	areaIntroNext.addEventListener('click', () => { if (state.typing) { pauseTyping(); areaIntroText.textContent = areaIntroDialogues[state.areaIntroPlace]; return; } openPuzzle(state.areaIntroPlace); });
	areaIntroBack.addEventListener('click', () => { pauseTyping(); areaIntro.hidden = true; state.activePlace = null; setAreaSelectionVisible(true); updateAreaBackground({ dirty: 'assets/images/village/background/bg_desa.png' }, false); updateStatus(); });
	puzzleClose.addEventListener('click', () => { clearInterval(state.timer); puzzle.hidden = true; state.activePlace = null; setAreaSelectionVisible(true); updateAreaBackground({ dirty: 'assets/images/village/background/bg_desa.png' }, false); updateStatus(); });
	resultNext.addEventListener('click', () => {
		if (state.typing) { pauseTyping(); resultText.textContent = state.resultDialogues[state.resultIndex]; return; }
		if (state.resultIndex < state.resultDialogues.length - 1) { state.resultIndex += 1; typeResult(); return; }
		result.hidden = true;
		if (state.completed.size === 3 && state.resultDialogues !== endingDialogues) { state.resultDialogues = endingDialogues; state.resultIndex = 0; resultBack.disabled = true; result.hidden = false; typeResult(); return; }
		state.activePlace = null; setAreaSelectionVisible(true); updateAreaBackground({ dirty: 'assets/images/village/background/bg_desa.png' }, false); updateStatus();
	});
	resultBack.addEventListener('click', () => { if (state.typing) { pauseTyping(); resultText.textContent = state.resultDialogues[state.resultIndex]; return; } if (state.resultIndex > 0) { state.resultIndex -= 1; resultBack.disabled = state.resultIndex === 0; typeResult(); } });
	backButton.addEventListener('click', () => { hideScene(); window.dispatchEvent(new Event('green-returns:show-map')); });
	settingsButton.addEventListener('click', () => { updateAudioControls(); settingsPanel.hidden = false; });
	settingsClose.addEventListener('click', () => { settingsPanel.hidden = true; });
	bgmVolume.addEventListener('input', () => { gameAudio.setBgmVolume(bgmVolume.value); updateAudioControls(); });
	sfxVolume.addEventListener('input', () => { gameAudio.setSfxVolume(sfxVolume.value); updateAudioControls(); });
	bgmToggle.addEventListener('click', () => { gameAudio.toggleBgm(); updateAudioControls(); });
	sfxToggle.addEventListener('click', () => { gameAudio.toggleSfx(); updateAudioControls(); });
	window.addEventListener('green-returns:reset-achievements', (event) => { if (event.detail?.area !== 'all' && event.detail?.area !== 'desa') return; state.completed.clear(); state.score = 0; state.placeScores = {}; resetPuzzlePreview(); save(); updateScore(); updatePlaces(); updateStatus(); });
	updateScore();
	npcButtons.forEach((npc, index) => { npc.classList.add(index % 2 === 0 ? 'walk-left' : 'walk-right'); });
	animateNpcs();
	hideScene();
});
