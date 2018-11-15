var yearlyOrganisationsModal = require('../database/modals/yearlyOrganisations')
const sequelize = require('../database/dbconnection');
const Op = sequelize.Op;

exports.getCompanies = (req, res, next) => {
    yearlyOrganisationsModal.findAll({
        where :{
            BESalary:{
                [Op.gt]:20
            }
        }
    }).then((companies)=>{
        res.status(200).send(companies)
    })
}