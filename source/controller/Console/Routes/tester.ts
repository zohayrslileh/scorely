import puppeteer from "puppeteer"
import sleep from "@/Tools/Sleep"

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

    await page.setGeolocation({ latitude: 55.7890275, longitude: 49.1279631 })

    await page.goto("https://www.google.com/search?q=apple")

    await sleep(1000)

    await page.goto("https://www.google.com/")

    const recorder = await page.screencast({ path: "storage/record.webm" })

    const textarea = await page.$("textarea")

    if (!textarea) throw new Error

    await textarea.focus()

    await textarea.type("Free vps")

    await textarea.press("Enter")

    await sleep(3000)

    await page.goto("https://whatismyipaddress.com/")

    await sleep(3000)

    await recorder.stop()

    await browser.close()

    console.log("The test completed successfully 🧪 ")
}