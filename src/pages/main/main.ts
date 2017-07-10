import { Component } from '@angular/core';
import {NavController, IonicPage} from "ionic-angular/index";
import { AlertController } from 'ionic-angular';
import { AudioProvider } from 'ionic-audio';

/**
 * Generated class for the MainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  words:any[];
  indexWords:any[];
  allClick:boolean = false;
  indexCard:number = 0;
  searchKey:boolean = false;
  isBackIndex:boolean = false;
  isFrontIndex:boolean = true;
  isClicked: boolean = false;
  allTracks: any[];
  selectedTrack = 0;
  startIndex:any;
  nextIndex:any;
  endIndex:any;

  constructor(public navCtrl:NavController,public alertCtrl: AlertController,private _audioProvider: AudioProvider) {this.initializeItems();}

  ngAfterContentInit() {
    // get all tracks managed by AudioProvider so we can control playback via the API
    this.allTracks = this._audioProvider.tracks;
  }
  playSelectedTrack(card,indexWords) {
    this.startIndex = indexWords[0].id;
    this.endIndex = indexWords[indexWords.length-1].id
    this._audioProvider.play(card.id);
    this.nextIndex = card.id;
  }

  pauseSelectedTrack() {
    // use AudioProvider to control selected track
    this._audioProvider.pause(this.selectedTrack);
  }

  onTrackFinished(track: any) {
    if(this.nextIndex == this.endIndex) {
    this.nextIndex = this.startIndex;
    } else {
    this.nextIndex++;
    }
    this.selectedTrack = this.nextIndex;
    this._audioProvider.play(this.nextIndex);
  }

  clickForSearch(){
    this.pauseSelectedTrack();
    this.searchKey = true;
    this.isClicked = false;
  }
  clickForAll(){
    this.pauseSelectedTrack();
    this.allClick = true;
    this.searchKey = false;
  }
  clickForCard(){
    this.pauseSelectedTrack();
    this.allClick = false;
    this.isClicked = true;
  }
  cardIncr(){
    this.pauseSelectedTrack();
    if(this.indexCard < this.words.length){
      this.indexCard ++;
      this.indexWords = this.words[this.indexCard].card;
    } else {
      alert("pliz")
    }
    this.setBackAndFrontIndex();
  }

  private setBackAndFrontIndex() {
  this.pauseSelectedTrack();
    if (this.indexCard > 0) {
      this.isBackIndex = true;
    } else {
      this.isBackIndex = false;
    }

    if (this.indexCard < 47) {
      this.isFrontIndex = true;
    } else {
      this.isFrontIndex = false;
    }
  }
  cardDec(){
    this.pauseSelectedTrack();
    this.indexCard --;
    this.indexWords = this.words[this.indexCard].card;

    this.setBackAndFrontIndex();
  }
  doPrompt() {
    this.pauseSelectedTrack();
    let prompt = this.alertCtrl.create({
      title: 'Jump To Card',
      inputs: [
        {
          name: 'title',
          placeholder: 'Card Number(0-47)'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            console.log('Saved clicked',data.title);
            this.indexCard = data.title;
            this.indexWords = this.words[this.indexCard].card;
            this.setBackAndFrontIndex();
          }
        }
      ]
    });
    prompt.present();

  };

  initializeItems(){
    this.words =[

      { id: 1,
        width:"50%'",
        card: [
          {word: "Hello", irish: "assets/img/1.1.png", src:"assets/audio/1.1.mp3"},
          {word: "Yes", irish:  "assets/img/1.2.png",src:"assets/audio/1.2.mp3"},
          {word: "And", irish: "assets/img/1.3.png", src:"assets/audio/1.3.mp3"},
          {word: "No", irish: "assets/img/1.4.png",src:"assets/audio/1.4.mp3"}
        ]
      },

      {id: 2,
        card: [
          {word: "Good day", irish: "assets/img/2.1.png", other: "la mah", src:"assets/audio/2.1.mp3"},
          {word: "Good evening", irish: "assets/img/2.2.png", other: "tra-no-na mah", src:"assets/audio/2.2.mp3"},
          {word: "Good night", irish: "assets/img/2.3.png", other: "e-ha mah", src:"assets/audio/2.3.mp3"},
          {word: "Good bye", irish: "assets/img/2.4.png", other: "slan",src:"assets/audio/2.4.mp3"}
        ]
      },

      {id: 3,
        card: [
          {word: "How much?", irish: "assets/img/3.1.png", other: "kay vade", src:"assets/audio/3.1.mp3"},
          {word: "Please", irish:"assets/img/3.2.png", other: "leh duh hull", src:"assets/audio/3.2.mp3"},
          {word: "Thank you", irish: "assets/img/3.3.png", other: "gu ro mah ag-ut", src:"assets/audio/3.3.mp3"},
          {word: "Excuse me", irish: "assets/img/3.4.png", other: "go ma lesh-cale",src:"assets/audio/3.4.mp3"}
        ]
      },

      {id: 4,
        card: [
          {word: "I like", irish: "assets/img/4.1.png", other: "is mah lum", src:"assets/audio/4.1.mp3"},
          {word: "The beach", irish: "assets/img/4.2.png", other: "an traw", src:"assets/audio/4.2.mp3"},
          {word: "The park", irish: "assets/img/4.3.png", other: "an fork", src:"assets/audio/4.3.mp3"},
          {word: "The zoo", irish: "assets/img/4.4.png", other: "an zoo", src:"assets/audio/4.4.mp3"},
          {word: "The museum", irish: "assets/img/4.5.png", other: "ah mu-sayum",src:"assets/audio/4.5.mp3"}
        ]
      },

      {id: 5,
        card: [
          {word: "I have money", irish: "assets/img/5.1.png", other: "assets/img/5.1.png", src:"assets/audio/5.1.mp3"},
          {word: "You have money", irish: "assets/img/5.2.png", other: "assets/img/5.2.png", src:"assets/audio/5.2.mp3"},
          {word: "We have money", irish: "assets/img/5.3.png", other: "assets/img/5.3.png", src:"assets/audio/5.3.mp3"},
          {word: "They have money", irish: "assets/img/5.4.png", other: "assets/img/5.4.png", src:"assets/audio/5.4.mp3"},
          {word: "You have money(Plural)", irish: "assets/img/5.5.png", other: "assets/img/5.5.png",src:"assets/audio/5.5.mp3"},
        ]
      },

      {id:6,
        card:[
          {word:"1", irish:"assets/img/6.1.png",other:"ane", src:"assets/audio/6.1.mp3"},
          {word:"2", irish:"assets/img/6.2.png",other:"do", src:"assets/audio/6.2.mp3"},
          {word:"3", irish:"assets/img/6.3.png",other:"Trí", src:"assets/audio/6.3.mp3"},
          {word:"4", irish:"assets/img/6.4.png",other:"ca-har", src:"assets/audio/6.4.mp3"},
          {word:"5", irish:"assets/img/6.5.png",other:"coo-ig", src:"assets/audio/6.5.mp3"},
          {word:"6", irish:"assets/img/6.6.png",other:"Shay", src:"assets/audio/6.6.mp3"},
          {word:"7", irish:"assets/img/6.7.png",other:"Seacht", src:"assets/audio/6.7.mp3"},
          {word:"8", irish:"assets/img/6.8.png",other:"ucht", src:"assets/audio/6.8.mp3"},
          {word:"9", irish:"assets/img/6.9.png",other:"nee", src:"assets/audio/6.9.mp3"},
          {word:"10",irish:"assets/img/6.10.png",other:"je", src:"assets/audio/6.10.mp3"},
        ]},

      {id:7,
        card:[
          {word:"The shops",irish:"assets/img/7.1.png",other:"nashup-ee", src:"assets/audio/7.1.mp3"},
          {word:"The church",irish:"assets/img/7.2.png",other:"an sha-pail", src:"assets/audio/7.2.mp3"},
          {word:"The pharmacy",irish:"assets/img/7.3.png",other:"an put-ig-air", src:"assets/audio/7.3.mp3"},
          {word:"The school",irish:"assets/img/7.4.png",other:"anscul", src:"assets/audio/7.4.mp3"},
        ]},

      {id:8,
        card:[
          {word:"Spring",irish:"assets/img/8.1.png", src:"assets/audio/8.1.mp3"},
          {word:"Summer",irish:"assets/img/8.2.png", src:"assets/audio/8.2.mp3"},
          {word:"Autumn",irish:"assets/img/8.3.png", src:"assets/audio/8.3.mp3"},
          {word:"Winter",irish:"assets/img/8.4.png", src:"assets/audio/8.4.mp3"},
        ]},

      {id:9,
        card:[{word:"Man",irish:"assets/img/9.1.png", src:"assets/audio/9.1.mp3"},
          {word:"Woman",irish:"assets/img/9.2.png", src:"assets/audio/9.2.mp3"},
          {word:"Girl",irish:"assets/img/9.3.png", src:"assets/audio/9.3.mp3"},
          {word:"Boy",irish:"assets/img/9.4.png", src:"assets/audio/9.4.mp3"},
        ]},

      {id:10,
        card:[
          {word:"Where is?",irish:"assets/img/10.1.png",other:"ca wil", src:"assets/audio/10.1.mp3"},
          {word:"Where is my?",irish:"assets/img/10.2.png",other:"ca wil muh", src:"assets/audio/10.2.mp3"},
          {word:"Hat",irish:"assets/img/10.3.png", src:"assets/audio/10.3.mp3"},
          {word:"Apple",irish:"assets/img/10.4.png", src:"assets/audio/10.4.mp3"},
        ]},

      {
        id: 11,
        card:[
          {word:"Airport",irish:"assets/img/11.1.png",other:"er-fort", src:"assets/audio/128.1.mp3"},
          {word:"Hospital ",irish:"assets/img/11.2.png",other:"us-pid-ale", src:"assets/audio/11.2.mp3"},
          {word:"Toilets",irish:"assets/img/11.3.png",other:"leh-rus", src:"assets/audio/11.3.mp3"},
          {word:" Door",irish:"assets/img/11.4.png",other:"dur-as",src:"assets/audio/11.4.mp3"}
        ]},

      {
        id:12,
        card:[
          {word:"Mother",irish:"assets/img/12.1.png",other:"maw-her", src:"assets/audio/12.1.mp3"},
          {word:"Fatherx",irish:"assets/img/12.2.png",other:"a-her", src:"assets/audio/12.2.mp3"},
          {word:" Brother ",irish:"assets/img/12.3.png",other:"jer-har", src:"assets/audio/12.3.mp3"},
          {word:"Sister",irish:"assets/img/12.4.png",other:"jer-foor", src:"assets/audio/12.4.mp3"},
        ]},

      {id:13,
        card:[
          {word:"I want",irish:"assets/img/13.1.png",other:"ba-wah lum", src:"assets/audio/13.1.mp3"},
          {word:"You want",irish:"assets/img/13.2.png",other:"ba-wah lat", src:"assets/audio/13.2.mp3"},
          {word:"We want ",irish:"assets/img/13.3.png",other:"ba-wah lin", src:"assets/audio/13.3.mp3"},
          {word:"They want",irish:"assets/img/13.4.png",other:"ba-wah low", src:"assets/audio/13.4.mp3"},
        ]},

      {id:14,
        card:[
          {word:"Now",irish:"assets/img/14.1.png",other:"an-ish", src:"assets/audio/14.1.mp3"},
          {word:"Here ",irish:"assets/img/14.2.png",other:"an-shuh", src:"assets/audio/14.2.mp3"},
          {word:" There",irish:"assets/img/14.3.png",other:"an-shin", src:"assets/audio/14.3.mp3"},
          {word:"For",irish:"assets/img/14.4.png",other:"duh", src:"assets/audio/14.4.mp3"},
        ]},

      {id:15,
        card:[
          {word:"What?",irish:"assets/img/15.1.png",other:"ceard", src:"assets/audio/15.1.mp3"},
          {word:"Who? ",irish:"assets/img/15.2.png",other:"cay", src:"assets/audio/15.2.mp3"},
          {word:" Why?",irish:"assets/img/15.3.png",other:"cane faw", src:"assets/audio/15.3.mp3"},
          {word:"When?",irish:"assets/img/15.4.png",other:"cane oo-r", src:"assets/audio/15.4.mp3"},
        ]},

      {id:16,
        card:[
          {word:"You",irish:"assets/img/16.1.png",other:"Tus-a", src:"assets/audio/16.1.mp3"},
          {word:"I",irish:"assets/img/16.2.png",other:"Mish-e", src:"assets/audio/16.2.mp3"},
          {word:"Her",irish:"assets/img/16.3.png",other:"Ish-e", src:"assets/audio/16.3.mp3"},
          {word:"Him",irish:"assets/img/16.4.png",other:"esh-ean", src:"assets/audio/16.4.mp3"},
        ]},

      {id:17,
        card:[
          {word:"What’s your name?",irish:"assets/img/17.1.png",other:"cod is anim ditch", src:"assets/audio/17.1.mp3"},
          {word:"What is this?",irish:"assets/img/17.2.png",other:"ceard ay shuh", src:"assets/audio/17.2.mp3"},
          {word:"Would you like?",irish:"assets/img/17.3.png",other:"er wah lat", src:"assets/audio/17.3.mp3"},
          {word:"What time is it?",irish:"assets/img/17.4.png",other:"cane tom ay", src:"assets/audio/17.4.mp3"},
        ]},

      {id:18,
        card:[
          {word:"Blue",irish:"assets/img/18.1.png",other:"gurom", src:"assets/audio/18.1.mp3"},
          {word:"Red",irish:"assets/img/18.2.png",other:"jearag", src:"assets/audio/18.2.mp3"},
          {word:"Green",irish:"assets/img/18.3.png",other:"glas", src:"assets/audio/18.3.mp3"},
          {word:"Black",irish:"assets/img/18.4.png",other:"duv", src:"assets/audio/18.4.mp3"},
        ]},

      {id:19,
        card:[
          {word:"Yellow",irish:"assets/img/19.1.png",other:"bwee", src:"assets/audio/19.1.mp3"},
          {word:"Orange",irish:"assets/img/19.2.png",other:"or-awshta", src:"assets/audio/19.2.mp3"},
          {word:"Pink",irish:"assets/img/19.3.png",other:"bawn-jearag", src:"assets/audio/19.3.mp3"},
          {word:"Brown",irish:"assets/img/19.4.png",other:"dun", src:"assets/audio/19.4.mp3"},
        ]},

      {id:20,
        card:[
          {word:"My name is AnneÁine is ainm dom", irish: "assets/img/20.1.png",other:"awe-nyaisanim dum", src:"assets/audio/20.1.mp3"},
          {word:"And you?",irish:"assets/img/20.2.png",other:"ag-us tu-sa", src:"assets/audio/20.2.mp3"},
          {word:"I am from Galway",irish:"assets/img/20.3.png",other:"isasgall-yiv may", src:"assets/audio/20.3.mp3"},
          {word:"From where?",irish:"assets/img/20.4.png",other:"as cane ait", src:"assets/audio/20.4.mp3"},
        ]},

      {id:21,
        card:[
          {word:"Open",irish:"assets/img/21.1.png",other:"us-cal-che", src:"assets/audio/21.1.mp3"},
          {word:"Closed",irish:"assets/img/21.2.png",other:"doon-ta", src:"assets/audio/21.2.mp3"},
          {word:"To buy",irish:"assets/img/21.3.png",other:"leh cyan-ucht", src:"assets/audio/21.3.mp3"},
          {word:"Nothing",irish:"assets/img/21.4.png",other:"nawd", src:"assets/audio/21.4.mp3"},
        ]},

      {id:22,
        card:[
          {word:"Chocolate",irish:"assets/img/22.1.png",other:"shoc-lawdge", src:"assets/audio/22.1.mp3"},
          {word:"Salad",irish:"assets/img/22.2.png",other:"sal-ade", src:"assets/audio/22.2.mp3"},
          {word:"Toast",irish:"assets/img/22.3.png",other:"ar-awn ros-ta", src:"assets/audio/22.3.mp3"},
          {word:"Fruit",irish:"assets/img/22.4.png",other:"tor-hee", src:"assets/audio/22.4.mp3"},
        ]},

      {id: 23,
        card:[
          {word:"Mondya",irish:"assets/img/23.1.png",other:"jay loon", src:"assets/audio/23.1.mp3"},
          {word:"Tuseday",irish:"assets/img/23.2.png",other:"jay mort", src:"assets/audio/23.2.mp3"},
          {word:"Wednesday",irish:"assets/img/23.3.png",other:"jay cade-een", src:"assets/audio/23.3.mp3"},
          {word:"Thursday",irish:"assets/img/23.4.png",other:"jer-deen", src:"assets/audio/23.4.mp3"},
          {word:"Friday",irish:"assets/img/23.5.png",other:"jay he-na", src:"assets/audio/23.5.mp3"},
          {word:"Saturday",irish:"assets/img/23.6.png",other:"jay sa-har-in", src:"assets/audio/23.6.mp3"},
          {word:"Sunday",irish:"assets/img/23.7.png",other:"jay do-nee",src:"assets/audio/23.7.mp3"}

        ]},

      {id:24,
        card:[
          {word:"Where is the bank?",irish:"assets/img/24.1.png",other:"cawil an bank", src:"assets/audio/24.1.mp3"},
          {word:"Where is the beach?",irish:"assets/img/24.2.png",other:"cawil antraw", src:"assets/audio/24.2.mp3"},
          {word:"Where is the park?",irish:"assets/img/24.3.png",other:"cawil an fork", src:"assets/audio/24.3.mp3"},
          {word:"Where is the Airport?",irish:"assets/img/24.4.png",other:"cawil antare-fort", src:"assets/audio/24.4.mp3"},
        ]},

      {id:25,
        card:[
          {word:"Grapes",irish:"assets/img/25.1.png",other:"feen-cwera", src:"assets/audio/25.1.mp3"},
          {word:"Banana",irish:"assets/img/25.2.png",other:"ba-na-na", src:"assets/audio/25.2.mp3"},
          {word:"Strawberries",irish:"assets/img/25.3.png",other:"soo ta-loon", src:"assets/audio/25.3.mp3"},
          {word:"Pear",irish:"Piorra",other:"assets/img/25.4.png", src:"assets/audio/25.4.mp3"},
        ]},

      {id:26,
        card:[
          {word:"Water",irish:"assets/img/26.1.png",other:"ish-ca", src:"assets/audio/26.1.mp3"},
          {word:"Coffee",irish:"assets/img/26.2.png",other:"ca-fay", src:"assets/audio/26.2.mp3"},
          {word:"Tea",irish:"assets/img/26.3.png",other:"tay", src:"assets/audio/26.3.mp3"},
          {word:"Yoghurt",irish:"assets/img/26.4.png",other:"yo-gart", src:"assets/audio/26.4.mp3"},
        ]},

      {id:27,
        card:[
          {word:"Fish",irish:"assets/img/27.1.png",other:"e-ask", src:"assets/audio/27.1.mp3"},
          {word:"Chicken",irish:"assets/img/27.2.png",other:"shi-keen", src:"assets/audio/27.2.mp3"},
          {word:"Meat",irish:"assets/img/27.3.png",other:"feowl", src:"assets/audio/27.3.mp3"},
          {word:"Vegetables",irish:"assets/img/27.4.png",other:"glas-ree", src:"assets/audio/27.4.mp3"},
        ]},

      {id:28,
        card:[
          {word:"Gold",irish:"assets/img/28.1.png",other:"or", src:"assets/audio/28.1.mp3"},
          {word:"Silver",irish:"assets/img/28.2.png",other:"are-a-ged", src:"assets/audio/28.2.mp3"},
          {word:"Pearl",irish:"assets/img/28.3.png",other:"pair-la", src:"assets/audio/28.3.mp3"},
          {word:" ",irish:"",other:"assets/img/28.4.png", src:"assets/audio/28.4.mp3"},
          {word:"Jewellery",irish:"assets/img/28.5.png",other:"", src:"assets/audio/28.5.mp3"},
        ]},

      {id:29,
        card:[
          {word:"Dancing",irish:"assets/img/29.1.png",other:"eg dow-sa", src:"assets/audio/29.1.mp3"},
          {word:"Talking",irish:"assets/img/29.2.png",other:"eg cinch", src:"assets/audio/29.2.mp3"},
          {word:"Winning",irish:"assets/img/29.3.png",other:"eg bu-inch", src:"assets/audio/29.3.mp3"},
          {word:"Losing",irish:"assets/img/29.4.png",other:"eg cyle-leah", src:"assets/audio/29.4.mp3"},
        ]},

      {id:30,
        card:[
          {word:"Bus",irish:"assets/img/30.1.png.png",other:"bus", src:"assets/audio/30.1.mp3"},
          {word:"Taxi",irish:"assets/img/30.2.png.png",other:"tax-ee", src:"assets/audio/30.2.mp3"},
          {word:"Bicycle",irish:"assets/img/30.3.png",other:"ro-har", src:"assets/audio/30.3.mp3"},
          {word:"Train",irish:"assets/img/30.4.png",other:"train", src:"assets/audio/30.4.mp3"},
        ]},

      {id:31,
        card:[
          {word:"Bread",irish:"assets/img/31.1.png",other:"ar-awn", src:"assets/audio/31.1.mp3"},
          {word:"Butter",irish:"assets/img/31.2.png",other:"im", src:"assets/audio/31.2.mp3"},
          {word:"Cheese",irish:"assets/img/31.3.png",other:"cawsh", src:"assets/audio/31.3.mp3"},
          {word:"Milk",irish:"assets/img/31.4.png",other:"ban-ye", src:"assets/audio/31.4.mp3"},
        ]},

      {id:32,
        card:[
          {word:"A book",irish:"assets/img/32.1.png",other:"lawar", src:"assets/audio/32.1.mp3"},
          {word:"A family",irish:"assets/img/32.2.png",other:"chy-loch", src:"assets/audio/32.2.mp3"},
          {word:"A hat",irish:"assets/img/32.3.png",other:"ha-ta", src:"assets/audio/32.3.mp3"},
          {word:"Money",irish:"assets/img/32.4.png",other:"are-a-ged", src:"assets/audio/32.4.mp3"},
        ]},

      {id:33,
        card:[
          {word:"Cat",irish:"assets/img/33.1.png",other:"cat", src:"assets/audio/33.1.mp3"},
          {word:"Dog",irish:"assets/img/33.2.png",other:"mad-ra", src:"assets/audio/33.2.mp3"},
          {word:"Elephant",irish:"assets/img/33.3.png",other:"il-if-fint", src:"assets/audio/33.3.mp3"},
          {word:"Horse",irish:"assets/img/33.4.png",other:"ca-pull", src:"assets/audio/33.4.mp3"},
        ]},

      {id:34,
        card:[
          {word:"Flowers",irish:"assets/img/34.1.png",other:"bla-ha-na", src:"assets/audio/34.1.mp3"},
          {word:"Telephone",irish:"assets/img/34.2.png",other:"tel-e-fown", src:"assets/audio/34.2.mp3"},
          {word:"Bag",irish:"assets/img/34.3.png",other:"mah-la", src:"assets/audio/34.3.mp3"},
          {word:"Watch",irish:"assets/img/34.4.png",other:"ur-a-dor", src:"assets/audio/34.4.mp3"},
        ]},

      {id:35,
        card:[
          {word:"Waiting",irish:"assets/img/35.1.png",other:"eg fan-ucht", src:"assets/audio/35.1.mp3"},
          {word:"Thinking",irish:"assets/img/35.2.png",other:"eg smwee-nuv", src:"assets/audio/35.2.mp3"},
          {word:"Singing",irish:"assets/img/35.3.png",other:"eg con-a", src:"assets/audio/35.3.mp3"},
          {word:"Starting",irish:"assets/img/35.4.png",other:"eg curtoosle", src:"assets/audio/35.4.mp3"},
        ]},

      {id:36,
        card:[
          {word:"Cup",irish:"assets/img/36.1.png",other:"cupawn", src:"assets/audio/36.1.mp3"},
          {word:"Glass",irish:"assets/img/36.2.png",other:"glinn-a", src:"assets/audio/36.2.mp3"},
          {word:"Plate",irish:"assets/img/36.3.png",other:"plaw-ta", src:"assets/audio/36.3.mp3"},
          {word:"Menu",irish:"assets/img/36.4.png",other:"bee-a-chlor", src:"assets/audio/36.4.mp3"},
        ]},

      {id:37,
        card:[
          {word:"Bed",irish:"assets/img/37.1.png",other:"la-ba", src:"assets/audio/37.1.mp3"},
          {word:"Bath",irish:"assets/img/37.2.png",other:"ful-ca-dawn", src:"assets/audio/37.2.mp3"},
          {word:"Table",irish:"assets/img/37.3.png",other:"bord", src:"assets/audio/37.3.mp3"},
          {word:"House",irish:"assets/img/37.4.png",other:"chockh", src:"assets/audio/37.4.mp3"},
        ]},

      {id:38,
        card:[
          {word:"Street",irish:"assets/img/38.1.png",other:"shawd", src:"assets/audio/38.1.mp3"},
          {word:"City",irish:"assets/img/38.2.png",other:"car-har", src:"assets/audio/38.2.mp3"},
          {word:"Village",irish:"assets/img/38.3.png",other:"shrawd-wall-ya", src:"assets/audio/38.3.mp3"},
          {word:"Country",irish:"assets/img/38.4.png",other:"teer", src:"assets/audio/38.4.mp3"},
        ]},

      {id:39,
        card:[
          {word:"January",irish:"assets/img/39.1.png",other:"an-ar", src:"assets/audio/39.1.mp3"},
          {word:"February",irish:"assets/img/39.2.png",other:"feeow-ra", src:"assets/audio/39.2.mp3"},
          {word:"March",irish:"assets/img/39.3.png",other:"mawr-ta", src:"assets/audio/39.3.mp3"},
          {word:"April",irish:"assets/img/39.4.png",other:"a-brawn", src:"assets/audio/39.4.mp3"},
        ]},

      {id:40,
        card:[
          {word:"Hot",irish:"assets/img/40.1.png",other:"te", src:"assets/audio/40.1.mp3"},
          {word:"Cold",irish:"assets/img/40.2.png",other:"foo-ar", src:"assets/audio/40.2.mp3"},
          {word:"Sunny",irish:"assets/img/40.3.png",other:"gre-an-war", src:"assets/audio/40.3.mp3"},
          {word:"Rainy",irish:"assets/img/40.4.png",other:"bawsh-tu-al", src:"assets/audio/40.4.mp3"},
        ]},

      {id:41,
        card:[
          {word:"Good",irish:"assets/img/41.1.png",other:"mah", src:"assets/audio/41.1.mp3"},
          {word:"Bad",irish:"assets/img/41.2.png",other:"uk", src:"assets/audio/41.2.mp3"},
          {word:"Doing well",irish:"assets/img/41.3.png",other:"eg day-niv gu mah", src:"assets/audio/41.3.mp3"},
          {word:"Nice",irish:"Deas.png",other:"assets/img/41.4", src:"assets/audio/41.4.mp3"},
        ]},

      {id:42,
        card:[
          {word:"May",irish:"assets/img/42.1.png",other:"be-al-tan-a", src:"assets/audio/42.1.mp3"},
          {word:"June",irish:"assets/img/42.2.png",other:"meh-iv", src:"assets/audio/42.2.mp3"},
          {word:"July",irish:"assets/img/42.3.png",other:"oohl", src:"assets/audio/42.3.mp3"},
          {word:"August",irish:"assets/img/42.4.png",other:"loon-a-sa", src:"assets/audio/42.4.mp3"},
        ]},

      {id:43,
        card:[
          {word:"What time is it?",irish:"assets/img/43.1.png",other:"cane tomay", src:"assets/audio/43.1.mp3"},
          {word:"One o’clock",irish:"assets/img/43.2.png",other:"a hane a chlug", src:"assets/audio/43.2.mp3"},
          {word:"Two o’clock",irish:"assets/img/43.3.png",other:"doachlug", src:"assets/audio/43.3.mp3"},
          {word:"Three o’clock",irish:"assets/img/43.4.png",other:"tree achlug", src:"assets/audio/43.4.mp3"},
          {word:"Four o’clock",irish:"assets/img/43.5.png",other:"ca-hara chlug", src:"assets/audio/43.5.mp3"},
        ]},

      {id:44,
        card:[
          {word:"Students",irish:"assets/img/44.1.png",other:"mick lane", src:"assets/audio/44.1.mp3"},
          {word:"Children",irish:"assets/img/44.2.png",other:"pawsh-tee", src:"assets/audio/44.2.mp3"},
          {word:"Adults",irish:"assets/img/44.3.png",other:"deen-ee faws-ta", src:"assets/audio/44.4.mp3"},
          {word:"Friends",irish:"assets/img/44.4.png",other:"car-ja", src:"assets/audio/44.5.mp3"},
        ]},

      {id:45,
        card:[
          {word:"September",irish:"assets/img/45.1.png",other:"man fo-war", src:"assets/audio/45.1.mp3"},
          {word:"October",irish:"assets/img/45.2.png",other:"jer-e fo-war", src:"assets/audio/45.2.mp3"},
          {word:"November",irish:"assets/img/45.3.png",other:"sow-an", src:"assets/audio/45.3.mp3"},
          {word:"December",irish:"assets/img/45.4.png",other:"nollag", src:"assets/audio/45.6.mp3"},
        ]},

      {id:46,
        card:[
          {word:"Until tomorrow",irish:"assets/img/46.1.png",other:"gu geeamar-ach", src:"assets/audio/46.1.mp3"},
          {word:"Until later",irish:"assets/img/46.2.png",other:"nees mwill-ya", src:"assets/audio/46.2.mp3"},
          {word:"Today",irish:"assets/img/46.3.png",other:"in-yu", src:"assets/audio/46.3.mp3"},
          {word:"Yesterday",irish:"assets/img/46.4.png",other:"in-yay", src:"assets/audio/46.4.mp3"},
        ]},

      {id:47,
        card:[
          {word:"Doctor",irish:"assets/img/47.1.png",other:"duch-toor", src:"assets/audio/47.1.mp3"},
          {word:"Allergy",irish:"assets/img/47.2.png",other:"al-er-guh", src:"assets/audio/47.2.mp3"},
          {word:"Asthma",irish:"assets/img/47.3.png",other:"as-ma", src:"assets/audio/47.3.mp3"},
          {word:"Nurse",irish:"assets/img/47.4.png",other:"ban-al-tra", src:"assets/audio/47.4.mp3"},
        ]},

      {id:48,
        card:[
          {word:"France",irish:"assets/img/48.1.png",other:"", src:"assets/audio/48.1.mp3"},
          {word:"Ireland",irish:"assets/img/48.2.png",other:"air-ra", src:"assets/audio/48.2.mp3"},
          {word:"England",irish:"assets/img/48.3.png",other:"sas-an-a", src:"assets/audio/48.3.mp3"},
          {word:"Italy",irish:"assets/img/48.4.png",other:"an id-awl",src:"assets/audio/48.4.mp3"}
        ]},
        ]
    this.indexWords = this.words[this.indexCard];
  };

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.indexWords = this.words[this.indexCard].card;
      this.indexWords = this.indexWords.filter((cords) => {
            return (cords.word.toString().toLowerCase().indexOf(val.toLowerCase())> -1);
      })
    }
  };

  getAllItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.words = this.words.filter((cords) => {
        return cords.card =  cords.card.filter((allCords) => {
          console.log('cards ',allCords);
          console.log('cords.toString().toLowerCase().indexOf(val.toLowerCase())> -1 ',allCords.word.toString().toLowerCase().indexOf(val.toLowerCase())> -1);
          return (allCords.word.toString().toLowerCase().indexOf(val.toLowerCase())> -1);
        })
      })
    }
  };


}
