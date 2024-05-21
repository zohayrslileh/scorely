import { useCallback, useEffect, useState } from "react"
import { Issues, createIssues } from "@/Tools/Validator"
import request from "./Request"

/**
 * useRecord hook
 * 
 */
export default function useRecord<Row = any, Results = any, Filter = any>(endpoint: string, limit: number, defaultFilter?: any, defaultOrderBy: string = "createdAt", defaultDesc: boolean = true): RecordState<Row, Results, Filter> {

    /**
     * Offset state
     * 
     */
    const [offset, setOffset] = useState(0)

    /**
     * Order by state
     * 
     */
    const [orderBy, setOrderBy] = useState(defaultOrderBy)

    /**
     * Desc sort state
     * 
     */
    const [desc, setDesc] = useState(defaultDesc)

    /**
     * Filter
     * 
     */
    const [filter, setFilter] = useState(defaultFilter)

    /**
     * Rows
     * 
     */
    const [rows, setRows] = useState<Row[]>([])

    /**
     * Loading state
     * 
     */
    const [loading, setLoading] = useState<boolean>(true)

    /**
     * Has Empty
     * 
     */
    const hasEmpty = !rows.length && !loading

    /**
     * Error state
     * 
     */
    const [error, setError] = useState<Error>()

    /**
     * Response state
     * 
     */
    const [response, setResponse] = useState<Response<Row, Results>>()

    /**
     * Loading more state
     * 
     */
    const [loadingMore, setLoadingMore] = useState(false)

    /**
     * Issues state
     * 
     */
    const [issues, _] = useState<Issues>(() => createIssues([]))

    /**
     * Submit method
     * 
     */
    const submit = useCallback(async (data: Request) => {

        try {

            // Ask response
            const response = await request<Response<Row, Results>>({ method: "POST", url: endpoint, data })

            // Set response
            setResponse(response)

            return response

        } catch (error) {

            // Default Error
            if (error instanceof Error) setError(error)

            // Unknown Error
            else setError(new Error("Unknown Error"))

            return undefined

        } finally {

            // Stop loading
            setLoading(false)

            // Stop more loading
            setLoadingMore(false)
        }

    }, [])

    /**
     * Show more method
     * 
     */
    const showMore = () => setOffset(old => old + limit)

    /**
     * Filtering method
     * 
     */
    const filtering = (data: any) => {

        // Reset offset
        setOffset(0)

        // Set column
        setFilter(data)
    }

    /**
     * Ordring method
     * 
     */
    const ordring = (column: string, desc: boolean) => {

        // Reset offset
        setOffset(0)

        // Set column
        setOrderBy(column)

        // Set desc
        setDesc(desc)
    }

    /**
     * Reload method
     * 
     */
    const reload = useCallback(async () => {

        // Ask response
        const response = await submit({ offset, limit, orderBy, desc, filter })

        // Check response
        if (response) setRows(response.rows)

        return response

    }, [offset, orderBy, desc, filter])

    /**
     * On change
     * 
     */
    useEffect(() => {

        // Start loading more
        if (offset) setLoadingMore(true)

        // Start loading more
        else setLoading(true)

        // Ask response
        submit({ offset, limit, orderBy, desc, filter }).then(response => {

            // Check response
            if (response) {

                // Append rows
                if (offset) setRows(old => [...old, ...response.rows])

                // Set rows
                else setRows(response.rows)
            }
        })

    }, [offset, orderBy, desc, filter])

    /**
     * Has more
     * 
     */
    const hasMore = response ? (offset + limit < response.count) : false

    return { loading, error, issues, response, offset, limit, orderBy, desc, rows, hasEmpty, hasMore, showMore, filtering, loadingMore, ordring, reload }
}

/**
 * Return type
 * 
 */
export interface RecordState<Row, Results, Filter> {
    response?: Response<Row, Results>
    loading: boolean
    issues: Issues
    error?: Error
    offset: number
    limit: number
    orderBy: string
    desc: boolean
    rows: Row[]
    hasEmpty: boolean
    hasMore: boolean
    showMore: ShowMore
    loadingMore: boolean
    filtering: Filtering<Filter>
    ordring: Ordring
    reload: Reload<Row, Results>
}

/**
 * Show more
 * 
 */
export type ShowMore = () => void

/**
 * Filtering
 * 
 */
export type Filtering<Filter> = (data: Filter) => void

/**
 * Ordring
 * 
 */
export type Ordring = (column: string, desc: boolean) => void

/**
 * Reload
 * 
 */
export type Reload<Row, Results> = () => Promise<Response<Row, Results> | undefined>

/**
 * Request
 * 
 */
export interface Request {
    offset: number
    limit: number
    orderBy: string
    desc: boolean
    filter: any
}

/**
 * Response
 * 
 */
export interface Response<Row, Results> {
    rows: Row[]
    results: Results
    count: number
}