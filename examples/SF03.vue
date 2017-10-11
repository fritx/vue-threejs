<template>
  <object3d :position="pos">
    <div v-if="body">
      <mesh :obj="body"></mesh>

      <mesh v-for="n in 2" :key="n" :scale="4"
          :position="{ x: 5 * Math.sign(n - 1.5), z: 0.8 }">
        <geometry type="Plane" :args="[1, 1]"></geometry>
        <material type="MeshBasic" :options="detonationMatOpts"></material>
      </mesh>

      <object3d v-for="n in 2" :key="n"
          :rotation="{ y: Math.PI / 2 }" :scale="4"
          :position="{ x: 5 * Math.sign(n - 1.5), z: 2.6 }">
        <mesh v-for="n1 in 4" :key="n1"
            :rotation="{ x: (n1 - 1) * Math.PI / 4 }">
          <geometry type="Plane" :args="[1, 1]"></geometry>
          <material type="MeshBasic" :options="shootMatOpts"></material>
        </mesh>
      </object3d>

      <animation :fn="animate"></animation>
    </div>
  </object3d>
</template>

<script>
import { MTLLoader, OBJLoader, Object3D } from '@'
import * as THREE from 'three'

export default {
  name: 'SF03',
  mixins: [Object3D],

  data () {
    let detonationTexture = new THREE.TextureLoader()
      .load(require('@root/static/threex/spaceships/lensflare0_alpha.png'))

    let shootCanvas = this.generateShootCanvas()
    let shootTexture = new THREE.CanvasTexture(shootCanvas)

    return {
      detonationMatOpts: {
        color: 0x00ffff,
        map: detonationTexture,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        opacity: 2,
        depthWrite: false,
        transparent: true
      },
      shootMatOpts: {
        color: 0xffaacc,
        map: shootTexture,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true
      },
      pos: null,
      body: null
    }
  },

  /* eslint-disable semi, comma-dangle, space-in-parens */
  created () {
    // todo: better code
    const mtlLoader = new MTLLoader();
    mtlLoader.setBaseUrl( 'static/threex/spaceships/' )
    mtlLoader.setPath( 'static/threex/spaceships/' )
    mtlLoader.load( 'SpaceFighter03.mtl', ( materials ) => {
      materials.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials( materials );
      objLoader.setPath( 'static/threex/spaceships/' )
      objLoader.load( 'SpaceFighter03.obj', ( group ) => {
        const body = group.children[0]
        body.material.color.set(0xffffff)
        this.body = body
      })
    })
  },

  methods: {
    animate (tt) {
      this.pos = { y: Math.sin(tt) }
    },

    generateShootCanvas () {
      // init canvas
      var canvas = document.createElement( 'canvas' );
      var context = canvas.getContext( '2d' );
      canvas.width = 16;
      canvas.height = 64;
      // set gradient
      var gradient = context.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
      gradient.addColorStop( 0.5, 'rgba(192,192,192,1)' );
      gradient.addColorStop( 0.8, 'rgba(128,128,128,0.7)' );
      gradient.addColorStop( 1, 'rgba(0,0,0,0)' );

      // fill the rectangle
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      // return the just built canvas
      return canvas;
    }
  }
}
</script>
