import {
    Term, 
    TermValue
} from '../types';
import {
    canDiff, 
    diffTerms,
    getDiffIndexes
} from '../utils';

describe('canDiff util function', () => {
    it('Should return `true` for diffable terms', () => {
        let term1: any = ['0', '0', '0', '1'];
        let term2: any = ['0', '1', '0', '1'];

        expect(canDiff(term1, term2)).toBe(true);

        term1 = ['-', '0', '0', '1'];
        term2 = ['-', '1', '0', '1'];

        expect(canDiff(term1, term2)).toBe(true);
    });

    it('Should return `false` for undiffable terms', () => {
        let term1: any = ['0', '0', '0', '1'];
        let term2: any = ['0', '1', '1', '1'];

        expect(canDiff(term1, term2)).toBe(false);

        term1 = ['-', '0', '0', '1'];
        term2 = ['0', '1', '-', '1'];

        expect(canDiff(term1, term2)).toBe(false);

        term1 = ['-', '0', '1', '1'];
        term2 = ['-', '1', '0', '1'];

        expect(canDiff(term1, term2)).toBe(false);
    });
});

describe('getDiffIndexes util function', () => {
    it('Should get correct diff indexes', () => {
        const term1: any = ['0', '0', '0', '1'];
        const term2: any = ['0', '1', '0', '1'];

        expect(getDiffIndexes(term1, term2)).toEqual([1]);
    });
});