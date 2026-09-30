document.addEventListener('DOMContentLoaded', () => {
	const scene = document.querySelector('.forest-scene');
	const shell = document.querySelector('.forest-shell');
	const rayna = document.querySelector('#forest-rayna');
	const forestBgm = document.querySelector('#forest-bgm');
	const typingSound = document.querySelector('#typing-sound');
	const successSound = document.querySelector('#forest-sfx-success');
	const failureSound = document.querySelector('#forest-sfx-failure');
	const intro = document.querySelector('#forest-intro');
	const introText = document.querySelector('#forest-intro-text');
	const introNext = document.querySelector('#forest-intro-next');
	const introBack = document.querySelector('#forest-intro-back');
	const guidePanel = document.querySelector('#forest-guide-panel');
	const observationPanel = document.querySelector('#forest-observation-panel');
	const feedbackPanel = document.querySelector('#forest-feedback-panel');
	const journalPanel = document.querySelector('#forest-journal-panel');
	const inspectButton = document.querySelector('#forest-inspect-button');
	const journalButton = document.querySelector('#forest-journal-button');
	const infoButton = document.querySelector('#forest-info-button');
	const infoPanel = document.querySelector('#forest-info-panel');
	const infoClose = document.querySelector('#forest-info-close');
	const infoMessage = document.querySelector('#forest-info-message');
	const evidenceVideo = document.querySelector('#forest-evidence-video');
	const recoveryBoard = document.querySelector('#forest-recovery-board');
	const recoveryDialog = document.querySelector('#forest-recovery-dialog');
	const recoveryDialogueText = document.querySelector('#forest-recovery-dialogue-text');
	const recoveryNext = document.querySelector('#forest-recovery-next');
	const recoveryGuide = document.querySelector('#forest-recovery-guide');
	const recoveryStart = document.querySelector('#forest-recovery-start');
	const investigationReplay = document.querySelector('#forest-investigation-replay');
	const investigationReplayClose = document.querySelector('#forest-investigation-replay-close');
	const investigationReplayYes = document.querySelector('#forest-investigation-replay-yes');
	const investigationReplayNo = document.querySelector('#forest-investigation-replay-no');
	const recoveryReplay = document.querySelector('#forest-recovery-replay');
	const recoveryReplayClose = document.querySelector('#forest-recovery-replay-close');
	const recoveryReplayYes = document.querySelector('#forest-recovery-replay-yes');
	const recoveryResult = document.querySelector('#forest-recovery-result');
	const recoveryResultText = document.querySelector('#forest-recovery-result-text');
	const recoveryResultBack = document.querySelector('#forest-recovery-result-back');
	const recoveryResultNext = document.querySelector('#forest-recovery-result-next');
	const villageChoice = document.querySelector('#forest-village-choice');
	const stage2Button = document.querySelector('#forest-stage2-button');
	const forestBackground = document.querySelector('.forest-background');
	const forestSeeds = [...document.querySelectorAll('.forest-seed')];
	const recoveryZones = [...document.querySelectorAll('.forest-recovery-zone')];
	const recoveryHitFlash = document.querySelector('.forest-hit-flash');
	const investigationTimerBox = document.querySelector('.forest-investigation-timer');
	const investigationTimerDisplay = document.querySelector('#forest-investigation-timer');
	const settingsButton = document.querySelector('#forest-settings-button');
	const settingsPanel = document.querySelector('#forest-settings-panel');
	const settingsClose = document.querySelector('#forest-settings-close');
	const bgmVolume = document.querySelector('#forest-bgm-volume');
	const sfxVolume = document.querySelector('#forest-sfx-volume');
	const bgmVolumeValue = document.querySelector('#forest-bgm-volume-value');
	const sfxVolumeValue = document.querySelector('#forest-sfx-volume-value');
	const bgmToggle = document.querySelector('#forest-bgm-toggle');
	const sfxToggle = document.querySelector('#forest-sfx-toggle');
	const journalEvidenceList = document.querySelector('#forest-journal-evidence-list');
	const journalNonEvidenceList = document.querySelector('#forest-journal-non-evidence-list');
	const journalDetail = document.querySelector('#forest-journal-detail');
	const forestObjects = [...document.querySelectorAll('.forest-object')];
	const gameAudio = window.gameAudio;
	const pressedKeys = new Set();
	const dialogues = [
		'Hutan ini terlihat sangat berbeda dari yang aku bayangkan…',
		'Pohonnya sedikit, banyak tanah kosong, dan beberapa bagian terlihat kering.',
		'Tapi… apa yang sebenarnya terjadi di sini?',
		'Mungkin ada sesuatu yang bisa membantu menjelaskan keadaan hutan ini.'
	];
	const objects = {
		gergaji: { name: '🪚 GERGAJI', image: 'assets/images/forest/investigation/evidence/gergaji.png', result: 'Sebuah gergaji ditemukan di antara rerumputan. Pada bagian mata gergaji terlihat sisa serbuk kayu.', info: 'Gergaji adalah alat dengan mata bergerigi yang digunakan untuk memotong berbagai jenis bahan, termasuk kayu.', evidence: true, clue: 'Penebangan pohon', reasonTitle: 'Mengapa menjadi bukti?', reason: 'Gergaji merupakan alat yang dapat digunakan untuk memotong kayu. Dalam investigasi ini, gergaji ditemukan di area hutan yang mengalami kerusakan. Keberadaan gergaji menjadi salah satu petunjuk yang dapat mengarah pada adanya aktivitas penebangan pohon di area tersebut.', knowledge: 'Penebangan pohon merupakan kegiatan memotong atau menebang pohon. Jika dilakukan secara berlebihan dan tanpa memperhatikan kelestarian hutan, penebangan dapat mengurangi jumlah pohon dan mengganggu keseimbangan ekosistem.' },
		patok: { name: '📍 PATOK', image: 'assets/images/forest/investigation/evidence/patok.png', result: 'Beberapa patok kayu tertancap berjajar di sepanjang tepi area tanah yang terbuka.', info: 'Patok dapat digunakan untuk menandai posisi, batas, atau titik tertentu pada suatu area.', evidence: true, clue: 'Pembukaan lahan', reasonTitle: 'Mengapa menjadi bukti?', reason: 'Patok dapat digunakan untuk menandai batas, posisi, atau bagian tertentu dari suatu area. Dalam investigasi ini, beberapa patok ditemukan tertancap berjajar di sekitar area tanah yang terbuka. Keberadaan patok dan kondisi area di sekitarnya menjadi petunjuk bahwa lahan tersebut kemungkinan sedang ditandai untuk suatu penggunaan atau perubahan fungsi lahan.', knowledge: 'Pembukaan lahan adalah kegiatan mengubah suatu area yang sebelumnya memiliki vegetasi menjadi area untuk penggunaan tertentu. Jika dilakukan secara tidak terkendali, pembukaan lahan dapat mengurangi tutupan pohon dan mengubah kondisi lingkungan.' },
		bibit_layu: { name: '🌱 BIBIT LAYU', image: 'assets/images/forest/investigation/evidence/bibit_layu.png', result: 'Sebuah bibit muda terlihat layu. Permukaan tanah di sekitarnya tampak kering dan retak.', info: 'Tanaman membutuhkan air untuk menjalankan berbagai proses penting dalam tubuhnya. Kekurangan air dapat menyebabkan tanaman menjadi layu.', evidence: true, clue: 'Kondisi tanaman', reasonTitle: 'Mengapa menjadi bukti?', reason: 'Bibit yang ditemukan terlihat layu dan berada di sekitar tanah yang kering dan retak. Kondisi tersebut menunjukkan bahwa bibit tidak tumbuh dengan baik. Temuan ini menjadi petunjuk mengenai kondisi tanaman di area hutan yang mengalami kerusakan.', knowledge: 'Tanaman membutuhkan air, cahaya, unsur hara, dan kondisi lingkungan yang sesuai untuk tumbuh. Kekurangan air dapat menyebabkan tanaman menjadi layu dan menghambat pertumbuhannya.' },
		pohon_tumbang: { name: '🌳 POHON TUMBANG', image: 'assets/images/forest/investigation/decoy/pohon_tumbang.png', result: 'Sebuah pohon terlihat tumbang dengan bagian akar yang ikut terangkat dari tanah.', info: 'Pohon dapat tumbang karena berbagai faktor, seperti angin kencang, tanah yang tidak stabil, kondisi pohon yang lemah, atau faktor lingkungan lainnya.', evidence: false, reasonTitle: 'Mengapa bukan bukti?', reason: 'Pohon yang ditemukan terlihat tumbang dengan bagian akar yang ikut terangkat dari tanah. Kondisi tersebut menunjukkan bahwa pohon dapat tumbang karena tercabut dari tanah, misalnya akibat angin kencang atau kondisi lingkungan tertentu. Tidak ditemukan petunjuk yang cukup untuk memastikan bahwa pohon tersebut ditebang oleh manusia. Karena itu, pohon tumbang ini tidak dapat digunakan sebagai bukti utama penebangan pohon.', knowledge: 'Pohon dapat tumbang karena berbagai faktor, seperti angin kencang, tanah yang tidak stabil, kondisi pohon yang lemah, atau faktor lingkungan lainnya. Pohon yang tumbang tidak selalu berarti ditebang oleh manusia.' },
		tunggul_lama: { name: '🌳 TUNGGUL LAMA', image: 'assets/images/forest/investigation/decoy/tunggul_lama.png', result: 'Sebuah tunggul pohon terlihat di dalam hutan. Permukaannya telah lapuk dan sebagian ditumbuhi lumut.', info: 'Tunggul merupakan bagian pangkal pohon yang masih tersisa setelah batang pohon hilang. Tunggul dapat mengalami pelapukan secara bertahap.', evidence: false, reasonTitle: 'Mengapa bukan bukti?', reason: 'Tunggul yang ditemukan sudah terlihat lama dan mengalami pelapukan. Kondisi tersebut tidak memberikan informasi yang cukup mengenai kapan atau bagaimana pohon tersebut ditebang. Karena itu, tunggul lama tidak dapat digunakan sebagai bukti utama dalam investigasi ini.', knowledge: 'Tunggul pohon dapat mengalami pelapukan secara bertahap akibat pengaruh air, udara, organisme, dan kondisi lingkungan.' },
		tanaman_sehat: { name: '🌿 TANAMAN SEHAT', image: 'assets/images/forest/investigation/decoy/tanaman_sehat.png', result: 'Tanaman muda terlihat memiliki daun yang tegak dan berwarna hijau. Tanah di sekitarnya tampak cukup lembap.', info: 'Pertumbuhan tanaman dipengaruhi oleh berbagai faktor, termasuk ketersediaan air, cahaya, unsur hara, dan kondisi lingkungan.', evidence: false, reasonTitle: 'Mengapa bukan bukti?', reason: 'Tanaman yang ditemukan terlihat sehat, dengan daun yang tegak dan berwarna hijau. Tanah di sekitarnya juga terlihat cukup lembap. Kondisi tersebut menunjukkan bahwa tanaman dapat tumbuh dengan baik dan tidak berhubungan langsung dengan penyebab kerusakan hutan.', knowledge: 'Pertumbuhan tanaman dipengaruhi oleh berbagai faktor, seperti ketersediaan air, cahaya, unsur hara, dan kondisi lingkungan.' },
		tumpukan_tanah: { name: '🟫 TUMPUKAN TANAH', image: 'assets/images/forest/investigation/decoy/tumpukan_tanah.png', result: 'Terdapat tumpukan tanah di salah satu sisi area hutan. Di sekitarnya tidak terlihat perubahan lain yang dapat menjelaskan asal tumpukan tersebut.', info: 'Tanah dapat mengalami perpindahan dan penumpukan akibat berbagai proses alami maupun aktivitas manusia.', evidence: false, reasonTitle: 'Mengapa bukan bukti?', reason: 'Tidak terdapat petunjuk lain yang menunjukkan bagaimana tumpukan tersebut terbentuk atau hubungannya dengan kerusakan hutan. Karena penyebabnya tidak dapat dipastikan dari temuan tersebut, tumpukan tanah tidak dapat digunakan sebagai bukti utama.', knowledge: 'Tanah dapat mengalami perpindahan dan penumpukan akibat berbagai proses, seperti erosi, pergerakan tanah, atau aktivitas manusia.' }
	};
	const clues = ['Penebangan pohon', 'Pembukaan lahan', 'Kondisi tanaman'];
	const storageKey = 'the-green-returns-forest-investigation';
	let saved;
	try { saved = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch { saved = {}; }
	const hasScoreParts = Number.isFinite(Number(saved.investigationScore)) || Number.isFinite(Number(saved.recoveryScore));
	const state = { x: 0.5, y: 0.58, cameraX: 0, direction: 'front', frame: 0, animationTimer: 0, animationId: 0, lastTime: 0, active: false, nearby: null, selected: null, recoverySelected: null, recoveryPlaced: new Set(Array.isArray(saved.recoveryPlaced) ? saved.recoveryPlaced : []), recoveryLocations: saved.recoveryLocations && typeof saved.recoveryLocations === 'object' ? saved.recoveryLocations : {}, introIndex: 0, introTimer: null, introTyping: false, recoveryIndex: 0, recoveryTyping: false, recoveryTimer: null, recoveryStage: false, recoveryReplayMode: false, investigationRemaining: 180, investigationTimerId: null, investigationExpired: false, investigationScore: hasScoreParts ? Number(saved.investigationScore) || 0 : Number(saved.score) || 0, recoveryScore: hasScoreParts ? Number(saved.recoveryScore) || 0 : 0, score: Number(saved.score) || 0, inspected: new Set(Array.isArray(saved.inspected) ? saved.inspected : []), evidence: new Set(Array.isArray(saved.evidence) ? saved.evidence : []), nonEvidence: new Set(Array.isArray(saved.nonEvidence) ? saved.nonEvidence : []) };

	gameAudio.registerBgm(forestBgm);
	gameAudio.registerSfx(typingSound);
	gameAudio.registerSfx(successSound);
	gameAudio.registerSfx(failureSound);
	const save = () => { state.score = state.investigationScore + state.recoveryScore; localStorage.setItem(storageKey, JSON.stringify({ score: state.score, investigationScore: state.investigationScore, recoveryScore: state.recoveryScore, inspected: [...state.inspected], evidence: [...state.evidence], nonEvidence: [...state.nonEvidence], recoveryPlaced: [...state.recoveryPlaced], recoveryLocations: state.recoveryLocations })); };
	const setForestBackground = (source) => {
		if (forestBackground.getAttribute('src') === source) return;
		forestBackground.classList.add('is-fading');
		const reveal = () => { forestBackground.classList.remove('is-fading'); forestBackground.removeEventListener('load', reveal); };
		forestBackground.addEventListener('load', reveal);
		forestBackground.src = source;
	};
	const pauseTyping = () => { clearInterval(state.introTimer); if (typingSound) { typingSound.pause(); typingSound.currentTime = 0; } };
	const typeIntro = () => {
		pauseTyping();
		state.introTyping = true;
		introText.textContent = '';
		let index = 0;
		state.introTimer = setInterval(() => {
			if (index === 0 && typingSound && !gameAudio.getState().sfxMuted) { typingSound.currentTime = 0; typingSound.play().catch(() => {}); }
			introText.textContent = dialogues[state.introIndex].slice(0, index + 1);
			index += 1;
			if (index >= dialogues[state.introIndex].length) { pauseTyping(); state.introTyping = false; }
		}, 35);
	};
	const getWorldWidth = () => Math.max(shell.clientWidth, shell.clientHeight * (1600 / 688));
	const interpolate = (first, second, amount) => first + (second - first) * amount;
	const getTopBoundary = (x) => {
		const points = [[0, 0.68], [0.05, 0.65], [0.1, 0.32], [0.2, 0.27], [0.35, 0.25], [0.5, 0.25], [0.65, 0.24], [0.8, 0.2], [0.9, 0.23], [0.96, 0.55], [1, 0.65]];
		for (let index = 1; index < points.length; index += 1) {
			if (x <= points[index][0]) {
				const previous = points[index - 1];
				const current = points[index];
				return interpolate(previous[1], current[1], (x - previous[0]) / (current[0] - previous[0]));
			}
		}
		return points[points.length - 1][1];
	};
	const getSideBoundary = (y, side) => {
		const edge = y < 0.62 ? interpolate(0.2, 0.035, Math.max(0, (y - 0.18) / 0.44)) : 0.035;
		return side === 'left' ? edge : 1 - edge;
	};
	const isWalkable = (x, y) => {
		const leftBoundary = getSideBoundary(y, 'left');
		const rightBoundary = getSideBoundary(y, 'right');
		const topBoundary = getTopBoundary(x);
		const bottomBoundary = 0.955;
		if (x < leftBoundary || x > rightBoundary || y < topBoundary || y > bottomBoundary) {
			return false;
		}
		return true;
	};
	const moveWithCollision = (nextX, nextY) => {
		const safeX = Math.max(0.02, Math.min(0.98, nextX));
		const safeY = Math.max(0.12, Math.min(0.955, nextY));
		if (isWalkable(safeX, safeY)) {
			state.x = safeX;
			state.y = safeY;
			return;
		}
		if (isWalkable(safeX, state.y)) state.x = safeX;
		if (isWalkable(state.x, safeY)) state.y = safeY;
	};
	const updateCamera = () => {
		const worldWidth = getWorldWidth();
		const cameraMax = Math.max(0, worldWidth - shell.clientWidth);
		state.cameraX = Math.max(0, Math.min(cameraMax, state.x * worldWidth - shell.clientWidth * 0.5));
		document.querySelector('.forest-exploration').style.width = `${worldWidth}px`;
		document.querySelector('.forest-background').style.width = `${worldWidth}px`;
		shell.style.setProperty('--forest-camera-x', `${state.cameraX}px`);
	};
	const setRayna = () => {
		const frames = 4;
		rayna.src = `assets/images/characters/rayna_walk_${state.direction}_${(state.frame % frames) + 1}.png`;
		rayna.style.left = `${state.x * 100}%`;
		rayna.style.top = `${state.y * 100}%`;
		rayna.style.setProperty('--rayna-depth-scale', (0.55 + state.y * 0.8).toFixed(3));
		updateCamera();
	};
	const updateNearby = () => {
		let closest = null;
		let closestDistance = Infinity;
		forestObjects.forEach((element) => {
			const objectId = element.dataset.object;
			const correctlyClassified = state.evidence.has(objectId) || state.nonEvidence.has(objectId);
			const incorrectlyClassified = state.inspected.has(objectId) && !correctlyClassified;
			element.classList.toggle('is-investigated', correctlyClassified);
			element.classList.toggle('is-mistake', incorrectlyClassified);
			if (correctlyClassified || incorrectlyClassified) return;
			const distance = Math.hypot(state.x - parseFloat(element.style.left) / 100, state.y - parseFloat(element.style.top) / 100);
			if (distance < closestDistance) { closestDistance = distance; closest = element; }
		});
		const nextNearby = closestDistance < 0.12 ? closest : null;
		const nearbyChanged = nextNearby !== state.nearby;
		state.nearby = nextNearby;
		inspectButton.hidden = !state.nearby || !state.active;
		if (state.nearby && nearbyChanged) {
			const worldWidth = getWorldWidth();
			inspectButton.style.left = `${parseFloat(state.nearby.style.left) / 100 * worldWidth - state.cameraX}px`;
			inspectButton.style.top = state.nearby.style.top;
		}
	};
	const getUnclassifiedObjects = (isEvidence) => Object.entries(objects)
		.filter(([, object]) => object.evidence === isEvidence)
		.map(([key, object]) => ({ key, ...object }));
	const updateScore = () => { state.score = state.investigationScore + state.recoveryScore; document.querySelector('#forest-score').textContent = String(state.score); };
	const hasAllEvidence = () => clues.every((clue) => [...state.evidence].some((key) => objects[key]?.clue === clue));
	const updateInvestigationTimer = () => {
		const minutes = Math.floor(state.investigationRemaining / 60);
		const seconds = state.investigationRemaining % 60;
		investigationTimerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	};
	const stopInvestigationTimer = () => { clearInterval(state.investigationTimerId); state.investigationTimerId = null; };
	const showInvestigationExpired = (title = 'Waktu investigasi habis', message = 'Tiga bukti utama belum ditemukan. Ulangi investigasi untuk melanjutkan ke video dan pemulihan hutan.') => {
		stopInvestigationTimer();
		state.investigationExpired = true;
		state.active = false;
		cancelAnimationFrame(state.animationId);
		inspectButton.hidden = true;
		observationPanel.hidden = true;
		feedbackPanel.hidden = true;
		investigationReplayClose.hidden = true;
		document.querySelector('#forest-investigation-replay-title').textContent = title;
		investigationReplay.querySelector('p').textContent = message;
		investigationReplayYes.textContent = 'ULANGI INVESTIGASI';
		investigationReplayNo.hidden = true;
		investigationReplay.hidden = false;
	};
	const startInvestigationTimer = () => {
		if (state.investigationTimerId || state.investigationExpired || hasAllEvidence()) return;
		state.investigationTimerId = setInterval(() => {
			if (!state.active || scene.hidden || !observationPanel.hidden || !feedbackPanel.hidden || !journalPanel.hidden || !infoPanel.hidden || !settingsPanel.hidden) return;
			state.investigationRemaining = Math.max(0, state.investigationRemaining - 1);
			updateInvestigationTimer();
			if (state.investigationRemaining === 0) {
				stopInvestigationTimer();
				showInvestigationExpired();
			}
		}, 1000);
	};
	const showInvestigationCompletePrompt = () => {
		investigationReplayClose.hidden = false;
		document.querySelector('#forest-investigation-replay-title').textContent = 'Investigasi selesai';
		investigationReplay.querySelector('p').textContent = 'Tiga bukti utama sudah ditemukan. Kamu bisa mengulang investigasi atau langsung melanjutkan ke pengelompokan tanaman.';
		investigationReplayYes.textContent = 'MULAI ULANG INVESTIGASI';
		investigationReplayNo.hidden = false;
	};
	const playResultSound = (sound) => {
		if (!sound || gameAudio.getState().sfxMuted) return;
		sound.currentTime = 0;
		sound.play().catch(() => {});
	};
	const openInfo = () => {
		const complete = hasAllEvidence();
		infoPanel.hidden = false;
		if (!complete) {
			infoMessage.textContent = 'Video bukti akan terbuka setelah ketiga bukti utama ditemukan.';
			evidenceVideo.hidden = true;
			evidenceVideo.pause();
			evidenceVideo.currentTime = 0;
			evidenceVideo.removeAttribute('src');
			return;
		}
		infoMessage.textContent = 'Kamu telah menemukan ketiga bukti utama. Saksikan video bukti kerusakan hutan.';
		if (!evidenceVideo.getAttribute('src')) {
			evidenceVideo.src = 'assets/images/forest/background/bukti_video.mp4';
		}
		evidenceVideo.hidden = false;
		evidenceVideo.play().catch(() => {});
	};
	const recoveryDialogues = [
		'Sekarang aku mengerti apa yang terjadi pada hutan ini.',
		'Pohon-pohon telah banyak ditebang dan sebagian lahannya dibuka.',
		'Pohon-pohon baru juga belum tumbuh dengan baik.',
		'Kalau dibiarkan, hutan ini akan semakin kehilangan pohonnya.',
		'Kita harus membantu hutan ini untuk kembali pulih.',
		'SAATNYA MEMULIHKAN HUTAN'
	];
	const resultDialogues = [
		'Tanaman-tanaman ini sudah ditempatkan\ndi area yang sesuai.',
		'Sekarang hutan ini punya kesempatan\nuntuk tumbuh dan pulih kembali.',
		'Ternyata, memulihkan hutan bukan hanya\ntentang menanam pohon, tapi juga memahami\nkondisi lingkungan di sekitarnya.',
		'Aku harap tanaman-tanaman ini bisa tumbuh\ndengan baik dan membuat hutan ini kembali hijau.',
		'Tapi aku rasa masih ada bagian lain dari desa yang membutuhkan perhatian.',
		'Aku harus kembali ke desa dan melihat apa yang bisa kita lakukan selanjutnya.',
		'Ayo, kita lanjutkan perjalanan.'
	];
	const typeRecoveryDialogue = () => {
		clearInterval(state.recoveryTimer);
		state.recoveryTyping = true;
		recoveryDialogueText.textContent = '';
		let index = 0;
		state.recoveryTimer = setInterval(() => {
			recoveryDialogueText.textContent = recoveryDialogues[state.recoveryIndex].slice(0, index + 1);
			index += 1;
			if (index >= recoveryDialogues[state.recoveryIndex].length) { clearInterval(state.recoveryTimer); state.recoveryTyping = false; }
		}, 35);
	};
	const startRecoveryDialogue = () => {
		if (isRecoveryComplete()) {
			infoPanel.hidden = true;
			openRecoveryReplayPrompt();
			return;
		}
		state.recoveryStage = true;
		state.active = false;
		state.score = Number(state.score) || 0;
		updateScore();
		save();
		infoPanel.hidden = true;
		forestObjects.forEach((object) => { object.hidden = true; });
		recoveryBoard.hidden = true;
		setForestBackground(state.score >= 500 ? 'assets/images/forest/background/forest_recovering.png' : 'assets/images/forest/background/forest_damaged.png');
		recoveryDialog.hidden = false;
		state.recoveryIndex = 0;
		typeRecoveryDialogue();
	};
	const showRecoveryGuide = () => { recoveryDialog.hidden = true; recoveryGuide.hidden = false; };
	const startRecovery = () => {
		recoveryGuide.hidden = true;
		recoveryBoard.hidden = false;
		state.score = Number(state.score) || 0;
		updateScore();
		save();
		state.active = true;
		[...forestSeeds].sort(() => Math.random() - 0.5).forEach((seed) => document.querySelector('.forest-seed-palette').appendChild(seed));
		forestSeeds.forEach((seed) => {
			seed.draggable = !state.recoveryPlaced.has(seed.dataset.seed);
			seed.classList.toggle('is-placed', state.recoveryPlaced.has(seed.dataset.seed));
		});
		recoveryZones.forEach((zone) => {
			zone.querySelectorAll('.forest-placed-seed').forEach((image) => image.remove());
			const placedSeeds = Object.entries(state.recoveryLocations).filter(([, location]) => location === zone.dataset.zone).map(([seedId]) => seedId);
			placedSeeds.forEach((seedId) => {
				const sourceImage = document.querySelector(`[data-seed="${seedId}"] img`);
				if (!sourceImage) return;
				const image = sourceImage.cloneNode(true);
				image.className = 'forest-placed-seed';
				zone.appendChild(image);
			});
			zone.classList.toggle('is-filled', placedSeeds.length > 0);
		});
	};
	const checkRecoveryComplete = () => {
		if (state.recoveryPlaced.size < forestSeeds.length) return;
		state.active = false;
		setForestBackground(state.score >= 800 ? 'assets/images/forest/background/forest_recovered.png' : 'assets/images/forest/background/forest_recovering.png');
		recoveryBoard.hidden = true;
		document.querySelector('#forest-recovery-character').src = 'assets/images/characters/rayna_happy.png';
		recoveryResult.hidden = false;
		state.recoveryIndex = 0;
		recoveryResultBack.disabled = true;
		recoveryResultText.textContent = resultDialogues[0];
		save();
	};
	const showRecoveryMistake = (zone) => {
		zone.classList.remove('is-wrong');
		void zone.offsetWidth;
		zone.classList.add('is-wrong');
		if (recoveryHitFlash) {
			recoveryHitFlash.classList.remove('is-visible');
			void recoveryHitFlash.offsetWidth;
			recoveryHitFlash.classList.add('is-visible');
		}
	};
	const placeRecoverySeed = (zone) => {
		if (!state.recoverySelected) return;
		const correctZone = { pohon_pelindung: 'open', kopi: 'shade', kakao: 'dry' }[state.recoverySelected];
		const correct = correctZone === zone.dataset.zone;
		if (!state.recoveryReplayMode) state.recoveryScore += correct ? 100 : -50;
		updateScore();
		if (!state.recoveryReplayMode) playResultSound(correct ? successSound : failureSound);
		const seedId = state.recoverySelected;
		const selectedSeed = document.querySelector(`[data-seed="${seedId}"]`);
		const placedImage = selectedSeed.querySelector('img').cloneNode(true);
		placedImage.className = 'forest-placed-seed';
		placedImage.alt = selectedSeed.querySelector('img').alt;
		zone.appendChild(placedImage);
		state.recoveryPlaced.add(seedId);
		state.recoveryLocations[seedId] = zone.dataset.zone;
		selectedSeed.classList.add('is-placed');
		selectedSeed.disabled = true;
		selectedSeed.draggable = false;
		state.recoverySelected = null;
		forestSeeds.forEach((seed) => seed.classList.remove('is-selected'));
		if (!correct && !state.recoveryReplayMode) showRecoveryMistake(zone);
		save();
		checkRecoveryComplete();
	};
	const updateJournal = () => {
		journalEvidenceList.innerHTML = '';
		journalNonEvidenceList.innerHTML = '';
		const addJournalEntry = (list, object, status, isHidden = false, hiddenLabel = 'Bukti belum ditemukan') => {
			const entry = document.createElement('li');
			const button = document.createElement('button');
			button.type = 'button';
			button.disabled = isHidden;
			button.classList.toggle('is-hidden-evidence', isHidden);
			button.innerHTML = `<span>${isHidden ? hiddenLabel : object.name}</span><span>${status}</span>`;
			if (!isHidden) button.addEventListener('click', () => {
				journalDetail.hidden = false;
				journalDetail.innerHTML = `<button type="button" class="forest-journal-detail-close" aria-label="Tutup detail temuan">&times;</button><div class="forest-journal-detail-heading"><img src="${object.image}" alt="${object.name}"><div><span class="forest-kicker">LEVEL 2 — HUTAN</span><strong>${object.name}</strong><span class="forest-journal-category ${object.evidence ? 'is-evidence' : 'is-not-evidence'}">${object.evidence ? 'BUKTI' : 'BUKAN BUKTI'}</span></div></div><div class="forest-journal-detail-block"><h4>${object.evidence ? 'KESIMPULAN' : 'HASIL KLASIFIKASI'}</h4><p>${object.evidence ? object.clue : 'Temuan ini belum cukup kuat untuk dijadikan bukti utama.'}</p></div><div class="forest-journal-detail-block"><h4>${object.reasonTitle}</h4><p>${object.reason}</p></div><div class="forest-journal-detail-block forest-journal-knowledge"><h4>PENGETAHUAN</h4><p>${object.knowledge}</p></div>`;
				journalDetail.querySelector('.forest-journal-detail-close').addEventListener('click', () => { journalDetail.hidden = true; });
			});
			entry.appendChild(button);
			list.appendChild(entry);
		};
		const evidenceObjects = clues.map((clue) => [...state.evidence].map((key) => objects[key]).find((item) => item?.clue === clue));
		const nonEvidenceObjects = getUnclassifiedObjects(false).filter((object) => state.nonEvidence.has(object.key));
		clues.forEach((clue, index) => {
			const evidence = evidenceObjects[index];
			addJournalEntry(journalEvidenceList, evidence || { name: `Bukti ${index + 1}` }, evidence ? 'Lihat detail' : 'Belum ditemukan', !evidence);
		});
		getUnclassifiedObjects(false).forEach((object, index) => {
			const classified = nonEvidenceObjects.some((item) => item.key === object.key);
			addJournalEntry(journalNonEvidenceList, classified ? object : { name: `Temuan ${index + 1}` }, classified ? 'Temuan disisihkan' : 'Belum dipastikan', !classified, 'Temuan belum diklasifikasikan');
		});
	};
	const openObservation = () => {
		if (!state.nearby) return;
		state.selected = state.nearby.dataset.object;
		const item = objects[state.selected];
		document.querySelector('#forest-observation-image').src = item.image;
		document.querySelector('#forest-observation-image').alt = item.name;
		document.querySelector('#forest-observation-title').textContent = item.name;
		document.querySelector('#forest-observation-result').textContent = `“${item.result}”`;
		document.querySelector('#forest-observation-info').textContent = `“${item.info}”`;
		observationPanel.hidden = false;
	};
	const answerObservation = (markedEvidence) => {
		const item = objects[state.selected];
		const correct = markedEvidence === item.evidence;
		state.inspected.add(state.selected);
		state.investigationScore += correct ? 100 : -50;
		if (correct && item.evidence) state.evidence.add(state.selected);
		if (correct && !item.evidence) state.nonEvidence.add(state.selected);
		if (hasAllEvidence()) { stopInvestigationTimer(); investigationTimerBox.hidden = true; }
		save(); updateScore(); updateJournal();
		playResultSound(correct ? successSound : failureSound);
		observationPanel.hidden = true;
		document.querySelector('#forest-feedback-icon').textContent = correct ? '✓' : '✕';
		document.querySelector('#forest-feedback-title').textContent = correct
			? (item.evidence ? 'BUKTI DITEMUKAN' : 'BUKAN BUKTI')
			: 'PENGAMATAN BELUM TEPAT';
		document.querySelector('#forest-feedback-text').textContent = correct
			? (item.evidence ? 'Temuan ini berkaitan dengan kerusakan hutan dan sudah dicatat di bagian Bukti.' : 'Temuan ini sudah diamati, tetapi tidak berkaitan langsung dengan kerusakan hutan. Catatan disimpan di bagian Bukan Bukti.')
			: 'Pilihanmu belum sesuai dengan hasil pengamatan. Temuan tetap disimpan agar bisa kamu pelajari kembali di jurnal.';
		document.querySelector('#forest-feedback-score').textContent = correct ? '+100 POIN' : '−50 POIN';
		feedbackPanel.hidden = false;
	};
	const tick = (time) => {
		if (!state.active) return;
		const elapsed = Math.min(time - state.lastTime || 0, 50); state.lastTime = time;
		const horizontal = (pressedKeys.has('ArrowRight') ? 1 : 0) - (pressedKeys.has('ArrowLeft') ? 1 : 0);
		const vertical = (pressedKeys.has('ArrowDown') ? 1 : 0) - (pressedKeys.has('ArrowUp') ? 1 : 0);
		if (horizontal || vertical) {
			const length = Math.hypot(horizontal, vertical) || 1;
			moveWithCollision(state.x + horizontal / length * elapsed * .0003, state.y + vertical / length * elapsed * .0003);
			const nextDirection = horizontal > 0 ? 'right' : horizontal < 0 ? 'left' : vertical < 0 ? 'back' : 'front';
			if (nextDirection !== state.direction) {
				state.direction = nextDirection;
				state.frame = 0;
				state.animationTimer = 0;
				setRayna();
			}
			state.animationTimer += elapsed;
			if (state.animationTimer >= 120) {
				state.animationTimer = 0;
				state.frame += 1;
				setRayna();
			}
			updateNearby();
		}
		state.animationId = requestAnimationFrame(tick);
	};
	const startExploration = () => { guidePanel.hidden = true; intro.hidden = true; state.active = true; updateNearby(); updateInvestigationTimer(); startInvestigationTimer(); gameAudio.playBgm(forestBgm); state.animationId = requestAnimationFrame(tick); };
	const updateAudioControls = () => {
		const audioState = gameAudio.getState();
		bgmVolume.value = audioState.bgmVolume; sfxVolume.value = audioState.sfxVolume;
		bgmVolumeValue.textContent = `${Math.round(audioState.bgmVolume * 100)}%`; sfxVolumeValue.textContent = `${Math.round(audioState.sfxVolume * 100)}%`;
		bgmToggle.textContent = audioState.bgmMuted ? 'NYALAKAN MUSIK LATAR' : 'MUTE MUSIK LATAR';
		sfxToggle.textContent = audioState.sfxMuted ? 'NYALAKAN EFEK SUARA' : 'MUTE EFEK SUARA';
	};
	const hideScene = () => { state.active = false; stopInvestigationTimer(); cancelAnimationFrame(state.animationId); pauseTyping(); clearInterval(state.recoveryTimer); evidenceVideo.pause(); scene.hidden = true; scene.setAttribute('aria-hidden', 'true'); forestBgm.pause(); forestBgm.currentTime = 0; guidePanel.hidden = true; observationPanel.hidden = true; feedbackPanel.hidden = true; journalPanel.hidden = true; infoPanel.hidden = true; settingsPanel.hidden = true; investigationReplay.hidden = true; recoveryReplay.hidden = true; recoveryDialog.hidden = true; recoveryGuide.hidden = true; recoveryResult.hidden = true; villageChoice.hidden = true; recoveryBoard.hidden = true; stage2Button.hidden = true; };
	const startRecoveryEntry = () => {
		state.recoveryStage = true;
		state.active = false;
		forestObjects.forEach((object) => { object.hidden = true; });
		intro.hidden = true;
		stage2Button.hidden = true;
		setForestBackground(state.score >= 800 ? 'assets/images/forest/background/forest_recovered.png' : state.score >= 500 ? 'assets/images/forest/background/forest_recovering.png' : 'assets/images/forest/background/forest_damaged.png');
		recoveryGuide.hidden = false;
	};
	const isInvestigationComplete = () => hasAllEvidence();
	const isRecoveryComplete = () => state.recoveryPlaced.size === forestSeeds.length;
	const showRecoveryBoard = () => {
		state.recoveryStage = true;
		state.active = false;
		forestObjects.forEach((object) => { object.hidden = true; });
		intro.hidden = true;
		stage2Button.hidden = true;
		recoveryGuide.hidden = true;
		startRecovery();
		recoveryGuide.hidden = true;
		recoveryBoard.hidden = false;
	};
	const openRecoveryReplayPrompt = () => {
		state.recoveryStage = true;
		state.active = false;
		recoveryDialog.hidden = true;
		recoveryGuide.hidden = true;
		showRecoveryBoard();
		state.active = false;
		stage2Button.hidden = true;
		recoveryReplay.hidden = false;
	};
	const closeInvestigationReplay = () => {
		if (state.investigationExpired) return;
		investigationReplay.hidden = true;
		recoveryReplay.hidden = true;
		recoveryGuide.hidden = true;
		recoveryBoard.hidden = true;
		stage2Button.hidden = false;
		state.recoveryStage = false;
		state.active = true;
		state.lastTime = 0;
		forestObjects.forEach((object) => { object.hidden = false; });
		updateNearby();
		cancelAnimationFrame(state.animationId);
		state.animationId = requestAnimationFrame(tick);
	};
	const resetInvestigation = () => {
		stopInvestigationTimer();
		state.investigationScore = 0;
		state.investigationRemaining = 180;
		state.investigationExpired = false;
		investigationTimerBox.hidden = false;
		state.inspected.clear();
		state.evidence.clear();
		state.nonEvidence.clear();
		state.selected = null;
		state.active = false;
		state.recoveryStage = false;
		observationPanel.hidden = true;
		feedbackPanel.hidden = true;
		forestObjects.forEach((object) => { object.hidden = false; object.classList.remove('is-investigated', 'is-mistake'); });
		setForestBackground('assets/images/forest/background/forest_damaged.png');
		updateInvestigationTimer();
		save(); updateJournal(); updateScore();
		investigationReplay.hidden = true;
		investigationReplayClose.hidden = false;
		investigationReplayNo.hidden = false;
		intro.hidden = false;
		state.introIndex = 0;
		introBack.disabled = true;
		typeIntro();
	};
	const resetRecovery = () => {
		state.recoveryReplayMode = true;
		state.recoveryPlaced.clear();
		state.recoveryLocations = {};
		state.recoverySelected = null;
		recoveryZones.forEach((zone) => { zone.classList.remove('is-filled'); zone.querySelectorAll('.forest-placed-seed').forEach((image) => image.remove()); });
		forestSeeds.forEach((seed) => { seed.disabled = false; seed.draggable = true; seed.classList.remove('is-placed', 'is-selected'); });
		save();
		recoveryReplay.hidden = true;
		showRecoveryBoard();
	};
	const showScene = () => {
		scene.hidden = false; scene.setAttribute('aria-hidden', 'false'); state.active = false; state.recoveryStage = false;
		const mapProgress = JSON.parse(localStorage.getItem('the-green-returns-map-progress') || '{}');
		const completed = mapProgress.hutan === true;
		const investigationComplete = isInvestigationComplete();
		const recoveryComplete = isRecoveryComplete();
		intro.hidden = investigationComplete; stage2Button.hidden = !investigationComplete; guidePanel.hidden = true; feedbackPanel.hidden = true; observationPanel.hidden = true; journalPanel.hidden = true; infoPanel.hidden = true; settingsPanel.hidden = true; investigationReplay.hidden = true; recoveryReplay.hidden = true; recoveryDialog.hidden = true; recoveryGuide.hidden = true; recoveryResult.hidden = true; villageChoice.hidden = true; recoveryBoard.hidden = true;
		forestObjects.forEach((object) => {
			const correctlyClassified = state.evidence.has(object.dataset.object) || state.nonEvidence.has(object.dataset.object);
			object.hidden = false;
			object.classList.toggle('is-investigated', correctlyClassified);
			object.classList.toggle('is-mistake', state.inspected.has(object.dataset.object) && !correctlyClassified);
		});
		inspectButton.hidden = true;
		setForestBackground(completed ? (state.score >= 800 ? 'assets/images/forest/background/forest_recovered.png' : state.score >= 500 ? 'assets/images/forest/background/forest_recovering.png' : 'assets/images/forest/background/forest_damaged.png') : 'assets/images/forest/background/forest_damaged.png');
		updateScore(); updateJournal(); updateInvestigationTimer(); setRayna();
		investigationTimerBox.hidden = investigationComplete;
		if (investigationComplete) { showInvestigationCompletePrompt(); investigationReplay.hidden = false; }
		else if (state.investigationExpired) showInvestigationExpired();
		else typeIntro();
		gameAudio.playBgm(forestBgm);
	};

	window.addEventListener('green-returns:enter-area', (event) => { if (event.detail.area === 'hutan') showScene(); });
	window.addEventListener('green-returns:show-map', hideScene);
	window.addEventListener('green-returns:show-main-menu', hideScene);
	evidenceVideo.addEventListener('ended', startRecoveryDialogue);
	window.addEventListener('green-returns:reset-achievements', (event) => {
		const area = event.detail?.area;
		if (area !== 'all' && area !== 'hutan') {
			return;
		}
		stopInvestigationTimer();
		state.investigationRemaining = 180;
		state.investigationExpired = false;
		investigationTimerBox.hidden = false;
		updateInvestigationTimer();
		state.investigationScore = 0;
		state.recoveryScore = 0;
		state.score = 0;
		state.inspected.clear();
		state.evidence.clear();
		state.nonEvidence.clear();
		state.recoveryPlaced.clear();
		state.recoveryLocations = {};
		state.recoverySelected = null;
		state.recoveryStage = false;
		localStorage.removeItem(storageKey);
		evidenceVideo.pause();
		evidenceVideo.currentTime = 0;
		evidenceVideo.removeAttribute('src');
		infoPanel.hidden = true;
		recoveryBoard.hidden = true;
		recoveryDialog.hidden = true;
		recoveryGuide.hidden = true;
		recoveryResult.hidden = true;
		investigationReplay.hidden = true;
		recoveryReplay.hidden = true;
		setForestBackground('assets/images/forest/background/forest_damaged.png');
		forestObjects.forEach((object) => {
			object.hidden = false;
			object.classList.remove('is-investigated', 'is-mistake');
		});
		recoveryZones.forEach((zone) => {
			zone.classList.remove('is-filled');
			zone.removeAttribute('data-seed');
			zone.querySelectorAll('.forest-placed-seed').forEach((image) => image.remove());
		});
		forestSeeds.forEach((seed) => {
			seed.disabled = false;
			seed.classList.remove('is-placed', 'is-selected');
		});
		save();
		updateScore();
		updateJournal();
	});
	introNext.addEventListener('click', () => { if (state.introTyping) { pauseTyping(); state.introTyping = false; introText.textContent = dialogues[state.introIndex]; return; } if (state.introIndex < dialogues.length - 1) { state.introIndex += 1; introBack.disabled = false; typeIntro(); } else { intro.hidden = true; guidePanel.hidden = false; } });
	introBack.addEventListener('click', () => { if (state.introIndex > 0) { state.introIndex -= 1; introBack.disabled = state.introIndex === 0; typeIntro(); } });
	document.querySelector('#forest-start-button').addEventListener('click', startExploration);
	inspectButton.addEventListener('click', openObservation);
	document.querySelector('#forest-evidence-button').addEventListener('click', () => answerObservation(true));
	document.querySelector('#forest-not-evidence-button').addEventListener('click', () => answerObservation(false));
	document.querySelector('#forest-feedback-close').addEventListener('click', () => {
		feedbackPanel.hidden = true;
		updateNearby();
		if (hasAllEvidence()) openInfo();
		else if (state.inspected.size === forestObjects.length) showInvestigationExpired('Bukti belum lengkap', 'Belum semua bukti utama ditemukan. Ulangi investigasi untuk mencoba lagi.');
	});
	journalButton.addEventListener('click', () => { updateJournal(); journalDetail.hidden = true; journalPanel.hidden = false; });
	document.querySelector('#forest-journal-close').addEventListener('click', () => { journalPanel.hidden = true; });
	infoButton.addEventListener('click', openInfo);
	infoClose.addEventListener('click', () => { evidenceVideo.pause(); infoPanel.hidden = true; });
	recoveryNext.addEventListener('click', () => { if (state.recoveryTyping) { clearInterval(state.recoveryTimer); state.recoveryTyping = false; recoveryDialogueText.textContent = recoveryDialogues[state.recoveryIndex]; return; } if (state.recoveryIndex < recoveryDialogues.length - 1) { state.recoveryIndex += 1; typeRecoveryDialogue(); } else { recoveryDialog.hidden = true; recoveryGuide.hidden = false; } });
	recoveryStart.addEventListener('click', startRecovery);
	investigationReplayClose.addEventListener('click', closeInvestigationReplay);
	investigationReplayYes.addEventListener('click', resetInvestigation);
	investigationReplayNo.addEventListener('click', () => { investigationReplay.hidden = true; openRecoveryReplayPrompt(); });
	recoveryReplayYes.addEventListener('click', resetRecovery);
	recoveryReplayClose.addEventListener('click', () => { recoveryReplay.hidden = true; state.recoveryReplayMode = true; showRecoveryBoard(); });
	forestSeeds.forEach((seed) => {
		seed.addEventListener('click', () => { if (!seed.disabled) { state.recoverySelected = seed.dataset.seed; forestSeeds.forEach((item) => item.classList.toggle('is-selected', item === seed)); } });
		seed.addEventListener('dragstart', (event) => { if (!seed.disabled) { event.dataTransfer.setData('text/plain', seed.dataset.seed); state.recoverySelected = seed.dataset.seed; } });
	});
	recoveryZones.forEach((zone) => {
		zone.addEventListener('click', () => placeRecoverySeed(zone));
		zone.addEventListener('dragover', (event) => event.preventDefault());
		zone.addEventListener('drop', (event) => { event.preventDefault(); state.recoverySelected = event.dataTransfer.getData('text/plain'); placeRecoverySeed(zone); });
	});
	stage2Button.addEventListener('click', () => { if (hasAllEvidence()) { showRecoveryBoard(); recoveryReplay.hidden = false; } });
	recoveryResultNext.addEventListener('click', () => { if (state.recoveryIndex < resultDialogues.length - 1) { state.recoveryIndex += 1; recoveryResultBack.disabled = false; recoveryResultText.textContent = resultDialogues[state.recoveryIndex]; return; } recoveryResult.hidden = true; villageChoice.hidden = false; window.dispatchEvent(new CustomEvent('green-returns:area-complete', { detail: { area: 'hutan', score: state.score } })); });
	recoveryResultBack.addEventListener('click', () => { if (state.recoveryIndex > 0) { state.recoveryIndex -= 1; recoveryResultBack.disabled = state.recoveryIndex === 0; recoveryResultText.textContent = resultDialogues[state.recoveryIndex]; } });
	document.querySelector('#forest-village-map').addEventListener('click', () => { villageChoice.hidden = true; hideScene(); window.dispatchEvent(new Event('green-returns:show-map')); });
	document.querySelector('#forest-village-go').addEventListener('click', () => { villageChoice.hidden = true; hideScene(); window.dispatchEvent(new CustomEvent('green-returns:enter-area', { detail: { area: 'desa' } })); });
	settingsButton.addEventListener('click', () => { updateAudioControls(); settingsPanel.hidden = false; });
	settingsClose.addEventListener('click', () => { settingsPanel.hidden = true; });
	bgmVolume.addEventListener('input', () => { gameAudio.setBgmVolume(bgmVolume.value); updateAudioControls(); });
	sfxVolume.addEventListener('input', () => { gameAudio.setSfxVolume(sfxVolume.value); updateAudioControls(); });
	bgmToggle.addEventListener('click', () => { gameAudio.toggleBgm(); updateAudioControls(); });
	sfxToggle.addEventListener('click', () => { gameAudio.toggleSfx(); updateAudioControls(); });
	document.querySelector('#forest-back-button').addEventListener('click', () => {
		if (!recoveryBoard.hidden) {
			state.active = false;
			cancelAnimationFrame(state.animationId);
			pressedKeys.clear();
			recoveryBoard.hidden = true;
			recoveryGuide.hidden = true;
			recoveryReplay.hidden = true;
			investigationReplay.hidden = false;
			return;
		}
		hideScene();
		window.dispatchEvent(new Event('green-returns:show-map'));
	});
	document.addEventListener('keydown', (event) => { if (scene.hidden || state.recoveryStage || !state.active || feedbackPanel.hidden === false || journalPanel.hidden === false || infoPanel.hidden === false || observationPanel.hidden === false || settingsPanel.hidden === false) return; if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) { event.preventDefault(); pressedKeys.add(event.key); } if (event.key === 'e' || event.key === 'E') openObservation(); });
	document.addEventListener('keyup', (event) => { pressedKeys.delete(event.key); });
	window.addEventListener('resize', () => { setRayna(); updateNearby(); });
	updateScore(); updateJournal(); setRayna(); hideScene();
});
