import { KeyboardResize } from "@capacitor/keyboard"
import { CapacitorConfig } from "@capacitor/cli"

/*
|------------------------------------
|  Server configuration 🛠️
|------------------------------------
|
|
*/
const server = process.env.PREVIEW ? {
    url: "http://192.168.1.34:5173",
    cleartext: true
} : {
    androidScheme: "https"
}

/*
|------------------------------------
|  Capacitor configuration 🛠️
|------------------------------------
|
|
*/
const config: CapacitorConfig = {
    appId: "com.scorely.mobile",
    appName: "Scorely",
    webDir: "dist",
    server,
    plugins: {
        Keyboard: {
            resize: KeyboardResize.Body,
            resizeOnFullScreen: true
        }
    }
}

export default config