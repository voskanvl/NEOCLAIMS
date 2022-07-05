import { useState, memo } from "react"
import { claimsFetch, column, sort } from "../../store/claims"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { SortControl } from "../SortControl/SortControl"
import { Claim } from "../../types/types"
import style from "./Table.module.sass"
import claimsStyle from "../TableClaims/TableClaims.module.sass"

export const TableHeader = memo(function TableHeader() {
    const dispatch = useAppDispatch()
    const { sort: sortStore, column: columnStore } = useAppSelector(state => state.claims)

    const [didSort, setDidSort] = useState<{ attribute: keyof Claim, method: "asc" | "desc" }>()

    const sortMethod = (attribute: keyof Claim) => {
        const method: "asc" | "desc" =
            sortStore === "asc" && columnStore === attribute ? "desc" : "asc"
        setDidSort({ attribute, method })
        dispatch(sort(method))
        dispatch(column(attribute))
        dispatch(claimsFetch())
    }

    return <div className={`${claimsStyle.claims__row} ${claimsStyle.head}`}>

        <button className={style.table__button} onClick={() => sortMethod("title")}>
            <span
                className={style.table__buttonName}>
                Title
            </span>
            <SortControl
                sorted={didSort?.attribute === "title"
                    ? didSort.method
                    : undefined} />
        </button>
        <button className={style.table__button} onClick={() => sortMethod("createdAt")}>
            <span className={style.table__buttonName}>
                Created
            </span>
            <SortControl
                sorted={didSort?.attribute === "createdAt"
                    ? didSort.method
                    : undefined} />
        </button>
        <button className={style.table__button} onClick={() => sortMethod("type")}>
            <span className={style.table__buttonName}>
                Type
            </span>
            <SortControl
                sorted={didSort?.attribute === "type"
                    ? didSort.method
                    : undefined} />
        </button>
        <button className={style.table__button} onClick={() => sortMethod("status")}>
            <span className={style.table__buttonName}>
                Status
            </span>
            <SortControl
                sorted={didSort?.attribute === "status"
                    ? didSort.method
                    : undefined} />

        </button>
        <button className={style.table__button}>Action</button>
    </div>
})