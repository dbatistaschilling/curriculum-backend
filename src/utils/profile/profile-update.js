const deleteFile = require('../delete-file');

module.exports = (profile, params, req) => {

    profile.name !== params.name ? profile.name = params.name : null;
    profile.job !== params.job ? profile.job = params.job : null;
    profile.phone !== params.phone ? profile.phone = params.phone : null;
    profile.email !== params.email ? profile.email = params.email : null;
    profile.birth !== params.birth ? profile.birth = params.birth : null;
    profile.description !== params.description ? profile.description = params.description : null;
    profile.address.street !== params['address.street'] ? profile.address.street = params['address.street'] : null;
    profile.address.number !== params['address.number'] ? profile.address.number = params['address.number'] : null;
    profile.address.complement !== params['address.complement'] ? profile.address.complement = params['address.complement'] : null;
    profile.address.city !== params['address.city'] ? profile.address.city = params['address.city'] : null;
    profile.address.postCode !== params['address.postCode'] ? profile.address.postCode = params['address.postCode'] : null;
    profile.address.country !== params['address.country'] ? profile.address.country = params['address.country'] : null;
    profile.birthAddress.city !== params['birthAddress.city'] ? profile.birthAddress.city = params['birthAddress.city'] : null;
    profile.birthAddress.state !== params['birthAddress.state'] ? profile.birthAddress.state = params['birthAddress.state'] : null;
    profile.birthAddress.country !== params['birthAddress.country'] ? profile.birthAddress.country = params['birthAddress.country'] : null;
    profile.__v++;

    if (req.file && profile.imageUrl !== req.file.path){
        deleteFile(profile.imageUrl);
        profile.imageUrl = req.file.path;
    }

    return profile;
}