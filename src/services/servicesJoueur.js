const axios = require("axios");
let exports = {};


/**
 * Retrieves all Joueurs from an Equipe
 * @param {*} idEquipe 
 * @returns 
 */
exports.getJoueursFromEquipe = async(idEquipe) => {
    try {
        const {data:response} = await axios.get("http://api.rugbeready.fr:3000/equipes/" + idEquipe)
        return response
    }
    catch (error) {
        console.log(error);
    }
};

/**
 * Add a Joueur to an Equipe
 * @param {String} nom 
 * @param {String} prenom 
 * @param {String} poste 
 * @param {Date} dateNaissance 
 * @param {String} email 
 * @param {String} telephone 
 * @param {Integer} idEquipe
 */
exports.addJoueurToEquipe = async(nom, prenom, poste, dateNaissance, email, telephone, idEquipe) => {
    try {
        await axios.post("http://api.rugbeready.fr:3000/joueurs",{
            nom: nom,
            prenom: prenom,
            poste: poste,
            dateNaissance: dateNaissance,
            email: email,
            telephone: telephone,
            idEquipe: idEquipe,
        })
    }
    catch (error) {
        console.log(error);
    }
};

/**
 * Retrieves the last Joueur created
 * @returns 
 */
exports.getLastJoueur = async() => {
    try {
        const {data:response} = await axios.get("http://api.rugbeready.fr:3000/equipes/last")
        return response
    }
    catch (error) {
        console.log(error);
    }
};

/**
 * Add a Blessure to the last Joueur
 */
exports.addBlessureToLastJoueur = async() => {
    var idJoueur
    exports.getLastJoueur().then((result) => {
        idJoueur = result[0].idJoueur
        axios.post(`http://api.rugbeready.fr:3000/joueurs/${idJoueur}/blessure`).catch(function (error) {
            console.log(error)
        });
    })
};

/**
 * Delete a Joueur
 * @param {*} idJoueur 
 */
exports.deleteJoueur = async(idJoueur) => {
    try {
        await axios.delete("http://api.rugbeready.fr:3000/joueurs/" + idJoueur)
    }
    catch (error) {
        console.log(error);
    }
}

/**
 * Retrieve the identity of a Joueur
 * @param {*} idJoueur 
 * @returns 
 */
exports.getIdentiteJoueur = async(idJoueur) => {
    try {
        const {data:response} = await axios.get("http://api.rugbeready.fr:3000/joueurs/" + idJoueur)
        return response
    } catch (error) {
        console.log(error)
    }
}

exports.getTaillePoidsJoueur = async(idJoueur) => {
    try {
        const {data:response} = await axios.get("http://api.rugbeready.fr:3000/tp/" + idJoueur + "/one")
        return response
    } catch (error) {
        console.log(error)
    }
}

exports.getAllTaillePoidsJoueur = async(idJoueur) => {
    try {
        const {data:response} = await axios.get("http://api.rugbeready.fr:3000/tp/" + idJoueur + "/all")
        return response
    } catch (error) {
        console.log(error)
    }
}

exports.updateTaillePoidsJoueur = async(idJoueur, poids, taille) => {
    try {
        await axios.post("http://api.rugbeready.fr:3000/tp/" + idJoueur + "/", {
            idJoueur: idJoueur, 
            dateTaillePoids: new Date().toISOString().substr(0, 10),
            poids: poids,
            taille: taille,
        })
    } catch (error) {
        console.log(error)
    }
};

export default exports;