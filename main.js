
const { app, BrowserWindow, MessageChannelMain, utilityProcess, ipcMain } = require('electron/main')
const path = require('node:path')


app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true
    }
  })

  ipcMain.on('start', handleStart)

  function handleStart() {
    const utility = utilityProcess.fork('utility.js', [], { stdio: ['ignore', 'pipe', 'pipe']})
    utility.on('exit', code => console.log('exit ', code))
    utility.stdout.on('data', data => console.log(data.toString('utf8')))
    utility.stderr.on('data', data => console.log(data.toString('utf8')))

    const { port1, port2 } = new MessageChannelMain()
    utility.postMessage(null, [port1])
    mainWindow.webContents.postMessage('messageChanel:transfer', null, [port2])
  }

  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools()
})
