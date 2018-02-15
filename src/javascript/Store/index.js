import { observable, computed, autorun, action, reaction } from "mobx";
import uuidV4 from "uuid/v4";
import superagent from "superagent";
import { HOST } from "../config.js";
import queryString from "query-string";
import moment from "moment";

export class Branchit {
  @observable ideaList = [];
  @observable level;
  @observable maxLevel;
  @observable pendingRequestCount;
  @observable isLoggedIn = false;
  @observable fileList = [];
  @observable filteredFileList = [];
  @observable previewedFile;
  accessToken;
  minLevel;

  constructor() {
    this.ideaList;
    this.level = 1;
    const parsed = queryString.parse(location.search);
    this.accessToken = this.storeAccessToken(parsed.access_token);
    this.refreshToken = this.storeRefreshToken(parsed.refresh_token);
  }

  storeAccessToken(token) {
    if (token) {
      localStorage.setItem("accessToken", token);
    }
  }

  getAccessToken() {
    let storedToken = localStorage.getItem("accessToken");
    return storedToken;
  }

  storeRefreshToken(token) {
    if (token) {
      localStorage.setItem("refreshToken", token);
    }
  }

  getRefreshToken() {
    let storedToken = localStorage.getItem("refreshToken");
    return storedToken;
  }

  auth() {
    let token = this.getAccessToken();
    if (token) {
      return token;
    } else {
      console.log("no auth token");
    }
  }

  @computed get files(){
    return this.filteredFileList.map((file)=>{
      return file.title;
    });
  }

  @action filterFilesByTitle(title){
    this.filteredFileList = this.fileList.filter((file)=>{
      return file.title.indexOf(title) !== -1;
    })
  }

  @action
  incrementLevel() {
    this.level++;
  }

  @action
  decremenetLevel() {
    if (this.level !== 1) {
      return this.level--;
    }
  }

  @action
  toggleChildVisible(node) {
    node.visible = !node.visible;
    this.level--;
    this.level++;
  }

  @action
  login() {
    let loginURL = `${HOST}/google/auth`;
    window.open(loginURL);
  }

  @action
  isAuthenticated() {
    this.pendingRequestCount++;
    let req = superagent.get(`${HOST}/file/list`);
    req.end(
      action("login-callback", (err, res) => {
        this.pendingRequestCount--;
        if (err) {
          this.isLoggedIn = false;
          return console.log("err: ", err);
        }
        return (this.isLoggedIn = true);
      })
    );
  }

  @action
  getFiles() {
    this.pendingRequestCount++;
    let token = this.getAccessToken();
    let refresh_token = this.getRefreshToken();
    let req = superagent.post(`${HOST}/google/file/list`);
    req.send({token:token,refresh_token:refresh_token})
    .end(
      action("file-callback", (err, res) => {
        if (err) {
          console.log("err: ", err);
        }
        if(res.status === 401){
          console.log(err);
          // this.login();
        }
        this.fileList.push(...res.body);
        this.pendingRequestCount--;
      })
    );
  }

  @action
  downloadFile(file) {
    this.pendingRequestCount++;
    let token = this.getAccessToken();
    let refresh_token = this.getRefreshToken();
    let req = superagent.post(`${HOST}/google/file/download`);
    req.send({token:token,refresh_token:refresh_token,file_id:file.id})
    .end(
      action("file-callback", (err, res) => {
        if (err) {
          console.log("err: ", err);
        }
        if(res.status === 401){
          console.log(err);
          // this.login();
        }
        this.pendingRequestCount--;
      })
    );
  }
}

export class Idea {
  id;
  title;
  attr;
  style;
  ideas;
  date;
  @observable visible = false;
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.ideas = obj.ideas;
    this.style = obj.style;
    this.visible = false;
    this.date = obj.date || moment();
  }
}