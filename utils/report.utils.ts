const extractDomain = (email : string) => {
    const i = email.indexOf("@");
    const domain = email.slice(i + 1);
    return domain;
}

const findMostCommonDomain = ( domains : string[] ) => {
    let fmap : Record<string, number> = {};
    let maxCount = 0;
    let mostCommon = "";
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