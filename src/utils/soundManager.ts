export class SoundManager {
  private audioContext: AudioContext | null = null;
  private soundEnabled = true;
  private musicEnabled = true;
  private volume = 0.7;
  private backgroundMusic: HTMLAudioElement | null = null;

  constructor() {
    this.initAudioContext();
    this.setupBackgroundMusic();
  }

  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported');
    }
  }

  private setupBackgroundMusic() {
    // Create a simple background music loop using Web Audio API
    if (this.audioContext) {
      this.createBackgroundMusic();
    }
  }

  private createBackgroundMusic() {
    if (!this.audioContext) return;

    // Create a simple melody using oscillators
    const playMelody = () => {
      if (!this.musicEnabled || !this.audioContext) return;

      const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]; // C major scale
      const melody = [0, 2, 4, 2, 0, 2, 4, 2, 4, 5, 7, 4, 5, 7]; // Simple melody pattern

      let noteIndex = 0;
      const playNote = () => {
        if (!this.musicEnabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(notes[melody[noteIndex]], this.audioContext.currentTime);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.volume * 0.1, this.audioContext.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.8);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.8);

        noteIndex = (noteIndex + 1) % melody.length;
        
        if (this.musicEnabled) {
          setTimeout(playNote, 600);
        }
      };

      playNote();
    };

    // Start the melody after a short delay
    setTimeout(playMelody, 1000);
  }

  private createSound(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) {
    if (!this.soundEnabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.volume * volume, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  playClick() {
    this.createSound(800, 0.1, 'square', 0.2);
  }

  playCriticalClick() {
    // Play a more dramatic sound for critical hits
    this.createSound(1200, 0.15, 'sawtooth', 0.4);
    setTimeout(() => this.createSound(1000, 0.1, 'sine', 0.3), 50);
  }

  playGoldenPotato() {
    // Play a magical sound for golden potatoes
    this.createSound(1500, 0.2, 'sine', 0.5);
    setTimeout(() => this.createSound(1800, 0.15, 'sine', 0.4), 100);
    setTimeout(() => this.createSound(2000, 0.1, 'sine', 0.3), 200);
  }

  playDiamondPotato() {
    // Play a crystalline sound for diamond potatoes
    this.createSound(2000, 0.3, 'triangle', 0.6);
    setTimeout(() => this.createSound(2400, 0.2, 'sine', 0.5), 100);
    setTimeout(() => this.createSound(2800, 0.15, 'sine', 0.4), 200);
  }

  playRainbowPotato() {
    // Play an epic sound for rainbow potatoes
    const frequencies = [1000, 1200, 1400, 1600, 1800, 2000, 2200];
    frequencies.forEach((freq, index) => {
      setTimeout(() => this.createSound(freq, 0.2, 'sine', 0.4), index * 50);
    });
  }

  playPurchase() {
    this.createSound(600, 0.2, 'triangle', 0.3);
    setTimeout(() => this.createSound(800, 0.15, 'sine', 0.2), 100);
  }

  playAchievement() {
    // Play a triumphant sound for achievements
    this.createSound(523.25, 0.3, 'sine', 0.5); // C
    setTimeout(() => this.createSound(659.25, 0.3, 'sine', 0.5), 150); // E
    setTimeout(() => this.createSound(783.99, 0.3, 'sine', 0.5), 300); // G
    setTimeout(() => this.createSound(1046.50, 0.5, 'sine', 0.6), 450); // C (octave)
  }

  playLevelUp() {
    // Play an ascending arpeggio for level up
    const notes = [261.63, 329.63, 392.00, 523.25]; // C, E, G, C
    notes.forEach((note, index) => {
      setTimeout(() => this.createSound(note, 0.4, 'sine', 0.4), index * 100);
    });
  }

  playPrestige() {
    // Play a grand sound for prestige
    this.createSound(130.81, 1.0, 'sawtooth', 0.8); // Low C
    setTimeout(() => this.createSound(261.63, 0.8, 'sine', 0.6), 200); // C
    setTimeout(() => this.createSound(523.25, 0.6, 'sine', 0.5), 400); // High C
    setTimeout(() => this.createSound(1046.50, 0.4, 'sine', 0.4), 600); // Very high C
  }

  playBackgroundMusic() {
    if (this.musicEnabled) {
      this.createBackgroundMusic();
    }
  }

  setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (enabled) {
      this.playBackgroundMusic();
    }
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }
}