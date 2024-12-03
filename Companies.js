class Companies
{
    constructor(comp_id, comp_name, place, img)
    {
        this.comp_id = comp_id;
        this.comp_name = comp_name;
        this.place = place;
        this.img = img;
    }

    getImg() { return this.img; }

    getPlaceId() { return this.place; }
    
    getCompId()
    {
        return this.comp_id;
    }
    getCompName()
    {
        return this.comp_name;
    }
}

module.exports = Companies;