import  Useraccount from "./user.js";

async function matricGenerator() {
    const year = new Date().getFullYear().toString().slice(-2)

    const lastUser = await Useraccount.findOne({matric: { $ne: null } }).sort({ createdAt: -1})

    let roll = 1001;

    if(lastUser) {
        const parts = lastUser.matric.split('/')
        roll = parseInt(parts[4]) + 1
    }

    return `KASU/SCE/CSC/${year}/${roll}`

}


export default matricGenerator