import { useCallback, useState } from "react"

/**
 * Promise Button
 * 
 * @returns
 */
export default function ({ onClick, pending, children, ...props }: Props) {

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

        // Without pending
        if (pending === undefined) return onClick(event)

        // Check is loading
        if (loading) return

        // Start loading
        setLoading(true)

        try {

            // on click handler
            await onClick(event)

        } finally {

            // Stop loading
            setLoading(false)
        }

    }, [onClick, loading, pending])

    return <button {...props} onClick={clickHandler} className={`${props.className} ${loading ? "disable" : undefined}`}>
        {loading && pending ? pending : children}
    </button>
}

/**
 * Props
 * 
 */
interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    pending?: React.ReactNode
}