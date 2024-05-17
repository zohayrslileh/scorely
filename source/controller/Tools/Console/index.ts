import type Router from "./Router"

/*
|-----------------------------
|  Console
|-----------------------------
| 
|
*/
export default class Console {

    /**
     * Params
     * 
     */
    public readonly params: string[] = []

    /**
     * Flags
     * 
     */
    public readonly flags: Record<string, string | boolean> = {}

    /**
     * Constructor method
     * 
     */
    public constructor(argv: string[]) {

        // Arguments
        const argument = argv.slice(2)

        // Set params
        this.params = argument.filter(param => !param.startsWith("--"))

        // Fetch flags
        for (const flag of argument.filter(param => param.startsWith("--"))) {

            // Current flag
            const [name, value] = flag.slice(2).split("=")

            // Set to flags
            this.flags[name] = value || true
        }
    }

    /**
     * Execute method
     * 
     * @returns
     */
    public async execute(router: Router) {

        await router.execute(this.params, this.flags)
    }
}