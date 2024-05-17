
/*
|-----------------------------
|  Action
|-----------------------------
| 
|
*/
export default class Action<Hanlder extends BaseHanlder> {

    /**
     * Hanlder
     * 
     */
    public hanlder?: Hanlder

    /**
     * Create method
     * 
     * @returns
     */
    public static create<Hanlder extends BaseHanlder>(): Hanlder & Action<Hanlder> {

        // Create action
        const action = new Action<Hanlder>()

        // Bind use method with action
        action.use = action.use.bind(action)

        return Object.assign(action.use, action, { use: undefined })
    }

    /**
     * Use method
     *  
     * @returns 
     */
    public use(...params: Parameters<Hanlder>): ReturnType<Hanlder> {

        if (!this.hanlder) throw new Error("The action is not initialized yet")

        return this.hanlder(...params)
    }
}

/**
 * Base Hanlder
 * 
 */
export type BaseHanlder = (...params: any[]) => any