const Connection = require("./DB/Connection");

class SectionManager
{
    async addSection(compId, section)
    {
        let conn = new Connection();
        let newSec = {
            company_id: compId,
            section: section
        }
        await conn.knexPointer()
        .insert(newSec)
        .into("sections")
        .then(()=>{
            console.log("section has been added succsefully");
        })
        .catch((err)=>
        {
            console.log("adding section err ", err);
        })
    }

    async getSections(compId)
    {
        let conn = new Connection();
        let secQ = conn
                        .knexPointer()
                        .select("sec_id","section")
                        .from("sections")
                        .where("sections.company_id", compId);
        const secR = await secQ;
        return Array.isArray(secR) ? secR : [secR];
    }
}
module.exports = SectionManager;