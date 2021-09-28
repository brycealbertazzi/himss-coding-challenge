import React, {useEffect, useState} from 'react'
import { ReportItem } from './ReportItem'
import './ReportList.css'
import axios from 'axios';

export const ReportList = () => {
    // State variable to store and keep track of the reports
    const [reports, setReports] = useState(null)

    // Fetch the reports from our fake JSON API at url 'http:localhost:3000/reports' and set our reports to the result
    const getData = () => {
        axios.get('http://localhost:3000/reports')
        .then(res => {
            setReports(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
    }

    // Call an axios PUT request to change the report at URL: 'http:localhost:3000/reports/:id' to blocked = true
    const blockReport = id => {
        const newReport = reports.find(r => r.id === id)
        newReport.blocked = true
        axios.put(`http://localhost:3000/reports/${id}`, newReport).catch(err => console.log(err))
    }

    // Call an axios PUT request to change the report at URL: 'http:localhost:3000/reports/:id' to state = "CLOSED"
    const resolveReport = id => {
        const newReport = reports.find(r => r.id === id)
        newReport.state = "CLOSED"
        axios.put(`http://localhost:3000/reports/${id}`, newReport).catch(err => console.log(err))
    }

    // Reset all reports back to blocked = false and state = "OPEN"
    // This function is for demonstration purposes only, I would NOT have it in production
    const resetReports = () => {
        reports.map(r => {
            r.blocked = false
            r.state = "OPEN"
            axios.put(`http://localhost:3000/reports/${r.id}`, r).catch(err => console.log(err))
        })
    }

    useEffect(() => {
        // Call getData in this useEffect function so we retieve and render the data whenever there is an update
        getData()
    }, []);

    // If our reports are fetched render each report, passing each fecthed report JSON object into ReportItem
    // Otherwise render that no reports were found
    if (!reports) {
        return <h1>No Reports Found...</h1>
    }

    return (
        <div>
            <h1>Reports</h1>
            <button onClick={resetReports}>Reset Reports</button>
            <div className="report-list">
                {
                    reports.map(report => 
                        // Only render the reports if they are NOT blocked, i.e report.blocked = false
                        !report.blocked &&
                        <ReportItem key={report.id} report={report} onBlock={blockReport} onResolve={resolveReport}></ReportItem>
                    )
                }
            </div>
            
        </div>
    )
}
