const Category = require("../models/categoryModel");
const slugify = require("slugify");

// Create New Category
exports.createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({ message: "category is Required" });
    }
    // Check Category
    const existsCategory = await Category.findOne({ name });
    if (existsCategory) {
      return res.status(400).send({
        success: false,
        message: "Category Already Exists",
      });
    }

    // Create Category
    const category = await new Category({
      name: name,
      slug: slugify(name),
    }).save();
    return res.status(200).send({
      success: true,
      message: "Category Created Successully",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
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
      return res.status(400).send({ message: "category is Required" });
    }
    const existsCategory = await Category.findById(id);
    if (!existsCategory) {
      return res.status(404).send({
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
    return res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
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
    return res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Deleting  category",
      error,
    });
  }
};

// Get All Category Controller
exports.getAllCategoryController = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).send({
      success: true,
      message: "Get all Category Successfully",
      categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Gtting All Category",
      error,
    });
  }
};

// Get Single Category

exports.getSingleCategoryController = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(400).send({
        success: false,
        message: "Category Not Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Getting Single Category",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Getting Single Category",
      error,
    });
  }
};
