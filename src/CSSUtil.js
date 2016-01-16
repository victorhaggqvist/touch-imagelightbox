/**
 * Created by Victor Häggqvist on 1/12/16.
 */

export class CSSUtil {

    /**
     * transion need to be set on property
     *
     * using key-value dont work
     *
     * @param ele DOMElement
     * @param value
     */
    static setTransitionProperty(ele, value) {
        let style = ele.style;
        if (style.transition === '')  {
            style.transition = value;
            return;
        }
        if (style.WebkitTransition === '') {
            style.WebkitTransition = value;
            return;
        }
        if (style.MozTransition === '') {
            style.MozTransition = value;
            return;
        }
        if (style.OTransition === '') {
            style.OTransition = value;
        }
    }

    static cssTransitionSupport() {
        let d = document.body || document.documentElement, s = d.style;
        if (s.WebkitTransition === '')
            return '-webkit-';
        if (s.MozTransition === '')
            return '-moz-';
        if (s.OTransition === '')
            return '-o-';
        if (s.transition === '')
            return '';
        return false;
    }

    static cssTransitionTranslateX(element, positionX, speed) {
        let prefix = CSSUtil.cssTransitionSupport();
        element.style[prefix + 'transform'] = 'translateX(' + positionX + ')';
        element.style[prefix + 'transition'] = prefix + 'transform ' + speed + 's linear';
    }

}
CSSUtil.isCssTransitionSupport = CSSUtil.cssTransitionSupport() !== false;
