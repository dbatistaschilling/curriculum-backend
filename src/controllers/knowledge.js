const Knowledge = require('../models/knowledge');
const Category = require('../models/category');
const validationResult = require('../utils/validation-result');
const clientQueries = require('../utils/client-queries');

// const User = require('../models/user');

exports.createKnowledge = (req, res, next) => {
    validationResult(req);
    const categoryId = req.params.categoryId;
    const params = req.body;
    const knowledge = new Knowledge(params);
    
    Category.findById(categoryId)
        .then(category => {
            if (!category) {
                const error = new Error('Could not find category.');
                error.statusCode = 404;
                error.param = 'Category';
                throw error;
            }
            if (category.owner.toString() !== req.userId) {
                const error = new Error('Unauthorized user.');
                error.statusCode = 404;
                error.param = 'User';
                throw error;
            }
            knowledge.category = category._id;
            return knowledge.save();
        })
        .then(knowledge => {
            res.status(201).json({
                message: 'knowledge created!',
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

exports.getAllknowledges = (req, res, next) => {
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

exports.getknowledge = (req, res, next) => {
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

exports.updateKnowledge = (req, res, next) => {
    validationResult(req);
    const knowledgeId = req.params.knowledgeId;
    Knowledge.findById(knowledgeId).then(knowledge => {
        if (!knowledge) {
            const error = new Error('Could not find knowledge.');
            error.statusCode = 404;
            throw error;
        }
        const params = Object.keys(req.body);
        params.forEach(param => {
            knowledge[param] = req.body[param];
        })
        return knowledge.save();
    })
    .then(result => {
        res.status(200).json({ message: 'Knowledge updated!', result });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.deleteknowledge = (req, res, next) => {
    const knowledgeId = req.params.knowledgeId;
    Knowledge.findOneAndDelete({_id: knowledgeId})
    .then(knowledge => {
        res.status(200).json({ message: 'knowledge deleted!', knowledgeId });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.param = 'server';
        next(err);
    });
}

exports.getCategoryActiveKnowledges = (req, res, next) => {
    const categoryId = req.params.categoryId;
    Category.findById(categoryId).then(category => {
        if (!category) {
            const error = new Error('Could not find category.');
            error.statusCode = 404;
            error.param = 'category';
            throw error;
        }
        return Knowledge.find({status: 'Active', category: category._id});
    })
    .then(knowledges => {
        if (!knowledges || knowledges.length === 0) {
            const error = new Error('Could not find knowledges of this category.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: 'Fetched active knowledges', knowledges });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.param = 'server';
        }
        next(err);
    })
}

