import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/_scrollToTop.scss"

// @ts-ignore
import script from "./scripts/_randomPage.inline"
import { classNames } from "../util/lang"

const ScrollToTop: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
return (
  <div class={classNames(displayClass, "scroll-to-top")}>
    <h3>Utilities</h3>
    <ul>
      <li>
        <a href="#">
        В начало ↑
        </a> 
      </li>
      <li>
        <a id="random-page-button">
        Случайная страница 🎲
        </a>
      </li>
    </ul>

  </div>
)}

ScrollToTop.css = style
ScrollToTop.afterDOMLoaded = script
export default (() => ScrollToTop) satisfies QuartzComponentConstructor