module.exports = (knowledge, params, req) => {

    knowledge.category !== params.category ? knowledge.category = params.category : null;
    knowledge.descriptions !== params.descriptions ? knowledge.descriptions = params.descriptions : null;

    knowledge.descriptions.country !== params['descriptions.country'] ? knowledge.descriptions.country = params['descriptions.country'] : null;


    // knowledge.phone !== params.phone ? knowledge.phone = params.phone : null;
    // knowledge.email !== params.email ? knowledge.email = params.email : null;
    // knowledge.birth !== params.birth ? knowledge.birth = params.birth : null;
    // knowledge.description !== params.description ? knowledge.description = params.description : null;
    // knowledge.address.street !== params['address.street'] ? knowledge.address.street = params['address.street'] : null;
    // knowledge.address.number !== params['address.number'] ? knowledge.address.number = params['address.number'] : null;
    // knowledge.address.complement !== params['address.complement'] ? knowledge.address.complement = params['address.complement'] : null;
    // knowledge.address.city !== params['address.city'] ? knowledge.address.city = params['address.city'] : null;
    // knowledge.address.postCode !== params['address.postCode'] ? knowledge.address.postCode = params['address.postCode'] : null;
    // knowledge.address.country !== params['address.country'] ? knowledge.address.country = params['address.country'] : null;
    // knowledge.birthAddress.city !== params['birthAddress.city'] ? knowledge.birthAddress.city = params['birthAddress.city'] : null;
    // knowledge.birthAddress.state !== params['birthAddress.state'] ? knowledge.birthAddress.state = params['birthAddress.state'] : null;
    // knowledge.birthAddress.country !== params['birthAddress.country'] ? knowledge.birthAddress.country = params['birthAddress.country'] : null;
    
    knowledge.__v++;

    return knowledge;
}