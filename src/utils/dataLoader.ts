import pollsData from '../data/processed/sample-polls.json';

export interface PollData {
    date: string;
    party: string;
    support: number;
    sampleSize: number;
}

/**
 * Ensures we only load properly validated data from the processed/ dir.
 */
export const loadProcessedPolls = (): PollData[] => {
    return pollsData as PollData[];
};
