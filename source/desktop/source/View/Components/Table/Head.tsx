
/**
 * Head Component
 * 
 */
export default function ({ height, style, ...props }: Props) {

    return <thead><tr {...props} style={{ ...style, height }} /></thead>
}

/**
 * Props
 * 
 */
interface Props extends React.HTMLAttributes<HTMLTableRowElement> {
    height?: string
}