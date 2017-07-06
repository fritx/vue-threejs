<template>
  <div>
    <div v-if="body">
      <object3d :obj="body"></object3d>
      <object3d :obj="detonation1" :position="{ x: 5, z: 0.8 }"></object3d>
      <object3d :obj="detonation2" :position="{ x: -5, z: 0.8 }"></object3d>
      <object3d :obj="shoot1" :position="{ x: 5, z: 2.6 }"></object3d>
      <object3d :obj="shoot2" :position="{ x: -5, z: 2.6 }"></object3d>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import MTLLoader from '../threex/loaders/MTLLoader'
import OBJLoader from '../threex/loaders/OBJLoader'
import Object3D from '../components/Object3D'

export default {
  name: 'SF03',
  mixins: [Object3D],
  components: { Object3D },

  data () {
    return { body: null }
  },

  /* eslint-disable */
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

    const detonation = this.generateDetonation()
    this.detonation1 = detonation
    this.detonation2 = detonation.clone()

    const shoot = this.generateShoot()
    this.shoot1 = shoot
    this.shoot2 = shoot.clone()
  },

  methods: {
    generateDetonation () {
      var texture = new THREE.TextureLoader()
        .load(require('../../static/threex/spaceships/lensflare0_alpha.png'))
      var geometry = new THREE.PlaneGeometry(1, 1)
      var material = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        map: texture,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        opacity: 2,
        depthWrite: false,
        transparent: true,
      })
      var detonation = new THREE.Mesh(geometry, material)
      detonation.scale.multiplyScalar(4)
      return detonation
    },

    generateShoot () {
      var canvas = this.generateShootCanvas();
      var texture = new THREE.Texture( canvas );
      texture.needsUpdate = true;
      var material = new THREE.MeshBasicMaterial({
        color: 0xffaacc,
        map: texture,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
      })

      var container = new THREE.Object3D()
      container.rotateY(Math.PI / 2)
      container.scale.multiplyScalar(4)
      var nPlanes = 4;
      for (var i = 0; i < nPlanes; i++) {
        var geometry = new THREE.PlaneGeometry(1, 1)
        var mesh = new THREE.Mesh(geometry, material)
        mesh.material = material
        mesh.rotateX(i * Math.PI / nPlanes)
        container.add(mesh)
      }
      return container
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
