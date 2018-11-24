/**
 * This piece of code was written by Manjot Singh
 * and was ideated by Parv Kamal, Piyush Killa, Piyush kumar.
 * 
 */
var yearlyOrganizationsModal = require('../database/modals/yearlyOrganisations')
var studentPlacementModal = require('../database/modals/studentPlacementModal')
var studentModal = require('../database/modals/studentModal')
const sequelize = require('../database/dbconnection');
const Op = sequelize.Op;

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 */
exports.getOrganisations = (req, res, next) => {
    var query = {
        attributes: [
            [sequelize.fn('DISTINCT', sequelize.col('company_name')) ,'company_name'],
        ]
    }
    yearlyOrganizationsModal.findAll(query)
    .then((companies) => {
        res.status(200).send(companies)
    })
}