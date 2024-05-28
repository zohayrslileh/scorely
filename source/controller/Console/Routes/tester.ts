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

    const browser = await puppeteer.launch()

    const context = browser.defaultBrowserContext()

    await context.overridePermissions("https://www.google.com", ["geolocation"])

    const page = await browser.newPage()

    await page.setUserAgent("com.google.GoogleMobile/111.0 iPhone/13.5.1 hw/iPhone10_3")

    await page.setViewport({ width: 375, height: 812 })

    await page.setGeolocation({ latitude: 25.2000789, longitude: 55.2720523 })

    const recorder = await page.screencast({ path: "storage/record.webm" })

    await page.goto("https://www.google.com/search?q=apple")

    await sleep(1000)

    await page.goto("https://www.google.com/")

    await recorder.stop()

    await browser.close()

    console.log("The test completed successfully 🧪 ")
}