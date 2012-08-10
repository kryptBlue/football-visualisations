// Generated by CoffeeScript 1.3.3
(function() {

  this.tageswoche = this.tageswoche || {};

  tageswoche.data = (function() {
    var specialConditions;
    specialConditions = {
      "Freistoss direkt": "fd",
      "Freistoss indirekt": "fi",
      "Ecke": "e",
      "Penalty": "p",
      "Penaltyschiessen": "ps",
      "Einwurf": "ew",
      "Foul": "f"
    };
    return {
      is: function(condition, code) {
        if (condition && code) {
          return specialConditions[condition] === code.toLowerCase();
        } else {
          return false;
        }
      },
      scenes: void 0,
      games: {},
      current: -1,
      addSceneToGame: function(index, scene) {
        var game, _base, _name, _ref;
        game = (_ref = (_base = this.games)[_name = scene.date]) != null ? _ref : _base[_name] = [];
        this.scenes.push(scene);
        return game.push(index);
      },
      firstScene: function() {
        var game, lastScene;
        lastScene = this.scenes[this.scenes.length - 1];
        game = this.games[lastScene.date];
        this.current = game[0];
        return this.scenes[this.current];
      },
      nextScene: function() {
        if (!this.isLastScene()) {
          this.current += 1;
        }
        return this.scenes[this.current];
      },
      isLastScene: function() {
        return this.current === (this.scenes.length - 1);
      },
      previousScene: function() {
        if (!this.isFirstScene()) {
          this.current -= 1;
        }
        return this.scenes[this.current];
      },
      isFirstScene: function() {
        return this.current === 0;
      },
      getScene: function(index) {
        this.current = index;
        return this.scenes[this.current];
      },
      loadScenes: function(callback) {
        var _this = this;
        if (this.scenes) {
          callback(void 0, this.scenes);
          return;
        }
        $.ajax({
          url: "http://tageswoche.herokuapp.com/fcb/situations",
          dataType: "jsonp"
        }).done(function(data) {
          var entry, index, _i, _len;
          data = data.list;
          _this.scenes = [];
          for (index = _i = 0, _len = data.length; _i < _len; index = ++_i) {
            entry = data[index];
            if (!/g:/i.test(entry.scorePosition)) {
              _this.addSceneToGame(index, {
                actions: entry.playerPositions,
                score: entry.score,
                minute: entry.minute,
                opponent: entry.opponent,
                team: entry.team,
                home: entry.homematch,
                date: entry.date,
                competition: entry.competition,
                scorePosition: entry.scorePosition
              });
            }
          }
          return callback(void 0, _this.scenes);
        });
      },
      loadScenesFake: function(callback) {
        var data, entry, index, newData;
        data = [
          {
            score: "1:0",
            minute: 85,
            date: "01.06.2012",
            opponent: "GC",
            team: "FCB",
            home: true,
            tournament: "l",
            scorePosition: "OM",
            actions: [
              {
                name: "Stocker",
                number: 5,
                positions: ["H1"]
              }, {
                name: "Park",
                number: 8,
                positions: ["E1", "C10"]
              }, {
                name: "Streller",
                number: 10,
                positions: ["E9", "A8"]
              }, {
                name: "D. Degen",
                number: 7,
                positions: ["C7"]
              }
            ]
          }, {
            score: "2:0",
            minute: 86,
            date: "01.06.2012",
            opponent: "GC",
            team: "FCB",
            home: true,
            tournament: "l",
            scorePosition: "UL",
            actions: [
              {
                name: "Frei",
                number: 11,
                positions: ["H4", "F4"]
              }, {
                name: "Park",
                number: 8,
                positions: ["E6"]
              }, {
                name: "Frei",
                number: 11,
                positions: ["C5"]
              }
            ]
          }, {
            score: "1:0",
            minute: 14,
            date: "01.07.2012",
            opponent: "Servette",
            team: "FCB",
            home: true,
            tournament: "l",
            scorePosition: "UL",
            actions: [
              {
                name: "Frei",
                number: 11,
                positions: ["H6"]
              }, {
                name: "Park",
                number: 8,
                positions: ["E5", "E4"]
              }, {
                name: "Frei",
                number: 11,
                positions: ["C3"]
              }
            ]
          }
        ];
        this.scenes = data;
        this.games = {};
        newData = (function() {
          var _i, _len, _results;
          _results = [];
          for (index = _i = 0, _len = data.length; _i < _len; index = ++_i) {
            entry = data[index];
            _results.push(this.addSceneToGame(entry, index));
          }
          return _results;
        }).call(this);
        return callback(void 0, data);
      }
    };
  })();

}).call(this);