
/*
|-----------------------------
|  List
|-----------------------------
|
| 
*/
export default class List<Item> {

    /**
     * Items
     * 
     */
    private items: Item[]

    /**
     * Index
     * 
     */
    public index: number = 0

    /**
     * Constructor method 
     *
     */
    public constructor(list: Item[]) {

        // Set items
        this.items = list
    }

    /**
     * There is more method
     * 
     * @returns
     */
    public get thereIsMore(): boolean {

        return this.index <= this.items.length - 1
    }

    /**
     * Next method
     * 
     * @returns
     */
    public next(): Item {

        const item = this.items[this.index]

        this.index++

        return item
    }

    /**
     * Remaining method
     * 
     * @returns
     */
    public remaining(): Item[] {

        return this.items.slice(this.index, this.items.length - 1)
    }
}