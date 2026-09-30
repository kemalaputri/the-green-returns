document.addEventListener('DOMContentLoaded', () => {
	const mainMenu = document.querySelector('.main-menu');
	const menuBgm = document.querySelector('#menu-bgm');
	const mainMenuBackButton = document.querySelector('#main-menu-back-button');
	const playButton = document.querySelector('#play-button');
	const settingsButton = document.querySelector('#settings-button');
	const creditsButton = document.querySelector('#credits-button');
	const settingsPanel = document.querySelector('#settings-panel');
	const creditsPanel = document.querySelector('#credits-panel');
	const bgmVolume = document.querySelector('#bgm-volume');
	const sfxVolume = document.querySelector('#sfx-volume');
	const bgmVolumeValue = document.querySelector('#bgm-volume-value');
	const sfxVolumeValue = document.querySelector('#sfx-volume-value');
	const bgmToggle = document.querySelector('#bgm-toggle');
	const sfxToggle = document.querySelector('#sfx-toggle');
	const gameAudio = window.gameAudio;

	gameAudio.registerBgm(menuBgm);

	const updateAudioControls = () => {
		const audioState = gameAudio.getState();
		bgmVolume.value = audioState.bgmVolume;
		sfxVolume.value = audioState.sfxVolume;
		bgmVolumeValue.textContent = `${Math.round(audioState.bgmVolume * 100)}%`;
		sfxVolumeValue.textContent = `${Math.round(audioState.sfxVolume * 100)}%`;
		bgmToggle.textContent = audioState.bgmMuted ? 'UNMUTE BGM' : 'MUTE BGM';
		sfxToggle.textContent = audioState.sfxMuted ? 'UNMUTE SFX' : 'MUTE SFX';
		bgmToggle.setAttribute('aria-pressed', String(audioState.bgmMuted));
		sfxToggle.setAttribute('aria-pressed', String(audioState.sfxMuted));
	};

	const openPanel = (panel) => {
		settingsPanel.hidden = panel !== settingsPanel;
		creditsPanel.hidden = panel !== creditsPanel;
	};

	const showMainMenu = () => {
		mainMenu.classList.add('is-visible');
		mainMenu.setAttribute('aria-hidden', 'false');
		gameAudio.playBgm(menuBgm);
	};

	const hideMainMenu = () => {
		mainMenu.classList.remove('is-visible');
		mainMenu.setAttribute('aria-hidden', 'true');
		openPanel(null);
		menuBgm.pause();
		menuBgm.currentTime = 0;
	};

	window.addEventListener('green-returns:show-main-menu', showMainMenu);
	window.addEventListener('green-returns:show-opening', hideMainMenu);

	playButton.addEventListener('click', () => {
		hideMainMenu();
		window.dispatchEvent(new Event('green-returns:show-map'));
	});
	mainMenuBackButton.addEventListener('click', () => {
		hideMainMenu();
		window.dispatchEvent(new Event('green-returns:show-opening'));
	});
	settingsButton.addEventListener('click', () => {
		updateAudioControls();
		openPanel(settingsPanel);
	});
	creditsButton.addEventListener('click', () => openPanel(creditsPanel));
	document.querySelectorAll('[data-close-panel]').forEach((button) => {
		button.addEventListener('click', () => openPanel(null));
	});
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			openPanel(null);
		}
	});
	bgmVolume.addEventListener('input', () => {
		gameAudio.setBgmVolume(bgmVolume.value);
		updateAudioControls();
	});
	sfxVolume.addEventListener('input', () => {
		gameAudio.setSfxVolume(sfxVolume.value);
		updateAudioControls();
	});
	bgmToggle.addEventListener('click', () => {
		gameAudio.toggleBgm();
		updateAudioControls();
	});
	sfxToggle.addEventListener('click', () => {
		gameAudio.toggleSfx();
		updateAudioControls();
	});

	updateAudioControls();
});
