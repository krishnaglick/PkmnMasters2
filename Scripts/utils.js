var raidTier = 32;

function getRankName(i) {
    //Rank Names, will have to be manually updated if they change
    switch (i) {
        case 0:
            return "League Champion";
        case 1:
			return "Elite 4";
        case 2:
            return "Elite 4 Troll Rank";
        case 3:
            return "E4 Alt";
        case 4:
            return "Gym Leader";
        case 5:
            return "Gym Leader Alt";
        case 6:
            return "Ace Trainer";
        case 7:
            return "Trainer";
        case 8:
            return "Rookie";
        default:
            return "What";
    }
}

function getRace(i) {
    //Only bother with Horde races
    switch(i) {
        case 2:
            return "Orc";
        case 5:
            return "Undead";
        case 6:
            return "Taruen";
        case 9:
            return "Goblin";
        case 8:
            return "Troll";
        case 10:
            return "Blood Elf";
        case 26:
            return "Pandaren";
        default:
            return "Bad Race Input!"
    }
}

function getClass(i) {
    switch(i) {
        case 1:
            return "Warrior";
        case 2:
            return "Paladin";
        case 3:
            return "Hunter";
        case 4:
            return "Rogue";
        case 5:
            return "Priest";
        case 6:
            return "Death Knight";
        case 7:
            return "Shaman";
        case 8:
            return "Mage";
        case 9:
            return "Warlock";
        case 10:
            return "Monk";
        case 11:
            return "Druid";
        default:
            return "Bad Class Input!";
    }
}

function getClassIcon(i) {
    switch(i) {
        case 1:
            return "../Content/Images/warrior.bmp";
        case 2:
            return "../Content/Images/paladin.bmp";
        case 3:
            return "../Content/Images/hunter.bmp";
        case 4:
            return "../Content/Images/rogue.bmp";
        case 5:
            return "../Content/Images/priest.bmp";
        case 6:
            return "../Content/Images/dk.bmp";
        case 7:
            return "../Content/Images/shaman.bmp";
        case 8:
            return "../Content/Images/mage.bmp";
        case 9:
            return "../Content/Images/warlock.bmp";
        case 10:
            return "../Content/Images/monk.bmp";
        case 11:
            return "../Content/Images/druid.bmp";
        default:
            return "../Content/Images/noclass.bmp";
    }
}

var docCookies = {
  getItem: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};

function timeToHuman(unixDate) {
	var theDate = new Date(unixDate * 1000);
	dateString = theDate.toGMTString();
	return dateString;
}