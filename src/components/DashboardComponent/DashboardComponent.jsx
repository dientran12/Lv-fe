import { MDBContainer } from 'mdb-react-ui-kit'
import React from 'react'
import ChartComponent from '../ChartComponent/ChartOfShop'

const DashboardComponent = () => {
    return (
        <MDBContainer className="pb-3 px-0 mx-2">
            <div className="p-3" style={{ backgroundColor: 'white' }}>
                <span className="h2 fw-bold mb-0">Dashboard
                    <hr className="mt-3" /></span>
                <ChartComponent />
                <ChartComponent />
            </div>
        </MDBContainer>
    )
}

export default DashboardComponent
