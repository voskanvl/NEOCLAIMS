import { FC } from "react"
import { Link } from "react-router-dom"
import { TableHeader } from "../TableHeader/TableHeader"
import { TClaim } from "../../types/types"
import style from "./TableClaims.module.sass"
import ColorMap from "../../helpers/colorMap"

export type TPropsTableClaims = {
    claims: TClaim[]
}

export const TableClaims: FC<TPropsTableClaims> = ({ claims }) => <>
    <TableHeader />
    {claims?.map((el) =>
        <div key={el._id} className={style.claims__row}>
            <div className={style.claims__rowTitle}>{el.title}</div>
            <div>
                {new Date(el.createdAt)
                    .toLocaleDateString("ru")
                    .replaceAll(".", "/")}
            </div>
            <div className={style.claims__type}>
                <span
                    className={style.claims__mark}
                    style={{
                        background: el.type?.name
                            ? ColorMap.Type.byName[el.type?.name]
                            : ""
                    }}></span>
                <span>{el.type?.name || ""}</span>
            </div>
            <div
                className={style.claims__status}
                style={{
                    background: el.status?.name
                        ? ColorMap.Status.byName[el.status.name]
                        : ""
                }}>
                {el.status?.name || ""}
            </div>
            <div
                className={style.claims__link}>
                <Link to={`/claim/${el._id}`}>Browse</Link>
            </div>
        </div>)}
</>