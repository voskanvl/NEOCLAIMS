import { SVGAttributes } from "react"

const Email = (props?: SVGAttributes<any>) => <svg
    viewBox="0 0 40 40"
    width="40"
    height="40"
    fill="none"
    {...props}
>
    <use xlinkHref="/icon-sprite.svg#mail"></use>
</svg>

const Seal = (props?: SVGAttributes<any>) => <svg
    viewBox="0 0 40 40"
    width="40"
    height="40"
    fill="none"
    {...props}
>
    <use xlinkHref="/icon-sprite.svg#lock"></use>
</svg>

const SloganSvgFooter = (props?: SVGAttributes<any>) => <svg
    width="59.44"
    height="58"
    viewBox="0 0 165 161"
    fill="#fff"
    {...props}
>
    <use xlinkHref="/icon-sprite.svg#sloganWhite"></use>
</svg>

const Burger = (props?: SVGAttributes<any>) => <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    {...props}
>
    <use xlinkHref="/icon-sprite.svg#burger"></use>
</svg>

const Bell = (props?: SVGAttributes<any>) => <svg
    viewBox="0 0 40 40"
    width="40"
    height="40"
    fill="none"
    {...props}
>
    <use xlinkHref="/icon-sprite.svg#bell"></use>
</svg>

const Logout = (props?: SVGAttributes<any>) => <svg
    viewBox="0 0 40 40"
    width="40"
    height="40"
    fill="none"
    {...props}
>
    <use xlinkHref="/icon-sprite.svg#logout"></use>
</svg>

const SloganBig = (props?: SVGAttributes<any>) => <svg
    viewBox="0 0 165 161"
    width="165"
    height="161"
    fill="none"
    {...props}
>
    <use xlinkHref="/icon-sprite.svg#sloganSmall"></use>
</svg>

const Slogan = (props?: SVGAttributes<any>) => <svg
    viewBox="0 0 72 72"
    width="72"
    height="72"
    fill="none"
    {...props}
>
    <use xlinkHref="/icon-sprite.svg#sloganSmall"></use>
</svg>

const Home = (props?: SVGAttributes<any>) => <svg
    viewBox="0 0 40 40"
    width="40"
    height="40"
    fill="none"
    {...props}
>
    <use xlinkHref="/icon-sprite.svg#home"></use>
</svg>

const Globe = (props?: SVGAttributes<any>) => <svg
    viewBox="0 0 40 40"
    width="40"
    height="40"
    fill="none"
    {...props}
>
    <use xlinkHref="/icon-sprite.svg#globe"></use>
</svg>

const Archive = (props?: SVGAttributes<any>) => <svg
    viewBox="0 0 40 40"
    width="40"
    height="40"
    fill="none"
    {...props}
>
    <use xlinkHref="/icon-sprite.svg#archive"></use>
</svg>

const PieChart = (props?: SVGAttributes<any>) => <svg
    viewBox="0 0 40 40"
    width="40"
    height="40"
    fill="none"
    {...props}
>
    <use xlinkHref="/icon-sprite.svg#pie-chart"></use>
</svg>

const Dollar = (props?: SVGAttributes<any>) => <svg
    viewBox="0 0 40 40"
    width="40"
    height="40"
    fill="none"
    {...props}
>
    <use xlinkHref="/icon-sprite.svg#dollar"></use>
</svg>

const Database = (props?: SVGAttributes<any>) => <svg
    viewBox="0 0 40 40"
    width="40"
    height="40"
    fill="none"
    {...props}
>
    <use xlinkHref="/icon-sprite.svg#database"></use>
</svg>

const Navigation = (props?: SVGAttributes<any>) => <svg
    viewBox="0 0 40 40"
    width="40"
    height="40"
    fill="none"
    {...props}
>
    <use xlinkHref="/icon-sprite.svg#navigation"></use>
</svg>

const Search = (props?: SVGAttributes<any>) => <svg
    viewBox="0 0 40 40"
    width="40"
    height="40"
    fill="none"
    {...props}
>
    <use xlinkHref="/icon-sprite.svg#search"></use>
</svg>

const SloganColor = (props?: SVGAttributes<any>) => <svg
    viewBox="0 0 165 161"
    width="165"
    height="161"
    fill="none"
    {...props}
>
    <use xlinkHref="/icon-sprite.svg#sloganColor"></use>
</svg>

const Name = (props?: SVGAttributes<any>) => <svg
    viewBox="0 0 45.532 45.532"
    width="40"
    height="40"
    fill="#ADADAD"
    {...props}
>
    <use xlinkHref="/icon-sprite.svg#name"></use>
</svg>

const Plus = (props?: SVGAttributes<any>) => <svg
    viewBox="0 0 40 40"
    width="40"
    height="40"
    fill="none"
    {...props}
>
    <use xlinkHref="/icon-sprite.svg#plus"></use>
</svg>

export const Svg = {
    SloganColor,
    Slogan,
    SloganBig,
    Home,
    Globe,
    Archive,
    PieChart,
    Dollar,
    Database,
    Navigation,
    Search,
    Logout,
    Bell,
    Burger,
    SloganSvgFooter,
    Seal,
    Email,
    Name,
    Plus
}

export type TSvg = typeof Svg