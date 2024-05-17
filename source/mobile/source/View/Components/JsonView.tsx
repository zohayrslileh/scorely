
/**
 * Json view component
 * 
 * @returns 
 */
export default function ({ json }: Props) {

    return <pre>{JSON.stringify(json, undefined, 4)}</pre>
}

/**
 * Props
 * 
 */
interface Props {
    json: object
}