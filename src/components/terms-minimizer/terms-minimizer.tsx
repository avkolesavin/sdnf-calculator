import * as React from 'react';
import { isEqual } from 'lodash';

import { CountGroup } from './components';
import { TermsCountGroup } from './types';
import {
    convertNumberToBin,
    fitBinToRang,
    mergeCountGroup,
    splitTermsToCountGroup
} from './utils';

interface TermsMinimizerProps {
    terms: number[];
    rang: number;
}

const calculateResult = (
    countGroup: TermsCountGroup,
    prevCountGroup?: TermsCountGroup
): TermsCountGroup[] => {
    const mergedTerms = mergeCountGroup(countGroup);
    const mergedGroup = splitTermsToCountGroup(mergedTerms);

    if(!isEqual(countGroup, prevCountGroup) && Object.values(mergedGroup).length){
        return [
            mergedGroup,
            ...calculateResult(mergedGroup, countGroup),
        ];
    }
    
    return [];
};

export const TermsMinimizer = React.memo(
    function TermsMinimizer({
        terms,
        rang, 
    }: TermsMinimizerProps) {
        const binaryTerms = terms.map(term => fitBinToRang(convertNumberToBin(term), rang));
        const baseCountGroup = splitTermsToCountGroup(binaryTerms);

        const result = calculateResult(baseCountGroup);

        const renderedResult = React.useMemo(() => result.map(resultGroup => (
            <CountGroup group={resultGroup} key={`${Math.random()}`}/>
        )), [result]);

        return rang && terms.length 
            ? (
                <div>
                    <CountGroup group={baseCountGroup}/>
                    {renderedResult}
                </div>
            ) 
            : null;
    },
    (prevProps, nextProps) => isEqual(prevProps, nextProps)
);