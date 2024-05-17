import Exception from "@/Tools/Exception"
import compiler from "./compiler"
import React from "react"

/**
 * Exception component
 * 
 * @returns 
 */
export default function ({ children }: React.ComponentProps<typeof React.Fragment>) {

    /**
     * Exception
     * 
     */
    return <Exception onCatch={([exception]) => compiler(exception).view()}>

        {/** Children */}
        {children}

    </Exception>

}