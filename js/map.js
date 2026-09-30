document.addEventListener('DOMContentLoaded', () => {
	const mapScene = document.querySelector('.map-scene');
	const mapWorld = document.querySelector('.map-world');
	const mapBackground = document.querySelector('.map-background');
	const mapBackgroundGreen = document.querySelector('.map-background-green');
	const mapRayna = document.querySelector('.map-rayna');
	const mapDoors = [...document.querySelectorAll('.map-door')];
	const mapInfoButton = document.querySelector('#map-info-button');
	const mapInfoPanel = document.querySelector('#map-info-panel');
	const mapInfoClose = document.querySelector('#map-info-close');
	const mapInteractionHint = document.querySelector('.map-interaction-hint');
	const mapObjectivesPanel = document.querySelector('.map-objectives');
	const mapObjectivesIcon = document.querySelector('#map-objectives-icon');
	const mapObjectivesClose = document.querySelector('#map-objectives-close');
	const mapGradeIcon = document.querySelector('#map-grade-icon');
	const raynaWalkFrames = {
		left: [1, 2, 3, 4].map((frame) => `assets/images/characters/rayna_walk_left_${frame}.png`),
		right: [1, 2, 3, 4].map((frame) => `assets/images/characters/rayna_walk_right_${frame}.png`)
	};
	const mapBgm = document.querySelector('#map-bgm');
	const mapBackButton = document.querySelector('#map-back-button');
	const mapSettingsButton = document.querySelector('#map-settings-button');
	const mapSettingsPanel = document.querySelector('#map-settings-panel');
	const mapSettingsClose = document.querySelector('#map-settings-close');
	const mapBgmVolume = document.querySelector('#map-bgm-volume');
	const mapSfxVolume = document.querySelector('#map-sfx-volume');
	const mapBgmVolumeValue = document.querySelector('#map-bgm-volume-value');
	const mapSfxVolumeValue = document.querySelector('#map-sfx-volume-value');
	const mapBgmToggle = document.querySelector('#map-bgm-toggle');
	const mapSfxToggle = document.querySelector('#map-sfx-toggle');
	const mapGradeButton = document.querySelector('#map-grade-button');
	const mapGradeStatus = document.querySelector('#map-grade-status');
	const mapGradePanel = document.querySelector('#map-grade-panel');
	const mapGradeClose = document.querySelector('#map-grade-close');
	const mapGradeResult = document.querySelector('#map-grade-result');
	const mapScoreAverage = document.querySelector('#map-score-average');
	const mapRestartButton = document.querySelector('#map-restart-button');
	const mapRestartConfirmation = document.querySelector('#map-restart-confirmation');
	const mapRestartSelection = document.querySelector('#map-restart-selection');
	const mapRestartSelectionClose = document.querySelector('#map-restart-selection-close');
	const mapRestartAreaButtons = [...document.querySelectorAll('.map-restart-area-button')];
	const mapRestartAllButton = document.querySelector('.map-restart-all-button');
	const mapRestartNo = document.querySelector('#map-restart-no');
	const mapRestartYes = document.querySelector('#map-restart-yes');
	const gameAudio = window.gameAudio;
	const pressedKeys = new Set();
	let animationFrame;
	let lastTimestamp;
	let playerX = 0;
	let cameraX = 0;
	let direction = 'right';
	let nearbyDoor;
	let targetDoor;
	let focusedArea;
	let restartTarget = 'all';
	const doorPositions = { sungai: 0.24, hutan: 0.53, desa: 0.82 };
	const progressKey = 'the-green-returns-map-progress';
	const riverCollectionKey = 'green-returns-river-collection';
	const areaProgress = JSON.parse(localStorage.getItem(progressKey) || '{}');
	const areaScores = JSON.parse(localStorage.getItem(`${progressKey}-scores`) || '{}');
	const hasCompleteRiverCollection = () => {
		try {
			const collection = JSON.parse(localStorage.getItem(riverCollectionKey) || '[]');
			return Array.isArray(collection) && ['botol', 'botol1', 'gelas', 'kaleng', 'plastikk'].every((type) => collection.includes(type));
		} catch {
			return false;
		}
	};
	const isAreaUnlocked = (area) => area === 'sungai'
		|| (area === 'hutan' && hasCompleteRiverCollection() && (areaProgress.hutan === true || (areaProgress.sungai === true && Number(areaScores.sungai) >= 800)))
		|| (area === 'desa' && areaProgress.hutan === true);
	const hasGradeA = () => {
		const areas = ['sungai', 'hutan', 'desa'];
		if (!areas.every((area) => areaProgress[area] === true && Number.isFinite(Number(areaScores[area])))) {
			return false;
		}
		const averageScore = areas.reduce((total, area) => total + Number(areaScores[area]), 0) / areas.length;
		return averageScore >= 720;
	};

	gameAudio.registerBgm(mapBgm);

	const updateObjectives = () => {
		mapDoors.forEach((door) => {
			const objective = document.querySelector(`[data-objective="${door.dataset.area}"]`);
			objective.classList.toggle('is-complete', areaProgress[door.dataset.area] === true);
			const unlocked = isAreaUnlocked(door.dataset.area);
			door.disabled = !unlocked;
			door.classList.toggle('is-locked', !unlocked);
			door.setAttribute('aria-label', unlocked ? `Masuk area ${door.dataset.area}` : `Area ${door.dataset.area} terkunci`);
		});
		const completedCount = Object.values(areaProgress).filter(Boolean).length;
		mapGradeButton.disabled = completedCount < mapDoors.length;
		mapGradeIcon.disabled = completedCount < mapDoors.length;
		mapGradeStatus.textContent = completedCount === mapDoors.length
			? 'Semua area selesai'
			: `${completedCount}/3 area selesai`;
		updateScoreboard();
	};

	const updateScoreboard = () => {
		const areas = ['sungai', 'hutan', 'desa'];
		areas.forEach((area) => {
			const item = document.querySelector(`[data-score-area="${area}"]`);
			const score = Number(areaScores[area]);
			const hasScore = areaProgress[area] === true && Number.isFinite(score);
			item.querySelector('strong').textContent = hasScore ? String(Math.round(score)) : '—';
			item.classList.toggle('is-complete', hasScore);
		});
		const completedScores = areas
			.filter((area) => areaProgress[area] === true && Number.isFinite(Number(areaScores[area])))
			.map((area) => Number(areaScores[area]));
		mapScoreAverage.textContent = completedScores.length === areas.length
			? `Rata-rata akhir: ${Math.round(completedScores.reduce((total, score) => total + score, 0) / areas.length)}`
			: `Rata-rata akhir: menunggu ${areas.length - completedScores.length} area`;
	};

	const updateMapAudioControls = () => {
		const state = gameAudio.getState();
		mapBgmVolume.value = state.bgmVolume;
		mapSfxVolume.value = state.sfxVolume;
		mapBgmVolumeValue.textContent = `${Math.round(state.bgmVolume * 100)}%`;
		mapSfxVolumeValue.textContent = `${Math.round(state.sfxVolume * 100)}%`;
		mapBgmToggle.textContent = state.bgmMuted ? 'UNMUTE BGM' : 'MUTE BGM';
		mapSfxToggle.textContent = state.sfxMuted ? 'UNMUTE SFX' : 'MUTE SFX';
	};

	const updateCamera = () => {
		const viewportWidth = mapScene.clientWidth;
		const mapWidth = mapWorld.offsetWidth;
		const cameraMax = Math.max(0, mapWidth - viewportWidth);
		const targetCamera = playerX - viewportWidth * 0.42;
		cameraX = Math.max(0, Math.min(targetCamera, cameraMax));
		mapScene.style.setProperty('--camera-x', `${cameraX}px`);
		mapScene.style.setProperty('--player-x', `${playerX}px`);
		updateNearbyDoor();
	};

	const updateNearbyDoor = () => {
		const mapWidth = mapWorld.offsetWidth;
		const nearestDoor = mapDoors
			.map((door) => ({ door, distance: Math.abs(playerX - mapWidth * doorPositions[door.dataset.area]) }))
			.sort((first, second) => first.distance - second.distance)[0];
		const nextNearbyDoor = nearestDoor && isAreaUnlocked(nearestDoor.door.dataset.area) && nearestDoor.distance < mapWidth * 0.09 ? nearestDoor.door : undefined;
		mapDoors.forEach((door) => door.classList.toggle('is-near', door === nextNearbyDoor));
		nearbyDoor = nextNearbyDoor;
		mapInteractionHint.textContent = nearbyDoor ? `Tekan E untuk masuk area ${nearbyDoor.dataset.area}` : '';
	};

	const updateFrame = (frameIndex) => {
		mapRayna.src = raynaWalkFrames[direction][frameIndex];
	};

	const stopMovement = () => {
		window.cancelAnimationFrame(animationFrame);
		animationFrame = undefined;
		lastTimestamp = undefined;
	};

	const moveRayna = (timestamp) => {
		if (!lastTimestamp) {
			lastTimestamp = timestamp;
		}
		const elapsed = Math.min(timestamp - lastTimestamp, 50);
		lastTimestamp = timestamp;
		const movingRight = pressedKeys.has('ArrowRight') || (targetDoor && playerX < mapWorld.offsetWidth * doorPositions[targetDoor.dataset.area]);
		const movingLeft = pressedKeys.has('ArrowLeft') || (targetDoor && playerX > mapWorld.offsetWidth * doorPositions[targetDoor.dataset.area]);

		if (!movingRight && !movingLeft) {
			targetDoor = undefined;
			stopMovement();
			return;
		}

		direction = movingRight ? 'right' : 'left';
		const halfCharacterWidth = mapRayna.offsetWidth / 2;
		playerX += movingRight ? 0.26 * elapsed : -0.26 * elapsed;
		playerX = Math.max(halfCharacterWidth, Math.min(playerX, mapWorld.offsetWidth - halfCharacterWidth));
		if (targetDoor && Math.abs(playerX - mapWorld.offsetWidth * doorPositions[targetDoor.dataset.area]) < 3) {
			playerX = mapWorld.offsetWidth * doorPositions[targetDoor.dataset.area];
			targetDoor = undefined;
		}
		updateFrame(Math.floor(timestamp / 120) % raynaWalkFrames[direction].length);
		updateCamera();
		animationFrame = window.requestAnimationFrame(moveRayna);
	};

	const startMovement = () => {
		if (animationFrame === undefined) {
			animationFrame = window.requestAnimationFrame(moveRayna);
		}
	};

	const showMap = () => {
		updateObjectives();
		updateMapAudioControls();
		mapWorld.classList.remove('is-grade-a');
		mapScene.hidden = false;
		mapScene.classList.add('is-visible');
		mapScene.setAttribute('aria-hidden', 'false');
		if (hasGradeA()) {
			window.requestAnimationFrame(() => mapWorld.classList.add('is-grade-a'));
		}
		window.requestAnimationFrame(() => {
			const startArea = focusedArea || 'sungai';
			playerX = Math.max(mapRayna.offsetWidth / 2, mapWorld.offsetWidth * doorPositions[startArea]);
			focusedArea = undefined;
			updateFrame(0);
			updateCamera();
		});
		gameAudio.playBgm(mapBgm);
	};

	const enterDoor = (door) => {
		if (!door || door !== nearbyDoor || !isAreaUnlocked(door.dataset.area)) {
			return;
		}
		mapScene.classList.remove('is-visible');
		mapScene.hidden = true;
		mapScene.setAttribute('aria-hidden', 'true');
		mapBgm.pause();
		mapBgm.currentTime = 0;
		window.dispatchEvent(new CustomEvent('green-returns:enter-area', { detail: { area: door.dataset.area } }));
	};

	const moveToDoor = (door) => {
		if (!isAreaUnlocked(door.dataset.area)) {
			return;
		}
		targetDoor = door;
		direction = playerX < mapWorld.offsetWidth * doorPositions[door.dataset.area] ? 'right' : 'left';
		startMovement();
	};

	window.addEventListener('green-returns:show-map', showMap);
	window.addEventListener('green-returns:focus-map-area', (event) => {
		if (event.detail && isAreaUnlocked(event.detail.area)) {
			focusedArea = event.detail.area;
		}
	});
	window.addEventListener('green-returns:show-main-menu', () => {
		stopMovement();
		mapScene.classList.remove('is-visible');
		mapScene.hidden = true;
		mapScene.setAttribute('aria-hidden', 'true');
		mapBgm.pause();
		mapBgm.currentTime = 0;
	});
	window.addEventListener('green-returns:area-complete', (event) => {
		const area = event.detail.area;
		const incomingScore = Number(event.detail.score) || 0;
		areaProgress[area] = true;
		// Indikator peta memakai hasil percobaan terakhir, bukan skor terbaik sebelumnya.
		areaScores[area] = incomingScore;
		localStorage.setItem(progressKey, JSON.stringify(areaProgress));
		localStorage.setItem(`${progressKey}-scores`, JSON.stringify(areaScores));
		updateObjectives();
	});
	mapDoors.forEach((door) => door.addEventListener('click', () => moveToDoor(door)));
	mapInfoButton.addEventListener('click', () => {
		mapInfoPanel.hidden = false;
	});
	mapInfoClose.addEventListener('click', () => {
		mapInfoPanel.hidden = true;
	});
	mapBackButton.addEventListener('click', () => window.dispatchEvent(new Event('green-returns:show-main-menu')));
	mapSettingsButton.addEventListener('click', () => {
		updateMapAudioControls();
		mapSettingsPanel.hidden = false;
	});
	mapSettingsClose.addEventListener('click', () => {
		mapSettingsPanel.hidden = true;
	});
	mapBgmVolume.addEventListener('input', () => {
		gameAudio.setBgmVolume(mapBgmVolume.value);
		updateMapAudioControls();
	});
	mapSfxVolume.addEventListener('input', () => {
		gameAudio.setSfxVolume(mapSfxVolume.value);
		updateMapAudioControls();
	});
	mapBgmToggle.addEventListener('click', () => {
		gameAudio.toggleBgm();
		updateMapAudioControls();
	});
	mapSfxToggle.addEventListener('click', () => {
		gameAudio.toggleSfx();
		updateMapAudioControls();
	});
	const openRestartConfirmation = (area) => {
		restartTarget = area;
		mapRestartSelection.hidden = true;
		mapRestartConfirmation.hidden = false;
		const isAll = area === 'all';
		document.querySelector('#map-restart-title').textContent = isAll ? 'Mulai ulang semua game?' : `Ulangi area ${area}?`;
		document.querySelector('#map-restart-description').textContent = isAll
			? 'Apakah kamu yakin ingin mengulang dari awal? Semua progres, skor, dan pencapaian yang sudah didapat akan dimulai dari awal.'
			: `Hanya progres area ${area} yang akan diulang. Progres area lainnya tetap tersimpan.`;
		mapRestartNo.focus();
	};
	mapRestartButton.addEventListener('click', () => {
		mapSettingsPanel.hidden = true;
		mapRestartAreaButtons.forEach((button) => { button.disabled = !isAreaUnlocked(button.dataset.restartArea); });
		mapRestartSelection.hidden = false;
		mapRestartAreaButtons.find((button) => !button.disabled)?.focus();
	});
	mapRestartAreaButtons.forEach((button) => button.addEventListener('click', () => openRestartConfirmation(button.dataset.restartArea)));
	mapRestartAllButton.addEventListener('click', () => openRestartConfirmation('all'));
	mapRestartSelectionClose.addEventListener('click', () => { mapRestartSelection.hidden = true; mapSettingsPanel.hidden = false; mapRestartButton.focus(); });
	mapRestartNo.addEventListener('click', () => {
		mapRestartConfirmation.hidden = true;
		mapRestartSelection.hidden = false;
		mapRestartAreaButtons.find((button) => !button.disabled)?.focus() || mapRestartAllButton.focus();
	});
	mapRestartYes.addEventListener('click', () => {
		const resetAreas = restartTarget === 'all'
			? ['sungai', 'hutan', 'desa']
			: [restartTarget];
		resetAreas.forEach((area) => { delete areaProgress[area]; delete areaScores[area]; });
		localStorage.setItem(progressKey, JSON.stringify(areaProgress));
		localStorage.setItem(`${progressKey}-scores`, JSON.stringify(areaScores));
		window.dispatchEvent(new CustomEvent('green-returns:reset-achievements', { detail: { area: restartTarget } }));
		mapRestartConfirmation.hidden = true;
		mapRestartSelection.hidden = true;
		mapGradePanel.hidden = true;
		updateObjectives();
		focusedArea = restartTarget === 'all' ? 'sungai' : restartTarget;
		window.requestAnimationFrame(() => {
			playerX = Math.max(mapRayna.offsetWidth / 2, mapWorld.offsetWidth * doorPositions.sungai);
			updateCamera();
		});
		mapSettingsButton.focus();
	});
	mapGradeButton.addEventListener('click', () => {
		if (!mapGradeButton.disabled) {
			const scores = ['sungai', 'hutan', 'desa'].map((area) => Number(areaScores[area]) || 0);
			const averageScore = scores.reduce((total, score) => total + score, 0) / scores.length;
			const grade = averageScore >= 720 ? 'A' : averageScore >= 560 ? 'B' : averageScore >= 400 ? 'C' : 'D';
			mapGradeResult.textContent = `Rata-rata skor 3 area: ${Math.round(averageScore)} / 800 — Grade ${grade}`;
			mapGradePanel.hidden = false;
		}
	});
	mapObjectivesIcon.addEventListener('click', () => {
		const isOpen = mapObjectivesPanel.classList.toggle('is-open');
		mapObjectivesIcon.setAttribute('aria-expanded', String(isOpen));
	});
	mapObjectivesClose.addEventListener('click', () => {
		mapObjectivesPanel.classList.remove('is-open');
		mapObjectivesIcon.setAttribute('aria-expanded', 'false');
	});
	mapGradeIcon.addEventListener('click', () => {
		if (!mapGradeIcon.disabled) {
			mapGradeButton.click();
			mapGradeIcon.setAttribute('aria-expanded', 'true');
		}
	});
	mapGradeClose.addEventListener('click', () => {
		mapGradePanel.hidden = true;
		mapGradeIcon.setAttribute('aria-expanded', 'false');
	});

	document.addEventListener('keydown', (event) => {
		if (!mapScene.classList.contains('is-visible')) {
			return;
		}
		if (event.key === 'e' || event.key === 'E') {
			enterDoor(nearbyDoor);
			return;
		}
		if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
			event.preventDefault();
			pressedKeys.add(event.key);
			startMovement();
		}
	});
	document.addEventListener('keyup', (event) => {
		if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
			pressedKeys.delete(event.key);
		}
	});
	window.addEventListener('resize', updateCamera);
	mapBackground.addEventListener('load', updateCamera, { once: true });
});
