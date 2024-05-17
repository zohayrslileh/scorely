import PendingException from "@/View/Exception/Exceptions/Pending"
import LanguageState, { initialLanguage } from "./context"
import LanguageProvider from "@/Tools/Language"
import { Throw } from "@/Tools/Exception"
import React from "react"

/*
|-----------------------------
|  Language
|-----------------------------
|
|
*/
const Language = new LanguageState(initialLanguage)

/*
|-----------------------------
|  Dictionary
|-----------------------------
|
|
*/
const Dictionary = function ({ children }: React.ComponentProps<typeof React.Fragment>) {

    /**
     * Dictionary
     * 
     */
    const { pending, exception, solve: dictionary } = Language.useDictionary()

    /**
     * Pending status
     * 
     */
    if (pending) return <Throw exception={new PendingException} />

    /**
     * Exception status
     * 
     */
    if (exception) return <Throw exception={exception.current} />

    /**
     * Language Provider
     * 
     */
    return <LanguageProvider dictionary={dictionary}>

        {/** Children */}
        {children}

    </LanguageProvider>
}

export default Object.assign(Language, { Dictionary })