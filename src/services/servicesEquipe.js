const axios = require("axios");
let exports = {};

/**
 * Retrieves all Equipes
 * @returns 
 */
exports.getEquipes = async() => {
    try {
        const {data:response} = await axios.get("http://api.rugbeready.fr:3000/equipes")
        return response
    }
    catch (error) {
        console.log(error);
    }
};


/**
 * Add an Equipe
 * @param {*} nom 
 * @param {*} url
 */
exports.addEquipe = async(nom, url) => {
    try {
        await axios.post("http://api.rugbeready.fr:3000/equipes",{
            nom: nom,
            image: url
        })
    }
    catch (error) {
        console.log(error);
    }
};

/**
 * Delete an Equipe
 * @param {*} idEquipe 
 */
exports.deleteEquipe = async(idEquipe) => {
    try {
        await axios.delete("http://api.rugbeready.fr:3000/equipes/" + idEquipe)
    }
    catch (error) {
        console.log(error);
    }
}


export default exports;