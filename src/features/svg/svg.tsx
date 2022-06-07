const email = <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
    <use xlinkHref="/icon-sprite.svg#mail"></use>
</svg>
const seal = <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
    <use xlinkHref="/icon-sprite.svg#lock"></use>
</svg>
const sloganSvgFooter = <svg width="59.44" height="58" viewBox="0 0 165 161" fill="#fff">
    <use xlinkHref="/icon-sprite.svg#sloganWhite"></use>
</svg>
const burger = (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
        <use xlinkHref="/icon-sprite.svg#burger"></use>
    </svg>
)
const bell = (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
        <use xlinkHref="/icon-sprite.svg#bell"></use>
    </svg>
)
const logout = (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
        <use xlinkHref="/icon-sprite.svg#logout"></use>
    </svg>
)
const sloganBig = (
    <svg viewBox="0 0 165 161" width="165" height="161" fill="none">
        <use xlinkHref="/icon-sprite.svg#sloganSmall"></use>
    </svg>
)
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
const sloganColor = (
    <svg viewBox="0 0 165 161" width="165" height="161" fill="none">
        <use xlinkHref="/icon-sprite.svg#sloganColor"></use>
    </svg>
)
const name = (
    <svg viewBox="0 0 45.532 45.532" width="40" height="40" fill="#ADADAD">
        <use xlinkHref="/icon-sprite.svg#name"></use>
    </svg>
)

export const svg = {
    sloganColor,
    slogan,
    sloganBig,
    home,
    globe,
    archive,
    pieChart,
    dollar,
    database,
    navigation,
    search,
    logout,
    bell,
    burger,
    sloganSvgFooter,
    seal,
    email,
    name

}
export type TSvg = typeof svg