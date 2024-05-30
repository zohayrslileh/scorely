import { useCallback, useState } from "react"

/**
 * Promise Button
 * 
 * @returns
 */
export default function ({ onClick, children, ...props }: React.HTMLAttributes<HTMLButtonElement>) {

    /**
     * Loading state
     * 
     */
    const [loading, setLoading] = useState(false)

    /**
     * Click hanlder
     * 
     */
    const clickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback(async function (event) {

        // Check on click event
        if (!onClick) return

        // Start loading
        setLoading(true)

        try {

            // on click handler
            await onClick(event)

        } finally {

            // Stop loading
            setLoading(false)
        }

    }, [onClick, loading])

    return <button {...props} onClick={clickHandler} className={`${props.className} ${loading ? "disable" : undefined}`}>
        {children}
    </button>
}