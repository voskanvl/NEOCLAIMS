import { memo } from "react"
import { TClaim } from "../../types/types"
import style from "./СlaimCard.module.sass"
import ColorMap from "../../helpers/colorMap"
import { useNavigate } from "react-router-dom"
import colorMap from "../../helpers/colorMap"
import { forwardRef } from "react"

export const ClaimCard = memo(
    forwardRef<any, { claim: TClaim, created: boolean }>(({ claim, created }, ref) => {
        const navigate = useNavigate()
        return <div
            className={`${style.claimCard__container} ${created
                ? style.claimCard__created
                : ""}`}
            ref={ref}>
            {claim && <>
                <div
                    className={`${style.claimCard__title} ${created
                        ? style.claimCard__title_created
                        : ""}`}
                >
                    {claim.title}
                </div>
                <div className={style.claimCard__body}>
                    <div className={style.claimCard__row}>
                        <div className={style.claimCard__rowLeft}>Created</div>
                        <div className={style.claimCard__rowRight}>
                            {claim && new Date(claim.createdAt).toLocaleDateString('ru').replaceAll(".", "/")}
                        </div>
                    </div>
                    <div className={style.claimCard__row}>
                        <div className={style.claimCard__rowLeft}>Type</div>
                        <div className={style.claimCard__rowRight}>
                            <span
                                className={style.claimCard__mark}
                                style={{
                                    background: claim.type?.name
                                        ? ColorMap.Type.byName[claim.type.name]
                                        : ""
                                }}>
                            </span><span>{claim.type?.name || ""}
                            </span>
                        </div>
                    </div>
                    <div className={style.claimCard__row}>
                        <div className={style.claimCard__rowLeft}>
                            Status
                        </div>
                        <div
                            className={`${style.claimCard__rowRight} ${style.claimCard__status}`}
                            style={{ background: claim.status?.name ? colorMap.Status.byName[claim.status.name] : "" }}>
                            {claim.status?.name || ""}
                        </div>
                    </div>
                    <button
                        className={style.claimCard__button}
                        onClick={() => navigate(`/claim/${claim._id}`)}>
                        Browse
                    </button>
                </div>
            </>}
        </div>
    }))
