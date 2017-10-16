export function getModel () {
  let ui = {
    camera: {
      x: 9, y: 21, z: 20
    },
    ocean: {
      y: -200
    },
    sf03: {
      scale: 1
    },
    sysKey: 0,
    replay: () => {
      ui.sysKey += 1
    }
  }
  return ui
}

export function setupPanel (gui, ui) {
  let fc = gui.addFolder('Camera')
  fc.add(ui.camera, 'x', -50, 50).step(0.01)
  fc.add(ui.camera, 'y', -50, 50).step(0.01)
  fc.add(ui.camera, 'z', -50, 50).step(0.01)
  fc.open()

  let fo = gui.addFolder('Ocean')
  fo.add(ui.ocean, 'y', -250, 10).step(0.01)
  fo.open()

  let fs = gui.addFolder('SF03')
  fs.add(ui.sf03, 'scale', 0.1, 7).step(0.01)
  fs.open()
  gui.add(ui, 'replay')
}
