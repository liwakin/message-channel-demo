const { ipcRenderer } = require('electron/renderer')

document.addEventListener('DOMContentLoaded', ()=> {
  document.querySelector('#start').addEventListener('click', ()=> {
    ipcRenderer.send('start')
  })
}, {once: true})

ipcRenderer.on('messageChanel:transfer', event => {
    const [port] = event.ports
    port.start()

    port.onmessage = event => {
      console.count('frame')
    }
})
