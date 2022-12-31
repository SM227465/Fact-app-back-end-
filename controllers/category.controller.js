const catchAsync = require('../utils/catchAsync');
const Category = require('../models/category.model');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

exports.createCategory = catchAsync(async (req, res, next) => {
  const newCategory = await Category.create(req.body);

  res.status(201).json({
    newCategory: newCategory,
  });
});

exports.getCategories = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Category.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const category = await features.query;

  res.status(200).json({
    status: 'success',
    results: category.length,
    category: category,
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new AppError('No category found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    category: category,
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new AppError('No category found with that ID', 404));
  }

  const { name, color } = req.body;

  category.name = name ? name : category.name;
  category.color = color ? color : category.color;

  await category.save();

  res.status(200).json({
    status: 'success',
    category: category,
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(new AppError('No category found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Category deleted',
  });
});
