import React from 'react'
import * as _ from 'lodash'
import './style.scss'
import '../jumbotronStyle.scss'
const axios = require('axios')
import background from '../images/trees_background.jpeg'

const HORIZONTAL_MARGIN = 150

function lerp(a, b, t) {
    return t * (b - a) + a
}

function invLerp(a, b, x) {
    return (x - a) / (b - a)
}

function Boilerplate(props) {
    return (
        <div id="main">
            <div className="content">
                <div className="container pt-3">
                    <div className="row">
                        <div className="col">
                            <div className="jumbotron background-tan">
                                <h1>Chart - CO₂ over time</h1>
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img src={background} className="bg" alt=""/>
        </div>
    )
}

class ChartMain extends React.Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
        this.handleMouseEnter = this.handleMouseEnter.bind(this)
        this.handleMouseOut = this.handleMouseOut.bind(this)

        this.getDataPoints = this.getDataPoints.bind(this)

        this.state = {
            width: 800,
            height: 400,
            selectedIdx: null,
            selectedPoint: true,
            hoveringOver: null
        }

        this.props.getCarbonFootprints()
    }

    render() {
        if(this.props.loggedIn) {
            return this.renderLoggedIn()
        } else {
            return this.renderNotLoggedIn()
        }
    }

    renderLoggedIn() {
        if(this.props.carbonFootprints == null || this.props.carbonFootprints.length === 0) {
            return this.renderNoData()
        }

        if(this.props.carbonFootprints.length === 1) {
            return this.renderOnlyOnePoint()
        }

        return (
            <Boilerplate>
                {this.getChartSvg()}
            </Boilerplate>
        )
    }

    renderNotLoggedIn() {
        return (
            <Boilerplate>
                <p>Please login to view your chart</p>
            </Boilerplate>
        )
    }

    renderNoData() {
        return (
            <Boilerplate>
                <p>Your data could not be loaded. Please use the calculator to enter your info</p>
            </Boilerplate>
        )
    }

    renderOnlyOnePoint() {
        return (
            <Boilerplate>
                <p>You only have one saved calculation, which isn't enough for a chart. Please use the calculator again to update your info</p>
            </Boilerplate>
        )
    }

    getDataPoints() {
        let data = this.props.carbonFootprints.map((element) => {
            let item = {}
            let total = Number.parseFloat(element['CalculationTotal'])
            item.date = element['Date']
            item.val = Number.isNaN(total) ? 0.0 : total
            return item
        })

        return data
    }



    getChartSvg() {
        let w = this.state.width
        let h = this.state.height


        return (
            <svg id="chartSvg" version="1.1" baseProfile="full" width={w} height={h} xmlns="http://www.w3.org/2000/svg">

                <line x1={100} y1={50} x2={100} y2={h - 100} className="axisLine"/>
                <line x1={100} y1={h - 100} x2={w - 100} y2={h - 100} className="axisLine"/>

                <text x={90} y={80} textAnchor="end">{this.getMaxValText()}</text>
                <text x={HORIZONTAL_MARGIN} y={330} textAnchor="middle">{this.getStartDateText()}</text>
                <text x={w - HORIZONTAL_MARGIN} y={330} textAnchor="middle">{this.getEndDateText()}</text>

                <g className="lineSegments">
                    {this.getLineSegments()}
                </g>

                <g className="points">
                    {this.getPoints()}
                </g>

                {this.getPopup()}
            </svg>

        )

    }

    getStartDateText() {
        if (this.props.carbonFootprints.length > 0) {
            return this.getDateStr(this.props.carbonFootprints[0].Date)
        }
    }

    getEndDateText() {
        if (this.props.carbonFootprints.length > 0) {
            return this.getDateStr(this.props.carbonFootprints[this.props.carbonFootprints.length - 1].Date)
        }
    }

    getMaxVal() {
        let points = this.getDataPoints()
        let actualMax = _.max(points.map(x => x.val))
        return Math.ceil(actualMax / 100) * 100
    }

    getMinVal() {
        return 0
    }

    getMaxValText() {
        return this.getMaxVal().toFixed(0) + 't CO₂'
    }

    getLineSegments() {
        let points = this.getDataPoints()
        let vals = points.map(x => x.val)
        let nPoints = points.length

        let lineSegs = []
        for(let i = 0; i < nPoints - 1; i++) {
            let valA = vals[i]
            let valB = vals[i + 1]
            let increase = valB > valA
            let posA = this.getPointPos(i)
            let posB = this.getPointPos(i + 1)
            let selected = this.state.selectedIdx === i && !this.state.selectedPoint

            let styleClasses = [
                'lineSegment',
                selected ? 'selected' : null,
                increase ? 'bad' : 'good'
            ]
            let className = styleClasses.filter(x => x != null).join(' ')

            let line = <line
                key={i}
                x1={posA.x} y1={posA.y}
                x2={posB.x} y2={posB.y}
                className={className}
                onClick={evt => this.handleClick(false, i, evt)}
                onMouseEnter={evt => this.handleMouseEnter(false, i, evt)}
                onMouseOut={evt => this.handleMouseOut(false, i, evt)}
            />

            lineSegs.push(line)
        }

        return lineSegs
    }

    getPoints() {
        let points = this.getDataPoints()

        return points.map((_, idx) => {
            let pos = this.getPointPos(idx)
            let x = pos.x
            let y = pos.y

            let selected = this.state.selectedIdx === idx && this.state.selectedPoint
            let className = selected ? 'selected' : ''

            let circle = <circle
                key={idx}
                cx={x} cy={y}
                r="10"
                className={className}
                onClick={evt => this.handleClick(true, idx, evt)}
                onMouseEnter={evt => this.handleMouseEnter(true, idx, evt)}
                onMouseOut={evt => this.handleMouseOut(true, idx, evt)}
            />

            return circle
        })
    }

    getPointPos(idx) {
        let points = this.getDataPoints()
        let width = this.state.width
        let height = this.state.height
        let left = HORIZONTAL_MARGIN
        let top = 60
        let right = width - HORIZONTAL_MARGIN
        let bot = height - 110
        let nPoints = points.length
        let minVal = this.getMinVal()
        let maxVal = this.getMaxVal()

        let val = points[idx].val
        let x = lerp(left, right, idx / (nPoints - 1))
        let y = lerp(bot, top, invLerp(minVal, maxVal, val))
        return {x: x, y: y}
    }

    getPopup() {
        let isPoint = null
        let selectedIdx = null

        if(this.state.selectedIdx != null) {
            isPoint = this.state.selectedPoint
            selectedIdx = this.state.selectedIdx
        } else if(this.state.hoveringOver != null) {
            isPoint = this.state.hoveringOver.isPoint
            selectedIdx = this.state.hoveringOver.idx
        }

        if(isPoint == null || selectedIdx == null) {
            return null
        }

        let bgRect = (pos) => {
            return <rect className="popupBg" x={pos.x - 50} y={pos.y - 70} width={100} height={65}/>
        }

        let points = this.getDataPoints()

        if(isPoint) {
            let pos = this.getPointPos(selectedIdx)
            let point = points[selectedIdx]

            let pointVal = parseInt(point.val)

            return (
                <g className="popup">
                    {bgRect(pos)}
                    <text x={pos.x} y={pos.y - 40} textAnchor="middle" className="popupText">{pointVal.toFixed(0)}t CO₂</text>
                    <text x={pos.x} y={pos.y - 20} textAnchor="middle" className="popupText">{this.getDateStr(point.date)}</text>
                </g>
            )

        } else {
            let idxA = selectedIdx
            let idxB = selectedIdx + 1
            let posA = this.getPointPos(idxA)
            let posB = this.getPointPos(idxB)
            let center = {x: (posA.x + posB.x) / 2, y: (posA.y + posB.y) / 2}
            let valA = points[idxA].val
            let valB = points[idxB].val
            let delta = valB - valA

            let deltaVal = delta.toFixed(0)
            let deltaPercent = (delta / valA * 100).toFixed(0)

            let strA = ''
            let strB = ''
            let isGood = null

            if(delta >= 0) {
                strA = `+${deltaVal}t`
                strB = `+${deltaPercent}%`
                isGood = false

            } else {
                strA = `${deltaVal}t`
                strB = `${deltaPercent}%`
                isGood = true

            }

            let styleClasses = [
                'popupText',
                isGood ? 'good' : 'bad'
            ]
            let className = styleClasses.filter(x => x != null).join(' ')

            return (
                <g className="popup">
                    {bgRect(center)}
                    <text x={center.x} y={center.y - 40} textAnchor="middle" fontWeight="bold" className={className}>{strA}</text>
                    <text x={center.x} y={center.y - 20} textAnchor="middle" fontWeight="bold" className={className}>{strB}</text>
                </g>
            )
        }
    }

    getDateStr(date) {
        return date.toLocaleDateString('en-US', {month: 'short', day: '2-digit'})
    }

    handleClick(isPoint, idx, evt) {
        this.setState(prevState => {
            if(prevState.selectedIdx === idx && prevState.selectedPoint === isPoint) {
                return {selectedIdx: null, selectedPoint: isPoint}
            } else {
                return {selectedIdx: idx, selectedPoint: isPoint}
            }
        })
    }

    handleMouseEnter(isPoint, idx, evt) {
        this.setState({hoveringOver: {isPoint: isPoint, idx: idx}})
    }

    handleMouseOut(isPoint, idx, evt) {
        this.setState(prevState => {
            if(prevState.hoveringOver != null
                && prevState.hoveringOver.isPoint === isPoint
                && prevState.hoveringOver.idx === idx) {
                return {hoveringOver: null}
            }
        })
    }
}

export default ChartMain