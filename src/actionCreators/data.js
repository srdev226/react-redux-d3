import makeActionCreator from './makeActionCreator'

/* Action types */
export const GENERATE_RANDOM = 'GENERATE_RANDOM'

/* Action creators */
export const generateRandomData = makeActionCreator(GENERATE_RANDOM)
