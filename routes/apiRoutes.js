const router = require("express").Router();
const { notes } = require("../db/db.json");
const { v4: uuidv4 } = require("uuid");
