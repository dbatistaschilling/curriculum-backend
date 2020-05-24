const Knowledge = require('../models/knowledge');

const validationResult = require('../utils/validation-result');
const knowledgeUpdate = require('../utils/knowledge/knowledge-update');
// const deleteFile = require('../utils/delete-file');
// const clientQueries = require('../utils/client-queries');

const User = require('../models/user');

exports.createKnowledge = (req, res, next) => {
    validationResult(req);
    const params = req.body;
    const knowledge = new Knowledge(params);
    
    User.findOne({_id: req.userId})
        .then(user => {
            knowledge.owner = user._id;
            return knowledge.save();
        })
        .then(knowledge => {
            res.status(201).json({
                message: 'Knoledge created!',
                knowledge
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            err.param = 'server';
            next(err);
        });
}

exports.addKnowledgeToCategory = (req, res, next) => {
    validationResult(req);
    const knowledgeId = req.params.knowledgeId;
    const params = req.body;
    
    Knowledge.findOne(knowledgeId)
        .then(knowledge => {
            knowledge.push(params);
            return knowledge.save();
        })
        .then(knowledge => {
            res.status(201).json({
                message: 'Knoledge updated!',
                knowledge
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            err.param = 'server';
            next(err);
        });
}

exports.getAllKnowledges = (req, res, next) => {
    const [match, page, perPage, sortby] = clientQueries(req);
    Knowledge.find( match )
        .skip((+page * +perPage) - +perPage)
        .limit(+perPage)
        .sort({[sortby[0]]: sortby[1] })
        .then(knowledges => {
            if (!knowledges || knowledges.length === 0) {
                const error = new Error('Could not find any knowledges.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'Fetched all knowledges', knowledges });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.getKnowledge = (req, res, next) => {
    const knowledgeId = req.params.knowledgeId;
    Knowledge.findById(knowledgeId).then(knowledge => {
        if (!knowledge) {
            const error = new Error('Could not find knowledge.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: 'Fetched knowledge by ID', knowledge });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.updateKnowledgeCategory = (req, res, next) => {
    validationResult(req);
    const knowledgeId = req.params.knowledgeId;
    Knowledge.findById(knowledgeId).then(knowledge => {
        if (!knowledge) {
            const error = new Error('Could not find knowledge.');
            error.statusCode = 404;
            throw error;
        }
        knowledge.category = req.body.category;
        return knowledge.save();
    })
    .then(result => {
        res.status(200).json({ message: 'Knowledge category updated!', result });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.updateKnowledgeDescription = (req, res, next) => {
    validationResult(req);
    const descriptionId = req.params.descriptionId;
    Knowledge.findById(descriptionId).then(knowledge => {
        if (!knowledge) {
            const error = new Error('Could not find knowledge.');
            error.statusCode = 404;
            throw error;
        }
        knowledge.category = req.body.category;
        return knowledge.save();
    })
    .then(result => {
        res.status(200).json({ message: 'Knowledge category updated!', result });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.getActiveKnowledges = (req, res, next) => {    
    Knowledge.find({status: 'Active'}).then(knowledges => {
        if (!knowledges) {
            const error = new Error('Could not find knowledges.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: 'Fetched knowledges by Status', knowledges });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.param = 'server';
        }
        next(err);
    })
}

