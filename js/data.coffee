@tageswoche = @tageswoche || {}

tageswoche.data = do ->
  
  specialConditions =
    fd: "Freistoss direkt"
    fi: "Freistoss indirekt"
    e:  "Ecke"
    p:  "Penalty"
    ps: "Penaltyschiessen"
    ew: "Einwurf"
    f:  "Foul"
  
  nextScene: () ->
    @fetchScenes()[0]
    
  fetchScenes: () ->
    [
      {
        score: "2:1"
        minute: 85
        date: "01.06.2012"
        oponent: "GC"
        home: true
        tournament: "l"
        actions:
          [
            {
              name: "Stocker"
              number: 5
              start: "H1"
            },
            {
              name: "Park"
              number: 8
              start: "E1"
              end: "C10"
            },
            {
              name: "Streller"
              number: 10
              start: "E9"
              end: "A8"
            },
            {
              name: "D. Degen"
              number: 7
              start: "C7"
            }
          ]
      }
    ]