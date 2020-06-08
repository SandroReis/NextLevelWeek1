import express from "express";
import PointsController from "./controllers/pointsController";
import ItemsController from "./controllers/itemsController";
import multer from "multer";
import multerConfig from "./config/multer";
import { celebrate, Joi } from "celebrate";

//index -> listar varios, show -> listar unico, create, update, delete
const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

const upload = multer(multerConfig);

routes.get("/items", itemsController.index);
routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);

routes.post(
	"/points",
	upload.single("image"),
	celebrate(
		{
			body: Joi.object().keys({
				name: Joi.string().required(),
				email: Joi.string().required().email(),
				whatsapp: Joi.number().required(),
				latitude: Joi.number().required(),
				longitude: Joi.number().required(),
				city: Joi.string().required(),
				uf: Joi.string().required(),
				items: Joi.string().required(),
			}),
		},
		{
			abortEarly: false,
		}
	),
	pointsController.create
);

export default routes;
