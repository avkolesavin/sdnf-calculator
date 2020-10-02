import {
    isEqual,
    uniqWith
} from 'lodash';

import {
    Term, 
    TermValue,
    TermsCountGroup 
} from './types';

export const convertNumberToBin = (n: number) => (
    (n >>> 0).toString(2)
);

export const fitBinToRang = (binaryTerm: string, rang: number): Term => {
    const reversedTerm = binaryTerm.split('').reverse();

    return Array(rang)
        .fill('0')
        .map((defaultBit, index) => (
            reversedTerm[index] || defaultBit
        ))
        .reverse();
};

const amountOf1 = (term: Term) => term.reduce((acc, termValue) => (
    termValue === TermValue.ONE ? acc + 1 : acc
), 0);

export const splitTermsToCountGroup = (terms: Term[]) => {
    const countGroup = terms.reduce<TermsCountGroup>((acc, term) => {
        const amount = amountOf1(term);
        const group = acc[amount];
        
        return {
            ...acc,
            [amount]: group ? [...group, term] : [term],
        };
    }, {});

    return countGroup;
};

export const getDiffIndexes = (term1: Term, term2: Term) => (
    term1.reduce<number[]>((acc, _, index) => (
        term1[index] !== term2[index] ? [...acc, index] : acc
    ), [])
);

export const canDiff = (term1: Term, term2: Term) => {
    const hasSameDashes = term1.every((_, index) => (
        (term1[index] === TermValue.DASH && term2[index] === TermValue.DASH) ||
        (term1[index] !== TermValue.DASH && term2[index] !== TermValue.DASH)
    ));
    const hasOnly1DiffValue = getDiffIndexes(term1, term2).length === 1;

    return hasSameDashes && hasOnly1DiffValue;
};

export const diffTerms = (term1: Term, term2: Term): Term => {
    const diffedIndexes = getDiffIndexes(term1, term2);

    return term1.map((termValue, index) => (
        diffedIndexes.includes(index) ? TermValue.DASH : termValue
    ));
};

export const mergeGroups = (currentGroup: Term[], prevGroup: Term[]) => {
    const diffedTerms = currentGroup.reduce<Term[]>((acc, currentGroupTerm) => (
        [
            ...acc,
            ...prevGroup.reduce<Term[]>((diffedTerms, prevGroupTerm) => {
                const r = canDiff(currentGroupTerm, prevGroupTerm)
                    ? [...diffedTerms, diffTerms(currentGroupTerm, prevGroupTerm)]
                    : diffedTerms;

                return r;
            }, []),
        ]
    ), []);

    return uniqWith(diffedTerms, isEqual);
};

export const mergeCountGroup = (countGroup: TermsCountGroup) => {
    const termsGroups = Object.values(countGroup);

    if(termsGroups.length >= 2) {
        const mergedTerms = termsGroups.reduce<Term[]>((acc, currentGroup, index) => {
            if(index === 0){
                return [];
            }

            const prevGroup = termsGroups[index - 1];

            return [
                ...acc,
                ...mergeGroups(currentGroup, prevGroup),
            ];
        }, []);

        return mergedTerms;
    }

    return [];
};