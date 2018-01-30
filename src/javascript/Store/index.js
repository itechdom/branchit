import {observable, computed, autorun, action, reaction} from 'mobx';
import uuidV4 from 'uuid/v4';
import superagent from 'superagent';
import {HOST} from  "../config.js";
import queryString from 'query-string';

export class Branchit {
  @observable ideaList = [];
  @observable level;
  @observable maxLevel;
  @observable pendingRequestCount;
  @observable isLoggedIn = false;
  accessToken;
  minLevel;

  constructor(){
    this.ideaList;
    this.level = 1;
    const parsed = queryString.parse(location.search);
    this.accessToken = this.storeAccessToken(parsed.access);
  }

  storeAccessToken(token){
    if(token){
      localStorage.setItem("accessToken", token);
      return token;
    }
    else{
      let storedToken = localStorage.getItem("accessToken");
      return storedToken;
    }
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

  @action login(){
    let loginURL = `${HOST}/google/auth`;
    window.open(loginURL);
  }

  @action isAuthenticated(){
    this.pendingRequestCount++;
    //Authorization: Bearer 0b79bab50daca910b000d4f1a2b675d604257e42
    let req = superagent.get(`${HOST}/isauth`);
    req.end(action("login-callback",(err,res)=>{
      this.pendingRequestCount--;
      if(err){
        this.isLoggedIn = false;
        return console.log("err: ",err);
      }
      return this.isLoggedIn = true;
    }));
  }

  @action testRequest(){
    this.pendingRequestCount++;
    let req = superagent.get(`${HOST}/`);
    req.end(action("login-callback",(err,res)=>{
      if(err){
        console.log("err: ",err);
      }
      this.pendingRequestCount--;
      console.log(res);
    }));
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
