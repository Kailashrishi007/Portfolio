let clickAudio = null
let musicAudio = null

export function initSoundManager(clickUrl, musicUrl) {
  try {
    if (clickUrl) {
      clickAudio = new Audio(clickUrl)
      clickAudio.volume = 0.6
    }
    if (musicUrl) {
      musicAudio = new Audio(musicUrl)
      musicAudio.loop = true
      musicAudio.volume = 0.35
    }
  } catch (e) {
    // fail silently
  }
}

export function playClick() {
  try {
    if (!clickAudio) return
    clickAudio.currentTime = 0
    void clickAudio.play()
  } catch (e) {}
}

export function toggleMusic() {
  try {
    if (!musicAudio) return false
    if (musicAudio.paused) {
      void musicAudio.play()
      return true
    }
    musicAudio.pause()
    return false
  } catch (e) {
    return false
  }
}

export function isMusicPlaying() {
  try {
    return !!musicAudio && !musicAudio.paused
  } catch (e) {
    return false
  }
}
