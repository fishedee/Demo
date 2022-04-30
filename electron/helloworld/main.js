const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        show:false,
    })
    win.maximize()
    win.removeMenu()
    win.loadURL("http://yinghao.fishedee.com/")
    win.show()
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

app.whenReady().then(() => {
    createWindow()
});