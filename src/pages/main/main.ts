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
  isCardSelected:String = "No";
  isStopped: boolean = false
  allTracks: any[];
  selectedTrack = 0;
  startIndex:any;
  nextIndex:any;
  endIndex:any;
  isPlaying:boolean = false;
  irlFlag: string = "assets/flags/irl.jpg";
  ukFlag: string = "assets/flags/Uk.jpg";

  constructor(public navCtrl:NavController,public alertCtrl: AlertController,private _audioProvider: AudioProvider) {this.initializeItems();}

  ngAfterContentInit() {
    // get all tracks managed by AudioProvider so we can control playback via the API
    this.allTracks = this._audioProvider.tracks;
  }

  playSelectedTrack(card,indexWords) {
  this.isStopped =  false;
    this.startIndex = indexWords[0].id;
    this.endIndex = indexWords[indexWords.length-1].id
    this._audioProvider.play(card.id);
    this.nextIndex = card.id;
    this.isPlaying =  true;
  }

  pauseSelectedTrack() {
    this.selectedTrack = this.nextIndex;
    this._audioProvider.pause(this.selectedTrack);
    this.isPlaying =  false;
  }

 playSelectedTrackAll(card,indexWords) {
  this.isStopped =  false;
    this.startIndex = indexWords[0].id;
    this.endIndex = indexWords[indexWords.length-1].id
    this.isCardSelected = card.word;
    this._audioProvider.play(card.id);
    this.nextIndex = card.id;
    this.isPlaying =  true;
  }

  pauseSelectedTrackAll() {
    // use AudioProvider to control selected track
    this._audioProvider.pause(this.selectedTrack);
    this.isPlaying =  false;
  }


  stopSelectedTrackAll(card, indexWords){
    this.isPlaying =  false;
    this.isStopped =  true;
    this._audioProvider.stop();
  }

  onTrackFinished() {
    if(this.nextIndex == this.endIndex) {
    this.nextIndex = this.startIndex;
    } else {
    this.nextIndex++;
    }
    this.selectedTrack = this.nextIndex;
    if (!this.isStopped) {
    this._audioProvider.play(this.nextIndex);
    }

  }

  clickForSearch(){
    this.pauseSelectedTrack();
    this.searchKey = true;
    this.isClicked = false;
  }
  clickForAll(){
    this.getAllItems(null);
    this.pauseSelectedTrack();
    this.allClick = true;
    this.searchKey = false;
  }
  clickForCard(){
    this.getItems(null);
    this.pauseSelectedTrack();
    this.allClick = false;
    this.isClicked = true;
  }
  cardIncr(){
    this.pauseSelectedTrack();
    if(this.indexCard < this.words.length){
      this.indexCard ++;
      this.indexWords = this.words[this.indexCard];
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

    if (this.indexCard < 50) {
      this.isFrontIndex = true;
    } else {
      this.isFrontIndex = false;
    }
  }
  cardDec(){
    this.pauseSelectedTrack();
    this.indexCard --;
    this.indexWords = this.words[this.indexCard];

    this.setBackAndFrontIndex();
  }

  stopSelectedTrack(card, indexWords){
    this.isPlaying =  false;
    this.isStopped =  true;
    this._audioProvider.stop();
  }
  doPrompt() {
    this.pauseSelectedTrack();
    let prompt = this.alertCtrl.create({
      title: 'Jump To Card',
      inputs: [
        {
          name: 'title',
          placeholder: 'Card Number(0-50)'
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
            if (data.title < 51 && data.title != "") {
              console.log('Saved clicked', data.title);
              this.indexCard = data.title;
              this.indexWords = this.words[this.indexCard];
              this.setBackAndFrontIndex();
            }
          }
        }
      ]
    });
    prompt.present();

  };

  initializeItems(){
    this.words =[

          { id: 1,
            width:{'width':'50%'},
            card: [
              {word: "Hello", irish: "assets/img/1.1.jpg", src:"assets/audio/1.1.mp3"},
              {word: "Yes", irish:  "assets/img/1.2.jpg",src:"assets/audio/1.2.mp3"},
              {word: "And", irish: "assets/img/1.3.jpg", src:"assets/audio/1.3.mp3"},
              {word: "No", irish: "assets/img/1.4.jpg",src:"assets/audio/1.4.mp3"}
            ]
          },

          {id: 2,
            width:{'width':'60%'},
            card: [
              {word: "Good day", irish: "assets/img/2.1.jpg", other: "la mah", src:"assets/audio/2.1.mp3"},
              {word: "Good evening", irish: "assets/img/2.2.jpg", other: "tra-no-na mah", src:"assets/audio/2.2.mp3"},
              {word: "Good night", irish: "assets/img/2.3.jpg", other: "e-ha mah", src:"assets/audio/2.3.mp3"},
              {word: "Good bye", irish: "assets/img/2.4.jpg", other: "slan",src:"assets/audio/2.4.mp3"}
            ]
          },

          {id: 3,
            width:{'width':'70%'},
            card: [
              {word: "How much?", irish: "assets/img/3.1.jpg", other: "kay vade", src:"assets/audio/3.1.mp3"},
              {word: "Please", irish:"assets/img/3.2.jpg", other: "leh duh hull", src:"assets/audio/3.2.mp3"},
              {word: "Thank you", irish: "assets/img/3.3.jpg", other: "gu ro mah ag-ut", src:"assets/audio/3.3.mp3"},
              {word: "Excuse me", irish: "assets/img/3.4.jpg", other: "go ma lesh-cale",src:"assets/audio/3.4.mp3"}
            ]
          },

          {id: 4,
            width:{'width':'70%'},
            card: [
              {word: "I like", irish: "assets/img/4.1.jpg", other: "is mah lum", src:"assets/audio/4.1.mp3"},
              {word: "The beach", irish: "assets/img/4.2.jpg", other: "an traw", src:"assets/audio/4.2.mp3"},
              {word: "The park", irish: "assets/img/4.3.jpg", other: "an fork", src:"assets/audio/4.3.mp3"},
              {word: "The zoo", irish: "assets/img/4.4.jpg", other: "an zoo", src:"assets/audio/4.4.mp3"}
              ]
          },

          {id: 5,
            width:{'width':'70%'},
            card: [
              {word: "I have money", irish: "assets/img/5.1.jpg", other: "assets/img/5.1.jpg", src:"assets/audio/5.1.mp3"},
              {word: "You have money", irish: "assets/img/5.2.jpg", other: "assets/img/5.2.jpg", src:"assets/audio/5.2.mp3"},
              {word: "We have money", irish: "assets/img/5.3.jpg", other: "assets/img/5.3.jpg", src:"assets/audio/5.3.mp3"},
              {word: "They have money", irish: "assets/img/5.4.jpg", other: "assets/img/5.4.jpg", src:"assets/audio/5.4.mp3"}
            ]
          },

          {id:6,
            width:{'width':'60%'},
            card:[
              {word:"1", irish:"assets/img/6.1.jpg",other:"ane", src:"assets/audio/6.1.mp3"},
              {word:"2", irish:"assets/img/6.2.jpg",other:"do", src:"assets/audio/6.2.mp3"},
              {word:"3", irish:"assets/img/6.3.jpg",other:"Trí", src:"assets/audio/6.3.mp3"},
              {word:"4", irish:"assets/img/6.4.jpg",other:"ca-har", src:"assets/audio/6.4.mp3"}
            ]
    		},

          {id:7,
            width:{'width':'60%'},
            card:[
              {word:"The shops",irish:"assets/img/7.1.jpg",other:"nashup-ee", src:"assets/audio/7.1.mp3"},
              {word:"The church",irish:"assets/img/7.2.jpg",other:"an sha-pail", src:"assets/audio/7.2.mp3"},
              {word:"The pharmacy",irish:"assets/img/7.3.jpg",other:"an put-ig-air", src:"assets/audio/7.3.mp3"},
              {word:"The school",irish:"assets/img/7.4.jpg",other:"anscul", src:"assets/audio/7.4.mp3"},
            ]},

          {id:8,
            width:{'width':'60%'},
            card:[
              {word:"Spring",irish:"assets/img/8.1.jpg", src:"assets/audio/8.1.mp3"},
              {word:"Summer",irish:"assets/img/8.2.jpg", src:"assets/audio/8.2.mp3"},
              {word:"Autumn",irish:"assets/img/8.3.jpg", src:"assets/audio/8.3.mp3"},
              {word:"Winter",irish:"assets/img/8.4.jpg", src:"assets/audio/8.4.mp3"},
            ]},

          {id:9,
            width:{'width':'60%'},
            card:[{word:"Man",irish:"assets/img/9.1.jpg", src:"assets/audio/9.1.mp3"},
              {word:"Woman",irish:"assets/img/9.2.jpg", src:"assets/audio/9.2.mp3"},
              {word:"Girl",irish:"assets/img/9.3.jpg", src:"assets/audio/9.3.mp3"},
              {word:"Boy",irish:"assets/img/9.4.jpg", src:"assets/audio/9.4.mp3"},
            ]},

          {id:10,
            width:{'width':'60%'},
            card:[
              {word:"Where is?",irish:"assets/img/10.1.jpg",other:"ca wil", src:"assets/audio/10.1.mp3"},
              {word:"Where is my?",irish:"assets/img/10.2.jpg",other:"ca wil muh", src:"assets/audio/10.2.mp3"},
              {word:"Hat",irish:"assets/img/10.3.jpg", src:"assets/audio/10.3.mp3"},
              {word:"Apple",irish:"assets/img/10.4.jpg", src:"assets/audio/10.4.mp3"},
            ]},

          {
            id: 11,
            width:{'width':'60%'},
            card:[
              {word:"Airport",irish:"assets/img/11.1.jpg",other:"er-fort", src:"assets/audio/11.1.mp3"},
              {word:"Hospital ",irish:"assets/img/11.2.jpg",other:"us-pid-ale", src:"assets/audio/11.2.mp3"},
              {word:"Toilets",irish:"assets/img/11.3.jpg",other:"leh-rus", src:"assets/audio/11.3.mp3"},
              {word:" Door",irish:"assets/img/11.4.jpg",other:"dur-as",src:"assets/audio/11.4.mp3"}
            ]},

          {
            id:12,
            width:{'width':'60%'},
            card:[
              {word:"Mother",irish:"assets/img/12.1.jpg",other:"maw-her", src:"assets/audio/12.1.mp3"},
              {word:"Father",irish:"assets/img/12.2.jpg",other:"a-her", src:"assets/audio/12.2.mp3"},
              {word:" Brother ",irish:"assets/img/12.3.jpg",other:"jer-har", src:"assets/audio/12.3.mp3"},
              {word:"Sister",irish:"assets/img/12.4.jpg",other:"jer-foor", src:"assets/audio/12.4.mp3"},
            ]},

          {id:13,
            width:{'width':'60%'},
            card:[
              {word:"I want",irish:"assets/img/13.1.jpg",other:"ba-wah lum", src:"assets/audio/13.1.mp3"},
              {word:"You want",irish:"assets/img/13.2.jpg",other:"ba-wah lat", src:"assets/audio/13.2.mp3"},
              {word:"We want ",irish:"assets/img/13.3.jpg",other:"ba-wah lin", src:"assets/audio/13.3.mp3"},
              {word:"They want",irish:"assets/img/13.4.jpg",other:"ba-wah low", src:"assets/audio/13.4.mp3"},
            ]},

          {id:14,
            width:{'width':'60%'},
            card:[
              {word:"Now",irish:"assets/img/14.1.jpg",other:"an-ish", src:"assets/audio/14.1.mp3"},
              {word:"Here ",irish:"assets/img/14.2.jpg",other:"an-shuh", src:"assets/audio/14.2.mp3"},
              {word:" There",irish:"assets/img/14.3.jpg",other:"an-shin", src:"assets/audio/14.3.mp3"},
              {word:"For",irish:"assets/img/14.4.jpg",other:"duh", src:"assets/audio/14.4.mp3"},
            ]},

          {id:15,
            width:{'width':'60%'},
            card:[
              {word:"What?",irish:"assets/img/15.1.jpg",other:"ceard", src:"assets/audio/15.1.mp3"},
              {word:"Who? ",irish:"assets/img/15.2.jpg",other:"cay", src:"assets/audio/15.2.mp3"},
              {word:" Why?",irish:"assets/img/15.3.jpg",other:"cane faw", src:"assets/audio/15.3.mp3"},
              {word:"When?",irish:"assets/img/15.4.jpg",other:"cane oo-r", src:"assets/audio/15.4.mp3"},
            ]},

          {id:16,
            width:{'width':'60%'},
            card:[
              {word:"You",irish:"assets/img/16.1.jpg",other:"Tus-a", src:"assets/audio/16.1.mp3"},
              {word:"I",irish:"assets/img/16.2.jpg",other:"Mish-e", src:"assets/audio/16.2.mp3"},
              {word:"Her",irish:"assets/img/16.3.jpg",other:"Ish-e", src:"assets/audio/16.3.mp3"},
              {word:"Him",irish:"assets/img/16.4.jpg",other:"esh-ean", src:"assets/audio/16.4.mp3"},
            ]},

          {id:17,
            width:{'width':'60%'},
            card:[
              {word:"What’s your name?",irish:"assets/img/17.1.jpg",other:"cod is anim ditch", src:"assets/audio/17.1.mp3"},
              {word:"What is this?",irish:"assets/img/17.2.jpg",other:"ceard ay shuh", src:"assets/audio/17.2.mp3"},
              {word:"Would you like?",irish:"assets/img/17.3.jpg",other:"er wah lat", src:"assets/audio/17.3.mp3"},
              {word:"What time is it?",irish:"assets/img/17.4.jpg",other:"cane tom ay", src:"assets/audio/17.4.mp3"},
            ]},

          {id:18,
            width:{'width':'60%'},
            card:[
              {word:"Blue",irish:"assets/img/18.1.jpg",other:"gurom", src:"assets/audio/18.1.mp3"},
              {word:"Red",irish:"assets/img/18.2.jpg",other:"jearag", src:"assets/audio/18.2.mp3"},
              {word:"Green",irish:"assets/img/18.3.jpg",other:"glas", src:"assets/audio/18.3.mp3"},
              {word:"Black",irish:"assets/img/18.4.jpg",other:"duv", src:"assets/audio/18.4.mp3"},
            ]},

          {id:19,
            width:{'width':'60%'},
            card:[
              {word:"Yellow",irish:"assets/img/19.1.jpg",other:"bwee", src:"assets/audio/19.1.mp3"},
              {word:"Orange",irish:"assets/img/19.2.jpg",other:"or-awshta", src:"assets/audio/19.2.mp3"},
              {word:"Pink",irish:"assets/img/19.3.jpg",other:"bawn-jearag", src:"assets/audio/19.3.mp3"},
              {word:"Brown",irish:"assets/img/19.4.jpg",other:"dun", src:"assets/audio/19.4.mp3"},
            ]},

          {id:20,
            width:{'width':'60%'},
            card:[
              {word:"My name is Anne", irish: "assets/img/20.1.jpg",other:"awe-nyaisanim dum", src:"assets/audio/20.1.mp3"},
              {word:"And you?",irish:"assets/img/20.2.jpg",other:"ag-us tu-sa", src:"assets/audio/20.2.mp3"},
              {word:"I am from Galway",irish:"assets/img/20.3.jpg",other:"isasgall-yiv may", src:"assets/audio/20.3.mp3"},
              {word:"From where?",irish:"assets/img/20.4.jpg",other:"as cane ait", src:"assets/audio/20.4.mp3"},
            ]},

          {id:21,
            width:{'width':'60%'},
            card:[
              {word:"Open",irish:"assets/img/21.1.jpg",other:"us-cal-che", src:"assets/audio/21.1.mp3"},
              {word:"Closed",irish:"assets/img/21.2.jpg",other:"doon-ta", src:"assets/audio/21.2.mp3"},
              {word:"To buy",irish:"assets/img/21.3.jpg",other:"leh cyan-ucht", src:"assets/audio/21.3.mp3"},
              {word:"Nothing",irish:"assets/img/21.4.jpg",other:"nawd", src:"assets/audio/21.4.mp3"},
            ]},

          {id:22,
            width:{'width':'60%'},
            card:[
              {word:"Chocolate",irish:"assets/img/22.1.jpg",other:"shoc-lawdge", src:"assets/audio/22.1.mp3"},
              {word:"Salad",irish:"assets/img/22.2.jpg",other:"sal-ade", src:"assets/audio/22.2.mp3"},
              {word:"Toast",irish:"assets/img/22.3.jpg",other:"ar-awn ros-ta", src:"assets/audio/22.3.mp3"},
              {word:"Fruit",irish:"assets/img/22.4.jpg",other:"tor-hee", src:"assets/audio/22.4.mp3"},
            ]},

          {id: 23,
            width:{'width':'60%'},
            card:[
              {word:"Monday",irish:"assets/img/23.1.jpg",other:"jay loon", src:"assets/audio/23.1.mp3"},
              {word:"Tuseday",irish:"assets/img/23.2.jpg",other:"jay mort", src:"assets/audio/23.2.mp3"},
              {word:"Wednesday",irish:"assets/img/23.3.jpg",other:"jay cade-een", src:"assets/audio/23.3.mp3"},
              {word:"Thursday",irish:"assets/img/23.4.jpg",other:"jer-deen", src:"assets/audio/23.4.mp3"}
            ]},

          {id:24,
            width:{'width':'70%'},
            card:[
              {word:"Where is the bank?",irish:"assets/img/24.1.jpg",other:"cawil an bank", src:"assets/audio/24.1.mp3"},
              {word:"Where is the beach?",irish:"assets/img/24.2.jpg",other:"cawil antraw", src:"assets/audio/24.2.mp3"},
              {word:"Where is the park?",irish:"assets/img/24.3.jpg",other:"cawil an fork", src:"assets/audio/24.3.mp3"},
              {word:"Where is the Airport?",irish:"assets/img/24.4.jpg",other:"cawil antare-fort", src:"assets/audio/24.4.mp3"},
            ]},

          {id:25,
            width:{'width':'60%'},
            card:[
              {word:"Grapes",irish:"assets/img/25.1.jpg",other:"feen-cwera", src:"assets/audio/25.1.mp3"},
              {word:"Banana",irish:"assets/img/25.2.jpg",other:"ba-na-na", src:"assets/audio/25.2.mp3"},
              {word:"Strawberries",irish:"assets/img/25.3.jpg",other:"soo ta-loon", src:"assets/audio/25.3.mp3"},
              {word:"Pear",irish:"assets/img/25.4.jpg",other:"Piorra", src:"assets/audio/25.4.mp3"},
            ]},

          {id:26,
            width:{'width':'60%'},
            card:[
              {word:"Water",irish:"assets/img/26.1.jpg",other:"ish-ca", src:"assets/audio/26.1.mp3"},
              {word:"Coffee",irish:"assets/img/26.2.jpg",other:"ca-fay", src:"assets/audio/26.2.mp3"},
              {word:"Tea",irish:"assets/img/26.3.jpg",other:"tay", src:"assets/audio/26.3.mp3"},
              {word:"Yoghurt",irish:"assets/img/26.4.jpg",other:"yo-gart", src:"assets/audio/26.4.mp3"},
            ]},

          {id:27,
            width:{'width':'60%'},
            card:[
              {word:"Fish",irish:"assets/img/27.1.jpg",other:"e-ask", src:"assets/audio/27.1.mp3"},
              {word:"Chicken",irish:"assets/img/27.2.jpg",other:"shi-keen", src:"assets/audio/27.2.mp3"},
              {word:"Meat",irish:"assets/img/27.3.jpg",other:"feowl", src:"assets/audio/27.3.mp3"},
              {word:"Vegetables",irish:"assets/img/27.4.jpg",other:"glas-ree", src:"assets/audio/27.4.mp3"},
            ]},

          {id:28,
            width:{'width':'60%'},
            card:[
              {word:"Gold",irish:"assets/img/28.1.jpg",other:"or", src:"assets/audio/28.1.mp3"},
              {word:"Silver",irish:"assets/img/28.2.jpg",other:"are-a-ged", src:"assets/audio/28.2.mp3"},
              {word:"Pearl",irish:"assets/img/28.3.jpg",other:"pair-la", src:"assets/audio/28.3.mp3"},
              {word:"Jewellery ",irish:"assets/img/28.4.jpg",other:"", src:"assets/audio/28.4.mp3"},
            ]},

          {id:29,
            width:{'width':'60%'},
            card:[
              {word:"Dancing",irish:"assets/img/29.1.jpg",other:"eg dow-sa", src:"assets/audio/29.1.mp3"},
              {word:"Talking",irish:"assets/img/29.2.jpg",other:"eg cinch", src:"assets/audio/29.2.mp3"},
              {word:"Winning",irish:"assets/img/29.3.jpg",other:"eg bu-inch", src:"assets/audio/29.3.mp3"},
              {word:"Losing",irish:"assets/img/29.4.jpg",other:"eg cyle-leah", src:"assets/audio/29.4.mp3"},
            ]},

          {id:30,
            width:{'width':'60%'},
            card:[
              {word:"Bus",irish:"assets/img/30.1.jpg",other:"bus", src:"assets/audio/30.1.mp3"},
              {word:"Taxi",irish:"assets/img/30.2.jpg",other:"tax-ee", src:"assets/audio/30.2.mp3"},
              {word:"Bicycle",irish:"assets/img/30.3.jpg",other:"ro-har", src:"assets/audio/30.3.mp3"},
              {word:"Train",irish:"assets/img/30.4.jpg",other:"train", src:"assets/audio/30.4.mp3"},
            ]},

          {id:31,
            width:{'width':'60%'},
            card:[
              {word:"Bread",irish:"assets/img/31.1.jpg",other:"ar-awn", src:"assets/audio/31.1.mp3"},
              {word:"Butter",irish:"assets/img/31.2.jpg",other:"im", src:"assets/audio/31.2.mp3"},
              {word:"Cheese",irish:"assets/img/31.3.jpg",other:"cawsh", src:"assets/audio/31.3.mp3"},
              {word:"Milk",irish:"assets/img/31.4.jpg",other:"ban-ye", src:"assets/audio/31.4.mp3"},
            ]},

          {id:32,
            width:{'width':'60%'},
            card:[
              {word:"A book",irish:"assets/img/32.1.jpg",other:"lawar", src:"assets/audio/32.1.mp3"},
              {word:"A family",irish:"assets/img/32.2.jpg",other:"chy-loch", src:"assets/audio/32.2.mp3"},
              {word:"A hat",irish:"assets/img/32.3.jpg",other:"ha-ta", src:"assets/audio/32.3.mp3"},
              {word:"Money",irish:"assets/img/32.4.jpg",other:"are-a-ged", src:"assets/audio/32.4.mp3"},
            ]},

          {id:33,
            width:{'width':'60%'},
            card:[
              {word:"Cat",irish:"assets/img/33.1.jpg",other:"cat", src:"assets/audio/33.1.mp3"},
              {word:"Dog",irish:"assets/img/33.2.jpg",other:"mad-ra", src:"assets/audio/33.2.mp3"},
              {word:"Elephant",irish:"assets/img/33.3.jpg",other:"il-if-fint", src:"assets/audio/33.3.mp3"},
              {word:"Horse",irish:"assets/img/33.4.jpg",other:"ca-pull", src:"assets/audio/33.4.mp3"},
            ]},

          {id:34,
            width:{'width':'60%'},
            card:[
              {word:"Flowers",irish:"assets/img/34.1.jpg",other:"bla-ha-na", src:"assets/audio/34.1.mp3"},
              {word:"Telephone",irish:"assets/img/34.2.jpg",other:"tel-e-fown", src:"assets/audio/34.2.mp3"},
              {word:"Bag",irish:"assets/img/34.3.jpg",other:"mah-la", src:"assets/audio/34.3.mp3"},
              {word:"Watch",irish:"assets/img/34.4.jpg",other:"ur-a-dor", src:"assets/audio/34.4.mp3"},
            ]},

          {id:35,
            width:{'width':'60%'},
            card:[
              {word:"Waiting",irish:"assets/img/35.1.jpg",other:"eg fan-ucht", src:"assets/audio/35.1.mp3"},
              {word:"Thinking",irish:"assets/img/35.2.jpg",other:"eg smwee-nuv", src:"assets/audio/35.2.mp3"},
              {word:"Singing",irish:"assets/img/35.3.jpg",other:"eg con-a", src:"assets/audio/35.3.mp3"},
              {word:"Starting",irish:"assets/img/35.4.jpg",other:"eg curtoosle", src:"assets/audio/35.4.mp3"},
            ]},

          {id:36,
            width:{'width':'60%'},
            card:[
              {word:"Cup",irish:"assets/img/36.1.jpg",other:"cupawn", src:"assets/audio/36.1.mp3"},
              {word:"Glass",irish:"assets/img/36.2.jpg",other:"glinn-a", src:"assets/audio/36.2.mp3"},
              {word:"Plate",irish:"assets/img/36.3.jpg",other:"plaw-ta", src:"assets/audio/36.3.mp3"},
              {word:"Menu",irish:"assets/img/36.4.jpg",other:"bee-a-chlor", src:"assets/audio/36.4.mp3"},
            ]},

          {id:37,
            width:{'width':'60%'},
            card:[
              {word:"Bed",irish:"assets/img/37.1.jpg",other:"la-ba", src:"assets/audio/37.1.mp3"},
              {word:"Bath",irish:"assets/img/37.2.jpg",other:"ful-ca-dawn", src:"assets/audio/37.2.mp3"},
              {word:"Table",irish:"assets/img/37.3.jpg",other:"bord", src:"assets/audio/37.3.mp3"},
              {word:"House",irish:"assets/img/37.4.jpg",other:"chockh", src:"assets/audio/37.4.mp3"},
            ]},

          {id:38,
            width:{'width':'60%'},
            card:[
              {word:"Street",irish:"assets/img/38.1.jpg",other:"shawd", src:"assets/audio/38.1.mp3"},
              {word:"City",irish:"assets/img/38.2.jpg",other:"car-har", src:"assets/audio/38.2.mp3"},
              {word:"Village",irish:"assets/img/38.3.jpg",other:"shrawd-wall-ya", src:"assets/audio/38.3.mp3"},
              {word:"Country",irish:"assets/img/38.4.jpg",other:"teer", src:"assets/audio/38.4.mp3"},
            ]},

          {id:39,
            width:{'width':'60%'},
            card:[
              {word:"January",irish:"assets/img/39.1.jpg",other:"an-ar", src:"assets/audio/39.1.mp3"},
              {word:"February",irish:"assets/img/39.2.jpg",other:"feeow-ra", src:"assets/audio/39.2.mp3"},
              {word:"March",irish:"assets/img/39.3.jpg",other:"mawr-ta", src:"assets/audio/39.3.mp3"},
              {word:"April",irish:"assets/img/39.4.jpg",other:"a-brawn", src:"assets/audio/39.4.mp3"},
            ]},

          {id:40,
            width:{'width':'60%'},
            card:[
              {word:"Hot",irish:"assets/img/40.1.jpg",other:"te", src:"assets/audio/40.1.mp3"},
              {word:"Cold",irish:"assets/img/40.2.jpg",other:"foo-ar", src:"assets/audio/40.2.mp3"},
              {word:"Sunny",irish:"assets/img/40.3.jpg",other:"gre-an-war", src:"assets/audio/40.3.mp3"},
              {word:"Rainy",irish:"assets/img/40.4.jpg",other:"bawsh-tu-al", src:"assets/audio/40.4.mp3"},
            ]},

          {id:41,
            width:{'width':'60%'},
            card:[
              {word:"Good",irish:"assets/img/41.1.jpg",other:"mah", src:"assets/audio/41.1.mp3"},
              {word:"Bad",irish:"assets/img/41.2.jpg",other:"uk", src:"assets/audio/41.2.mp3"},
              {word:"Doing well",irish:"assets/img/41.3.jpg",other:"eg day-niv gu mah", src:"assets/audio/41.3.mp3"},
    		  {word: "The museum", irish: "assets/img/4.5.jpg", other: "ah mu-sayum",src:"assets/audio/4.5.mp3"}
            ]},

          {id:42,
            width:{'width':'60%'},
            card:[
              {word:"May",irish:"assets/img/42.1.jpg",other:"be-al-tan-a", src:"assets/audio/42.1.mp3"},
              {word:"June",irish:"assets/img/42.2.jpg",other:"meh-iv", src:"assets/audio/42.2.mp3"},
              {word:"July",irish:"assets/img/42.3.jpg",other:"oohl", src:"assets/audio/42.3.mp3"},
              {word:"August",irish:"assets/img/42.4.jpg",other:"loon-a-sa", src:"assets/audio/42.4.mp3"}
            ]},

          {id:43,
            width:{'width':'60%'},
            card:[
              {word:"What time is it?",irish:"assets/img/43.1.jpg",other:"cane tomay", src:"assets/audio/43.1.mp3"},
              {word:"One o’clock",irish:"assets/img/43.2.jpg",other:"a hane a chlug", src:"assets/audio/43.2.mp3"},
              {word:"Two o’clock",irish:"assets/img/43.3.jpg",other:"doachlug", src:"assets/audio/43.3.mp3"},
              {word:"Three o’clock",irish:"assets/img/43.4.jpg",other:"tree achlug", src:"assets/audio/43.4.mp3"}
            ]},

          {id:44,
            width:{'width':'60%'},
            card:[
              {word:"Students",irish:"assets/img/44.1.jpg",other:"mick lane", src:"assets/audio/44.1.mp3"},
              {word:"Children",irish:"assets/img/44.2.jpg",other:"pawsh-tee", src:"assets/audio/44.2.mp3"},
              {word:"Adults",irish:"assets/img/44.3.jpg",other:"deen-ee faws-ta", src:"assets/audio/44.4.mp3"},
              {word:"Friends",irish:"assets/img/44.4.jpg",other:"car-ja", src:"assets/audio/44.5.mp3"},
            ]},

          {id:45,
            width:{'width':'60%'},
            card:[
              {word:"September",irish:"assets/img/45.1.jpg",other:"man fo-war", src:"assets/audio/45.1.mp3"},
              {word:"October",irish:"assets/img/45.2.jpg",other:"jer-e fo-war", src:"assets/audio/45.2.mp3"},
              {word:"November",irish:"assets/img/45.3.jpg",other:"sow-an", src:"assets/audio/45.3.mp3"},
              {word:"December",irish:"assets/img/45.4.jpg",other:"nollag", src:"assets/audio/45.6.mp3"},
            ]},

          {id:46,
            width:{'width':'60%'},
            card:[
              {word:"Until tomorrow",irish:"assets/img/46.1.jpg",other:"gu geeamar-ach", src:"assets/audio/46.1.mp3"},
              {word:"Until later",irish:"assets/img/46.2.jpg",other:"nees mwill-ya", src:"assets/audio/46.2.mp3"},
              {word:"Today",irish:"assets/img/46.3.jpg",other:"in-yu", src:"assets/audio/46.3.mp3"},
              {word:"Yesterday",irish:"assets/img/46.4.jpg",other:"in-yay", src:"assets/audio/46.4.mp3"},
            ]},

          {id:47,
            width:{'width':'60%'},
            card:[
              {word:"Doctor",irish:"assets/img/47.1.jpg",other:"duch-toor", src:"assets/audio/47.1.mp3"},
              {word:"Allergy",irish:"assets/img/47.2.jpg",other:"al-er-guh", src:"assets/audio/47.2.mp3"},
              {word:"Asthma",irish:"assets/img/47.3.jpg",other:"as-ma", src:"assets/audio/47.3.mp3"},
              {word:"Nurse",irish:"assets/img/47.4.jpg",other:"ban-al-tra", src:"assets/audio/47.4.mp3"},
            ]},

          {id:48,
            width:{'width':'60%'},
            card:[
              {word:"France",irish:"assets/img/48.1.jpg",other:"", src:"assets/audio/48.1.mp3"},
              {word:"Ireland",irish:"assets/img/48.2.jpg",other:"air-ra", src:"assets/audio/48.2.mp3"},
              {word:"England",irish:"assets/img/48.3.jpg",other:"sas-an-a", src:"assets/audio/48.3.mp3"},
              {word:"Italy",irish:"assets/img/48.4.jpg",other:"an id-awl",src:"assets/audio/48.4.mp3"}
            ]},
    	 {id:49,
            width:{'width':'60%'},
            card:[
              {word:"5", irish:"assets/img/6.5.jpg",other:"coo-ig", src:"assets/audio/6.5.mp3"},
              {word:"6", irish:"assets/img/6.6.jpg",other:"Shay", src:"assets/audio/6.6.mp3"},
              {word:"7", irish:"assets/img/6.7.jpg",other:"Seacht", src:"assets/audio/6.7.mp3"},
              {word:"8", irish:"assets/img/6.8.jpg",other:"ucht", src:"assets/audio/6.8.mp3"}
            ]},
    	 {id:50,
            width:{'width':'60%'},
            card:[
    			{word: "You have money(Plural)", irish: "assets/img/5.5.jpg", other: "assets/img/5.5.jpg",src:"assets/audio/5.5.mp3"},
    			{word:"Friday",irish:"assets/img/23.5.jpg",other:"jay he-na", src:"assets/audio/23.5.mp3"},
    			{word:"Saturday",irish:"assets/img/23.6.jpg",other:"jay sa-har-in", src:"assets/audio/23.6.mp3"},
    			{word:"Sunday",irish:"assets/img/23.7.jpg",other:"jay do-nee",src:"assets/audio/23.7.mp3"}
            ]},
    		{id:51,
            width:{'width':'60%'},
            card:[
    		  {word:"9", irish:"assets/img/6.9.jpg",other:"nee", src:"assets/audio/6.9.mp3"},
              {word:"10",irish:"assets/img/6.10.jpg",other:"je", src:"assets/audio/6.10.mp3"},
    		  {word:"Four o’clock",irish:"assets/img/43.5.jpg",other:"ca-hara chlug", src:"assets/audio/43.5.mp3"}
            ]}
            ]
    this.indexWords = this.words[this.indexCard];
  };

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    let val = ev?ev.target.value:'';

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      let indexWords1 = this.words[this.indexCard];

      indexWords1.card = indexWords1.card.filter((cords) => {
            return (cords.word.toString().toLowerCase().indexOf(val.toLowerCase())> -1);
      })
      this.indexWords = indexWords1;
    } else {
      this.indexWords = this.words[this.indexCard];
    }
  };

  getAllItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    let val = ev?ev.target.value:'';

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
