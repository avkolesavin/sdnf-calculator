import * as React from 'react';

import {
    Term, 
    TermValue,
    TermsCountGroup 
} from '../../types';

import './style.scss';

const drawDecValue = (term: Term) => (
    term.some(value => value === TermValue.DASH) 
        ? '' 
        : `(${parseInt(term.join(''), 2)})`
);

const renderTerms = (terms: Term[]) => (
    terms.map(term => (
        <div className="count-group__subgroup-term" key={`term-${term.join('')}`}>
            {term.join('')}{drawDecValue(term)}
        </div>
    ))
);

const renderGroup = (countGroup: TermsCountGroup) => Object.entries(countGroup).map(([groupKey, terms]) => (
    <div className="count-group__subgroup" key={`group-${groupKey}-${terms.join('')}`}>
        <div className="count-group__subgroup-label">{`Группа '${groupKey}':`}</div>
        <div className="count-group__subgroup-terms">
            {renderTerms(terms)}
        </div>
    </div>
));

interface CountGroupProps {
    group: TermsCountGroup;
}

export const CountGroup = ({ group }: CountGroupProps) => (
    <div className="count-group">
        {renderGroup(group)}
    </div>
);
