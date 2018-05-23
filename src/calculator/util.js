import React from 'react'
import * as Model from './model'

//util is used throughout the carbon footprint calculator to display the appropriate fields
//in each page for the type of input in question

export function pageInputForField(page, fieldId) {
    return inputForField(fieldId, page.props.parentState, page.handleChange)
}

export function inputForField(fieldId, data, changeHandler) {
    let field = Model.FIELDS.find(x => x.id === fieldId)

    if(field.type === Model.FIELD_TYPES.number) {
        return numberInput(field, data, changeHandler)

    } else if(field.type === Model.FIELD_TYPES.bool) {
        return boolInput(field, data, changeHandler)
        
    } else if(field.type === Model.FIELD_TYPES.select) {
        return selectInput(field, data, changeHandler)
    }
}

//in the case of an input of type number seen in basic, transportation and energy sections
function numberInput(field, data, changeHandler) {
    return (
        <input name={field.id} type="number" min={0} className="form-control" value={data[field.id]} onChange={changeHandler}/>
    )
}

//in the case of an input of type boolean like in the energy and lifestyle sections
function boolInput(field, data, changeHandler) {
    return (
        <select name={field.id} className="form-control" value={data[field.id]} onChange={changeHandler}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
        </select>
    )
}

//in the case of an input of type select, drop down menu is seen in all except the first page, basic
function selectInput(field, data, changeHandler) {
    return (
        <select name={field.id} className="form-control" value={data[field.id]} onChange={changeHandler}>
            {field.options.map(x => <option key={x.id} value={x.id}>{x.text}</option>)}
        </select>
    )
}
