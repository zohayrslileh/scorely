import Loading from "@/View/Components/Loading"
import ViewException from "."

/*
|-----------------------------
|  Pending Exception
|-----------------------------
|
|
*/
export default class PendingException extends ViewException {

    /**
     * View component
     * 
     * @returns
     */
    public view() {

        return <Loading label={this.message || "Loading"} />
    }
}