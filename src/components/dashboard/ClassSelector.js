import React from 'react'

const ClassSelector = props => {
    return (
        <div>
            <h1>Your Groups</h1>
            <select onChange={ props.onSelect }>
                {props.classes.map(cls => (
                    <option key={cls.className} value={cls.className}>
                        {cls.className}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default ClassSelector;