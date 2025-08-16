import {Octokit} from "@octokit/core";
import {v4 as uuidv4} from "uuid";
import {l} from "./loghelper";
import {SET_OBJECT_TO_BE_INSPECTED} from "../actions/types";
import GitHub from "github-api";
import firebase from "firebase";
import {auth, dbbbbb} from "./firebase/firebase";

export let datassss = {
    "nodes": [
        {"id": "Myriel", "group": 1},
        {"id": "Napoleon", "group": 1},
        {"id": "Mlle.Baptistine", "group": 1},
        {"id": "Mme.Magloire", "group": 1},
        {"id": "CountessdeLo", "group": 1},
        {"id": "Geborand", "group": 1},
        {"id": "Champtercier", "group": 1},
        {"id": "Cravatte", "group": 1},
        {"id": "Count", "group": 1},
        {"id": "OldMan", "group": 1},
        {"id": "Labarre", "group": 2},
        {"id": "Valjean", "group": 2},
        {"id": "Marguerite", "group": 3},
        {"id": "Mme.deR", "group": 2},
        {"id": "Isabeau", "group": 2},
        {"id": "Gervais", "group": 2},
        {"id": "Tholomyes", "group": 3},
        {"id": "Listolier", "group": 3},
        {"id": "Fameuil", "group": 3},
        {"id": "Blacheville", "group": 3},
        {"id": "Favourite", "group": 3},
        {"id": "Dahlia", "group": 3},
        {"id": "Zephine", "group": 3},
        {"id": "Fantine", "group": 3},
        {"id": "Mme.Thenardier", "group": 4},
        {"id": "Thenardier", "group": 4},
        {"id": "Cosette", "group": 5},
        {"id": "Javert", "group": 4},
        {"id": "Fauchelevent", "group": 0},
        {"id": "Bamatabois", "group": 2},
        {"id": "Perpetue", "group": 3},
        {"id": "Simplice", "group": 2},
        {"id": "Scaufflaire", "group": 2},
        {"id": "Woman1", "group": 2},
        {"id": "Judge", "group": 2},
        {"id": "Champmathieu", "group": 2},
        {"id": "Brevet", "group": 2},
        {"id": "Chenildieu", "group": 2},
        {"id": "Cochepaille", "group": 2},
        {"id": "Pontmercy", "group": 4},
        {"id": "Boulatruelle", "group": 6},
        {"id": "Eponine", "group": 4},
        {"id": "Anzelma", "group": 4},
        {"id": "Woman2", "group": 5},
        {"id": "MotherInnocent", "group": 0},
        {"id": "Gribier", "group": 0},
        {"id": "Jondrette", "group": 7},
        {"id": "Mme.Burgon", "group": 7},
        {"id": "Gavroche", "group": 8},
        {"id": "Gillenormand", "group": 5},
        {"id": "Magnon", "group": 5},
        {"id": "Mlle.Gillenormand", "group": 5},
        {"id": "Mme.Pontmercy", "group": 5},
        {"id": "Mlle.Vaubois", "group": 5},
        {"id": "Lt.Gillenormand", "group": 5},
        {"id": "Marius", "group": 8},
        {"id": "BaronessT", "group": 5},
        {"id": "Mabeuf", "group": 8},
        {"id": "Enjolras", "group": 8},
        {"id": "Combeferre", "group": 8},
        {"id": "Prouvaire", "group": 8},
        {"id": "Feuilly", "group": 8},
        {"id": "Courfeyrac", "group": 8},
        {"id": "Bahorel", "group": 8},
        {"id": "Bossuet", "group": 8},
        {"id": "Joly", "group": 8},
        {"id": "Grantaire", "group": 8},
        {"id": "MotherPlutarch", "group": 9},
        {"id": "Gueulemer", "group": 4},
        {"id": "Babet", "group": 4},
        {"id": "Claquesous", "group": 4},
        {"id": "Montparnasse", "group": 4},
        {"id": "Toussaint", "group": 5},
        {"id": "Child1", "group": 10},
        {"id": "Child2", "group": 10},
        {"id": "Brujon", "group": 4},
        {"id": "Mme.Hucheloup", "group": 8}
    ],
    "links": [
        {"source": "Napoleon", "target": "Myriel", "value": 1},
        {"source": "Mlle.Baptistine", "target": "Myriel", "value": 8},
        {"source": "Mme.Magloire", "target": "Myriel", "value": 10},
        {"source": "Mme.Magloire", "target": "Mlle.Baptistine", "value": 6},
        {"source": "CountessdeLo", "target": "Myriel", "value": 1},
        {"source": "Geborand", "target": "Myriel", "value": 1},
        {"source": "Champtercier", "target": "Myriel", "value": 1},
        {"source": "Cravatte", "target": "Myriel", "value": 1},
        {"source": "Count", "target": "Myriel", "value": 2},
        {"source": "OldMan", "target": "Myriel", "value": 1},
        {"source": "Valjean", "target": "Labarre", "value": 1},
        {"source": "Valjean", "target": "Mme.Magloire", "value": 3},
        {"source": "Valjean", "target": "Mlle.Baptistine", "value": 3},
        {"source": "Valjean", "target": "Myriel", "value": 5},
        {"source": "Marguerite", "target": "Valjean", "value": 1},
        {"source": "Mme.deR", "target": "Valjean", "value": 1},
        {"source": "Isabeau", "target": "Valjean", "value": 1},
        {"source": "Gervais", "target": "Valjean", "value": 1},
        {"source": "Listolier", "target": "Tholomyes", "value": 4},
        {"source": "Fameuil", "target": "Tholomyes", "value": 4},
        {"source": "Fameuil", "target": "Listolier", "value": 4},
        {"source": "Blacheville", "target": "Tholomyes", "value": 4},
        {"source": "Blacheville", "target": "Listolier", "value": 4},
        {"source": "Blacheville", "target": "Fameuil", "value": 4},
        {"source": "Favourite", "target": "Tholomyes", "value": 3},
        {"source": "Favourite", "target": "Listolier", "value": 3},
        {"source": "Favourite", "target": "Fameuil", "value": 3},
        {"source": "Favourite", "target": "Blacheville", "value": 4},
        {"source": "Dahlia", "target": "Tholomyes", "value": 3},
        {"source": "Dahlia", "target": "Listolier", "value": 3},
        {"source": "Dahlia", "target": "Fameuil", "value": 3},
        {"source": "Dahlia", "target": "Blacheville", "value": 3},
        {"source": "Dahlia", "target": "Favourite", "value": 5},
        {"source": "Zephine", "target": "Tholomyes", "value": 3},
        {"source": "Zephine", "target": "Listolier", "value": 3},
        {"source": "Zephine", "target": "Fameuil", "value": 3},
        {"source": "Zephine", "target": "Blacheville", "value": 3},
        {"source": "Zephine", "target": "Favourite", "value": 4},
        {"source": "Zephine", "target": "Dahlia", "value": 4},
        {"source": "Fantine", "target": "Tholomyes", "value": 3},
        {"source": "Fantine", "target": "Listolier", "value": 3},
        {"source": "Fantine", "target": "Fameuil", "value": 3},
        {"source": "Fantine", "target": "Blacheville", "value": 3},
        {"source": "Fantine", "target": "Favourite", "value": 4},
        {"source": "Fantine", "target": "Dahlia", "value": 4},
        {"source": "Fantine", "target": "Zephine", "value": 4},
        {"source": "Fantine", "target": "Marguerite", "value": 2},
        {"source": "Fantine", "target": "Valjean", "value": 9},
        {"source": "Mme.Thenardier", "target": "Fantine", "value": 2},
        {"source": "Mme.Thenardier", "target": "Valjean", "value": 7},
        {"source": "Thenardier", "target": "Mme.Thenardier", "value": 13},
        {"source": "Thenardier", "target": "Fantine", "value": 1},
        {"source": "Thenardier", "target": "Valjean", "value": 12},
        {"source": "Cosette", "target": "Mme.Thenardier", "value": 4},
        {"source": "Cosette", "target": "Valjean", "value": 31},
        {"source": "Cosette", "target": "Tholomyes", "value": 1},
        {"source": "Cosette", "target": "Thenardier", "value": 1},
        {"source": "Javert", "target": "Valjean", "value": 17},
        {"source": "Javert", "target": "Fantine", "value": 5},
        {"source": "Javert", "target": "Thenardier", "value": 5},
        {"source": "Javert", "target": "Mme.Thenardier", "value": 1},
        {"source": "Javert", "target": "Cosette", "value": 1},
        {"source": "Fauchelevent", "target": "Valjean", "value": 8},
        {"source": "Fauchelevent", "target": "Javert", "value": 1},
        {"source": "Bamatabois", "target": "Fantine", "value": 1},
        {"source": "Bamatabois", "target": "Javert", "value": 1},
        {"source": "Bamatabois", "target": "Valjean", "value": 2},
        {"source": "Perpetue", "target": "Fantine", "value": 1},
        {"source": "Simplice", "target": "Perpetue", "value": 2},
        {"source": "Simplice", "target": "Valjean", "value": 3},
        {"source": "Simplice", "target": "Fantine", "value": 2},
        {"source": "Simplice", "target": "Javert", "value": 1},
        {"source": "Scaufflaire", "target": "Valjean", "value": 1},
        {"source": "Woman1", "target": "Valjean", "value": 2},
        {"source": "Woman1", "target": "Javert", "value": 1},
        {"source": "Judge", "target": "Valjean", "value": 3},
        {"source": "Judge", "target": "Bamatabois", "value": 2},
        {"source": "Champmathieu", "target": "Valjean", "value": 3},
        {"source": "Champmathieu", "target": "Judge", "value": 3},
        {"source": "Champmathieu", "target": "Bamatabois", "value": 2},
        {"source": "Brevet", "target": "Judge", "value": 2},
        {"source": "Brevet", "target": "Champmathieu", "value": 2},
        {"source": "Brevet", "target": "Valjean", "value": 2},
        {"source": "Brevet", "target": "Bamatabois", "value": 1},
        {"source": "Chenildieu", "target": "Judge", "value": 2},
        {"source": "Chenildieu", "target": "Champmathieu", "value": 2},
        {"source": "Chenildieu", "target": "Brevet", "value": 2},
        {"source": "Chenildieu", "target": "Valjean", "value": 2},
        {"source": "Chenildieu", "target": "Bamatabois", "value": 1},
        {"source": "Cochepaille", "target": "Judge", "value": 2},
        {"source": "Cochepaille", "target": "Champmathieu", "value": 2},
        {"source": "Cochepaille", "target": "Brevet", "value": 2},
        {"source": "Cochepaille", "target": "Chenildieu", "value": 2},
        {"source": "Cochepaille", "target": "Valjean", "value": 2},
        {"source": "Cochepaille", "target": "Bamatabois", "value": 1},
        {"source": "Pontmercy", "target": "Thenardier", "value": 1},
        {"source": "Boulatruelle", "target": "Thenardier", "value": 1},
        {"source": "Eponine", "target": "Mme.Thenardier", "value": 2},
        {"source": "Eponine", "target": "Thenardier", "value": 3},
        {"source": "Anzelma", "target": "Eponine", "value": 2},
        {"source": "Anzelma", "target": "Thenardier", "value": 2},
        {"source": "Anzelma", "target": "Mme.Thenardier", "value": 1},
        {"source": "Woman2", "target": "Valjean", "value": 3},
        {"source": "Woman2", "target": "Cosette", "value": 1},
        {"source": "Woman2", "target": "Javert", "value": 1},
        {"source": "MotherInnocent", "target": "Fauchelevent", "value": 3},
        {"source": "MotherInnocent", "target": "Valjean", "value": 1},
        {"source": "Gribier", "target": "Fauchelevent", "value": 2},
        {"source": "Mme.Burgon", "target": "Jondrette", "value": 1},
        {"source": "Gavroche", "target": "Mme.Burgon", "value": 2},
        {"source": "Gavroche", "target": "Thenardier", "value": 1},
        {"source": "Gavroche", "target": "Javert", "value": 1},
        {"source": "Gavroche", "target": "Valjean", "value": 1},
        {"source": "Gillenormand", "target": "Cosette", "value": 3},
        {"source": "Gillenormand", "target": "Valjean", "value": 2},
        {"source": "Magnon", "target": "Gillenormand", "value": 1},
        {"source": "Magnon", "target": "Mme.Thenardier", "value": 1},
        {"source": "Mlle.Gillenormand", "target": "Gillenormand", "value": 9},
        {"source": "Mlle.Gillenormand", "target": "Cosette", "value": 2},
        {"source": "Mlle.Gillenormand", "target": "Valjean", "value": 2},
        {"source": "Mme.Pontmercy", "target": "Mlle.Gillenormand", "value": 1},
        {"source": "Mme.Pontmercy", "target": "Pontmercy", "value": 1},
        {"source": "Mlle.Vaubois", "target": "Mlle.Gillenormand", "value": 1},
        {"source": "Lt.Gillenormand", "target": "Mlle.Gillenormand", "value": 2},
        {"source": "Lt.Gillenormand", "target": "Gillenormand", "value": 1},
        {"source": "Lt.Gillenormand", "target": "Cosette", "value": 1},
        {"source": "Marius", "target": "Mlle.Gillenormand", "value": 6},
        {"source": "Marius", "target": "Gillenormand", "value": 12},
        {"source": "Marius", "target": "Pontmercy", "value": 1},
        {"source": "Marius", "target": "Lt.Gillenormand", "value": 1},
        {"source": "Marius", "target": "Cosette", "value": 21},
        {"source": "Marius", "target": "Valjean", "value": 19},
        {"source": "Marius", "target": "Tholomyes", "value": 1},
        {"source": "Marius", "target": "Thenardier", "value": 2},
        {"source": "Marius", "target": "Eponine", "value": 5},
        {"source": "Marius", "target": "Gavroche", "value": 4},
        {"source": "BaronessT", "target": "Gillenormand", "value": 1},
        {"source": "BaronessT", "target": "Marius", "value": 1},
        {"source": "Mabeuf", "target": "Marius", "value": 1},
        {"source": "Mabeuf", "target": "Eponine", "value": 1},
        {"source": "Mabeuf", "target": "Gavroche", "value": 1},
        {"source": "Enjolras", "target": "Marius", "value": 7},
        {"source": "Enjolras", "target": "Gavroche", "value": 7},
        {"source": "Enjolras", "target": "Javert", "value": 6},
        {"source": "Enjolras", "target": "Mabeuf", "value": 1},
        {"source": "Enjolras", "target": "Valjean", "value": 4},
        {"source": "Combeferre", "target": "Enjolras", "value": 15},
        {"source": "Combeferre", "target": "Marius", "value": 5},
        {"source": "Combeferre", "target": "Gavroche", "value": 6},
        {"source": "Combeferre", "target": "Mabeuf", "value": 2},
        {"source": "Prouvaire", "target": "Gavroche", "value": 1},
        {"source": "Prouvaire", "target": "Enjolras", "value": 4},
        {"source": "Prouvaire", "target": "Combeferre", "value": 2},
        {"source": "Feuilly", "target": "Gavroche", "value": 2},
        {"source": "Feuilly", "target": "Enjolras", "value": 6},
        {"source": "Feuilly", "target": "Prouvaire", "value": 2},
        {"source": "Feuilly", "target": "Combeferre", "value": 5},
        {"source": "Feuilly", "target": "Mabeuf", "value": 1},
        {"source": "Feuilly", "target": "Marius", "value": 1},
        {"source": "Courfeyrac", "target": "Marius", "value": 9},
        {"source": "Courfeyrac", "target": "Enjolras", "value": 17},
        {"source": "Courfeyrac", "target": "Combeferre", "value": 13},
        {"source": "Courfeyrac", "target": "Gavroche", "value": 7},
        {"source": "Courfeyrac", "target": "Mabeuf", "value": 2},
        {"source": "Courfeyrac", "target": "Eponine", "value": 1},
        {"source": "Courfeyrac", "target": "Feuilly", "value": 6},
        {"source": "Courfeyrac", "target": "Prouvaire", "value": 3},
        {"source": "Bahorel", "target": "Combeferre", "value": 5},
        {"source": "Bahorel", "target": "Gavroche", "value": 5},
        {"source": "Bahorel", "target": "Courfeyrac", "value": 6},
        {"source": "Bahorel", "target": "Mabeuf", "value": 2},
        {"source": "Bahorel", "target": "Enjolras", "value": 4},
        {"source": "Bahorel", "target": "Feuilly", "value": 3},
        {"source": "Bahorel", "target": "Prouvaire", "value": 2},
        {"source": "Bahorel", "target": "Marius", "value": 1},
        {"source": "Bossuet", "target": "Marius", "value": 5},
        {"source": "Bossuet", "target": "Courfeyrac", "value": 12},
        {"source": "Bossuet", "target": "Gavroche", "value": 5},
        {"source": "Bossuet", "target": "Bahorel", "value": 4},
        {"source": "Bossuet", "target": "Enjolras", "value": 10},
        {"source": "Bossuet", "target": "Feuilly", "value": 6},
        {"source": "Bossuet", "target": "Prouvaire", "value": 2},
        {"source": "Bossuet", "target": "Combeferre", "value": 9},
        {"source": "Bossuet", "target": "Mabeuf", "value": 1},
        {"source": "Bossuet", "target": "Valjean", "value": 1},
        {"source": "Joly", "target": "Bahorel", "value": 5},
        {"source": "Joly", "target": "Bossuet", "value": 7},
        {"source": "Joly", "target": "Gavroche", "value": 3},
        {"source": "Joly", "target": "Courfeyrac", "value": 5},
        {"source": "Joly", "target": "Enjolras", "value": 5},
        {"source": "Joly", "target": "Feuilly", "value": 5},
        {"source": "Joly", "target": "Prouvaire", "value": 2},
        {"source": "Joly", "target": "Combeferre", "value": 5},
        {"source": "Joly", "target": "Mabeuf", "value": 1},
        {"source": "Joly", "target": "Marius", "value": 2},
        {"source": "Grantaire", "target": "Bossuet", "value": 3},
        {"source": "Grantaire", "target": "Enjolras", "value": 3},
        {"source": "Grantaire", "target": "Combeferre", "value": 1},
        {"source": "Grantaire", "target": "Courfeyrac", "value": 2},
        {"source": "Grantaire", "target": "Joly", "value": 2},
        {"source": "Grantaire", "target": "Gavroche", "value": 1},
        {"source": "Grantaire", "target": "Bahorel", "value": 1},
        {"source": "Grantaire", "target": "Feuilly", "value": 1},
        {"source": "Grantaire", "target": "Prouvaire", "value": 1},
        {"source": "MotherPlutarch", "target": "Mabeuf", "value": 3},
        {"source": "Gueulemer", "target": "Thenardier", "value": 5},
        {"source": "Gueulemer", "target": "Valjean", "value": 1},
        {"source": "Gueulemer", "target": "Mme.Thenardier", "value": 1},
        {"source": "Gueulemer", "target": "Javert", "value": 1},
        {"source": "Gueulemer", "target": "Gavroche", "value": 1},
        {"source": "Gueulemer", "target": "Eponine", "value": 1},
        {"source": "Babet", "target": "Thenardier", "value": 6},
        {"source": "Babet", "target": "Gueulemer", "value": 6},
        {"source": "Babet", "target": "Valjean", "value": 1},
        {"source": "Babet", "target": "Mme.Thenardier", "value": 1},
        {"source": "Babet", "target": "Javert", "value": 2},
        {"source": "Babet", "target": "Gavroche", "value": 1},
        {"source": "Babet", "target": "Eponine", "value": 1},
        {"source": "Claquesous", "target": "Thenardier", "value": 4},
        {"source": "Claquesous", "target": "Babet", "value": 4},
        {"source": "Claquesous", "target": "Gueulemer", "value": 4},
        {"source": "Claquesous", "target": "Valjean", "value": 1},
        {"source": "Claquesous", "target": "Mme.Thenardier", "value": 1},
        {"source": "Claquesous", "target": "Javert", "value": 1},
        {"source": "Claquesous", "target": "Eponine", "value": 1},
        {"source": "Claquesous", "target": "Enjolras", "value": 1},
        {"source": "Montparnasse", "target": "Javert", "value": 1},
        {"source": "Montparnasse", "target": "Babet", "value": 2},
        {"source": "Montparnasse", "target": "Gueulemer", "value": 2},
        {"source": "Montparnasse", "target": "Claquesous", "value": 2},
        {"source": "Montparnasse", "target": "Valjean", "value": 1},
        {"source": "Montparnasse", "target": "Gavroche", "value": 1},
        {"source": "Montparnasse", "target": "Eponine", "value": 1},
        {"source": "Montparnasse", "target": "Thenardier", "value": 1},
        {"source": "Toussaint", "target": "Cosette", "value": 2},
        {"source": "Toussaint", "target": "Javert", "value": 1},
        {"source": "Toussaint", "target": "Valjean", "value": 1},
        {"source": "Child1", "target": "Gavroche", "value": 2},
        {"source": "Child2", "target": "Gavroche", "value": 2},
        {"source": "Child2", "target": "Child1", "value": 3},
        {"source": "Brujon", "target": "Babet", "value": 3},
        {"source": "Brujon", "target": "Gueulemer", "value": 3},
        {"source": "Brujon", "target": "Thenardier", "value": 3},
        {"source": "Brujon", "target": "Gavroche", "value": 1},
        {"source": "Brujon", "target": "Eponine", "value": 1},
        {"source": "Brujon", "target": "Claquesous", "value": 1},
        {"source": "Brujon", "target": "Montparnasse", "value": 1},
        {"source": "Mme.Hucheloup", "target": "Bossuet", "value": 1},
        {"source": "Mme.Hucheloup", "target": "Joly", "value": 1},
        {"source": "Mme.Hucheloup", "target": "Grantaire", "value": 1},
        {"source": "Mme.Hucheloup", "target": "Bahorel", "value": 1},
        {"source": "Mme.Hucheloup", "target": "Courfeyrac", "value": 1},
        {"source": "Mme.Hucheloup", "target": "Gavroche", "value": 1},
        {"source": "Mme.Hucheloup", "target": "Enjolras", "value": 1}
    ]
}

