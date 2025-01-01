const PlayersMatchLobby = () => {
    const totalPlayers = 50
    const proSkill = 2000 //x
    const casualSkill = 1000 //y
    const reqAverageSkill = 1400
    // derived from the formula: x + y = 50
    // 2000x + 1000y = 1400 * 50

    //solve for x
    const x = (reqAverageSkill * totalPlayers - casualSkill * totalPlayers) / (proSkill - casualSkill)
    const y = totalPlayers - x

    return{
        proPlayers: x,
        casualPlayers: y
    }

}
const result = PlayersMatchLobby()
console.log(`To ensure that the players are matched fairly, the lobby should have the following players: 
    Pro players in lobby: ${result.proPlayers}
    Casual players in lobby: ${result.casualPlayers}`)