/* globals e, game */

Object.assign(window.game, (function() {
    const templates = {
        player: {
            name: 'Player',
            img: 'player.png',
            hp: 100,
            dmg: 25,
            defense: 10,
            attackRating: 10
        },
        rat: {
            name: 'Giant Rat',
            img: 'rat.png',
            ai: true,
            level: 1,
            hp: 30,
            dmg: 10,
            defense: 5,
            attackRating: 3
        },
        skeleton: {
            name: 'Skeleton',
            img: 'skeleton.png',
            ai: true,
            level: 2,
            hp: 50,
            dmg: 15,
            defense: 8,
            attackRating: 5
        },
        goblin: {
            name: 'Goblin',
            img: 'goblin.png',
            ai: true,
            level: 4,
            hp: 100,
            dmg: 25,
            defense: 12,
            attackRating: 8
        },
    }

    return {
        createCharacter,
        templates
    }
    function createCharacter(type){
        const character = Object.assign({
            alive: true,
            attack,
            takeDamage
        }, templates[type])
        character.maxHp = character.hp

        const element = createCharacterCard(character)
    
        return {
            character,
            element
        }
    
        function attack(target){
            console.log(`${character.name} attacks ${target.name}`)
            const chance = Math.min(character.attackRating / target.defense, 1)
            if(chance >= Math.random()){
                target.takeDamage(character.dmg)
            }else{
                console.log(`${character.name}'s attacks misses!`)
            }
        }
    
        function takeDamage(incomingDmg){
            console.log(`${character.name} took ${incomingDmg}`)
            character.hp -= incomingDmg
            if(character.hp <= 0){
                character.hp = 0
                character.alive = false
            }
            element.update()
        }
    }
    
    function createCharacterCard(character){
        const stats = {
            hp: e('span', {}, `${character.hp} / ${character.maxHp}`)
        }
        const element = e('article', {className: 'character-card'},
        e('div', {className: 'portrait'}, e('img', {src: 'assets/' + character.img})),
        e('div', {className: 'description'},
        e('h3', {}, character.name),
        e('ul', {className: 'stats'},
        e('li', {}, "HP: ", stats.hp),
        e('li', {}, "Damage: ", e('span', {}, character.dmg))
        )
        )
        )
        element.update = update
    
        return element
        
        function update(){
            stats.hp.textContent = `${character.hp} / ${character.maxHp}`
            if(character.alive == false){
                element.classList.add('wasted')
            }
        }
    }
})())
