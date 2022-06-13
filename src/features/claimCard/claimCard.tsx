import { FC, memo } from "react"
import { Claim } from "../../types/type"
import style from "./claimCard.module.sass"
import ColorMap from "../../helpers/colorMap"
import { useNavigate } from "react-router-dom"
import colorMap from "../../helpers/colorMap"

const ClaimCard: FC<{ claim: Claim }> = ({ claim }) => {
    const navigate = useNavigate()
    return <div className={style.claimCard__container}>
        <div className={style.claimCard__title}>{claim?.title}</div>
        <div className={style.claimCard__body}>
            <div className={style.claimCard__row}>
                <div className={style.claimCard__rowLeft}>Created</div>
                <div className={style.claimCard__rowRight}>{claim && new Date(claim.createdAt).toLocaleDateString('ru').replaceAll(".", "/")}</div>
            </div>
            <div className={style.claimCard__row}>
                <div className={style.claimCard__rowLeft}>Type</div>
                <div className={style.claimCard__rowRight}><span className={style.claimCard__mark} style={{ background: ColorMap.Type.byName[claim!.type] }}></span><span>{claim?.type}</span></div>
            </div>
            <div className={style.claimCard__row}>
                <div className={style.claimCard__rowLeft}>Status</div>
                <div className={`${style.claimCard__rowRight} ${style.claimCard__status}`} style={{ background: colorMap.Status.byName[claim.status] }}>{claim.status}</div>
            </div>
            <button className={style.claimCard__button} onClick={() => navigate(`/claim/${claim?._id}`)}>Browse</button>
        </div>
    </div>
}

export default memo(ClaimCard)