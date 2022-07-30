const { Pizza } = require('../models');

const pizzaController = {
	// functions here for models
	// GET ALL PIZZAS
	// GET /api/pizzas
	getAllPizza(req, res) {
		Pizza.find({})
			.then(dbPizzaData => res.json(dbPizzaData))
			.catch(err => {
				console.log(err);
				res.status(400).json(err);
			});
	},
	// GET ONE PIZZA BY ID
	// findOne method to find single pizza by ID, instead of the entire req, destructured 'params', bc that's only data needed for request to be fulfilled.
	// if can't find pizza with _id, check whether returning value is empty and send 404 status bakc to alert users that doesn't exist
	getPizzaById({ params }, res) {
		Pizza.findOne({ _id: params.id })
			.then(dbPizzaData => {
				// if no pizza found, send 404
				if (!dbPizzaData) {
					res.status(404).json({ message: 'No pizza found with this id!' });
					return;
				}
				res.json(dbPizzaData);
			})
			.catch(err => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// POST createPizza
	// destructure body out of express.js req object bc don't need interface w/ any other data provided.
	// send 400 error back if something goes wrong, if sent wrong type of dta for one of the fields
	createPizza({ body }, res) {
		Pizza.create(body)
			.then(dbPizzaData => res.json(dbPizzaData))
			.catch(err => res.status(400).json(err));
	},

	// PUT /api/pizza/:id UPDATE
	// update pizza by id
	// find single doc we want updated, updates it and returns updated document.
	// if we don't set third parameter {new:true}, it will return original doc, we're instructing it to return a new version of the doc
	updatePizza({ params, body }, res) {
		Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
			.then(dbPizzaData => {
				if (!dbPizzaData) {
					res.status(404).json({ message: 'No pizza found with this id!' });
					return;
				}
				res.json(dbPizzaData);
			})
			.catch(err => res.status(400).json(err));
	},

	// DELETE /api/pizza/:id
	// delete pizza
	// find doc to be returned and also delete from DB, could alternatively use deleteOne() or deleteMany()
	deletePizza({ params }, res) {
		Pizza.findOneAndDelete({ _id: params.id })
			.then(dbPizzaData => {
				if (!dbPizzaData) {
					res.status(404).json({ message: 'No pizza found with this id!' });
					return;
				}
				res.json(dbPizzaData);
			})
			.catch(err => res.status(400).json(err));
	}
};

module.exports = pizzaController;