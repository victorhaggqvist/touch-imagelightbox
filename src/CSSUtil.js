/**
 * Created by Victor Häggqvist on 1/12/16.
 */

export class CSSUtil {

    /**
     * transion need to be set on property
     *
     * using key-value dont work
     *
     * @param ele
     * @param value
     */
    static setTransitionProperty(ele, value) {
        if (ele.transition === '')  {
            ele.transition = value;
            return;
        }
        if (ele.WebkitTransition === '') {
            ele.WebkitTransition = value;
            return;
        }
        if (ele.MozTransition === '') {
            ele.MozTransition = value;
            return;
        }
        if (ele.OTransition === '') {
            ele.OTransition = value;
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
        let options = {};
        let prefix = CSSUtil.cssTransitionSupport();
        element.style[prefix + 'transform'] = 'translateX(' + positionX + ')';
        element.style[prefix + 'transition'] = prefix + 'transform ' + speed + 's linear';
        //element.style = Object.assign(options, element.style);
    }

}
CSSUtil.isCssTransitionSupport = CSSUtil.cssTransitionSupport() !== false;
