"use strict";

const list = {
  method: "GET",
  path: "/products",
  handler: async (request, h) => {
    return "hello world!";
  }
};

const add = {
  method: "POST",
  path: "/products",
  handler: async (request, h) => {
    return "hello world!";
  }
};

const detail = {
  method: "GET",
  path: "/products/{id}",
  handler: async (request, h) => {
    return "hello world!";
  }
};

const edit = {
  method: "PUT",
  path: "/products/{id}",
  handler: async (request, h) => {
    return "hello world!";
  }
};

const remove = {
  method: "DELETE",
  path: "/products",
  handler: async (request, h) => {
    return "hello world!";
  }
};

module.exports = [list, add, detail, edit, remove];
