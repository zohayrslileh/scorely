
/**
 * Column Component
 * 
 */
export default function ({ width, style, ...props }: Props) {

    return <th {...props} style={{ ...style, width, userSelect: "none" }} />
}

/**
 * Props
 * 
 */
interface Props extends React.HTMLAttributes<HTMLTableCellElement> {
    width?: string
}