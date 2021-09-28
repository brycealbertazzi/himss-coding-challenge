import React from 'react'
import './ReportItem.css'

export const ReportItem = (props) => {
    const report = props.report

    return (
        <div className="report-item">
            <div className="report-col">
                <h4 className="item">Id: {report.id}</h4>
                <h4 className="item">State: {report.state}</h4>
                <a href="/" className="item">Details</a>
            </div>
            <div className="report-col">
                <h4 className="item">Type: {report.payload.reportType}</h4>
                {report.payload.message
                ?<h4 className="item">Message: {report.payload.message}</h4>
                : <h4 className="item">Message: None</h4>
                }
            </div>
            <div className="report-col">
                <button className="button" onClick={() => props.onBlock(report.id)}>Block</button>
                <button className="button" onClick={() => props.onResolve(report.id)}>Resolve</button>
            </div>
        </div>
    )
}
