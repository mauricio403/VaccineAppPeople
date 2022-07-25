import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';


export const LoadigComponent = () => {
    return (
        <>
            <div>
                <div className="card flex justify-content-center align-items-center pt-100">

                    <ProgressSpinner style={{ width: '100px', height: '100px', marginTop:450 }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
                </div>
            </div>
        </>
    )
}
