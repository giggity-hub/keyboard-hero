const keys = "qwertyuiopasdfghjklzxcvbnm".split('')

export class KeyboardController {
    $buttonLayer: Record<string, HTMLElement | null> = {}
    $animationLayer: Record<string, HTMLElement | null> = {}
    constructor() {
        for (const key of keys) {
            this.$buttonLayer[key] = document.querySelector(`.keyboard-layer[data-key="${key}"]`)
            this.$animationLayer[key] = document.querySelector(`.below-key[data-key="${key}"]`)
        }
        console.log(this.$animationLayer)
        console.log(this.$buttonLayer)
    }
    getKeyElement(key: string) {
        return document.querySelector(`[data-key="${key}"]`)
    }

    pressKey(key: string) {
        const $key = this.$buttonLayer[key]
        $key?.classList.add('is-pressed')

        console.log('demboi');

        const $anim = this.$animationLayer[key]
        const $halo = document.createElement('div')
        $halo.classList.add('halo')
        $anim?.append($halo)

        const $beam = document.createElement('div')
        $beam.classList.add('beam')
        $anim?.append($beam)

        $halo.addEventListener('animationend', ()=> $halo.remove())
        $beam.addEventListener('animationend', ()=> $beam.remove())

        // const $key = this.getKeyElement(key)
        // console.log($key)
        // $key?.classList.add('is-pressed')
    }

    releaseKey(key: string) {
        const $key = this.$buttonLayer[key]
        $key?.classList.remove('is-pressed')
    }

    animateHaloForKey(key: string) {
        const $key = this.getKeyElement(key)
    }
}