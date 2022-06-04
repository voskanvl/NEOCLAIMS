const slogan = (
    <svg viewBox="0 0 72 72" width="72" height="72" fill="none">
        <use xlinkHref="/icon-sprite.svg#sloganSmall"></use>
    </svg>
)
const home = (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
        <use xlinkHref="/icon-sprite.svg#home"></use>
    </svg>
)
const globe = (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
        <use xlinkHref="/icon-sprite.svg#globe"></use>
    </svg>
)
const archive = (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
        <use xlinkHref="/icon-sprite.svg#archive"></use>
    </svg>
)
const pieChart = (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
        <use xlinkHref="/icon-sprite.svg#pie-chart"></use>
    </svg>
)
const dollar = (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
        <use xlinkHref="/icon-sprite.svg#dollar"></use>
    </svg>
)
const database = (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
        <use xlinkHref="/icon-sprite.svg#database"></use>
    </svg>
)
const navigation = (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
        <use xlinkHref="/icon-sprite.svg#navigation"></use>
    </svg>
)
const search = (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
        <use xlinkHref="/icon-sprite.svg#search"></use>
    </svg>
)

export const svg: { [key: string]: JSX.Element } = {
    slogan: slogan,
    home,
    globe,
    archive,
    pieChart,
    dollar,
    database,
    navigation,
    search
}
