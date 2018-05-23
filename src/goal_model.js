import * as Model from './calculator/model'
import FootprintFormula from './calculator/footprint_formula'

export function loadEmissionsData() {
    let data = Model.load()
    let formula = new FootprintFormula(data)
    let total = formula.total()
    return {amount: total, date: data.timestamp}
}

export function loadGoal() {
    let goalAmountStr = localStorage.getItem('goal_amount')
    let goalDeadlineMilisStr = localStorage.getItem('goal_deadline_milis')
    
    if(goalAmountStr == null || goalDeadlineMilisStr == null) {
        return null
    }

    let goalAmount = Number.parseFloat(goalAmountStr)
    let goalDeadlineMilis = Number.parseInt(goalDeadlineMilisStr)

    if(Number.isNaN(goalAmount) || Number.isNaN(goalDeadlineMilis)) {
        return null
    }

    let goalDeadlineDate = new Date(goalDeadlineMilis)

    return {amount: goalAmount, date: goalDeadlineDate}
}

export function storeGoal(amount, date) {
    localStorage.setItem('goal_amount', amount.toString())
    localStorage.setItem('goal_deadline_milis', date.valueOf().toString())
}
