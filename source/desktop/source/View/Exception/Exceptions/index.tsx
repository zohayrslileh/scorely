
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

        return <b>{this.constructor.name}: {this.message}</b>
    }
}