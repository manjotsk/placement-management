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
 * 
 * sample 
 * {
 * 	"year":{
 * 		"data":"2015-16"
 *	},
 *	"salary":{
 *		"types":[
 *			{
 *				"programCode":"B.E."	
 *			},
 *			{
 *				"programCode":"MCA"	
 *			}
 *		]
 *	},
 *	"companies":{
 *		"names":["Tata Consultancy Services"]
 *	}
 * }
 */
exports.getStudentsPlacedInCompanies = (req, res, next) => {

    studentPlacementModal.hasMany(yearlyOrganizationsModal, { foreignKey: 'year' });
    var year = req.body.year.data
    var query = {
        where: {
            year: year,
            [Op.or]: req.body.salary.types,
            placementIndex: 1,
        },
        include: [
            {
                model: yearlyOrganizationsModal,
                where: {
                    year: req.body.year.data,
                    companyName: req.body.companies.names
                }
            },
        ]
    }
    console.log(JSON.stringify(req.body));

    console.log(JSON.stringify(query));

    if (req.body.companies.names.length == 0) {
        delete query.include[0].where['companyName']
    }
    studentPlacementModal.findAll(query).then((companies) => {
        res.status(200).send(companies)
    })
}
exports.getStudentCountYearWise = (req, res, next) => {
    studentPlacementModal.findAll({
        attributes: [
            'year',
            [sequelize.fn('COUNT', sequelize.col('year')), 'count']
        ],
        where: {
            placementIndex: 1
        },
        group: 'year',
        raw: true,
        logging: true
    }).then((counts) => {
        res.status(200).send(counts)
    }).catch((err) => {
        res.status(500).send(err)
    });
}
exports.getAvergeSalaryYearWise = (req, res, next) => {
    studentPlacementModal.hasMany(yearlyOrganizationsModal, { foreignKey: 'companyName' });
    studentPlacementModal.findAll({
        attributes:['year'],
        include: [
            {
                model: yearlyOrganizationsModal,
                attributes:[[sequelize.fn('AVG', sequelize.col('be_salary')), 'AvgSal']],
                // where:{
                //     BESalary:{
                //         [Op.gt]:0
                //     }
                // }
            },
        ],
        group: 'year',
        logging: true,
        where:{
            placementIndex:1
        }
    }).then((counts) => {
        res.status(200).send(counts)
    }).catch((err) => {
        res.status(500).send(err)
    });
}