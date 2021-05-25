const axios = require("axios");
let exports = {};

/**
 * Retrieves all Evenements
 * @returns 
 */
exports.getEvenements = async() => {
    try {
        const {data:response} = await axios.get("http://api.rugbeready.fr:3000/evenements")
        return response
    }
    catch (error) {
        console.log(error);
    }
};

/**
 * Add an Evenement
 * @param {*} nom 
 * @param {*} description 
 * @param {*} dateTimeDebut 
 * @param {*} dateTimeFin 
 */
exports.addEvenements = async(nom, description, dateTimeDebut, dateTimeFin) => {
    try {
        await axios.post(`http://api.rugbeready.fr:3000/evenements`,{
            nom: nom,
            description: description,
            dateTimeDebut: dateTimeDebut,
            dateTimeFin: dateTimeFin
        })
    }
    catch (error) {
        console.log(error);
    }
};


exports.deleteEvenement = async(idEvenement) => {
    try {
        await axios.delete("http://api.rugbeready.fr:3000/evenements/" + idEvenement)
    }
    catch (error) {
        console.log(error);
    }
};


export default exports;