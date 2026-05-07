import {createStart} from "../src/shared/createStart.js";

const starsContainer = document.getElementById('stars')

setInterval(() => createStart(starsContainer), 150)