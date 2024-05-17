
/*
|-----------------------------
|  Color
|-----------------------------
|
|
*/
export default class Color {

    /**
     * Red
     * 
     */
    private readonly red: number

    /**
     * Green
     * 
     */
    private readonly green: number

    /**
     * Blue
     * 
     */
    private readonly blue: number

    /**
     * Constructor method
     * 
     */
    public constructor(hex: string) {

        // Get match
        const match = hex.match(/\w\w/g)

        // Check match
        if (!match) throw new Error("Invalid hex value")

        // Parse hex value to rgb
        const [red, green, blue] = match.map(item => parseInt(item, 16))

        // Set red
        this.red = red

        // Set green
        this.green = green

        // Set blue
        this.blue = blue

    }

    /**
     * Get hex
     * 
     * @returns
     */
    public get hex() {

        return "#" + ((1 << 24) + (this.red << 16) + (this.green << 8) + this.blue).toString(16).slice(1)
    }

    /**
     * RGBA method
     * 
     * @returns
     */
    public rgba(alpha: number = 1) {

        return `rgba(${this.red},${this.green},${this.blue},${alpha})`
    }

}