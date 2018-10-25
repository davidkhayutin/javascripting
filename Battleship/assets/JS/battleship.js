$(() => {

    let playerOne = [];
    let playerTwo = [];
    let playerOneShips ={}
    let playerTwoShips = {}

    const GRID = [
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ];

    let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

    function countRows(){
      if(undefined){
        return undefined;
      } else {
        return GRID.length;
      }
    }

    function countColumns(){
      if(undefined){
        return undefined;
      } else {
        return GRID[1].length;
      }
    }

    let rows = countRows();
    let colums = countColumns();


    function createPlayerOne(){
        for(var i = 0; i < colums; i++){
      $("body #container").addClass("battleShipBoard")
        .append($("<div>").addClass(letters[i]).append($("<i>").text(letters[i]).append($("<span>"))))
        }

    for(var i = 1; i <= rows; i++){
          $("body #container div")
            .append($("<span>").text(i).addClass("squares"))
        }


    }

       function createPlayerTwo(){
        for(var i = 0; i < colums; i++){
      $("body #containerTwo").addClass("playerTwoBoard")
        .append($("<div>").addClass(letters[i]).append($("<i>").text(letters[i]).append($("<span>"))))
        }

    for(var i = 1; i <= rows; i++){
          $("body #containerTwo div")
            .append($("<span>").text(i).addClass("squares"))
        }


    }


    createPlayerOne();
    createPlayerTwo();

    $(".boatPlacementTwo").slideToggle(0);
    $(".fireTwo").slideToggle(0);
    $(".fire").slideToggle(0)
    $(".playerOneFeed").slideToggle(0)
    $(".playerTwoFeed").slideToggle(0)


    $("form.boatPlacement").submit(function (event){
        event.preventDefault();
        // playerOne.shift();
        let ShipsEntered = $(this).serializeArray();
        playerOneShips["Destroyer"] = [ShipsEntered[0].value,ShipsEntered[1].value];
        playerOneShips["submarine"] = [ShipsEntered[2].value, ShipsEntered[3].value, ShipsEntered[4].value];
        playerOneShips["Cruiser"] = [ShipsEntered[5].value, ShipsEntered[6].value, ShipsEntered[7].value];
        playerOneShips["Battleship"] = [ShipsEntered[8].value, ShipsEntered[9].value, ShipsEntered[10].value, ShipsEntered[11].value];
        playerOneShips["Carrier"] = [ShipsEntered[12].value, ShipsEntered[13].value, ShipsEntered[14].value, ShipsEntered[15].value, ShipsEntered[16].value]
        playerOne.push(ShipsEntered[0].value,ShipsEntered[1].value,ShipsEntered[2].value, ShipsEntered[3].value, ShipsEntered[4].value,ShipsEntered[5].value, ShipsEntered[6].value, ShipsEntered[7].value, ShipsEntered[8].value, ShipsEntered[9].value, ShipsEntered[10].value, ShipsEntered[11].value,ShipsEntered[12].value, ShipsEntered[13].value, ShipsEntered[14].value, ShipsEntered[15].value, ShipsEntered[16].value)
        $(".boatPlacement").slideToggle(0);
        $(".boatPlacementTwo").slideToggle();

    })

      $("form.boatPlacementTwo").submit(function (event){
        event.preventDefault();
        // playerOne.shift();
        let ShipsEntered = $(this).serializeArray();
        playerTwoShips["Destroyer"] = [ShipsEntered[0].value,ShipsEntered[1].value];
        playerTwoShips["submarine"] = [ShipsEntered[2].value, ShipsEntered[3].value, ShipsEntered[4].value];
        playerTwoShips["Cruiser"] = [ShipsEntered[5].value, ShipsEntered[6].value, ShipsEntered[7].value];
        playerTwoShips["Battleship"] = [ShipsEntered[8].value, ShipsEntered[9].value, ShipsEntered[10].value, ShipsEntered[11].value];
        playerTwoShips["Carrier"] = [ShipsEntered[12].value, ShipsEntered[13].value, ShipsEntered[14].value, ShipsEntered[15].value, ShipsEntered[16].value]
        playerTwo.push(ShipsEntered[0].value,ShipsEntered[1].value,ShipsEntered[2].value, ShipsEntered[3].value, ShipsEntered[4].value,ShipsEntered[5].value, ShipsEntered[6].value, ShipsEntered[7].value, ShipsEntered[8].value, ShipsEntered[9].value, ShipsEntered[10].value, ShipsEntered[11].value,ShipsEntered[12].value, ShipsEntered[13].value, ShipsEntered[14].value, ShipsEntered[15].value, ShipsEntered[16].value)
        $(".boatPlacementTwo").slideToggle(0);
        $(".playerOneFeed").slideToggle()
        $(".playerTwoFeed").slideToggle()
        $(".fire").slideToggle()

    })


    $(".fire").submit(function(event){
        event.preventDefault();
        let shotFired = $(this).serializeArray();
        let shotFiredValues = shotFired[0].value.split("")
        let rowNeeded = shotFiredValues[0].toUpperCase();
        let exactRow =  $("." + rowNeeded);
        let columNeeded = shotFired[0].value.substring(1);
        let columChild = exactRow[0].children
        let exactColum = columChild[columNeeded]
        let shot = shotFired[0].value
        let indexPlayerTwo = playerTwo.indexOf(shot)
        let playerTwohit = false;
        console.log(playerTwo)
        for(var i = 0; i < playerTwo.length; i++){
          if(playerTwo[i] === shot){
            $(exactColum).addClass("hit");
            playerTwo.splice(indexPlayerTwo, 1)
           $(".playerOneFeed").append($("<li>").text("Player Ones shot at " + shotFired[0].value + ", was a hit! "))
           playerTwohit = true;
          }
        }

        if(playerTwohit === false){
          $(exactColum).addClass("miss")
          $(".playerOneFeed").append($("<li>").text("Player One Shot at " + shotFired[0].value + ", was a miss! "))
        }

        for(ships in playerTwoShips){
          for(var i = 0; i < (playerTwoShips[ships]).length; i++ ){
            if(shot === (playerTwoShips[ships])[i]){
                playerTwoShips[ships].shift();
             $("p.results").fadeIn(500).append($("<h3>").text("You hit player two's " + ships).addClass("hitwords"))
              setTimeout(function(){
                $('p.results h3').remove();
                }, 3000);
            }

            if(playerTwoShips[ships].length < 1){
                $("p.results").fadeIn(500).append($("<h3>").text("You sunk player two's " + ships).addClass("hitwords"))
                // $(".playerOneFeed").append($("<li>").text("Your shot" + shotFired[0].value + ", destroyed player two's " + ships))
                setTimeout(function(){
                $('p.results h2').remove();
                }, 3000);
            }


            if(playerTwo.length < 1 ){
              $(".results").append($("<h3>").text("player 1 wins!").addClass("hitwords"))
            }

          }

        }

        $(".fire").slideToggle(0)

        $(".fireTwo").slideToggle();
        console.log(playerTwo)
    })



    $(".fireTwo").submit(function(event){
        event.preventDefault();
        let shotFired = $(this).serializeArray();
        let shotFiredValues = shotFired[0].value.split("")
        let rowNeeded = shotFiredValues[0].toUpperCase();
        let exactRow =  $("." + rowNeeded);
        console.log(exactRow)
        let columNeeded = shotFired[0].value.substring(1);
        let columChild = exactRow[1].children
        let exactColum = columChild[columNeeded]
        let shot = shotFired[0].value
        let indexPlayerOne = playerOne.indexOf(shot)
        let playerOneHit = false;

        for(var i = 0; i < playerOne.length; i++){
          if(playerOne[i] === shot){
          playerOne.splice(indexPlayerOne, 1)
           $(exactColum).addClass("hit");
           $(".playerOneFeed").append($("<li>").text("Player Two's shot at " + shotFired[0].value + ", was a hit! "))
           playerOneHit = true;
          }
        }

        if(playerOneHit === false){
          $(exactColum).addClass("miss")
          $(".playerOneFeed").append($("<li>").text("Player Two's Shot at " + shotFired[0].value + ", was a miss! "))
        }

        for(ships in playerOneShips){
          console.log(playerOneShips[ships])
          for(var i = 0; i < (playerOneShips[ships]).length; i++ ){
             console.log("this is ships i", [ships][i])
            if(shot === (playerOneShips[ships])[i]){
                (playerOneShips[ships]).shift();
              $("p.results").fadeIn(500).append($("<h3>").text("You hit player one's " + ships).addClass("hitwords"))
              setTimeout(function(){
                $('p.results h3').remove();
                }, 3000);
            }
            if(playerOneShips[ships].length < 1){
                $("p.results").fadeIn(500).append($("<h3>").text("You sunk player one's " + ships).addClass("hitwords"))
                setTimeout(function(){
                $('p.results h2').remove();
                }, 3000);
            }

            if(playerOne.length < 1 ){
                $(".results").append($("<h3>").text("player 2 wins!").addClass("hitwords"))
            }

          }

        }

        $(".fireTwo").slideToggle(0)
        $("ul.playerOne").append($("<li>").text(shotFired[0].value + ", "))
        $(".fire").slideToggle();
    })


})



