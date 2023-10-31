const Category = require("../models/categoryModel");
const slugify = require("slugify");
// Create New Category
exports.createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).send({ Error: "category is Required" });
    }
    // Check Category
    const existsCategory = await Category.findOne({ name });
    if (existsCategory) {
      res.status(400).send({
        success: false,
        message: "Category Already Exists",
      });
    }

    // Create Category
    const category = await new Category({
      name: name,
      slug: slugify(name),
    }).save();
    res.status(200).send({
      success: true,
      message: "Category Created Successully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Creating  category",
      error,
    });
  }
};

// Update Category
exports.updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    if (!name) {
      res.status(400).send({ Error: "category is Required" });
    }
    const existsCategory = await Category.findById(id);
    if (!existsCategory) {
      res.status(404).send({
        success: false,
        message: "No Category Found",
      });
    }
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name: name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Updating  category",
      error,
    });
  }
};
// Update Category
exports.deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const existsCategory = await Category.findById(id);
    if (!existsCategory) {
      return res.status(404).send({
        success: false,
        message: "No Category Found",
      });
    }
    const category = await Category.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Deleting  category",
      error,
    });
  }
};