export function genRandomTree(N = 300, reverse = false) {
    let temp1 = {
        nodes: [...Array(N).keys()].map(i => ({id: i})),
        links: [...Array(N).keys()]
            .filter(id => id)
            .map(id => (
                    {
                        [reverse ? 'target' : 'source']: id,
                        [reverse ? 'source' : 'target']: Math.round(Math.random() * (id - 1))
                    }
                )
            )

    };
    console.log("temp1", temp1)
    return temp1
}

export function cgg(...args) {
    console.log(...args);
}

export const rename = (nodeOrLink, type) => {
    let value = prompt('Name this ' + type + ':', nodeOrLink.name);
    if (!value) {
        return;
    }
    nodeOrLink.name = value;
};

export function draggggggg(linkIdCounter, interimLink, links, removeLink, dragSourceNode, nodes, distance) {
    const snapInDistance = 15;
    const snapOutDistance = 40;
    const setInterimLink = (source, target) => {
        let linkId = linkIdCounter.current++;
        interimLink.current = {
            id: linkId,
            source: source,
            target: target,
            name: 'link_' + linkId
        };
        links.push(interimLink.current);
    };
    const removeInterimLinkWithoutAddingIt = () => {
        removeLink(interimLink.current);
        interimLink.current = null;

    };


    const dragFun = dragNode => {
        dragSourceNode.current = dragNode;
        console.log("dragging nodeeeeeeeeeeeee", dragNode)
        for (let node of nodes) {


            // if the dragged node is the same as the current node, skip
            if (dragNode === node) {
                continue;
            }


            // close enough: snap onto node as target for suggested link
            if (!interimLink.current && distance(dragNode, node) < snapInDistance) {
                console.log("detect,  shall now snap into node", node)
                setInterimLink(dragSourceNode.current, node);
            }

            // close enough to other node: snap over to other node as target for suggested link
            if (interimLink.current && node !== interimLink.current.target && distance(dragNode, node) < snapInDistance) {
                console.log("detect,  shall now snap over to other node as target for suggested link", node)
                removeLink(interimLink.current);
                console.log("removeLink(interimLink.current);", interimLink.current)
                setInterimLink(dragSourceNode.current, node);
            }
        }
        // far away enough: snap out of the current target node
        if (interimLink.current && distance(dragNode, interimLink.current.target) > snapOutDistance) {
            removeInterimLinkWithoutAddingIt();
        }
    }

    return dragFun;
}

