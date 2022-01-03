"use strict";

const boom = require("@hapi/boom");
const joi = require("@hapi/joi");

const config = {cors: {origin: ['*']}};

const list = {
  method: "GET",
  path: "/products",
  handler: async (request, h) => {
    try {
      const products = await h.sql`SELECT * FROM  products`;
      return products;
    } catch (err) {
      console.log(err);
      return boom.serverUnavailable();
    }
  },
  config
};

const add = {
  method: "POST",
  path: "/products",
  handler: async (request, h) => {
    try {
      const {name, sku, price, description, image} = request.payload;
      const res = await h.sql`INSERT INTO products
				(name, sku, price, description, image)
				VALUES
				(${name}, ${sku}, ${price}, ${description}, ${image})	
				RETURNING
				id
				, name
				, sku
				, price
				, description
				, image
				`;
      return res.count > 0 ? res[0] : boom.badRequest();
    } catch (err) {
      console.log(err);
      return boom.serverUnavailable();
    }
  },
  options: {
    validate: {
      payload: joi.object({
        name: joi.string().required(),
        sku: joi.string().required(),
        price: joi.number().required(),
        description: joi.string(),
        image: joi.string()
      })
    }
  }
};

const detail = {
  method: "GET",
  path: "/products/{id}",
  handler: async (request, h) => {
    try {
      const id = request.params.id;
      const res = await h.sql`SELECT * FROM products WHERE id = ${id}`;
      return res.count > 0 ? res[0] : boom.notFound();
    } catch (err) {
      console.log(err);
      return boom.serverUnavailable();
    }
  },
  options: {
    validate: {
      params: joi.object({
        id: joi.number().integer().message("id parameter must be number")
      })
    }
  }
};

const edit = {
  method: "PUT",
  path: "/products/{id}",
  handler: async (request, h) => {
    try {
      const id = request.params.id;
      const {name, sku, price, description, image} = request.payload;
      console.log(request.payload)
      const res = await h.sql`UPDATE products SET
      name = ${name}
      , sku = ${sku} 
      , price = ${price} 
      , description = ${description} 
      , image = ${image}
      WHERE id = ${id}
      RETURNING
      id
      , name
      , sku
      , price
      , description
      , image
      `;
      return res.count > 0 ? res[0] : boom.notFound();
    }
    catch(err) {
      console.log(err);
      return boom.serverUnavailable();
    }
  },
  options: {
    validate: {
      params: joi.object({
        id: joi.number().integer()
      }),
      payload: joi.object({
        name: joi.string().required(),
        sku: joi.string().required(),
        price: joi.number().required(),
        description: joi.string(),
        image: joi.string()
      })
    }
  }
};

const remove = {
  method: "DELETE",
  path: "/products/{id}",
  handler: async (request, h) => {
    try {
      const id = request.params.id;
      const res = await h.sql`DELETE FROM products WHERE id = ${id}`;
      return res.count > 0 ? h.response().code(204) : boom.notFound();
    }
    catch(err) {
      console.log(err);
      return boom.serverUnavailable();
    }
  },
  options: {
    validate: {
      params: joi.object({
        id: joi.number().integer()
      })
    }
  }
};

module.exports = [list, add, detail, edit, remove];
