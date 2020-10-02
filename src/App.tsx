import React from 'react';

import {
    SDNFInput,
    TermsMinimizer
} from './components';

export const App = () => {
    const [terms, setTerms] = React.useState<number[]>([]);
    const [rang, setRang] = React.useState<number>(0);
    
    return (
        <div className="app">
            <SDNFInput onTermsChange={setTerms} onRangChange={setRang}/>
            <TermsMinimizer terms={terms} rang={rang}/>
        </div>
    );
};