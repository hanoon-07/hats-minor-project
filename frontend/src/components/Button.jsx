import classNames from 'classnames'
import React from 'react'


function Button({ action, buttonClass, label, disabled = false, iconStyle = {}, Icon, param }) {
    return (
        <button type="button"
            className={"shadow-md min-w-[70px] px-2 py-1 flex items-center justify-center h-[30px] rounded-[4px] " + buttonClass}
            onClick={() => {action(param? param: null)}}
            disabled={disabled}>
            <p className={classNames('', {'text-textRed':disabled})}>{label}</p>
            {Icon && <Icon  size={iconStyle.size} className={"ml-2 " + iconStyle.className} />}
        </button>
    )
}

export default Button