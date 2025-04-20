class APIFeature {
  constructor(query, items) {
    this.query = query;
    this.items = items;
  }

  Filter() {
    // 1) we shouldn't have fields ( 'page' , 'limit' , 'fields' , 'sort' ) in this function
    const queryCopy = { ...this.query };
    const fieldsShouldDelete = ["page", "limit", "fields", "sort", "q"];
    fieldsShouldDelete.forEach((el) => delete queryCopy[el]);

    // 2) replace gt , lt , gte , lte with $gt , $lt , $gte , $lte
    const queryString = JSON.stringify(queryCopy);
    const finalQueryObject = JSON.parse(
      queryString.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)
    );

    this.items = this.items.find(finalQueryObject);

    return this;
  }

  Search(field) {
    if (this.query.q && field) {
      console.log(this.query.q);
      const finalQueryObject = {};
      finalQueryObject[field] = { $regex: this.query.q, $options: "i" };
      this.items = this.items.find(finalQueryObject);
    }
    return this;
  }

  Sort() {
    if (this.query.sort) {
      const sortItems = this.query.sort.replaceAll(",", " ");
      this.items = this.items.sort(sortItems);
    }
    return this;
  }

  FieldLimit() {
    if (this.query.fields) {
      const fieldsItems = this.query.fields.replaceAll(",", " ");
      this.items = this.items.select(fieldsItems);
    } else {
      this.items = this.items.select("-__v");
    }
    return this;
  }

  Pagination() {
    const { page = 1, limit } = this.query;
    const skip = (page - 1) * limit;
    this.items = this.items.skip(skip).limit(limit);
  }
}

module.exports = APIFeature;
