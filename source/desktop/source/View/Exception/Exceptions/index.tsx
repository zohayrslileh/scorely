import ErrorCard from "@/View/Components/ErrorCard"

/*
|-----------------------------
|  View Exception
|-----------------------------
|
|
*/
export default class ViewException extends Error {

    /**
     * View component
     * 
     * @returns
     */
    public view() {

        return <ErrorCard message={`${this.constructor.name}: ${this.message}`} />
    }
}