const catchAsync = require('../utils/catchAsync');
const Fact = require('../models/fact.model');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

exports.createFact = catchAsync(async (req, res, next) => {
  const newFact = await Fact.create(req.body);

  res.status(201).json({
    fact: newFact,
  });
});

exports.getFacts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Fact.find().populate({
      path: 'category',
      select: '-_id name color',
    }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const facts = await features.query;

  res.status(200).json({
    status: 'success',
    results: facts.length,
    facts: facts,
  });
});

exports.getFact = catchAsync(async (req, res, next) => {
  const fact = await Fact.findById(req.params.id).populate({
    path: 'category',
    select: '-_id name color',
  });

  if (!fact) {
    return next(new AppError(`No fact found with this ID: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    fact: fact,
  });
});

exports.updateFact = catchAsync(async (req, res, next) => {
  const fact = await Fact.findById(req.params.id);

  if (!fact) {
    return next(new AppError(`No fact found with this ID: ${req.params.id}`, 404));
  }

  const { text, source, category } = req.body;

  fact.text = text ? text : fact.text;
  fact.source = source ? source : fact.source;
  fact.category = category ? category : fact.category;

  await fact.save();

  res.status(200).json({
    status: 'success',
    fact: fact,
  });
});

exports.deleteFact = catchAsync(async (req, res, next) => {
  const fact = await Fact.findByIdAndDelete(req.params.id);

  if (!fact) {
    return next(new AppError(`No fact found with this ID: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Fact deleted',
  });
});
