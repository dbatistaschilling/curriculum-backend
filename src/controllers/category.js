const Category = require('../models/category');

const validationResult = require('../utils/validation-result');
// const knowledgeUpdate = require('../utils/knowledge/knowledge-update');
// const deleteFile = require('../utils/delete-file');
const clientQueries = require('../utils/client-queries');

const User = require('../models/user');

exports.createCategory = (req, res, next) => {
    validationResult(req);
    const params = req.body;
    const category = new Category(params);
    
    User.findOne({_id: req.userId})
        .then(user => {
            category.owner = user._id;
            return category.save();
        })
        .then(category => {
            res.status(201).json({
                message: 'Category category created!',
                category
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

exports.getAllCategories = (req, res, next) => {
    const [match, page, perPage, sortby] = clientQueries(req);
    Category.find( match )
        .skip((+page * +perPage) - +perPage)
        .limit(+perPage)
        .sort({[sortby[0]]: sortby[1] })
        .then(categories => {
            if (!categories || categories.length === 0) {
                const error = new Error('Could not find any categories.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'Fetched all categories', categories });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.getCategory = (req, res, next) => {
    const categoryId = req.params.categoryId;
    Category.findById(categoryId).then(category => {
        if (!category) {
            const error = new Error('Could not find category.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: 'Fetched category by ID', category });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.getCategoryKnowledges = (req, res, next) => {
    const categoryId = req.params.categoryId;
    const [match, page, perPage, sortby] = clientQueries(req);
    Category.findById(categoryId).then(category => {
        if (!category) {
            const error = new Error('Could not find category.');
            error.statusCode = 404;
            throw error;
        }
        return category.populate({
            path: 'knowledges',
            match,
            options: {
                limit: +perPage,
                skip: (+page * +perPage) - +perPage,
                sort: {
                    [sortby[0]]: sortby[1] 
                }
            }
        }).execPopulate();
    })
    .then(category => {
        res.status(200).json({ message: 'Fetched category knowledges', knowledges: category.knowledges });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.updateCategory = (req, res, next) => {
    validationResult(req);
    const categoryId = req.params.categoryId;
    Category.findById(categoryId).then(category => {
        if (!category) {
            const error = new Error('Could not find category.');
            error.statusCode = 404;
            throw error;
        }
        if (category.owner !== req.user._id){
            const error = new Error('Unauthorized user');
            error.statusCode = 404;
            throw error;
        }
        category.category = req.body.category;
        return category.save();
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

exports.deleteCategory = (req, res, next) => {
    const categoryId = req.params.categoryId;
    Category.findById(categoryId).then(category => {
        if (!category) {
            const error = new Error('Could not find category.');
            error.statusCode = 404;
            error.param = 'category';
            throw error;
        }
        return Category.findOneAndDelete(categoryId);
    })
    .then(category => {
        res.status(200).json({ message: 'Category deleted!', categoryId: category._id });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.param = 'server';
        next(err);
    });
}