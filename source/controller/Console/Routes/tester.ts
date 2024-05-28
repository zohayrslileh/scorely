import { writeFile } from "fs/promises"
import sleep from "@/Tools/Sleep"
import puppeteer from "puppeteer"

/*
|-----------------------------
|  Tester 🧪
|-----------------------------
|
|
*/
export default async function () {

    const browser = await puppeteer.launch({ headless: false })

    const context = await browser.createBrowserContext()

    await context.overridePermissions("https://www.google.com", ["geolocation"])

    const page = await context.newPage()

    await page.setUserAgent("com.google.GoogleMobile/111.0 iPhone/13.5.1 hw/iPhone10_3")

    await page.setViewport({ width: 375, height: 812 })

    await page.setGeolocation({ latitude: 36.3619394, longitude: 127.3958884 })

    await page.goto("https://www.google.com/search?q=apple")

    await sleep(1000)

    await page.goto("https://www.google.com/")

    await writeFile("storage/screenshot.png", await page.screenshot())

    await browser.close()

    console.log("The test completed successfully 🧪 ")
}