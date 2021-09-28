import React, {useEffect, useState} from 'react'
import { ReportItem } from './ReportItem'
import './ReportList.css'
import axios from 'axios';

export const ReportList = () => {
    // State variable to store and keep track of the reports
    const [reports, setReports] = useState(null)

    // Fetch the reports from 'public/report.json' (local JSON file) and display a ReportItem for each report
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

    // Update the reports array to account for a report being blocked
    const blockReport = id => {
        const newReport = reports.find(r => r.id === id)
        newReport.blocked = true
        axios.put(`http://localhost:3000/reports/${id}`, newReport).catch(err => console.log(err))
    }

    // Reset all reports back to blocked = false
    const resetReports = () => {
        reports.map(r => {
            r.blocked = false
            r.state = "OPEN"
            axios.put(`http://localhost:3000/reports/${r.id}`, r).catch(err => console.log(err))
        })
    }

    const resolveReport = id => {
        const newReport = reports.find(r => r.id === id)
        newReport.state = "CLOSED"
        axios.put(`http://localhost:3000/reports/${id}`, newReport).catch(err => console.log(err))
    }

    useEffect(() => {
        getData()
    }, []);

    //If our reports are fetched render each report, passing each fecthed report JSON object into ReportItem
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
                        // Only render the reports if they are NOT blocked
                        !report.blocked &&
                        <ReportItem key={report.id} report={report} onBlock={blockReport} onResolve={resolveReport}></ReportItem>
                    )
                }
            </div>
            
        </div>
    )
}
