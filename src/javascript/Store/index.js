import {observable, computed, autorun, action, reaction} from 'mobx';
import uuidV4 from 'uuid/v4';
import superagent from 'superagent';
import {HOST} from  "../.config.js";

export class Branchit {
  @observable ideaList;
  @observable level;
  @observable maxLevel;
  minLevel;
  constructor(){
    this.ideaList = [];
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
}

export class Idea {
  id;
  title;
  attr;
  style;
  ideas;
  visible;

  constructor(obj){
    let cp = Object.assign({},obj);
    this.id = cp.id;
    this.title = cp.title;
    this.ideas = cp.ideas;
    this.style = cp.style;
    this.visible = true;
  }
}
