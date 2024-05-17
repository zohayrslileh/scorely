
/**
 * Number input component
 * 
 * @returns
 */
export default function ({ value, onChange, ...props }: Props) {

    return <input {...props} type="number" value={Number(value)} onChange={event => onChange(Number(event.target.value))} />
}

/**
 * Props
 * 
 */
interface Props extends Omit<React.HTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type"> {
    value: number
    onChange: (value: number) => unknown
}