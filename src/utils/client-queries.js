module.exports = (req) => {
    const match = {};
    const queryElements = Object.keys(req.query);
    let page = '1'; // default page
    let perPage = '2'; // default limit per page
    let sortby = ['createdAt', 1]
    if (queryElements.length > 0){
        queryElements.forEach((e, index, elements) => {
            if (e === 'page'){
                page = req.query[e];
            } else if (e === 'per-page'){
                perPage = req.query[e];
            } else if (e === 'sortby'){
                sortby[0] = req.query[e].split('_')[0];
                if (req.query[e].split('_')[1] === 'DESC'){
                    sortby[1] = -1;
                }
            } else {
                if (req.query[e].includes('-')){
                    match[e] = req.query[e].split('-').join(' ');
                } else {
                    match[e] = req.query[e];
                }
            }
        })
    }
    return [match, page, perPage, sortby];
}