export function removeNodeAndRelatedLinks(dd, node, setdd, dispatch) {
    dispatch({type: SET_OBJECT_TO_BE_INSPECTED, payload: node})

    console.log("Before remove node: links length", dd.links.length, "nodes length", dd.nodes.length);

    // Filter out links that are connected to the node
    const remainingLinks = dd.links.filter(link => {
        const relatedToNode = link.source.id === node.id || link.target.id === node.id;
        return !relatedToNode;
    });

    // Remove the node
    const remainingNodes = dd.nodes.filter(node1 => node1.id !== node.id);

    // Update state with the new sets of links and nodes
    setdd({nodes: remainingNodes, links: remainingLinks});

    // Debug after removing
    console.log("After remove node: links length", remainingLinks.length, "nodes length", remainingNodes.length);
}

export async function removegithubRepoNode(objectToBeInspected, dd, setdd, dispatch) {
    try {

        const userResponse = window.confirm("Are you sure you want to delete?" + objectToBeInspected.name);
        if (!userResponse) {
            return;
        }
        const octokit = new Octokit({
            auth: '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'
        })
        const parts = objectToBeInspected.name.split('/');
        await octokit.request('DELETE /repos/{owner}/{repo}', {
            owner: parts[0],
            repo: parts[1],
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        l("deleted")
        removeNodeAndRelatedLinks(dd, objectToBeInspected, setdd, dispatch);
        l("deleted1")


    } catch (e) {
        console.log("errorrrrrrrrr", e)
    } finally {
    }
}

export function keydownnnnnn(
    setObjectToBeInspected,
    saveGraph,
    objectToBeInspected,
    dd,
    setdd,
    link111,
    lc,
    graphtypeee,
    dispatch
) {
    return async (event) => {


        l("key presseddddddddddd", event.key)
        if (1) {
            l("all shortcuts are disabled for now")
            return
        }

        if (event.key === '-') {
            l("minus pressed")

            console.warn("reimplement this, it is not working")
            // setc(prev => {
            //         return {
            //             ...prev,
            //             "node_font_size": prev.node_font_size - 0.1
            //
            //         }
            //     }
            // )

        }
        if (event.key === '=') {
            console.warn("reimplement this, it is not working")

            // setc(prev => {
            //         return {
            //             ...prev,
            //             "node_font_size": prev.node_font_size + 0.1
            //
            //         }
            //     }
            // )
        }


        if (event.key === 'Escape') {
            setObjectToBeInspected({})
        }

        if (event.key === 's') {
            saveGraph()
        }
        if (event.key === 'r') {

            // check if it is an empty object. if yes, then we dont want to rename it
            if (Object.keys(objectToBeInspected).length === 0) {
                l("empty object, no need to rename")
                return
            }
            rename(objectToBeInspected, "node")
        }

        if (event.key === 'd') {

            if (0) {
                await removegithubRepoNode(
                    objectToBeInspected,
                    dd,
                    setdd,
                    dispatch
                );
            } else {
            }
        }

        if (event.key === '`') {
            await navigator.clipboard.writeText(objectToBeInspected.name);
            window.open(link111, '_blank', 'noreferrer');
        }

        if (event.key === '2') {
            // add a connection from Trash to the selected node
            // if the selected node is empty, then we dont want to add it
            if (Object.keys(objectToBeInspected).length === 0) {
                l("empty object, no need to add connection")
                return
            }

            const trashnodeid = "26ae56be-1fc7-49cf-af88-4a411554bada"

            let shouldAddLink = !lc.some(link => {
                    let lll = (link.source.id === objectToBeInspected.id && link.target.id === trashnodeid)
                        || (link.source.id === trashnodeid && link.target.id === objectToBeInspected.id)
                    if (lll) {
                        l("link already exists!!!!!!!!!", objectToBeInspected.id, trashnodeid)
                    }
                    return lll
                }
            )

            if (shouldAddLink) {
                let linkId = uuidv4()

                l("objectToBeInspected.id", objectToBeInspected.id, "node.id", trashnodeid)

                const interimLink = {
                    id: linkId,
                    source: trashnodeid,
                    target: objectToBeInspected.id,
                    name: 'link_' + linkId
                };
                setdd(prevNc => ({
                    ...prevNc, // Spread to copy other properties of nc, if there are any
                    links: [...prevNc.links, interimLink], // Create a new array with all old nodes plus the new one
                }));

                setObjectToBeInspected({})
            }


        }
    };
}

export function calculateCollapseddd(dd) {

    return () => {
        l("dddddddddddd2", dd)
        let removenodeidlist;
        removenodeidlist = []
        let removelinkidlist;
        removelinkidlist = []
        l("dd.nodes.length", dd.nodes.length)
        // find a node with collapsed property true
        let collapsedNodes = dd.nodes.filter(node => node.collapsed)

        l("collapsedNodes length", collapsedNodes.length)
        // for each node in collapsedNodes
        collapsedNodes.forEach(node => {
                // find all node that connect to this node


                let connectedNodes = dd.links
                    .filter(link =>
                        link.source.id === node.id // this is when the after we load the first graph, the library already replaced link source to an object.
                        ||
                        link.source === node.id    // this is when loading a graph from local files at the first time, because link source would only be a string

                    )
                    .map(link => link.target)
                l("connectedNodes length", connectedNodes.length)
                // for each connected node
                connectedNodes.forEach(connectedNode => {

                        let aaaa = dd.links.filter(link =>
                            (
                                link.source === connectedNode
                                ||
                                link.source === connectedNode.id
                            )
                            ||
                            (
                                link.target === connectedNode
                                ||
                                link.target === connectedNode.id

                            )
                        )
                        l("aaaa.length", aaaa.length)
                        // if it is connected only to this node
                        if (aaaa.length === 1) {

                            if (connectedNode.id) {
                                removenodeidlist.push(connectedNode.id)
                            } else {
                                removenodeidlist.push(connectedNode)
                            }

                            l("removenodeidlist", removenodeidlist)
                            aaaa.forEach(link => removelinkidlist.push(link.id))
                        }
                    }
                )

            }
        )


        // if no other node connect to it, then we can filter it out,
        // also filter out the link

        let newdd = {
            nodes: dd.nodes.filter(node => !removenodeidlist.includes(node.id)),
            links: dd.links.filter(link => !removelinkidlist.includes(link.id))
        }
        l("newddddddddddddddddddddddddddddddddddddddddddddddd", newdd)
        return newdd
    };
}

export function rawdata(jsonData) {
    let stringified = JSON.stringify(jsonData);
    const obj = JSON.parse(stringified);
    l("obj", obj);
}


export let aaaaaaa = {
    "--w-rjv-color": "#9cdcfe",
    "--w-rjv-key-number": "#268bd2",
    "--w-rjv-key-string": "#9cdcfe",
    "--w-rjv-background-color": "#000000ff",
    "--w-rjv-line-color": "#36334280",
    "--w-rjv-arrow-color": "#838383",
    "--w-rjv-edit-color": "#9cdcfe",
    "--w-rjv-info-color": "#9c9c9c7a",
    "--w-rjv-update-color": "#9cdcfe",
    "--w-rjv-copied-color": "#9cdcfe",
    "--w-rjv-copied-success-color": "#28a745",
    "--w-rjv-curlybraces-color": "#d4d4d4",
    "--w-rjv-colon-color": "#d4d4d4",
    "--w-rjv-brackets-color": "#d4d4d4",
    "--w-rjv-ellipsis-color": "#cb4b16",
    "--w-rjv-quotes-color": "#9cdcfe",
    "--w-rjv-quotes-string-color": "#ce9178",
    "--w-rjv-type-string-color": "#ce9178",
    "--w-rjv-type-int-color": "#b5cea8",
    "--w-rjv-type-float-color": "#b5cea8",
    "--w-rjv-type-bigint-color": "#b5cea8",
    "--w-rjv-type-boolean-color": "#569cd6",
    "--w-rjv-type-date-color": "#b5cea8",
    "--w-rjv-type-url-color": "#3b89cf",
    "--w-rjv-type-null-color": "#569cd6",
    "--w-rjv-type-nan-color": "#859900",
    "--w-rjv-type-undefined-color": "#569cd6"
}


export const replaceStringAinB = (strA, strB) => {
    if (strB.startsWith(strA)) {
        return strB.replace(strA, 'e');
    }
    return strB; // No change if stringB does not start with stringA
};


export const distance1and2 = (node1, node2) => {
    return Math.sqrt(Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2));
};

export function repoooooo(setnotice, setrepo) {
    const getRepoData = async () => {
        l("getting")


        setnotice("getting data from github api")
        // case 1 we call REST directly

        // const repoUrl = `https://api.github.com/users/${username}/repos`;
        //
        // // console.log
        // const config = {
        //     headers: { Authorization: `Bearer ${access_token}` }
        // };
        // console.log("making request to ",repoUrl)
        // axios.get(repoUrl,null,config).then((responses) => {
        //     // console.log("responsesssss",responses)
        //     const repos = responses.data.map(({name, language, html_url, created_at, description}) => {
        //         return {name, language, html_url, created_at, description};
        //     })
        //     // console.log("origin response is ",response);
        //     console.log("addsssssssssssssss ", repos.length);
        //     response["repo"] = repos;
        //     console.log("returning to ")
        //     return res.status(200).json(response);
        //
        // }).catch(error => {
        //     console.log(`inside getrepos error1233213333: ${error}`)
        //     // this.setState({
        //     //     errorMessage: error.response.statusText
        //     // })
        // });


        // case 2 use library that call REST for you
        // https://github.com/github-tools/github


        // need to get the token from server first
        let gittoken;

        if (1) {
            gittoken = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;
        } else {
            var docRef = dbbbbb.collection("users").doc(auth().currentUser.uid);
            const doc = await docRef.get()
            gittoken = doc.data().accessToken
        }

        // cgg(doc.data().accessToken)

        // let tokenn=

        const gh = new GitHub({
            token: gittoken
            // make sure this has repo scope right for private repo list

            // however for safty, no read only scope  https://stackoverflow.com/a/72326284/10964992
            // dangerous as hell

            // user has to tick the organization access in order for listing the repo in that organization that user have access
            // what should user do if they want to add in more organization?
            // 1. tell them logout github doesnt work
            // 2. tell them to change scope in their github account
            //   2.1 after change, does original access token have effect?  Yes
            //
            // also note if ac A approve oauth app D to access organization C,  ac B(if member of C) could see D have access to C in oauth procedure


        });

        const me = gh.getUser();


        let repoos;
        try {
            repoos = await me.listRepos()
            setnotice(p => {
                return p + " successful, got " + repoos.data.length + " repos."
            })
            // this list all repo
            // later also user UI will wait for data retriving.

            /////////////////////////////////////////// IF promise chain intead of async
            // .then(function({data: reposJson}) {
            //     console.log(`clayreimann has ${reposJson.length} repos!`);
            //     console.log(reposJson)
            // });
        } catch (e) {
            setnotice(p => {
                return p + "Fail, access token not longer valid, maybe user revoke access "
            })
            console.log("this access token not longer valid, maybe user revoke access  ")
            return
        } finally {

        }

        l("stored", repoos)
        setrepo(repoos.data)
        setnotice(p => {
                return p + " saving data to database."
            }
        )

        if (0) { // one request in one document or inside one document?
            var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
            await dbbbbb.collection("users").doc(auth().currentUser.uid).collection("repofetchhhhhhhhh").doc().set({
                repodata: repoos.data,
                time: myTimestamp
            })
            // Uncaught (in promise) FirebaseError: Document 'projects/githubvisssss202324/databases/(default)/documents/users/NcVakMNaAEYR0wT7eiU0Ax5HTi82/repofetchhhhhhhhh/6j5IKFgVkBmsqCoyWMyd' cannot be written because its size (2,971,208 bytes) exceeds the maximum allowed size of 1,048,576 bytes.
            setnotice(p => {
                return p + " Succesfully saved data to database."
            })
        }

        try {
            const json = JSON.stringify(repoos.data);
            const blob = new Blob([json], {type: 'application/json'});
            const href = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = href;
            link.download = "state.json"; // or another filename of your choosing
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        } catch (e) {
            setnotice(p => {
                return p + " Fail to download json file."
            })
            console.log("Fail to download json file.")
        } finally {
        }

    }


    return getRepoData;
}
