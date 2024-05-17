import { appWindow } from "@tauri-apps/api/window"

/*
|-----------------------------
|  CHECK VISIBLE STATUS
|-----------------------------
|
|
*/
appWindow.isVisible().then(function (visible) {

    // CALNCEL IF IS VISIBLE
    if (visible) return

    // SHOW WINDOW
    appWindow.show()

    // MAXIMIZE WINDOW
    appWindow.maximize()

})