
/**
 * Text input component
 * 
 * @returns
 */
export default function ({ value, onChange, ...props }: Props) {

    return <input {...props} value={value} onChange={event => onChange(event.target.value)} />
}

/**
 * Props
 * 
 */
interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
    value: string
    onChange: (value: string) => unknown
}