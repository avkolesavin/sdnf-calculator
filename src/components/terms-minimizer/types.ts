export enum TermValue {
    ZERO = '0',
    ONE = '1',
    DASH = '-'
}

export type Term = TermValue[];

export type TermsCountGroup = {
    [key: number]: Term[];
}