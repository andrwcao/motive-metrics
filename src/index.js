import Resolver from '@forge/resolver';
import ForgeUI, { render } from '@forge/ui';
import api, {route} from '@forge/api'
import {getPerformanceRatingsData} from './performance';
import {getMotivationRatings} from './motivation';
import {storePersonalityResults, getPersonalityResults} from './personality';
const resolver = new Resolver();

resolver.define('getText', async (req) => {
    console.log(req);
    return 'Hello, world!!!!!!';
});

resolver.define('getPerformanceRatingsData', async (req) => {
    const performanceData = await getPerformanceRatingsData(req);
    return performanceData;
});

resolver.define('getMotivation', async (req) => {
    const motivationsCount = await getMotivationRatings(req);
    return motivationsCount;
});

resolver.define('storePersonalityResults', async (req) => {
    await storePersonalityResults(req);
});

resolver.define('getPersonalityResults', async (req) => {
    return await getPersonalityResults(req);
});

export const getCustomFieldID = async function (data, targetProperty) {
    for (var issue of data.issues) {
        for (var fieldName in issue.fields) {
            if (issue.fields[fieldName]) {
                if (issue.fields[fieldName].hasOwnProperty(targetProperty)) {
                    return fieldName;
                }
            }
        }
    };
    return null;
};

export const handler = resolver.getDefinitions();