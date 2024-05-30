import { useCallback, useState } from "react"
import { ScaleLoader } from "react-spinners"
import Appearance from "@/View/Appearance"

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
        {loading ? <ScaleLoader color={Appearance.theme.schema.CONTENT_COLOR.rgba()} height={12} width={1.8} /> : children}
    </button>
}