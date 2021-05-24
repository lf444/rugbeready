const axios = require("axios");
let exports = {};

exports.getPerfsJoueur = async(idJoueur) => {
    try {
        const {data:response} = await axios.get("http://api.rugbeready.fr:3000/perfomances/" + idJoueur + "/one")
        return response
    }
    catch (error) {
        console.log(error);
    }
}

exports.getAllPerfsJoueur = async(idJoueur) => {
    try {
        const {data:response} = await axios.get("http://api.rugbeready.fr:3000/perfomances/" + idJoueur + "/all")
        return response
    }
    catch (error) {
        console.log(error);
    }
}

exports.updatePerfsJoueur = async(idJoueur, datePerf, squat, dcouche, tirage, detenteVerticale, tempsSprint) => {
    try {
        await axios.post("http://api.rugbeready.fr:3000/perfomances/" + idJoueur, {
            idJoueur: idJoueur,
            datePerf: datePerf,
            squat: squat,
            dcouche: dcouche,
            tirage: tirage,
            detenteVerticale : detenteVerticale,
            tempsSprint : tempsSprint,
        })
    }
    catch (error) {
        console.log(error);
    }
}

export default exports;