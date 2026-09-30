(() => {
	const storageKey = 'the-green-returns-audio';
	const savedSettings = JSON.parse(localStorage.getItem(storageKey) || '{}');
	const state = {
		bgmVolume: typeof savedSettings.bgmVolume === 'number' ? savedSettings.bgmVolume : 0.3,
		sfxVolume: typeof savedSettings.sfxVolume === 'number' ? savedSettings.sfxVolume : 1,
		bgmMuted: savedSettings.bgmMuted === true,
		sfxMuted: savedSettings.sfxMuted === true
	};
	const bgmTracks = [];
	const sfxTracks = [];
	let clickTrack;

	const save = () => localStorage.setItem(storageKey, JSON.stringify(state));
	const applyBgm = () => bgmTracks.forEach((track) => {
		track.volume = state.bgmVolume;
		track.muted = state.bgmMuted;
	});
	const applySfx = () => sfxTracks.forEach((track) => {
		track.volume = state.sfxVolume;
		track.muted = state.sfxMuted;
	});

	window.gameAudio = {
		registerBgm(track) {
			if (!track) {
				return;
			}
			bgmTracks.push(track);
			applyBgm();
		},
		registerSfx(track) {
			if (!track) {
				return;
			}
			sfxTracks.push(track);
			if (track.id === 'click-sound') {
				clickTrack = track;
			}
			applySfx();
		},
		playBgm(track) {
			if (!track) {
				return;
			}
			bgmTracks.forEach((item) => {
				if (item !== track && !item.paused) {
					item.pause();
					item.currentTime = 0;
				}
			});
			if (track.paused && !state.bgmMuted) {
				track.play().catch(() => {});
			}
		},
		playClick() {
			if (state.sfxMuted || !clickTrack) {
				return;
			}

			clickTrack.currentTime = 0;
			clickTrack.play().catch(() => {});
		},
		setBgmVolume(value) {
			state.bgmVolume = Number(value);
			applyBgm();
			save();
		},
		setSfxVolume(value) {
			state.sfxVolume = Number(value);
			applySfx();
			save();
		},
		toggleBgm() {
			state.bgmMuted = !state.bgmMuted;
			applyBgm();
			save();
			return state.bgmMuted;
		},
		toggleSfx() {
			state.sfxMuted = !state.sfxMuted;
			applySfx();
			save();
			return state.sfxMuted;
		},
		toggleAll() {
			state.bgmMuted = !state.bgmMuted;
			state.sfxMuted = state.bgmMuted;
			applyBgm();
			applySfx();
			save();
			return state.bgmMuted;
		},
		getState() {
			return { ...state };
		}
	};

	document.addEventListener('click', (event) => {
		if (event.target.closest('button')) {
			window.gameAudio.playClick();
		}
	});
})();