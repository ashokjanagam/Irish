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
  allTracks: any[];
  selectedTrack = 0;

  constructor(public navCtrl:NavController,public alertCtrl: AlertController,private _audioProvider: AudioProvider) {this.initializeItems();}

  ngAfterContentInit() {
    // get all tracks managed by AudioProvider so we can control playback via the API
    this.allTracks = this._audioProvider.tracks;
  }
  playSelectedTrack() {
    // use AudioProvider to control selected track
    this._audioProvider.play(this.selectedTrack);
  }

  pauseSelectedTrack() {
    // use AudioProvider to control selected track
    this._audioProvider.pause(this.selectedTrack);
  }

  onTrackFinished(track: any) {
    console.log('Track finished', track)
  }

  clickForSearch(){
    this.searchKey = true;
  }
  clickForAll(){
    this.allClick = true;
  }
  clickForCard(){
    this.allClick = false;
  }
  cardIncr(){

    if(this.indexCard < this.words.length){
      this.indexCard ++;
      this.indexWords = this.words[this.indexCard].card;
    }else {
      alert("pliz")
    }
    this.setBackAndFrontIndex();
  }

  private setBackAndFrontIndex() {
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
    this.indexCard --;
    this.indexWords = this.words[this.indexCard].card;

    this.setBackAndFrontIndex();
  }
  doPrompt() {
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

      {id: 1,
        card: [
          {word: "Hello", irish: "Dia duit", other: "dee-a guit", src:"assets/audio/1.1.mp3"},
          {word: "Yes", irish: "Tá", other: "ta",src:"assets/audio/1.2.mp3"},
          {word: "And", irish: "Agus", other: "a-gus", src:"assets/audio/1.3.mp3"},
          {word: "No", irish: "Níl", other: "neel",src:"assets/audio/1.4.mp3"}
        ]
      },

      {id: 2,
        card: [
          {word: "Good day", irish: "Lá maith", other: "la mah", src:"assets/audio/2.1.mp3"},
          {word: "Good evening", irish: "Tráthnóna maith", other: "tra-no-na mah", src:"assets/audio/2.2.mp3"},
          {word: "Good night", irish: "Oíche mhaith", other: "e-ha mah", src:"assets/audio/2.3.mp3"},
          {word: "Good bye", irish: "Slán", other: "slan",src:"assets/audio/2.4.mp3"}
        ]
      },

      {id: 3,
        card: [
          {word: "How much?", irish: "Cé mhéad?", other: "kay vade", src:"assets/audio/3.1.mp3"},
          {word: "Please", irish: "Le do thoil", other: "leh duh hull", src:"assets/audio/3.2.mp3"},
          {word: "Thank you", irish: "Go raibh maith agat", other: "gu ro mah ag-ut", src:"assets/audio/3.3.mp3"},
          {word: "Excuse me", irish: "Gabh mo leithscéal", other: "go ma lesh-cale",src:"assets/audio/3.4.mp3"}
        ]
      },

      {id: 4,
        card: [
          {word: "I like", irish: "Is maith liom", other: "is mah lum", src:"assets/audio/4.1.mp3"},
          {word: "The beach", irish: "An trá", other: "an traw", src:"assets/audio/4.2.mp3"},
          {word: "The park", irish: "an pháirc", other: "an fork", src:"assets/audio/4.3.mp3"},
          {word: "The zoo", irish: "An zú", other: "an zoo", src:"assets/audio/4.4.mp3"},
          {word: "The museum", irish: "An músaem", other: "ah mu-sayum",src:"assets/audio/4.5.mp3"}
        ]
      },

      {id: 5,
        card: [
          {word: "I have money", irish: "Tá airgead agam", other: "ta are-a-ged ag-um", src:"assets/audio/5.1.mp3"},
          {word: "You have money", irish: "Tá airgead agut", other: "ta are-a-ged ag-ut", src:"assets/audio/5.2.mp3"},
          {word: "We have money", irish: "Tá airgead again", other: "ta are-a-ged ag-inn", src:"assets/audio/5.3.mp3"},
          {word: "They have money", irish: "Tá airgead acu", other: "ta are-a-ged ac-oo", src:"assets/audio/5.4.mp3"},
          {word: "You have money(Plural)", irish: "Tá airgead agaibh", other: "ta are-a-ged ag-iv",src:"assets/audio/5.5.mp3"},
        ]
      },

      {id:6,
        card:[
          {word:"1",irish:"Aon",other:"ane", src:"assets/audio/6.1.mp3"},
          {word:"2",irish:"Do",other:"do", src:"assets/audio/6.2.mp3"},
          {word:"3",irish:"tree",other:"Trí", src:"assets/audio/6.3.mp3"},
          {word:"4",irish:"Ceathair",other:"ca-har", src:"assets/audio/6.4.mp3"},
          {word:"5",irish:"Cúig",other:"coo-ig", src:"assets/audio/6.5.mp3"},
          {word:"6",irish:"Sé",other:"Shay", src:"assets/audio/6.6.mp3"},
          {word:"7",irish:"Seacht",other:"Seacht", src:"assets/audio/6.7.mp3"},
          {word:"8",irish:"Ocht",other:"ucht", src:"assets/audio/6.8.mp3"},
          {word:"9",irish:"Naol",other:"nee", src:"assets/audio/6.9.mp3"},
          {word:"10",irish:"Deich",other:"je", src:"assets/audio/6.10.mp3"},
        ]},

      {id:7,
        card:[
          {word:"The shops",irish:"Na siopaí",other:"nashup-ee", src:"assets/audio/7.1.mp3"},
          {word:"The church",irish:"an séipéal",other:"an sha-pail", src:"assets/audio/7.2.mp3"},
          {word:"The pharmacy",irish:"An poitigéir",other:"an put-ig-air", src:"assets/audio/7.3.mp3"},
          {word:"The school",irish:"An scoil",other:"anscul", src:"assets/audio/7.4.mp3"},
        ]},

      {id:8,
        card:[
          {word:"Spring",irish:"An tEarrach",other:"antar-ach", src:"assets/audio/8.1.mp3"},
          {word:"Summer",irish:"An Samhradh",other:"ansow-ra", src:"assets/audio/8.2.mp3"},
          {word:"Autumn",irish:"An Fómhar",other:"an foe-ar", src:"assets/audio/8.3.mp3"},
          {word:"Winter",irish:"An Geimhreadh",other:"an geev-ra", src:"assets/audio/8.4.mp3"},
        ]},

      {id:9,
        card:[{word:"Man",irish:"Fear",other:"far", src:"assets/audio/9.1.mp3"},
          {word:"Woman",irish:"Bean",other:"ban", src:"assets/audio/9.2.mp3"},
          {word:"Girl",irish:"Cailín",other:"col-een", src:"assets/audio/9.3.mp3"},
          {word:"Boy",irish:"Buachaill",other:"boo-a-ch-al", src:"assets/audio/9.4.mp3"},
        ]},

      {id:10,
        card:[
          {word:"Where is?",irish:"Cá bhfuil?",other:"ca wil", src:"assets/audio/10.1.mp3"},
          {word:"Where is my?",irish:"Cá bhfuil mo?",other:"ca wil muh", src:"assets/audio/10.2.mp3"},
          {word:"Hat",irish:"Hata",other:"ha-ta", src:"assets/audio/10.3.mp3"},
          {word:"Apple",irish:"Úil",other:"ool", src:"assets/audio/10.4.mp3"},
        ]},

      {
        id: 11,
        card:[
          {word:"Airport",irish:"Aerfort",other:"er-fort", src:"assets/audio/128.1.mp3"},
          {word:"Hospital ",irish:"Ospidéal",other:"us-pid-ale", src:"assets/audio/11.2.mp3"},
          {word:"Toilets",irish:"Leithreas",other:"leh-rus", src:"assets/audio/11.3.mp3"},
          {word:" Door",irish:"Doras",other:"dur-as",src:"assets/audio/11.4.mp3"}
        ]},

      {
        id:12,
        card:[
          {word:"Mother",irish:"Máthair",other:"maw-her", src:"assets/audio/12.1.mp3"},
          {word:"Fatherx",irish:"Athair",other:"a-her", src:"assets/audio/12.2.mp3"},
          {word:" Brother ",irish:"Deartháir",other:"jer-har", src:"assets/audio/12.3.mp3"},
          {word:"Sister",irish:"Deirfiúr",other:"jer-foor", src:"assets/audio/12.4.mp3"},
        ]},

      {id:13,
        card:[
          {word:"I want",irish:"Ba mhaith liom",other:"ba-wah lum", src:"assets/audio/13.1.mp3"},
          {word:"You want",irish:"Ba mhaith leat",other:"ba-wah lat", src:"assets/audio/13.2.mp3"},
          {word:"We want ",irish:"Ba mhaith linn",other:"ba-wah lin", src:"assets/audio/13.3.mp3"},
          {word:"They want",irish:"Ba mhaith leo",other:"ba-wah low", src:"assets/audio/13.4.mp3"},
        ]},

      {id:14,
        card:[
          {word:"Now",irish:"Anois",other:"an-ish", src:"assets/audio/14.1.mp3"},
          {word:"Here ",irish:"Ansin",other:"an-shuh", src:"assets/audio/14.2.mp3"},
          {word:" There",irish:"Anseo",other:"an-shin", src:"assets/audio/14.3.mp3"},
          {word:"For",irish:"Do",other:"duh", src:"assets/audio/14.4.mp3"},
        ]},

      {id:15,
        card:[
          {word:"What?",irish:"Céard?",other:"ceard", src:"assets/audio/15.1.mp3"},
          {word:"Who? ",irish:"Cé?",other:"cay", src:"assets/audio/15.2.mp3"},
          {word:" Why?",irish:"Cén fáth?",other:"cane faw", src:"assets/audio/15.3.mp3"},
          {word:"When?",irish:"Cén uair?",other:"cane oo-r", src:"assets/audio/15.4.mp3"},
        ]},

      {id:16,
        card:[
          {word:"You",irish:"Tusa",other:"Tus-a", src:"assets/audio/16.1.mp3"},
          {word:"I",irish:"Mise",other:"Mish-e", src:"assets/audio/16.2.mp3"},
          {word:"Her",irish:"Ise",other:"Ish-e", src:"assets/audio/16.3.mp3"},
          {word:"Him",irish:"Eisean",other:"esh-ean", src:"assets/audio/16.4.mp3"},
        ]},

      {id:17,
        card:[
          {word:"What’s your name?",irish:"Cád is ainm duit?",other:"cod is anim ditch", src:"assets/audio/17.1.mp3"},
          {word:"What is this?",irish:"Céard é seo?",other:"ceard ay shuh", src:"assets/audio/17.2.mp3"},
          {word:"Would you like?",irish:"Ar mhaith leat?",other:"er wah lat", src:"assets/audio/17.3.mp3"},
          {word:"What time is it?",irish:"Cén t-am é?",other:"cane tom ay", src:"assets/audio/17.4.mp3"},
        ]},

      {id:18,
        card:[
          {word:"Blue",irish:"Gorm",other:"gurom", src:"assets/audio/18.1.mp3"},
          {word:"Red",irish:"Dearg",other:"jearag", src:"assets/audio/18.2.mp3"},
          {word:"Green",irish:"Glas",other:"glas", src:"assets/audio/18.3.mp3"},
          {word:"Black",irish:"Dubh",other:"duv", src:"assets/audio/18.4.mp3"},
        ]},

      {id:19,
        card:[
          {word:"Yellow",irish:"Buí",other:"bwee", src:"assets/audio/19.1.mp3"},
          {word:"Orange",irish:"Oráiste",other:"or-awshta", src:"assets/audio/19.2.mp3"},
          {word:"Pink",irish:"Bándearg",other:"bawn-jearag", src:"assets/audio/19.3.mp3"},
          {word:"Brown",irish:"Donn",other:"dun", src:"assets/audio/19.4.mp3"},
        ]},

      {id:20,
        card:[
          {word:"My name is AnneÁine is ainm dom",other:"awe-nyaisanim dum", src:"assets/audio/20.1.mp3"},
          {word:"And you?",irish:"Agus tusa",other:"ag-us tu-sa", src:"assets/audio/20.2.mp3"},
          {word:"I am from Galway",irish:"Is as Gaillimhe mé",other:"isasgall-yiv may", src:"assets/audio/20.3.mp3"},
          {word:"From where?",irish:"As cén áit?",other:"as cane ait", src:"assets/audio/20.4.mp3"},
        ]},

      {id:21,
        card:[
          {word:"Open",irish:"Oscailte",other:"us-cal-che", src:"assets/audio/21.1.mp3"},
          {word:"Closed",irish:"Dúnta",other:"doon-ta", src:"assets/audio/21.2.mp3"},
          {word:"To buy",irish:"Le ceannach",other:"leh cyan-ucht", src:"assets/audio/21.3.mp3"},
          {word:"Nothing",irish:"Náid",other:"nawd", src:"assets/audio/21.4.mp3"},
        ]},

      {id:22,
        card:[
          {word:"Chocolate",irish:"Seacláid",other:"shoc-lawdge", src:"assets/audio/22.1.mp3"},
          {word:"Salad",irish:"Sailéad",other:"sal-ade", src:"assets/audio/22.2.mp3"},
          {word:"Toast",irish:"Arán rósta",other:"ar-awn ros-ta", src:"assets/audio/22.3.mp3"},
          {word:"Fruit",irish:"Torthaí",other:"tor-hee", src:"assets/audio/22.4.mp3"},
        ]},

      {id: 23,
        card:[
          {word:"Mondya",irish:"Dé Luain",other:"jay loon", src:"assets/audio/23.1.mp3"},
          {word:"Tuseday",irish:"Dé Máirt",other:"jay mort", src:"assets/audio/23.2.mp3"},
          {word:"Wednesday",irish:"Dé Céadaoin",other:"jay cade-een", src:"assets/audio/23.3.mp3"},
          {word:"Thursday",irish:"Déardaoin",other:"jer-deen", src:"assets/audio/23.4.mp3"},
          {word:"Friday",irish:"Dé hAoine",other:"jay he-na", src:"assets/audio/23.5.mp3"},
          {word:"Saturday",irish:"Dé Sathairn",other:"jay sa-har-in", src:"assets/audio/23.6.mp3"},
          {word:"Sunday",irish:"Dé Domhnaigh",other:"jay do-nee",src:"assets/audio/23.7.mp3"}

        ]},

      {id:24,
        card:[
          {word:"Where is the bank?",irish:"Cá bhfuil an banc?",other:"cawil an bank", src:"assets/audio/24.1.mp3"},
          {word:"Where is the beach?",irish:"Cá bhfuil an trá?",other:"cawil antraw", src:"assets/audio/24.2.mp3"},
          {word:"Where is the park?",irish:"Cá bhfuil an pháirc?",other:"cawil an fork", src:"assets/audio/24.3.mp3"},
          {word:"Where is the Airport?",irish:"Cá bhfuil an taerfort?",other:"cawil antare-fort", src:"assets/audio/24.4.mp3"},
        ]},

      {id:25,
        card:[
          {word:"Grapes",irish:"Fíonchaora",other:"feen-cwera", src:"assets/audio/25.1.mp3"},
          {word:"Banana",irish:"Banana",other:"ba-na-na", src:"assets/audio/25.2.mp3"},
          {word:"Strawberries",irish:"Sú talún",other:"soo ta-loon", src:"assets/audio/25.3.mp3"},
          {word:"Pear",irish:"Piorra",other:"pyurra", src:"assets/audio/25.4.mp3"},
        ]},

      {id:26,
        card:[
          {word:"Water",irish:"Uisce",other:"ish-ca", src:"assets/audio/26.1.mp3"},
          {word:"Coffee",irish:"Caife",other:"ca-fay", src:"assets/audio/26.2.mp3"},
          {word:"Tea",irish:"Tae",other:"tay", src:"assets/audio/26.3.mp3"},
          {word:"Yoghurt",irish:"Iógart",other:"yo-gart", src:"assets/audio/26.4.mp3"},
        ]},

      {id:27,
        card:[
          {word:"Fish",irish:"Iasc",other:"e-ask", src:"assets/audio/27.1.mp3"},
          {word:"Chicken",irish:"Sicín",other:"shi-keen", src:"assets/audio/27.2.mp3"},
          {word:"Meat",irish:"Feoil",other:"feowl", src:"assets/audio/27.3.mp3"},
          {word:"Vegetables",irish:"Glasraí",other:"glas-ree", src:"assets/audio/27.4.mp3"},
        ]},

      {id:28,
        card:[
          {word:"Gold",irish:"Ór",other:"or", src:"assets/audio/28.1.mp3"},
          {word:"Silver",irish:"Airgead",other:"are-a-ged", src:"assets/audio/28.2.mp3"},
          {word:"Pearl",irish:"Péarla",other:"pair-la", src:"assets/audio/28.3.mp3"},
          {word:" ",irish:"",other:"shodra", src:"assets/audio/28.4.mp3"},
          {word:"Jewellery",irish:"Seodra",other:"", src:"assets/audio/28.5.mp3"},
        ]},

      {id:29,
        card:[
          {word:"Dancing",irish:"Ag damhsa",other:"eg dow-sa", src:"assets/audio/29.1.mp3"},
          {word:"Talking",irish:"Ag caint",other:"eg cinch", src:"assets/audio/29.2.mp3"},
          {word:"Winning",irish:"Ag baint",other:"eg bu-inch", src:"assets/audio/29.3.mp3"},
          {word:"Losing",irish:"Ag cailleadh",other:"eg cyle-leah", src:"assets/audio/29.4.mp3"},
        ]},

      {id:30,
        card:[
          {word:"Bus",irish:"Bus",other:"bus", src:"assets/audio/30.1.mp3"},
          {word:"Taxi",irish:"Tacsaí",other:"tax-ee", src:"assets/audio/30.2.mp3"},
          {word:"Bicycle",irish:"Rothar",other:"ro-har", src:"assets/audio/30.3.mp3"},
          {word:"Train",irish:"Traein",other:"train", src:"assets/audio/30.4.mp3"},
        ]},

      {id:31,
        card:[
          {word:"Bread",irish:"Arán",other:"ar-awn", src:"assets/audio/31.1.mp3"},
          {word:"Butter",irish:"Im",other:"im", src:"assets/audio/31.2.mp3"},
          {word:"Cheese",irish:"Cáis",other:"cawsh", src:"assets/audio/31.3.mp3"},
          {word:"Milk",irish:"Bainne",other:"ban-ye", src:"assets/audio/31.4.mp3"},
        ]},

      {id:32,
        card:[
          {word:"A book",irish:"Leabhar",other:"lawar", src:"assets/audio/32.1.mp3"},
          {word:"A family",irish:"Teaghlach",other:"chy-loch", src:"assets/audio/32.2.mp3"},
          {word:"A hat",irish:"Hata",other:"ha-ta", src:"assets/audio/32.3.mp3"},
          {word:"Money",irish:"Airgead",other:"are-a-ged", src:"assets/audio/32.4.mp3"},
        ]},

      {id:33,
        card:[
          {word:"Cat",irish:"Cat",other:"cat", src:"assets/audio/33.1.mp3"},
          {word:"Dog",irish:"Madra",other:"mad-ra", src:"assets/audio/33.2.mp3"},
          {word:"Elephant",irish:"Eilifint",other:"il-if-fint", src:"assets/audio/33.3.mp3"},
          {word:"Horse",irish:"Capall",other:"ca-pull", src:"assets/audio/33.4.mp3"},
        ]},

      {id:34,
        card:[
          {word:"Flowers",irish:"Bláthanna",other:"bla-ha-na", src:"assets/audio/34.1.mp3"},
          {word:"Telephone",irish:"Teileafón",other:"tel-e-fown", src:"assets/audio/34.2.mp3"},
          {word:"Bag",irish:"Mála",other:"mah-la", src:"assets/audio/34.3.mp3"},
          {word:"Watch",irish:"Uaireadóir",other:"ur-a-dor", src:"assets/audio/34.4.mp3"},
        ]},

      {id:35,
        card:[
          {word:"Waiting",irish:"Ag fanacht",other:"eg fan-ucht", src:"assets/audio/35.1.mp3"},
          {word:"Thinking",irish:"Ag smaoineamh",other:"eg smwee-nuv", src:"assets/audio/35.2.mp3"},
          {word:"Singing",irish:"Ag canadh",other:"eg con-a", src:"assets/audio/35.3.mp3"},
          {word:"Starting",irish:"Ag cuir tús le",other:"eg curtoosle", src:"assets/audio/35.4.mp3"},
        ]},

      {id:36,
        card:[
          {word:"Cup",irish:"Cupán",other:"cupawn", src:"assets/audio/36.1.mp3"},
          {word:"Glass",irish:"Gloine",other:"glinn-a", src:"assets/audio/36.2.mp3"},
          {word:"Plate",irish:"Pláta",other:"plaw-ta", src:"assets/audio/36.3.mp3"},
          {word:"Menu",irish:"Biachlár",other:"bee-a-chlor", src:"assets/audio/36.4.mp3"},
        ]},

      {id:37,
        card:[
          {word:"Bed",irish:"Leaba",other:"la-ba", src:"assets/audio/37.1.mp3"},
          {word:"Bath",irish:"Folcadán",other:"ful-ca-dawn", src:"assets/audio/37.2.mp3"},
          {word:"Table",irish:"Bord",other:"bord", src:"assets/audio/37.3.mp3"},
          {word:"House",irish:"Teach",other:"chockh", src:"assets/audio/37.4.mp3"},
        ]},

      {id:38,
        card:[
          {word:"Street",irish:"Sráid",other:"shawd", src:"assets/audio/38.1.mp3"},
          {word:"City",irish:"Cathair",other:"car-har", src:"assets/audio/38.2.mp3"},
          {word:"Village",irish:"Sráidbhaile",other:"shrawd-wall-ya", src:"assets/audio/38.3.mp3"},
          {word:"Country",irish:"Tír",other:"teer", src:"assets/audio/38.4.mp3"},
        ]},

      {id:39,
        card:[
          {word:"January",irish:"Eanáir",other:"an-ar", src:"assets/audio/39.1.mp3"},
          {word:"February",irish:"Feabhra",other:"feeow-ra", src:"assets/audio/39.2.mp3"},
          {word:"March",irish:"Márta",other:"mawr-ta", src:"assets/audio/39.3.mp3"},
          {word:"April",irish:"Aibreán",other:"a-brawn", src:"assets/audio/39.4.mp3"},
        ]},

      {id:40,
        card:[
          {word:"Hot",irish:"Te",other:"te", src:"assets/audio/40.1.mp3"},
          {word:"Cold",irish:"Fuar",other:"foo-ar", src:"assets/audio/40.2.mp3"},
          {word:"Sunny",irish:"Grianmhar",other:"gre-an-war", src:"assets/audio/40.3.mp3"},
          {word:"Rainy",irish:"Báistiúil",other:"bawsh-tu-al", src:"assets/audio/40.4.mp3"},
        ]},

      {id:41,
        card:[
          {word:"Good",irish:"Maith",other:"mah", src:"assets/audio/41.1.mp3"},
          {word:"Bad",irish:"Olc",other:"uk", src:"assets/audio/41.2.mp3"},
          {word:"Doing well",irish:"Ag déanamh go maith",other:"eg day-niv gu mah", src:"assets/audio/41.3.mp3"},
          {word:"Nice",irish:"Deas",other:"jas", src:"assets/audio/41.4.mp3"},
        ]},

      {id:42,
        card:[
          {word:"May",irish:"Bealtaine",other:"be-al-tan-a", src:"assets/audio/42.1.mp3"},
          {word:"June",irish:"Meitheamh",other:"meh-iv", src:"assets/audio/42.2.mp3"},
          {word:"July",irish:"Iúll",other:"oohl", src:"assets/audio/42.3.mp3"},
          {word:"August",irish:"Lúnasa",other:"loon-a-sa", src:"assets/audio/42.4.mp3"},
        ]},

      {id:43,
        card:[
          {word:"What time is it?",irish:"Cén t-am é?",other:"cane tomay", src:"assets/audio/43.1.mp3"},
          {word:"One o’clock",irish:"A h-Aon a chlog",other:"a hane a chlug", src:"assets/audio/43.2.mp3"},
          {word:"Two o’clock",irish:"Dó a chlog",other:"doachlug", src:"assets/audio/43.3.mp3"},
          {word:"Three o’clock",irish:"Trí a chlog",other:"tree achlug", src:"assets/audio/43.4.mp3"},
          {word:"Four o’clock",irish:"Ceathair a chlog",other:"ca-hara chlug", src:"assets/audio/43.5.mp3"},
        ]},

      {id:44,
        card:[
          {word:"Students",irish:"Mic léinn",other:"mick lane", src:"assets/audio/44.1.mp3"},
          {word:"Children",irish:"Páistí",other:"pawsh-tee", src:"assets/audio/44.2.mp3"},
          {word:"Adults",irish:"Daoine fásta",other:"deen-ee faws-ta", src:"assets/audio/44.4.mp3"},
          {word:"Friends",irish:"Cairde",other:"car-ja", src:"assets/audio/44.5.mp3"},
        ]},

      {id:45,
        card:[
          {word:"September",irish:"Meán fómhair",other:"man fo-war", src:"assets/audio/45.1.mp3"},
          {word:"October",irish:"Deireach fómhair",other:"jer-e fo-war", src:"assets/audio/45.2.mp3"},
          {word:"November",irish:"Samhain",other:"sow-an", src:"assets/audio/45.3.mp3"},
          {word:"December",irish:"Nollag",other:"nollag", src:"assets/audio/45.6.mp3"},
        ]},

      {id:46,
        card:[
          {word:"Until tomorrow",irish:"Go dtí amárach",other:"gu geeamar-ach", src:"assets/audio/46.1.mp3"},
          {word:"Until later",irish:"Níos moille",other:"nees mwill-ya", src:"assets/audio/46.2.mp3"},
          {word:"Today",irish:"Inniu",other:"in-yu", src:"assets/audio/46.3.mp3"},
          {word:"Yesterday",irish:"Inné",other:"in-yay", src:"assets/audio/46.4.mp3"},
        ]},

      {id:47,
        card:[
          {word:"Doctor",irish:"Dochtúir",other:"duch-toor", src:"assets/audio/47.1.mp3"},
          {word:"Allergy",irish:"Ailléirge",other:"al-er-guh", src:"assets/audio/47.2.mp3"},
          {word:"Asthma",irish:"Asma",other:"as-ma", src:"assets/audio/47.3.mp3"},
          {word:"Nurse",irish:"Banaltra",other:"ban-al-tra", src:"assets/audio/47.4.mp3"},
        ]},

      {id:48,
        card:[
          {word:"France",irish:"An fhrainc",other:"", src:"assets/audio/48.1.mp3"},
          {word:"Ireland",irish:"Éire",other:"air-ra", src:"assets/audio/48.2.mp3"},
          {word:"England",irish:"Sasana",other:"sas-an-a", src:"assets/audio/48.3.mp3"},
          {word:"Italy",irish:"An iodáil",other:"an id-awl",src:"assets/audio/48.4.mp3"}
        ]},
        ]
    this.indexWords = this.words[this.indexCard].card;
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
