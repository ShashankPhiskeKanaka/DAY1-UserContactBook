
/**
 * extracts the domain string from the provided email
 * 
 * @param email 
 * @returns domain
 */
const extractDomain = (email : string) => {

    // identifies the index of @ to determine the start of domain
    const i = email.indexOf("@");
    // string containing the domain name is sliced
    const domain = email.slice(i + 1);
    return domain;
}

/**
 * 
 * takes in an array of domains
 * 
 * generates a map for domain so that the count can be stored
 * 
 * stored maxCount and mostCommon and checks them for each iteration of for loop
 * 
 * @param domains 
 * @returns Object containing maxCount ( count of most common domain ), mostCommon (most common domain)
 */

const findMostCommonDomain = ( domains : string[] ) => {

    // map for domain names
    let fmap : Record<string, number> = {};

    // storing the max count and most common domain available at the time
    let maxCount = 0;
    let mostCommon = "";

    // iterating over each domain to determine its count and performing checks with maxcount and mostcommon domain
    for ( let domain of domains) {
        fmap[domain] = (fmap[domain] || 0) + 1;

        if(fmap[domain] > maxCount) {
            maxCount = fmap[domain];
            mostCommon = domain;
        }
    }

    return { maxCount, mostCommon };
}

export { extractDomain, findMostCommonDomain }