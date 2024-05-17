
/**
 * Sleep method
 * 
 * @returns
 */
export default async function sleep(ms: number) {

    await new Promise(resolve => setTimeout(resolve, ms))
}