import {observable, computed, autorun, action, reaction} from 'mobx';
import uuidV4 from 'uuid/v4';
import superagent from 'superagent';
import {HOST} from  "../.config.js";

export class Branchit {
  @observable ideaList = [];
  @observable level;
  @observable maxLevel;
  minLevel;

  constructor(){
    this.ideaList;
    this.level = 1;
  }

  @action incrementLevel(){
    this.level++;
  }

  @action decremenetLevel(){
    if(this.level !== 1){
      return this.level--;
    }
  }

  @action toggleChildVisible(node){
    node.visible = !node.visible;
    this.level--;
    this.level++;
  }
}

export class Idea {
  id;
  title;
  attr;
  style;
  ideas;
  @observable visible = false;
  constructor(obj){
    this.id = obj.id;
    this.title = obj.title;
    this.ideas = obj.ideas;
    this.style = obj.style;
    this.visible = false;
  }
}
