<script>
import { Texture, CanvasTexture, TextureLoader } from 'three'
import Base from '@/components/Base'

export default {
  name: 'Texture',
  mixins: [Base],
  inject: ['material'],
  props: {
    url: String,
    image: [Image, ImageData],
    canvas: HTMLCanvasElement,
    options: { type: Object, default: () => ({}) }
  },

  data () {
    let { url, canvas, image, ...rest } = this.options
    url = url || this.url
    image = image || this.image
    canvas = canvas || this.canvas

    let texture
    if (url) {
      texture = new TextureLoader().load(url)
    } else if (canvas) {
      texture = new CanvasTexture(canvas)
    } else {
      texture = new Texture(image)
    }

    Object.keys(rest).forEach(k => {
      if (k === 'repeat') {
        texture.repeat.set(...rest[k])
      } else {
        texture[k] = rest[k]
      }
    })

    this.material.map = texture
    return { texture }
  },

  mounted () {
    this.$emit('update:obj', this.texture)
  },
  beforeDestroy () {
    this.$emit('update:obj', null)
  },
  destroyed () {
    this.material.map = null
  }
}
</script>
