import { FC, memo } from "react"
import { Claim } from "../../types/type"
import style from "./claimCard.module.sass"
import ColorMap from "../../helpers/colorMap"
import { useNavigate } from "react-router-dom"

const ClaimCard: FC<{ claim: Claim | undefined }> = ({ claim }) => {
    const navigate = useNavigate()
    return <div className={style.container}>
        <div className={style.title}>{claim?.title}</div>
        <div className={style.body}>
            <div className={style.row}>
                <div className={style.rowLeft}>Created</div>
                <div className={style.rowRight}>{claim && new Date(claim.createdAt).toLocaleDateString('ru').replaceAll(".", "/")}</div>
            </div>
            <div className={style.row}>
                <div className={style.rowLeft}>Type</div>
                <div className={style.rowRight}><span className={style.mark} style={{ background: ColorMap.Type.byName[claim!.type] }}></span><span>{claim?.type}</span></div>
            </div>
            <div className={style.row}>
                <div className={style.rowLeft}>Status</div>
                <div className={`${style.rowRight} ${style.status}`}>{claim?.status}</div>
            </div>
            <button className={style.claimCard__button} onClick={() => navigate(`/claim/${claim?._id}`)}>Browse</button>
        </div>
    </div>
}

export default memo(ClaimCard)